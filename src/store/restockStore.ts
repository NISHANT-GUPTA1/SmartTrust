import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface PurchaseRecord {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  purchase_date: string;
  estimated_consumption_days: number;
  category: string;
  price: number;
  actual_consumption_days?: number; // User can update this for better predictions
}

interface RestockPrediction {
  product_id: string;
  product_name: string;
  category: string;
  last_purchase_date: string;
  average_consumption_days: number;
  predicted_runout_date: string;
  confidence_score: number;
  suggested_quantity: number;
  priority: 'high' | 'medium' | 'low';
  days_until_runout: number;
  price: number;
  image: string;
}

interface RestockNotification {
  id: string;
  product_id: string;
  message: string;
  type: 'restock_soon' | 'restock_now' | 'bundle_offer';
  created_at: string;
  is_read: boolean;
  action_taken: boolean;
}

interface RestockStore {
  purchaseHistory: PurchaseRecord[];
  restockPredictions: RestockPrediction[];
  notifications: RestockNotification[];
  isAnalyzing: boolean;
  
  // Actions
  addPurchase: (product: Product, quantity: number) => void;
  updateConsumptionRate: (productId: string, actualDays: number) => void;
  generateRestockPredictions: () => void;
  dismissNotification: (notificationId: string) => void;
  markActionTaken: (notificationId: string) => void;
  getRestockSuggestions: () => RestockPrediction[];
  getLowStockItems: () => RestockPrediction[];
  getGroceryRestockPlan: () => {
    thisWeek: RestockPrediction[];
    nextWeek: RestockPrediction[];
    monthEnd: RestockPrediction[];
  };
  getPurchaseAnalytics: (days: number) => {
    totalPurchases: number;
    totalSpent: number;
    averageOrderValue: number;
    mostFrequentCategory: string;
    consumptionTrends: Record<string, { avg_days: number; confidence: number }>;
  };
}

// Default consumption rates by category (in days)
const DEFAULT_CONSUMPTION_RATES = {
  'Groceries': {
    'Milk': 7,
    'Bread': 5,
    'Eggs': 10,
    'Fruits': 5,
    'Vegetables': 4,
    'Meat': 3,
    'Rice': 30,
    'Pasta': 20,
    'Cereal': 14,
    'Snacks': 7,
    'Beverages': 10,
    'Dairy': 7,
    'Frozen Foods': 21,
    'Canned Goods': 60,
    'Spices': 90,
    'Oil': 45,
    'Sugar': 60,
    'Coffee': 14,
    'Tea': 30
  },
  'Health & Beauty': {
    'Shampoo': 30,
    'Soap': 21,
    'Toothpaste': 45,
    'Vitamins': 30
  },
  'Household': {
    'Detergent': 30,
    'Toilet Paper': 14,
    'Paper Towels': 21,
    'Cleaning Supplies': 30
  }
};

function getEstimatedConsumptionDays(productName: string, category: string): number {
  const categoryRates = DEFAULT_CONSUMPTION_RATES[category as keyof typeof DEFAULT_CONSUMPTION_RATES];
  
  if (categoryRates) {
    // Try to find a specific match
    for (const [key, days] of Object.entries(categoryRates)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) {
        return days;
      }
    }
  }
  
  // Default based on category
  switch (category) {
    case 'Groceries': return 14;
    case 'Health & Beauty': return 30;
    case 'Household': return 21;
    default: return 30;
  }
}

function calculateConfidenceScore(purchaseCount: number, variabilityScore: number): number {
  // Base confidence on number of purchases and consistency
  const baseConfidence = Math.min(purchaseCount * 0.2, 0.8);
  const variabilityPenalty = variabilityScore * 0.3;
  return Math.max(0.3, Math.min(1.0, baseConfidence - variabilityPenalty));
}

function getPriority(daysUntilRunout: number): 'high' | 'medium' | 'low' {
  if (daysUntilRunout <= 3) return 'high';
  if (daysUntilRunout <= 7) return 'medium';
  return 'low';
}

export const useRestockStore = create<RestockStore>()(
  persist(
    (set, get) => ({
      purchaseHistory: [],
      restockPredictions: [],
      notifications: [],
      isAnalyzing: false,

      addPurchase: (product: Product, quantity: number) => {
        const now = new Date().toISOString();
        const estimatedDays = getEstimatedConsumptionDays(product.name, product.category);
        
        const newPurchase: PurchaseRecord = {
          id: `purchase-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          product_id: product.id,
          product_name: product.name,
          quantity,
          purchase_date: now,
          estimated_consumption_days: estimatedDays,
          category: product.category,
          price: product.price
        };

        set((state) => ({
          purchaseHistory: [...state.purchaseHistory, newPurchase]
        }));

        // Regenerate predictions after adding a purchase
        setTimeout(() => {
          get().generateRestockPredictions();
        }, 100);
      },

      updateConsumptionRate: (productId: string, actualDays: number) => {
        set((state) => ({
          purchaseHistory: state.purchaseHistory.map(record => 
            record.product_id === productId && !record.actual_consumption_days
              ? { ...record, actual_consumption_days: actualDays }
              : record
          )
        }));

        // Regenerate predictions with updated data
        get().generateRestockPredictions();
      },

      generateRestockPredictions: () => {
        set({ isAnalyzing: true });

        const { purchaseHistory } = get();
        const productGroups = purchaseHistory.reduce((groups, record) => {
          if (!groups[record.product_id]) {
            groups[record.product_id] = [];
          }
          groups[record.product_id].push(record);
          return groups;
        }, {} as Record<string, PurchaseRecord[]>);

        const predictions: RestockPrediction[] = [];
        const newNotifications: RestockNotification[] = [];

        Object.entries(productGroups).forEach(([productId, records]) => {
          if (records.length === 0) return;

          // Sort by purchase date
          records.sort((a, b) => new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime());
          
          const latestRecord = records[records.length - 1];
          
          // Calculate average consumption days
          const consumptionRates = records
            .map(r => r.actual_consumption_days || r.estimated_consumption_days)
            .filter(Boolean);
          
          const avgConsumptionDays = consumptionRates.length > 0 
            ? consumptionRates.reduce((sum, days) => sum + days, 0) / consumptionRates.length
            : latestRecord.estimated_consumption_days;

          // Calculate variability for confidence score
          const variability = consumptionRates.length > 1
            ? Math.sqrt(consumptionRates.reduce((sum, days) => sum + Math.pow(days - avgConsumptionDays, 2), 0) / consumptionRates.length) / avgConsumptionDays
            : 0.2;

          const confidence = calculateConfidenceScore(records.length, variability);
          
          // Predict runout date
          const lastPurchaseDate = new Date(latestRecord.purchase_date);
          const predictedRunoutDate = new Date(lastPurchaseDate.getTime() + (avgConsumptionDays * 24 * 60 * 60 * 1000));
          const now = new Date();
          const daysUntilRunout = Math.ceil((predictedRunoutDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

          // Only create predictions for items that will run out in the next 30 days
          if (daysUntilRunout <= 30 && daysUntilRunout >= -7) {
            const priority = getPriority(daysUntilRunout);
            
            // Suggest quantity based on historical average
            const avgQuantity = records.reduce((sum, r) => sum + r.quantity, 0) / records.length;
            const suggestedQuantity = Math.ceil(avgQuantity);

            const prediction: RestockPrediction = {
              product_id: productId,
              product_name: latestRecord.product_name,
              category: latestRecord.category,
              last_purchase_date: latestRecord.purchase_date,
              average_consumption_days: Math.round(avgConsumptionDays),
              predicted_runout_date: predictedRunoutDate.toISOString(),
              confidence_score: confidence,
              suggested_quantity: suggestedQuantity,
              priority,
              days_until_runout: daysUntilRunout,
              price: latestRecord.price,
              image: '/api/placeholder/100/100'
            };

            predictions.push(prediction);

            // Create notifications for high priority items
            if (priority === 'high' && daysUntilRunout > 0) {
              newNotifications.push({
                id: `notif-${Date.now()}-${productId}`,
                product_id: productId,
                message: `${latestRecord.product_name} is running low! Consider restocking in the next ${daysUntilRunout} days.`,
                type: 'restock_soon',
                created_at: now.toISOString(),
                is_read: false,
                action_taken: false
              });
            }

            if (daysUntilRunout <= 0) {
              newNotifications.push({
                id: `notif-urgent-${Date.now()}-${productId}`,
                product_id: productId,
                message: `${latestRecord.product_name} should be restocked now! It may have run out.`,
                type: 'restock_now',
                created_at: now.toISOString(),
                is_read: false,
                action_taken: false
              });
            }
          }
        });

        set((state) => ({
          restockPredictions: predictions,
          notifications: [...state.notifications, ...newNotifications],
          isAnalyzing: false
        }));
      },

      dismissNotification: (notificationId: string) => {
        set((state) => ({
          notifications: state.notifications.map(notif => 
            notif.id === notificationId ? { ...notif, is_read: true } : notif
          )
        }));
      },

      markActionTaken: (notificationId: string) => {
        set((state) => ({
          notifications: state.notifications.map(notif => 
            notif.id === notificationId ? { ...notif, action_taken: true, is_read: true } : notif
          )
        }));
      },

      getRestockSuggestions: () => {
        const { restockPredictions } = get();
        return restockPredictions
          .filter(pred => pred.days_until_runout <= 14)
          .sort((a, b) => a.days_until_runout - b.days_until_runout);
      },

      getLowStockItems: () => {
        const { restockPredictions } = get();
        return restockPredictions
          .filter(pred => pred.priority === 'high')
          .sort((a, b) => a.days_until_runout - b.days_until_runout);
      },

      getGroceryRestockPlan: () => {
        const { restockPredictions } = get();
        const groceryItems = restockPredictions.filter(pred => 
          pred.category === 'Groceries' && pred.days_until_runout <= 30
        );

        return {
          thisWeek: groceryItems.filter(item => item.days_until_runout <= 7),
          nextWeek: groceryItems.filter(item => item.days_until_runout > 7 && item.days_until_runout <= 14),
          monthEnd: groceryItems.filter(item => item.days_until_runout > 14 && item.days_until_runout <= 30)
        };
      },

      getPurchaseAnalytics: (days: number) => {
        const { purchaseHistory } = get();
        const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
        const recentPurchases = purchaseHistory.filter(
          purchase => new Date(purchase.purchase_date) >= cutoffDate
        );

        const totalPurchases = recentPurchases.length;
        const totalSpent = recentPurchases.reduce((sum, purchase) => 
          sum + (purchase.price * purchase.quantity), 0
        );
        const averageOrderValue = totalPurchases > 0 ? totalSpent / totalPurchases : 0;

        // Find most frequent category
        const categoryCount: Record<string, number> = {};
        recentPurchases.forEach(purchase => {
          categoryCount[purchase.category] = (categoryCount[purchase.category] || 0) + 1;
        });
        const mostFrequentCategory = Object.entries(categoryCount)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';

        // Calculate consumption trends
        const consumptionTrends: Record<string, { avg_days: number; confidence: number }> = {};
        const productGroups = recentPurchases.reduce((groups, purchase) => {
          if (!groups[purchase.product_id]) {
            groups[purchase.product_id] = [];
          }
          groups[purchase.product_id].push(purchase);
          return groups;
        }, {} as Record<string, PurchaseRecord[]>);

        Object.entries(productGroups).forEach(([productId, purchases]) => {
          if (purchases.length > 1) {
            const sortedPurchases = purchases.sort((a, b) => 
              new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime()
            );
            
            let totalDaysBetween = 0;
            for (let i = 1; i < sortedPurchases.length; i++) {
              const daysBetween = Math.ceil(
                (new Date(sortedPurchases[i].purchase_date).getTime() - 
                 new Date(sortedPurchases[i-1].purchase_date).getTime()) / (24 * 60 * 60 * 1000)
              );
              totalDaysBetween += daysBetween;
            }
            
            const avgDays = totalDaysBetween / (sortedPurchases.length - 1);
            const confidence = Math.min(purchases.length * 0.2, 1.0);
            
            consumptionTrends[productId] = {
              avg_days: Math.round(avgDays),
              confidence
            };
          }
        });

        return {
          totalPurchases,
          totalSpent,
          averageOrderValue,
          mostFrequentCategory,
          consumptionTrends
        };
      }
    }),
    {
      name: 'restock-store',
      partialize: (state) => ({ 
        purchaseHistory: state.purchaseHistory,
        restockPredictions: state.restockPredictions,
        notifications: state.notifications.filter(n => !n.is_read || !n.action_taken)
      })
    }
  )
);
