import { create } from 'zustand';
import { Product, Cart, CartItem } from '@/types/product';

interface PredictiveCart {
  suggested_items: CartItem[];
  confidence_scores: Record<string, number>;
  reasoning: Record<string, string>;
}

interface BudgetAnalysis {
  monthly_budget: number;
  current_spending: number;
  predicted_spending: number;
  savings_opportunities: Array<{
    category: string;
    potential_savings: number;
    suggestion: string;
  }>;
  budget_alerts: string[];
  category_breakdown: Record<string, number>;
  top_items: Array<{ name: string; total: string }>;
}

interface SustainabilityReport {
  carbon_footprint: number;
  eco_score: number;
  green_purchases: number;
  sustainability_tips: string[];
  environmental_impact: {
    co2_saved: number;
    trees_planted_equivalent: number;
    plastic_reduced: number;
  };
}

interface AIStore {
  predictiveCart: PredictiveCart;
  budgetAnalysis: BudgetAnalysis;
  sustainabilityReport: SustainabilityReport;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>;
  isLoading: boolean;
  generatePredictiveCart: (currentCart: Cart, userPreferences: any) => Promise<void>;
  getBudgetAnalysis: (userId: string) => Promise<void>;
  getSustainabilityReport: (userId: string) => Promise<void>;
  chatWithAI: (message: string) => Promise<string>;
  getProductRecommendations: (productId: string) => Promise<Product[]>;
  getSmartAlternatives: (productId: string, type: 'cheaper' | 'eco_friendly' | 'premium') => Promise<Product[]>;
}

export const useAIStore = create<AIStore>((set, get) => ({
  predictiveCart: {
    suggested_items: [],
    confidence_scores: {},
    reasoning: {}
  },
  budgetAnalysis: {
    monthly_budget: 0,
    current_spending: 0,
    predicted_spending: 0,
    savings_opportunities: [],
    budget_alerts: [],
    category_breakdown: {},
    top_items: []
  },
  sustainabilityReport: {
    carbon_footprint: 0,
    eco_score: 0,
    green_purchases: 0,
    sustainability_tips: [],
    environmental_impact: {
      co2_saved: 0,
      trees_planted_equivalent: 0,
      plastic_reduced: 0
    }
  },
  chatHistory: [
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m your AI Shopping Assistant. I can help you with:\n\n• Budget analysis and spending insights\n• Product recommendations\n• Sustainability tips\n• Navigation to different sections\n\nTry asking me about your budget, eco-friendly products, or say "go to profile" to navigate!',
      timestamp: new Date().toISOString()
    }
  ],
  isLoading: false,

  generatePredictiveCart: async (currentCart: Cart, userPreferences: any) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Expanded mock product pool
    const allProducts: Product[] = [
      {
        id: 'pred-1',
        name: 'Organic Milk - 1 Gallon',
        price: 4.99,
        image: '/api/placeholder/100/100',
        category: 'Groceries',
        rating: 4.3,
        reviews: 245,
        freeShipping: false,
        inStock: true,
        description: 'Fresh organic milk',
        sustainability_score: 8.5,
        eco_friendly: true,
        trust_score: 8.2,
        verified_reviews: 198
      },
      {
        id: 'pred-2',
        name: 'Whole Grain Bread',
        price: 3.49,
        image: '/api/placeholder/100/100',
        category: 'Groceries',
        rating: 4.1,
        reviews: 156,
        freeShipping: false,
        inStock: true,
        description: 'Healthy whole grain bread',
        sustainability_score: 7.8,
        eco_friendly: true,
        trust_score: 7.9,
        verified_reviews: 134
      },
      {
        id: 'pred-3',
        name: 'Wireless Headphones',
        price: 79.99,
        image: '/api/placeholder/100/100',
        category: 'Electronics',
        rating: 4.7,
        reviews: 1023,
        freeShipping: true,
        inStock: true,
        description: 'Noise-cancelling headphones',
        sustainability_score: 6.2,
        eco_friendly: false,
        trust_score: 8.8,
        verified_reviews: 900
      },
      {
        id: 'pred-4',
        name: 'EcoSmart LED Bulbs',
        price: 19.99,
        image: '/api/placeholder/100/100',
        category: 'Eco-friendly',
        rating: 4.8,
        reviews: 312,
        freeShipping: true,
        inStock: true,
        description: 'Energy-saving LED bulbs',
        sustainability_score: 9.1,
        eco_friendly: true,
        trust_score: 9.0,
        verified_reviews: 300
      },
      {
        id: 'pred-5',
        name: 'Organic Cotton T-Shirt',
        price: 24.99,
        image: '/api/placeholder/100/100',
        category: 'Fashion',
        rating: 4.5,
        reviews: 210,
        freeShipping: true,
        inStock: true,
        description: 'Sustainable fashion',
        sustainability_score: 8.7,
        eco_friendly: true,
        trust_score: 8.5,
        verified_reviews: 180
      },
      {
        id: 'pred-6',
        name: 'Bamboo Kitchen Set',
        price: 45.99,
        image: '/api/placeholder/100/100',
        category: 'Home & Garden',
        rating: 4.6,
        reviews: 320,
        freeShipping: true,
        inStock: true,
        description: 'Eco-friendly kitchen essentials',
        sustainability_score: 9.0,
        eco_friendly: true,
        trust_score: 8.9,
        verified_reviews: 300
      },
      {
        id: 'pred-7',
        name: 'Premium Coffee',
        price: 18.99,
        image: '/api/placeholder/100/100',
        category: 'Groceries',
        rating: 4.9,
        reviews: 500,
        freeShipping: false,
        inStock: true,
        description: 'Rich, aromatic coffee beans',
        sustainability_score: 7.0,
        eco_friendly: false,
        trust_score: 8.0,
        verified_reviews: 450
      },
      {
        id: 'pred-8',
        name: 'Yoga Mat',
        price: 29.99,
        image: '/api/placeholder/100/100',
        category: 'Sports',
        rating: 4.7,
        reviews: 210,
        freeShipping: true,
        inStock: true,
        description: 'Non-slip, eco-friendly yoga mat',
        sustainability_score: 8.0,
        eco_friendly: true,
        trust_score: 8.6,
        verified_reviews: 200
      },
      {
        id: 'pred-9',
        name: 'Kids Toy Car',
        price: 14.99,
        image: '/api/placeholder/100/100',
        category: 'Toys',
        rating: 4.2,
        reviews: 180,
        freeShipping: false,
        inStock: true,
        description: 'Fun and safe toy car for kids',
        sustainability_score: 6.5,
        eco_friendly: false,
        trust_score: 7.5,
        verified_reviews: 150
      },
    ];

    // Smarter filter logic
    let filtered = allProducts;
    if (userPreferences.categories && userPreferences.categories.length > 0) {
      filtered = filtered.filter(p => userPreferences.categories.includes(p.category));
    }
    if (userPreferences.ecoFriendly) {
      filtered = filtered.filter(p => p.eco_friendly);
    }
    if (userPreferences.budget) {
      filtered = filtered.filter(p => p.price <= userPreferences.budget);
    }
    // Sort by trust_score, eco_friendly, and rating
    filtered = filtered.sort((a, b) => b.trust_score - a.trust_score || Number(b.eco_friendly) - Number(a.eco_friendly) || b.rating - a.rating);
    // Pick top 2-3 suggestions
    const suggestions = filtered.slice(0, 3).map((product, idx) => ({
      product,
      quantity: 1,
      predicted: true,
      ai_suggested: true,
      price_at_time: product.price
    }));
    // Confidence and reasoning
    const confidence_scores: Record<string, number> = {};
    const reasoning: Record<string, string> = {};
    suggestions.forEach((item, idx) => {
      confidence_scores[item.product.id] = 0.8 - idx * 0.1 + Math.random() * 0.1;
      reasoning[item.product.id] = `Recommended based on your preferences: ${item.product.category}${item.product.eco_friendly ? ', eco-friendly' : ''}${item.product.price <= (userPreferences.budget || 10000) ? ', fits your budget' : ''}.`;
    });

    set({
      predictiveCart: {
        suggested_items: suggestions,
        confidence_scores,
        reasoning
      },
      isLoading: false
    });
  },

  getBudgetAnalysis: async (userId: string) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Get cart items from cartStore (mocked for demo)
    const cartItems = [
      { id: '1', name: 'Organic Milk', price: 4.99, category: 'Groceries', quantity: 2 },
      { id: '2', name: 'Wireless Headphones', price: 79.99, category: 'Electronics', quantity: 1 },
      { id: '3', name: 'Bamboo Kitchen Set', price: 45.99, category: 'Home & Garden', quantity: 1 },
      { id: '4', name: 'Premium Coffee', price: 18.99, category: 'Groceries', quantity: 1 }
    ];

    // Calculate spending by category
    const categoryTotals: Record<string, number> = {};
    cartItems.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.price * item.quantity;
    });

    // Find top 3 costliest items
    const topItems = [...cartItems]
      .sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity))
      .slice(0, 3)
      .map(item => ({ name: item.name, total: (item.price * item.quantity).toFixed(2) }));

    // Mock suggestions
    const savings_opportunities = [
      ...cartItems.filter(item => item.category === 'Groceries').map(item => ({
        category: 'Groceries',
        potential_savings: Number((item.price * 0.15 * item.quantity).toFixed(2)),
        suggestion: `Switch to store brand for ${item.name} (save 15%)`
      })),
      ...cartItems.filter(item => item.category === 'Electronics').map(item => ({
        category: 'Electronics',
        potential_savings: Number((item.price * 0.2 * item.quantity).toFixed(2)),
        suggestion: `Wait for a sale on ${item.name} (save 20%)`
      })),
      ...cartItems.filter(item => item.price > 40).map(item => ({
        category: item.category,
        potential_savings: Number((item.price * 0.1 * item.quantity).toFixed(2)),
        suggestion: `Consider a cheaper alternative for ${item.name} (save 10%)`
      }))
    ];

    // Remove duplicate suggestions
    const uniqueSuggestions = Array.from(new Map(savings_opportunities.map(s => [s.suggestion, s])).values());

    // Budget alerts
    const monthly_budget = 800;
    const current_spending = 534;
    const predicted_spending = 720;
    const budget_alerts = [];
    if (predicted_spending > monthly_budget) {
      budget_alerts.push(`You're on track to exceed your monthly budget by $${predicted_spending - monthly_budget}`);
    }
    if (categoryTotals['Electronics'] > 100) {
      budget_alerts.push('High spending detected in Electronics. Consider waiting for sales or using coupons.');
    }

    set({
      budgetAnalysis: {
        monthly_budget,
        current_spending,
        predicted_spending,
        savings_opportunities: uniqueSuggestions,
        budget_alerts,
        category_breakdown: categoryTotals,
        top_items: topItems
      },
      isLoading: false
    });
  },

  getSustainabilityReport: async (userId: string) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set({
      sustainabilityReport: {
        carbon_footprint: 2.3,
        eco_score: 7.8,
        green_purchases: 18,
        sustainability_tips: [
          'Consider buying in bulk to reduce packaging waste',
          'Look for products with minimal or recyclable packaging',
          'Choose local products to reduce transportation emissions',
          'Opt for durable goods that last longer'
        ],
        environmental_impact: {
          co2_saved: 15.6,
          trees_planted_equivalent: 3.2,
          plastic_reduced: 8.9
        }
      },
      isLoading: false
    });
  },

  chatWithAI: async (message: string) => {
    // Add user message to chat history
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    set(state => ({
      chatHistory: [...state.chatHistory, userMessage]
    }));

    // Simple intent parser for redirection
    const lower = message.toLowerCase();
    let aiResponse = '';
    
    if (lower.includes('profile') || lower.includes('go to profile')) {
      aiResponse = 'NAVIGATE:/profile';
    } else if (lower.includes('cart') || lower.includes('show cart')) {
      aiResponse = 'NAVIGATE:/cart';
    } else if (lower.includes('community') || lower.includes('go to community')) {
      aiResponse = 'NAVIGATE:/community';
    } else if (lower.includes('home') || lower.includes('go home')) {
      aiResponse = 'NAVIGATE:/';
    } else if (lower.includes('ai assistant') || lower.includes('ai shopping')) {
      aiResponse = 'NAVIGATE:/ai-assistant';
    } else if (lower.includes('budget') || lower.includes('spending')) {
      aiResponse = 'I can help you with budget analysis! Your current spending is $534 with a monthly budget of $800. You have $266 remaining this month. Would you like me to show you some savings opportunities?';
    } else if (lower.includes('eco') || lower.includes('sustainable') || lower.includes('green')) {
      aiResponse = 'Great question about sustainability! Your current eco-score is 7.8/10. I recommend checking out our eco-friendly products and considering bulk purchases to reduce packaging waste.';
    } else if (lower.includes('recommend') || lower.includes('suggestion')) {
      aiResponse = 'Based on your preferences, I recommend checking out our eco-friendly products and electronics deals. Would you like me to show you specific recommendations?';
    } else if (lower.includes('hello') || lower.includes('hi')) {
      aiResponse = 'Hello! I\'m your AI Shopping Assistant. I can help you with budget analysis, product recommendations, sustainability tips, and navigation. What would you like to know?';
    } else {
      // Default mock AI response
      aiResponse = 'Here\'s a smart tip: Always check for eco-friendly alternatives and trending deals! I can also help you navigate to different sections of the app.';
    }

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 600));

    // Add AI response to chat history
    const aiMessage = {
      role: 'assistant' as const,
      content: aiResponse,
      timestamp: new Date().toISOString()
    };

    set(state => ({
      chatHistory: [...state.chatHistory, aiMessage]
    }));

    return aiResponse;
  },

  getProductRecommendations: async (productId: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock recommendations based on product
    return [
      {
        id: 'rec-1',
        name: 'Recommended Product 1',
        price: 29.99,
        image: '/api/placeholder/200/200',
        category: 'Electronics',
        rating: 4.5,
        reviews: 123,
        freeShipping: true,
        inStock: true,
        description: 'AI recommended based on your preferences',
        sustainability_score: 8.0,
        eco_friendly: true,
        trust_score: 8.5,
        verified_reviews: 98
      }
    ];
  },

  getSmartAlternatives: async (productId: string, type: 'cheaper' | 'eco_friendly' | 'premium') => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock alternatives
    return [
      {
        id: `alt-${type}-1`,
        name: `${type} Alternative Product`,
        price: type === 'cheaper' ? 19.99 : type === 'premium' ? 99.99 : 39.99,
        image: '/api/placeholder/200/200',
        category: 'Electronics',
        rating: 4.3,
        reviews: 89,
        freeShipping: true,
        inStock: true,
        description: `${type} alternative with great features`,
        sustainability_score: type === 'eco_friendly' ? 9.5 : 6.5,
        eco_friendly: type === 'eco_friendly',
        trust_score: 8.0,
        verified_reviews: 76
      }
    ];
  }
}));