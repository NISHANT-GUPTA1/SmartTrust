
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
  // AR-Enabled Clothing Items
  {
    id: 'ar-shirt-1',
    name: 'Premium Cotton T-Shirt - Blue',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Fashion',
    rating: 4.7,
    reviews: 156,
    freeShipping: true,
    inStock: true,
    description: 'Comfortable premium cotton t-shirt with AR try-on capability. See how it fits before you buy!',
    sustainability_score: 8.2,
    eco_friendly: true,
    trust_score: 9.1,
    verified_reviews: 134,
    ai_recommendations: ['Denim Jeans', 'Casual Sneakers', 'Cotton Jacket']
  },
  {
    id: 'ar-dress-1',
    name: 'Elegant Summer Dress - Floral',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
    category: 'Fashion',
    rating: 4.9,
    reviews: 89,
    freeShipping: true,
    inStock: true,
    description: 'Beautiful floral summer dress with virtual try-on. Perfect for any occasion!',
    sustainability_score: 7.8,
    eco_friendly: true,
    trust_score: 9.3,
    verified_reviews: 76,
    ai_recommendations: ['Summer Sandals', 'Sun Hat', 'Light Cardigan']
  },
  {
    id: 'ar-jeans-1',
    name: 'Classic Denim Jeans - Dark Blue',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    category: 'Fashion',
    rating: 4.6,
    reviews: 203,
    freeShipping: true,
    inStock: true,
    description: 'Premium denim jeans with AR fitting technology. Find your perfect fit virtually!',
    sustainability_score: 6.9,
    eco_friendly: false,
    trust_score: 8.8,
    verified_reviews: 167,
    ai_recommendations: ['Leather Belt', 'Casual Shirt', 'Canvas Sneakers']
  },
  // AR-Enabled Furniture Items
  {
    id: 'ar-sofa-1',
    name: 'Modern 3-Seater Sofa - Gray',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    category: 'Home & Garden',
    rating: 4.8,
    reviews: 67,
    freeShipping: true,
    inStock: true,
    description: 'Stylish modern sofa with AR placement feature. See how it fits in your living room!',
    sustainability_score: 7.5,
    eco_friendly: true,
    trust_score: 9.0,
    verified_reviews: 54,
    ai_recommendations: ['Coffee Table', 'Floor Lamp', 'Throw Pillows']
  },
  {
    id: 'ar-table-1',
    name: 'Wooden Dining Table - Oak',
    price: 649.99,
    originalPrice: 849.99,
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400',
    category: 'Home & Garden',
    rating: 4.7,
    reviews: 43,
    freeShipping: true,
    inStock: true,
    description: 'Beautiful oak dining table with AR visualization. Preview it in your dining room!',
    sustainability_score: 9.1,
    eco_friendly: true,
    trust_score: 8.9,
    verified_reviews: 38,
    ai_recommendations: ['Dining Chairs', 'Table Runner', 'Pendant Light']
  },
  {
    id: 'ar-chair-1',
    name: 'Ergonomic Office Chair - Black',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
    category: 'Home & Garden',
    rating: 4.5,
    reviews: 112,
    freeShipping: true,
    inStock: true,
    description: 'Comfortable ergonomic office chair with AR placement. See how it fits in your workspace!',
    sustainability_score: 6.8,
    eco_friendly: false,
    trust_score: 8.7,
    verified_reviews: 89,
    ai_recommendations: ['Desk Pad', 'Monitor Stand', 'Desk Lamp']
  },
  // More AR-Enabled Clothing Items
  {
    id: 'ar-jacket-1',
    name: 'Premium Denim Jacket - Dark Blue',
    price: 119.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    category: 'Fashion',
    rating: 4.8,
    reviews: 92,
    freeShipping: true,
    inStock: true,
    description: 'Classic denim jacket with modern fit. Try it on virtually to see how it looks on you!',
    sustainability_score: 7.3,
    eco_friendly: false,
    trust_score: 9.0,
    verified_reviews: 78,
    ai_recommendations: ['White T-Shirt', 'Black Jeans', 'Casual Sneakers']
  },
  {
    id: 'ar-sneakers-1',
    name: 'Athletic Running Shoes - White',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    category: 'Fashion',
    rating: 4.7,
    reviews: 187,
    freeShipping: true,
    inStock: true,
    description: 'Comfortable athletic shoes perfect for running and casual wear. Use AR to see how they fit!',
    sustainability_score: 6.5,
    eco_friendly: false,
    trust_score: 8.8,
    verified_reviews: 145,
    ai_recommendations: ['Athletic Socks', 'Sports Watch', 'Gym Bag']
  },
  // More AR-Enabled Furniture Items
  {
    id: 'ar-bookshelf-1',
    name: 'Modern Wooden Bookshelf - 5-Tier',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    category: 'Home & Garden',
    rating: 4.6,
    reviews: 73,
    freeShipping: true,
    inStock: true,
    description: 'Elegant 5-tier wooden bookshelf. Use AR to see how it fits in your room space!',
    sustainability_score: 8.7,
    eco_friendly: true,
    trust_score: 8.9,
    verified_reviews: 61,
    ai_recommendations: ['Desk Lamp', 'Storage Boxes', 'Decorative Plants']
  },
  {
    id: 'ar-lamp-1',
    name: 'Modern Floor Lamp - Brass Finish',
    price: 179.99,
    originalPrice: 229.99,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    category: 'Home & Garden',
    rating: 4.5,
    reviews: 56,
    freeShipping: true,
    inStock: true,
    description: 'Stylish modern floor lamp with brass finish. Visualize it in your living space with AR!',
    sustainability_score: 7.1,
    eco_friendly: false,
    trust_score: 8.6,
    verified_reviews: 42,
    ai_recommendations: ['Light Bulbs', 'Side Table', 'Floor Rug']
  },
  // Regular Products
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Clothing',
    rating: 4.6,
    reviews: 128,
    freeShipping: true,
    inStock: true,
    description: 'Comfortable organic cotton t-shirt with AR try-on capability',
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
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Regular Cotton T-Shirt', 'Blend T-Shirt'],
      eco_friendly: ['Hemp T-Shirt', 'Bamboo Fiber T-Shirt'],
      premium: ['Premium Organic Cotton Tee', 'Designer Sustainable Shirt']
    }
  },
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
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
    id: 'wireless-headphones',
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    price: 279.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    rating: 4.6,
    reviews: 15234,
    freeShipping: true,
    inStock: true,
    description: 'Premium wireless headphones with industry-leading noise cancellation',
    sustainability_score: 8.2,
    eco_friendly: true,
    trust_score: 9.1,
    verified_reviews: 12890,
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
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
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
