import { useRestockStore } from '@/store/restockStore';

// Sample grocery products for demonstration
const sampleGroceries = [
  {
    id: 'grocery-1',
    name: 'Organic Whole Milk - 1 Gallon',
    price: 4.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.5,
    reviews: 150,
    freeShipping: false,
    inStock: true,
    description: 'Fresh organic whole milk',
    sustainability_score: 0.8,
    eco_friendly: true,
    trust_score: 8.5,
    verified_reviews: 120
  },
  {
    id: 'grocery-2',
    name: 'Free Range Eggs - 12 Count',
    price: 3.49,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.7,
    reviews: 200,
    freeShipping: false,
    inStock: true,
    description: 'Fresh free-range eggs',
    sustainability_score: 0.9,
    eco_friendly: true,
    trust_score: 8.8,
    verified_reviews: 180
  },
  {
    id: 'grocery-3',
    name: 'Whole Grain Bread - 24oz',
    price: 2.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.3,
    reviews: 89,
    freeShipping: false,
    inStock: true,
    description: 'Healthy whole grain bread',
    sustainability_score: 0.7,
    eco_friendly: false,
    trust_score: 8.2,
    verified_reviews: 70
  },
  {
    id: 'grocery-4',
    name: 'Bananas - 3 lbs',
    price: 1.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.4,
    reviews: 120,
    freeShipping: false,
    inStock: true,
    description: 'Fresh bananas',
    sustainability_score: 0.8,
    eco_friendly: true,
    trust_score: 8.6,
    verified_reviews: 100
  },
  {
    id: 'grocery-5',
    name: 'Greek Yogurt - 32oz',
    price: 5.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.6,
    reviews: 180,
    freeShipping: false,
    inStock: true,
    description: 'Protein-rich Greek yogurt',
    sustainability_score: 0.7,
    eco_friendly: false,
    trust_score: 8.4,
    verified_reviews: 150
  },
  {
    id: 'grocery-6',
    name: 'Organic Coffee Beans - 12oz',
    price: 12.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.8,
    reviews: 250,
    freeShipping: true,
    inStock: true,
    description: 'Premium organic coffee beans',
    sustainability_score: 0.9,
    eco_friendly: true,
    trust_score: 9.1,
    verified_reviews: 220
  },
  {
    id: 'grocery-7',
    name: 'Chicken Breast - 2 lbs',
    price: 8.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.5,
    reviews: 180,
    freeShipping: false,
    inStock: true,
    description: 'Fresh chicken breast',
    sustainability_score: 0.6,
    eco_friendly: false,
    trust_score: 8.3,
    verified_reviews: 150
  },
  {
    id: 'grocery-8',
    name: 'Baby Spinach - 5oz',
    price: 3.99,
    image: '/api/placeholder/100/100',
    category: 'Groceries',
    rating: 4.4,
    reviews: 95,
    freeShipping: false,
    inStock: true,
    description: 'Fresh baby spinach',
    sustainability_score: 0.9,
    eco_friendly: true,
    trust_score: 8.5,
    verified_reviews: 80
  },
  {
    id: 'household-1',
    name: 'Laundry Detergent - 100oz',
    price: 11.99,
    image: '/api/placeholder/100/100',
    category: 'Household',
    rating: 4.6,
    reviews: 300,
    freeShipping: true,
    inStock: true,
    description: 'High-efficiency laundry detergent',
    sustainability_score: 0.7,
    eco_friendly: false,
    trust_score: 8.7,
    verified_reviews: 250
  },
  {
    id: 'health-1',
    name: 'Vitamin D3 - 60 tablets',
    price: 15.99,
    image: '/api/placeholder/100/100',
    category: 'Health & Beauty',
    rating: 4.7,
    reviews: 200,
    freeShipping: true,
    inStock: true,
    description: 'Daily vitamin D3 supplement',
    sustainability_score: 0.8,
    eco_friendly: true,
    trust_score: 8.9,
    verified_reviews: 180
  }
];

/**
 * Generate purchase history for different timeframes
 * @param timeframe - 'week' | 'month' | 'quarter'
 */
const generateTimeframeData = (timeframe: 'week' | 'month' | 'quarter') => {
  const now = new Date();
  
  // Different products and patterns for different timeframes
  let productsToUse = sampleGroceries;
  let purchasePatterns: { daysAgo: number[]; quantities: number[] }[] = [];
  
  switch (timeframe) {
    case 'week':
      // Last 7 days - recent purchases only
      productsToUse = sampleGroceries.slice(0, 4); // Milk, Eggs, Bread, Bananas
      purchasePatterns = [
        { daysAgo: [6, 2], quantities: [1, 1] }, // Milk - twice this week
        { daysAgo: [5], quantities: [2] }, // Eggs - once
        { daysAgo: [4, 1], quantities: [1, 1] }, // Bread - twice
        { daysAgo: [3], quantities: [3] }, // Bananas - once
      ];
      break;
      
    case 'month':
      // Last 30 days - regular shopping pattern
      productsToUse = sampleGroceries.slice(0, 8);
      purchasePatterns = [
        { daysAgo: [25, 18, 11, 4], quantities: [1, 1, 1, 1] }, // Milk - weekly
        { daysAgo: [24, 14, 7, 2], quantities: [2, 2, 2, 2] }, // Eggs - bi-weekly
        { daysAgo: [23, 18, 13, 8, 3], quantities: [1, 1, 1, 1, 1] }, // Bread - frequent
        { daysAgo: [22, 15, 8, 1], quantities: [3, 3, 3, 3] }, // Bananas - weekly
        { daysAgo: [20, 12, 5], quantities: [1, 1, 1] }, // Yogurt - bi-weekly
        { daysAgo: [26, 12], quantities: [1, 1] }, // Coffee - bi-weekly
        { daysAgo: [21, 14, 7], quantities: [2, 2, 2] }, // Chicken - weekly
        { daysAgo: [19, 12, 5], quantities: [1, 1, 1] }, // Spinach - frequent
      ];
      break;
      
    case 'quarter':
      // Last 90 days - extensive history
      productsToUse = sampleGroceries; // All products
      purchasePatterns = [
        { daysAgo: [85, 78, 71, 64, 57, 50, 43, 36, 29, 22, 15, 8, 1], quantities: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }, // Milk - weekly
        { daysAgo: [84, 74, 64, 54, 44, 34, 24, 14, 4], quantities: [2, 2, 2, 2, 2, 2, 2, 2, 2] }, // Eggs - every 10 days
        { daysAgo: [83, 78, 73, 68, 63, 58, 53, 48, 43, 38, 33, 28, 23, 18, 13, 8, 3], quantities: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }, // Bread - twice weekly
        { daysAgo: [82, 75, 68, 61, 54, 47, 40, 33, 26, 19, 12, 5], quantities: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] }, // Bananas - weekly
        { daysAgo: [80, 70, 60, 50, 40, 30, 20, 10], quantities: [1, 1, 1, 1, 1, 1, 1, 1] }, // Yogurt - every 10 days
        { daysAgo: [86, 72, 58, 44, 30, 16, 2], quantities: [1, 1, 1, 1, 1, 1, 1] }, // Coffee - bi-weekly
        { daysAgo: [81, 74, 67, 60, 53, 46, 39, 32, 25, 18, 11, 4], quantities: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] }, // Chicken - weekly
        { daysAgo: [79, 72, 65, 58, 51, 44, 37, 30, 23, 16, 9, 2], quantities: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }, // Spinach - weekly
        { daysAgo: [77, 47, 17], quantities: [1, 1, 1] }, // Detergent - monthly
        { daysAgo: [70, 40, 10], quantities: [1, 1, 1] }, // Vitamins - monthly
      ];
      break;
  }
  
  // Add purchases based on patterns
  const storeAPI = useRestockStore.getState();
  
  productsToUse.forEach((product, index) => {
    const pattern = purchasePatterns[index];
    if (pattern) {
      pattern.daysAgo.forEach((daysAgo, purchaseIndex) => {
        const purchaseDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
        
        const quantity = pattern.quantities[purchaseIndex] || 1;
        
        // Add purchase with the correct date
        storeAPI.addPurchase(product, quantity);
        
        // Update the purchase date in the last added record
        const updatedHistory = [...storeAPI.purchaseHistory];
        if (updatedHistory.length > 0) {
          const lastPurchase = updatedHistory[updatedHistory.length - 1];
          lastPurchase.purchase_date = purchaseDate.toISOString();
          
          // Update store with corrected history
          useRestockStore.setState({ purchaseHistory: updatedHistory });
        }
      });
    }
  });
  
  return productsToUse.length;
};

/**
 * Utility function to create sample purchase history for demonstration
 * This simulates purchases made over the past few weeks
 */
export const seedSamplePurchaseHistory = (timeframe: 'week' | 'month' | 'quarter' = 'month') => {
  console.log(`🎯 Loading demo data for timeframe: ${timeframe}`);
  
  // Clear existing purchase history for demo
  useRestockStore.setState({ purchaseHistory: [], restockPredictions: [], notifications: [] });
  
  // Generate data based on timeframe
  const productCount = generateTimeframeData(timeframe);
  
  console.log(`✅ Generated ${productCount} products for ${timeframe} timeframe`);
  
  // Add some consumption feedback for completed items
  setTimeout(() => {
    const { purchaseHistory, updateConsumptionRate } = useRestockStore.getState();
    
    console.log(`📊 Processing ${purchaseHistory.length} purchase records`);
    
    // Simulate that milk lasted 6 days instead of estimated 7
    const milkPurchases = purchaseHistory.filter(p => p.product_name.includes('Milk'));
    if (milkPurchases.length > 0) {
      updateConsumptionRate(milkPurchases[0].product_id, 6);
      console.log('🥛 Updated milk consumption rate');
    }
    
    // Simulate that bread lasted 4 days instead of estimated 5
    const breadPurchases = purchaseHistory.filter(p => p.product_name.includes('Bread'));
    if (breadPurchases.length > 0) {
      updateConsumptionRate(breadPurchases[0].product_id, 4);
      console.log('🍞 Updated bread consumption rate');
    }
    
    // Simulate that coffee lasted 16 days instead of estimated 14
    const coffeePurchases = purchaseHistory.filter(p => p.product_name.includes('Coffee'));
    if (coffeePurchases.length > 0) {
      updateConsumptionRate(coffeePurchases[0].product_id, 16);
      console.log('☕ Updated coffee consumption rate');
    }
  }, 200);
  
  // Generate predictions after seeding data and add urgent item
  setTimeout(() => {
    const storeAPI = useRestockStore.getState();
    storeAPI.generateRestockPredictions();
    console.log('🔮 Generated restock predictions');
    
    // Add an urgent item - make milk urgent by setting last purchase to 6 days ago
    const milkProduct = sampleGroceries.find(p => p.name.includes('Milk'));
    if (milkProduct) {
      const urgentDate = new Date();
      urgentDate.setDate(urgentDate.getDate() - 6); // 6 days ago
      
      // Add urgent milk purchase
      storeAPI.addPurchase(milkProduct, 1);
      
      // Update the last purchase to be urgent
      const currentHistory = storeAPI.purchaseHistory;
      if (currentHistory.length > 0) {
        const lastPurchase = currentHistory[currentHistory.length - 1];
        lastPurchase.purchase_date = urgentDate.toISOString();
        lastPurchase.estimated_consumption_days = 5; // Short consumption period
        
        useRestockStore.setState({ 
          purchaseHistory: [...currentHistory]
        });
        
        // Regenerate predictions to include urgent item
        setTimeout(() => {
          storeAPI.generateRestockPredictions();
          console.log('🚨 Added urgent restock item: Milk');
        }, 100);
      }
    }
  }, 400);
  
  console.log(`🎉 Demo data loading complete for ${timeframe}`);
};
