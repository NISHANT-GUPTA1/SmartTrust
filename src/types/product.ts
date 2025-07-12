
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  freeShipping: boolean;
  inStock: boolean;
  description: string;
  sustainability_score: number;
  eco_friendly: boolean;
  trust_score: number;
  verified_reviews: number;
  ai_recommendations?: string[];
  consumption_rate?: number;
  restock_prediction?: string;
  carbon_footprint?: number;
  bundle_deals?: string[];
  social_proof?: {
    recent_purchases: number;
    trending: boolean;
    community_favorite: boolean;
  };
  alternatives?: {
    cheaper: string[];
    eco_friendly: string[];
    premium: string[];
  };
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  username: string;
  rating: number;
  comment: string;
  trust_weighted_score: number;
  verified_purchase: boolean;
  helpful_votes: number;
  photos?: string[];
  videos?: string[];
  created_at: string;
  user_trust_score: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  trust_score: number;
  verified_buyer: boolean;
  sustainability_score: number;
  total_purchases: number;
  preferences: {
    budget_range: [number, number];
    categories: string[];
    eco_conscious: boolean;
    deal_seeker: boolean;
  };
  shopping_buddy?: {
    id: string;
    username: string;
    similarity_score: number;
  };
  avatar?: string;
}

export interface Cart {
  id: string;
  user_id: string;
  items: CartItem[];
  predicted_items: CartItem[];
  total: number;
  savings: number;
  sustainability_score: number;
  budget_impact: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  predicted?: boolean;
  ai_suggested?: boolean;
  price_at_time: number;
}

export interface ShoppingBuddy {
  id: string;
  username: string;
  avatar?: string;
  trust_score: number;
  similarity_score: number;
  shared_interests: string[];
  active_status: 'online' | 'offline' | 'shopping';
}

export interface SocialCart {
  id: string;
  name: string;
  description: string;
  creator: {
    id: string;
    username: string;
    trust_score: number;
    verified: boolean;
  };
  items: CartItem[];
  total: number;
  followers: number;
  category: string;
  tags: string[];
  created_at: string;
}
