import { create } from 'zustand';
import { User, Review, ShoppingBuddy } from '@/types/product';

interface CommunityStore {
  currentUser: User | null;
  shoppingBuddies: ShoppingBuddy[];
  trustLeaders: User[];
  reviews: Review[];
  activityFeed: any[];
  setCurrentUser: (user: User | null) => void;
  addReview: (review: Review) => void;
  findShoppingBuddies: () => Promise<void>;
  getTrustLeaders: () => Promise<void>;
  getActivityFeed: () => Promise<void>;
  calculateTrustScore: (userId: string) => number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    product_id: '1',
    user_id: '1',
    username: 'TechReviewer23',
    rating: 5,
    comment: 'Amazing phone! The camera quality is outstanding and the battery lasts all day.',
    trust_weighted_score: 4.8,
    verified_purchase: true,
    helpful_votes: 23,
    photos: ['/api/placeholder/200/200'],
    created_at: '2024-01-15T10:30:00Z',
    user_trust_score: 9.2
  },
  {
    id: '2',
    product_id: '1',
    user_id: '2',
    username: 'GadgetExpert',
    rating: 4,
    comment: 'Great phone but quite expensive. Worth it if you need the latest features.',
    trust_weighted_score: 4.1,
    verified_purchase: true,
    helpful_votes: 15,
    created_at: '2024-01-10T14:20:00Z',
    user_trust_score: 8.7
  }
];

const mockShoppingBuddies: ShoppingBuddy[] = [
  {
    id: '1',
    username: 'EcoShopper',
    avatar: '/api/placeholder/40/40',
    trust_score: 9.2,
    similarity_score: 0.89,
    shared_interests: ['Sustainability', 'Home & Garden', 'Health'],
    active_status: 'online'
  },
  {
    id: '2',
    username: 'BudgetBuddy',
    avatar: '/api/placeholder/40/40',
    trust_score: 8.5,
    similarity_score: 0.76,
    shared_interests: ['Deals', 'Electronics', 'Fashion'],
    active_status: 'shopping'
  }
];

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  currentUser: {
    id: '1',
    email: 'user@example.com',
    username: 'SmartShopper',
    trust_score: 8.7,
    verified_buyer: true,
    sustainability_score: 7.8,
    total_purchases: 25,
    preferences: {
      budget_range: [50, 500],
      categories: ['Electronics', 'Home & Garden'],
      eco_conscious: true,
      deal_seeker: true
    },
    shopping_buddy: {
      id: '1',
      username: 'EcoShopper',
      similarity_score: 0.89
    },
    avatar: '/api/placeholder/40/40'
  },
  shoppingBuddies: mockShoppingBuddies,
  trustLeaders: [],
  reviews: mockReviews,
  activityFeed: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  addReview: (review) => {
    set(state => ({
      reviews: [...state.reviews, review]
    }));
  },

  findShoppingBuddies: async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ shoppingBuddies: mockShoppingBuddies });
  },

  getTrustLeaders: async () => {
    // Simulate API call
    const leaders: User[] = [
      {
        id: '1',
        email: 'leader1@example.com',
        username: 'TrustMaster',
        trust_score: 9.8,
        verified_buyer: true,
        sustainability_score: 9.5,
        total_purchases: 150,
        preferences: {
          budget_range: [100, 1000],
          categories: ['Electronics'],
          eco_conscious: true,
          deal_seeker: false
        }
      }
    ];
    set({ trustLeaders: leaders });
  },

  getActivityFeed: async () => {
    const feed = [
      {
        id: '1',
        type: 'review',
        user: 'EcoShopper',
        action: 'left a 5-star review',
        product: 'Bamboo Kitchen Set',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'purchase',
        user: 'BudgetBuddy',
        action: 'purchased',
        product: 'iPhone 15 Pro',
        timestamp: new Date().toISOString()
      }
    ];
    set({ activityFeed: feed });
  },

  calculateTrustScore: (userId: string) => {
    const { reviews } = get();
    const userReviews = reviews.filter(r => r.user_id === userId);
    if (userReviews.length === 0) return 5.0;
    
    const avgHelpful = userReviews.reduce((sum, r) => sum + r.helpful_votes, 0) / userReviews.length;
    return Math.min(10, 5 + (avgHelpful * 0.1));
  }
}));