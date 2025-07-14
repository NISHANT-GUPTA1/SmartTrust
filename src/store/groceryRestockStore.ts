import { create } from 'zustand';
import { Product } from '@/types/product';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  lastPurchased: string;
  purchaseFrequency: number; // in days
  averageQuantity: number;
  currentStock: number;
  estimatedConsumptionRate: number; // items per day
  restockThreshold: number; // days before running out
  isSubscribed: boolean;
}

interface RestockSuggestion {
  item: GroceryItem;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  daysRemaining: number;
  suggestedQuantity: number;
  estimatedRunOutDate: string;
  reason: string;
  confidence: number;
}

interface PurchaseHistory {
  itemId: string;
  date: string;
  quantity: number;
  price: number;
}

interface GroceryRestockStore {
  groceryItems: GroceryItem[];
  restockSuggestions: RestockSuggestion[];
  purchaseHistory: PurchaseHistory[];
  autoRestockEnabled: boolean;
  
  // Actions
  addGroceryItem: (product: Product, quantity: number) => void;
  updateStock: (itemId: string, newStock: number) => void;
  recordPurchase: (itemId: string, quantity: number, price: number) => void;
  generateRestockSuggestions: () => void;
  toggleAutoRestock: () => void;
  dismissSuggestion: (itemId: string) => void;
  acceptSuggestion: (itemId: string) => void;
  
  // Utility functions
  getUrgentSuggestions: () => RestockSuggestion[];
  getItemsByCategory: (category: string) => GroceryItem[];
  getUpcomingExpirations: () => RestockSuggestion[];
}

const calculatePurchaseFrequency = (history: PurchaseHistory[]): number => {
  if (history.length < 2) return 30; // Default to monthly
  
  const sortedHistory = history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const intervals = [];
  
  for (let i = 1; i < sortedHistory.length; i++) {
    const prevDate = new Date(sortedHistory[i - 1].date);
    const currDate = new Date(sortedHistory[i].date);
    const daysDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
    intervals.push(daysDiff);
  }
  
  return intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
};

const calculateConsumptionRate = (history: PurchaseHistory[], frequency: number): number => {
  if (history.length === 0) return 1; // Default to 1 item per day
  
  const totalQuantity = history.reduce((sum, purchase) => sum + purchase.quantity, 0);
  const totalDays = history.length * frequency;
  
  return totalQuantity / totalDays;
};

export const useGroceryRestockStore = create<GroceryRestockStore>((set, get) => ({
  groceryItems: [
    // Sample grocery items with realistic data
    {
      id: 'milk-1',
      name: 'Organic Whole Milk',
      category: 'Dairy',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100',
      lastPurchased: '2025-06-15',
      purchaseFrequency: 7, // Weekly
      averageQuantity: 2,
      currentStock: 1,
      estimatedConsumptionRate: 0.3,
      restockThreshold: 2,
      isSubscribed: false,
    },
    {
      id: 'bread-1',
      name: 'Whole Grain Bread',
      category: 'Bakery',
      price: 3.49,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100',
      lastPurchased: '2025-06-20',
      purchaseFrequency: 5,
      averageQuantity: 1,
      currentStock: 0,
      estimatedConsumptionRate: 0.2,
      restockThreshold: 1,
      isSubscribed: true,
    },
    {
      id: 'eggs-1',
      name: 'Farm Fresh Eggs (12 count)',
      category: 'Dairy',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=100',
      lastPurchased: '2025-06-10',
      purchaseFrequency: 14,
      averageQuantity: 1,
      currentStock: 0,
      estimatedConsumptionRate: 0.07,
      restockThreshold: 3,
      isSubscribed: false,
    },
    {
      id: 'bananas-1',
      name: 'Organic Bananas (1 lb)',
      category: 'Produce',
      price: 1.29,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100',
      lastPurchased: '2025-06-18',
      purchaseFrequency: 4,
      averageQuantity: 2,
      currentStock: 1,
      estimatedConsumptionRate: 0.5,
      restockThreshold: 1,
      isSubscribed: false,
    },
    {
      id: 'pasta-1',
      name: 'Whole Wheat Pasta',
      category: 'Pantry',
      price: 2.49,
      image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=100',
      lastPurchased: '2025-05-25',
      purchaseFrequency: 21,
      averageQuantity: 3,
      currentStock: 1,
      estimatedConsumptionRate: 0.15,
      restockThreshold: 5,
      isSubscribed: false,
    },
  ],
  
  restockSuggestions: [],
  purchaseHistory: [],
  autoRestockEnabled: true,

  addGroceryItem: (product: Product, quantity: number) => {
    const groceryItems = get().groceryItems;
    const existingItem = groceryItems.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        groceryItems: groceryItems.map(item =>
          item.id === product.id
            ? { 
                ...item, 
                currentStock: item.currentStock + quantity,
                lastPurchased: new Date().toISOString().split('T')[0]
              }
            : item
        )
      });
    } else {
      const newGroceryItem: GroceryItem = {
        id: product.id,
        name: product.name,
        category: product.category || 'General',
        price: product.price,
        image: product.image,
        lastPurchased: new Date().toISOString().split('T')[0],
        purchaseFrequency: 30, // Default monthly
        averageQuantity: quantity,
        currentStock: quantity,
        estimatedConsumptionRate: quantity / 30,
        restockThreshold: 3,
        isSubscribed: false,
      };
      
      set({
        groceryItems: [...groceryItems, newGroceryItem]
      });
    }
    
    get().recordPurchase(product.id, quantity, product.price);
    get().generateRestockSuggestions();
  },

  updateStock: (itemId: string, newStock: number) => {
    set({
      groceryItems: get().groceryItems.map(item =>
        item.id === itemId ? { ...item, currentStock: newStock } : item
      )
    });
    get().generateRestockSuggestions();
  },

  recordPurchase: (itemId: string, quantity: number, price: number) => {
    const newPurchase: PurchaseHistory = {
      itemId,
      date: new Date().toISOString().split('T')[0],
      quantity,
      price,
    };
    
    set({
      purchaseHistory: [...get().purchaseHistory, newPurchase]
    });
  },

  generateRestockSuggestions: () => {
    const groceryItems = get().groceryItems;
    const suggestions: RestockSuggestion[] = [];
    
    groceryItems.forEach(item => {
      const daysRemaining = item.currentStock / item.estimatedConsumptionRate;
      
      if (daysRemaining <= item.restockThreshold) {
        let urgency: 'low' | 'medium' | 'high' | 'critical';
        let reason: string;
        
        if (daysRemaining <= 0) {
          urgency = 'critical';
          reason = `You're out of ${item.name}! Order now to avoid running out.`;
        } else if (daysRemaining <= 1) {
          urgency = 'high';
          reason = `Only ${Math.ceil(daysRemaining)} day left of ${item.name}. Order today.`;
        } else if (daysRemaining <= 3) {
          urgency = 'medium';
          reason = `${Math.ceil(daysRemaining)} days remaining of ${item.name}. Consider restocking soon.`;
        } else {
          urgency = 'low';
          reason = `${Math.ceil(daysRemaining)} days left of ${item.name}. Plan ahead.`;
        }
        
        const estimatedRunOutDate = new Date();
        estimatedRunOutDate.setDate(estimatedRunOutDate.getDate() + Math.ceil(daysRemaining));
        
        suggestions.push({
          item,
          urgency,
          daysRemaining: Math.max(0, Math.ceil(daysRemaining)),
          suggestedQuantity: item.averageQuantity,
          estimatedRunOutDate: estimatedRunOutDate.toISOString().split('T')[0],
          reason,
          confidence: Math.min(95, 60 + (groceryItems.length * 5)), // Higher confidence with more data
        });
      }
    });
    
    // Sort by urgency and days remaining
    suggestions.sort((a, b) => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const urgencyDiff = urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;
      return a.daysRemaining - b.daysRemaining;
    });
    
    set({ restockSuggestions: suggestions });
  },

  toggleAutoRestock: () => {
    set({ autoRestockEnabled: !get().autoRestockEnabled });
  },

  dismissSuggestion: (itemId: string) => {
    set({
      restockSuggestions: get().restockSuggestions.filter(
        suggestion => suggestion.item.id !== itemId
      )
    });
  },

  acceptSuggestion: (itemId: string) => {
    const suggestion = get().restockSuggestions.find(s => s.item.id === itemId);
    if (suggestion) {
      // Add to cart logic would go here
      get().dismissSuggestion(itemId);
    }
  },

  getUrgentSuggestions: () => {
    return get().restockSuggestions.filter(
      suggestion => suggestion.urgency === 'critical' || suggestion.urgency === 'high'
    );
  },

  getItemsByCategory: (category: string) => {
    return get().groceryItems.filter(item => item.category === category);
  },

  getUpcomingExpirations: () => {
    return get().restockSuggestions.filter(
      suggestion => suggestion.daysRemaining <= 7
    );
  },
}));
