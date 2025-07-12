
// Mock API service to simulate backend functionality
import { Product } from '@/types/product';

export interface User {
  id: string;
  email: string;
  username: string;
  trust_score: number;
  verified_buyer: boolean;
  sustainability_score: number;
  total_purchases: number;
  preferences: any;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  trust_weighted_score: number;
  created_at: string;
  verified_purchase: boolean;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999.99,
    originalPrice: 1199.99,
    image: '/placeholder.svg',
    category: 'Electronics',
    rating: 4.8,
    reviews: 245,
    freeShipping: true,
    inStock: true,
    description: 'Latest iPhone with advanced features',
    sustainability_score: 7.5,
    eco_friendly: true,
    trust_score: 9.2,
    verified_reviews: 185,
    ai_recommendations: ['iPhone 15 Case', 'Wireless Charger', 'AirPods Pro'],
    consumption_rate: 0.1,
    restock_prediction: 'Low stock - reorder in 2 weeks',
    carbon_footprint: 70,
    bundle_deals: ['iPhone + Case Bundle', 'Apple Ecosystem Pack'],
    social_proof: {
      recent_purchases: 45,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['iPhone 14', 'Samsung Galaxy S23'],
      eco_friendly: ['Fairphone 5', 'iPhone SE (Refurbished)'],
      premium: ['iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra']
    }
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: '/placeholder.svg',
    category: 'Clothing',
    rating: 4.6,
    reviews: 128,
    freeShipping: true,
    inStock: true,
    description: 'Comfortable organic cotton t-shirt',
    sustainability_score: 9.2,
    eco_friendly: true,
    trust_score: 8.7,
    verified_reviews: 98,
    ai_recommendations: ['Organic Cotton Jeans', 'Sustainable Sneakers'],
    consumption_rate: 0.3,
    restock_prediction: 'Good stock levels',
    carbon_footprint: 12,
    bundle_deals: ['Organic Wardrobe Bundle'],
    social_proof: {
      recent_purchases: 23,
      trending: false,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Regular Cotton T-Shirt', 'Blend T-Shirt'],
      eco_friendly: ['Hemp T-Shirt', 'Bamboo Fiber T-Shirt'],
      premium: ['Premium Organic Cotton Tee', 'Designer Sustainable Shirt']
    }
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    price: 79.99,
    originalPrice: 99.99,
    image: '/placeholder.svg',
    category: 'Electronics',
    rating: 4.4,
    reviews: 89,
    freeShipping: false,
    inStock: true,
    description: 'High-quality wireless headphones with noise cancellation',
    sustainability_score: 6.8,
    eco_friendly: false,
    trust_score: 7.9,
    verified_reviews: 67,
    ai_recommendations: ['Headphone Stand', 'Audio Cable', 'Carrying Case'],
    consumption_rate: 0.05,
    restock_prediction: 'Stable inventory',
    carbon_footprint: 35,
    bundle_deals: ['Audio Bundle', 'Work From Home Kit'],
    social_proof: {
      recent_purchases: 12,
      trending: false,
      community_favorite: false
    },
    alternatives: {
      cheaper: ['Wired Headphones', 'Basic Wireless Earbuds'],
      eco_friendly: ['Refurbished Headphones', 'Sustainable Audio Gear'],
      premium: ['Premium Noise Cancelling', 'Audiophile Headphones']
    }
  },
  {
    id: '4',
    name: 'Bamboo Kitchen Set',
    price: 45.99,
    image: '/placeholder.svg',
    category: 'Home & Garden',
    rating: 4.7,
    reviews: 156,
    freeShipping: true,
    inStock: true,
    description: 'Eco-friendly bamboo kitchen utensils set',
    sustainability_score: 9.5,
    eco_friendly: true,
    trust_score: 8.9,
    verified_reviews: 134,
    ai_recommendations: ['Bamboo Cutting Board', 'Eco Dish Soap', 'Compost Bin'],
    consumption_rate: 0.02,
    restock_prediction: 'High demand - reorder soon',
    carbon_footprint: 8,
    bundle_deals: ['Sustainable Kitchen Bundle', 'Zero Waste Starter Kit'],
    social_proof: {
      recent_purchases: 31,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Plastic Utensil Set', 'Basic Wood Utensils'],
      eco_friendly: ['Recycled Plastic Set', 'Reclaimed Wood Utensils'],
      premium: ['Premium Bamboo Set', 'Artisan Wooden Utensils']
    }
  }
];

const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  username: 'smartshopper',
  trust_score: 8.5,
  verified_buyer: true,
  sustainability_score: 7.8,
  total_purchases: 25,
  preferences: {}
};

class MockApiService {
  private baseDelay = 500; // Simulate network delay

  private delay(ms: number = this.baseDelay): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    await this.delay();
    if (email === 'user@example.com' && password === 'password') {
      return {
        access_token: 'mock_jwt_token',
        user: mockUser
      };
    }
    throw new Error('Invalid credentials');
  }

  async register(email: string, username: string, password: string): Promise<AuthResponse> {
    await this.delay();
    return {
      access_token: 'mock_jwt_token',
      user: { ...mockUser, email, username }
    };
  }

  async getProfile(): Promise<User> {
    await this.delay();
    return mockUser;
  }

  // Product endpoints
  async getProducts(filters?: any): Promise<Product[]> {
    await this.delay();
    return mockProducts;
  }

  async getProduct(id: string): Promise<Product> {
    await this.delay();
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async getRecommendations(): Promise<Product[]> {
    await this.delay();
    return mockProducts.slice(0, 4); // Return first 4 as recommendations
  }

  // AI Assistant endpoints
  async chatWithAssistant(message: string): Promise<{ response: string }> {
    await this.delay(1000);
    return {
      response: `I understand you're asking about "${message}". Based on your shopping history and preferences, I'd recommend checking out our sustainable products section. Would you like me to show you some eco-friendly alternatives?`
    };
  }

  async getPredictiveCart(): Promise<Product[]> {
    await this.delay();
    return mockProducts.slice(0, 3); // Return first 3 as predicted items
  }

  async getBudgetAnalysis(): Promise<any> {
    await this.delay();
    return {
      monthly_budget: 500,
      current_spending: 320,
      predicted_spending: 450,
      savings_opportunities: [
        { category: 'Groceries', potential_savings: 25 },
        { category: 'Electronics', potential_savings: 50 }
      ]
    };
  }

  async getSustainabilityReport(): Promise<any> {
    await this.delay();
    return {
      carbon_footprint: 2.5,
      eco_score: 7.8,
      green_purchases: 15,
      sustainability_tips: [
        'Consider buying in bulk to reduce packaging',
        'Look for products with minimal packaging'
      ]
    };
  }

  // Community endpoints
  async getTrustLeaders(): Promise<User[]> {
    await this.delay();
    return [mockUser, { ...mockUser, id: '2', username: 'eco_shopper', trust_score: 9.2 }];
  }

  async findShoppingBuddies(): Promise<User[]> {
    await this.delay();
    return [{ ...mockUser, id: '3', username: 'budget_buddy', trust_score: 8.0 }];
  }

  async getActivityFeed(): Promise<any[]> {
    await this.delay();
    return [
      {
        id: '1',
        type: 'review',
        user: 'eco_shopper',
        action: 'left a 5-star review',
        product: 'Organic Cotton T-Shirt',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'purchase',
        user: 'budget_buddy',
        action: 'purchased',
        product: 'iPhone 15 Pro',
        timestamp: new Date().toISOString()
      }
    ];
  }
}

export const mockApiService = new MockApiService();
