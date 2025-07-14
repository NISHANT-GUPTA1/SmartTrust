import { create } from 'zustand';
import { SocialCart, ShoppingBuddy } from '@/types/product';

interface SocialStore {
  socialCarts: SocialCart[];
  trendingCarts: SocialCart[];
  followed_carts: SocialCart[];
  activeShoppingSession: {
    buddy: ShoppingBuddy | null;
    shared_cart: any | null;
    chat_messages: Array<{
      user: string;
      message: string;
      timestamp: string;
    }>;
  };
  communityActivity: Array<{
    id: string;
    type: 'purchase' | 'review' | 'cart_share' | 'recommendation';
    user: string;
    action: string;
    product?: string;
    timestamp: string;
    engagement: number;
  }>;
  influencerCarts: SocialCart[];
  getSocialCarts: () => Promise<void>;
  getTrendingCarts: () => Promise<void>;
  followCart: (cartId: string) => Promise<void>;
  cloneCart: (cartId: string) => Promise<void>;
  shareCart: (cart: any) => Promise<void>;
  startShoppingSession: (buddy: ShoppingBuddy) => Promise<void>;
  endShoppingSession: () => void;
  sendChatMessage: (message: string) => void;
  getInfluencerCarts: () => Promise<void>;
}

export interface ChatMessage {
  sender: string;
  text: string;
  timestamp: number;
}

export interface ChatThread {
  username: string;
  messages: ChatMessage[];
}

interface ChatStoreState {
  threads: ChatThread[];
  openThread: string | null;
  startChat: (username: string) => void;
  sendMessage: (username: string, text: string, sender: string) => void;
  getMessages: (username: string) => ChatMessage[];
  setOpenThread: (username: string | null) => void;
}

const mockSocialCarts: SocialCart[] = [
  {
    id: 'social-1',
    name: 'Sustainable Living Essentials',
    description: 'Everything you need for an eco-friendly lifestyle',
    creator: {
      id: 'user-1',
      username: 'EcoWarrior',
      trust_score: 9.2,
      verified: true
    },
    items: [
      {
        product: {
          id: '4',
          name: 'Bamboo Kitchen Set',
          price: 45.99,
          image: '/api/placeholder/100/100',
          category: 'Home & Garden',
          rating: 4.7,
          reviews: 156,
          freeShipping: true,
          inStock: true,
          description: 'Eco-friendly bamboo kitchen utensils set',
          sustainability_score: 9.5,
          eco_friendly: true,
          trust_score: 8.9,
          verified_reviews: 134
        },
        quantity: 1,
        price_at_time: 45.99
      }
    ],
    total: 45.99,
    followers: 234,
    category: 'Sustainable Living',
    tags: ['eco-friendly', 'zero-waste', 'sustainable'],
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'social-2',
    name: 'Budget Student Dorm Room',
    description: 'Complete dorm setup under $300',
    creator: {
      id: 'user-2',
      username: 'StudentSaver',
      trust_score: 8.5,
      verified: true
    },
    items: [],
    total: 287.50,
    followers: 456,
    category: 'Student Life',
    tags: ['budget', 'dorm', 'student', 'essentials'],
    created_at: '2024-01-14T15:30:00Z'
  },
  {
    id: 'social-3',
    name: 'Tech Enthusiast Setup 2024',
    description: 'Latest tech gadgets and accessories',
    creator: {
      id: 'user-3',
      username: 'TechGuru',
      trust_score: 9.5,
      verified: true
    },
    items: [],
    total: 1299.99,
    followers: 789,
    category: 'Technology',
    tags: ['tech', 'gadgets', '2024', 'premium'],
    created_at: '2024-01-12T09:15:00Z'
  }
];

const mockInfluencerCarts: SocialCart[] = [
  {
    id: 'inf-1',
    name: 'Fitness Journey Starter Pack',
    description: 'Everything I use to stay fit and healthy - verified by @FitnessInfluencer',
    creator: {
      id: 'inf-1',
      username: 'FitnessInfluencer',
      trust_score: 9.8,
      verified: true
    },
    items: [],
    total: 234.97,
    followers: 2500,
    category: 'Fitness & Health',
    tags: ['fitness', 'health', 'verified', 'influencer'],
    created_at: '2024-01-10T08:00:00Z'
  }
];

export const useSocialStore = create<SocialStore>((set, get) => ({
  socialCarts: [],
  trendingCarts: [],
  followed_carts: [],
  activeShoppingSession: {
    buddy: null,
    shared_cart: null,
    chat_messages: []
  },
  communityActivity: [
    {
      id: '1',
      type: 'purchase',
      user: 'TechEnthusiast',
      action: 'just purchased iPhone 15 Pro Max',
      product: 'iPhone 15 Pro Max',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      engagement: 12
    },
    {
      id: '2',
      type: 'review',
      user: 'EcoShopper',
      action: 'left a 5-star review for Bamboo Kitchen Set',
      product: 'Bamboo Kitchen Set',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      engagement: 8
    },
    {
      id: '3',
      type: 'cart_share',
      user: 'BudgetBuddy',
      action: 'shared their "College Essentials" cart',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      engagement: 23
    },
    {
      id: '4',
      type: 'recommendation',
      user: 'GadgetGuru',
      action: 'recommended MacBook Air M2 for students',
      product: 'MacBook Air M2',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      engagement: 34
    }
  ],
  influencerCarts: [],

  getSocialCarts: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    set({ socialCarts: mockSocialCarts });
  },

  getTrendingCarts: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const trending = mockSocialCarts.filter(cart => cart.followers > 400);
    set({ trendingCarts: trending });
  },

  followCart: async (cartId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const cart = mockSocialCarts.find(c => c.id === cartId);
    if (cart) {
      cart.followers += 1;
      set(state => ({
        followed_carts: [...state.followed_carts, cart]
      }));
    }
  },

  cloneCart: async (cartId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Implementation would clone the cart to user's personal carts
    console.log(`Cloning cart ${cartId}`);
  },

  shareCart: async (cart: any) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const socialCart: SocialCart = {
      id: `shared-${Date.now()}`,
      name: cart.name || 'My Shared Cart',
      description: 'Shared from my personal cart',
      creator: {
        id: 'current-user',
        username: 'SmartShopper',
        trust_score: 8.7,
        verified: true
      },
      items: cart.items,
      total: cart.total,
      followers: 0,
      category: 'Personal',
      tags: ['shared', 'personal'],
      created_at: new Date().toISOString()
    };
    
    set(state => ({
      socialCarts: [socialCart, ...state.socialCarts]
    }));
  },

  startShoppingSession: async (buddy: ShoppingBuddy) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    set({
      activeShoppingSession: {
        buddy,
        shared_cart: {
          id: `session-${Date.now()}`,
          items: [],
          total: 0
        },
        chat_messages: [
          {
            user: 'system',
            message: `Shopping session started with ${buddy.username}`,
            timestamp: new Date().toISOString()
          }
        ]
      }
    });
  },

  endShoppingSession: () => {
    set({
      activeShoppingSession: {
        buddy: null,
        shared_cart: null,
        chat_messages: []
      }
    });
  },

  sendChatMessage: (message: string) => {
    const { activeShoppingSession } = get();
    if (activeShoppingSession.buddy) {
      const newMessage = {
        user: 'You',
        message,
        timestamp: new Date().toISOString()
      };
      
      set(state => ({
        activeShoppingSession: {
          ...state.activeShoppingSession,
          chat_messages: [...state.activeShoppingSession.chat_messages, newMessage]
        }
      }));

      // Simulate buddy response after delay
      setTimeout(() => {
        const buddyResponse = {
          user: activeShoppingSession.buddy!.username,
          message: 'That looks great! I was thinking about the same thing.',
          timestamp: new Date().toISOString()
        };
        
        set(state => ({
          activeShoppingSession: {
            ...state.activeShoppingSession,
            chat_messages: [...state.activeShoppingSession.chat_messages, buddyResponse]
          }
        }));
      }, 1000);
    }
  },

  getInfluencerCarts: async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    set({ influencerCarts: mockInfluencerCarts });
  }
}));

export const useChatStore = create<ChatStoreState>((set, get) => ({
  threads: [],
  openThread: null,
  startChat: (username) => {
    const exists = get().threads.find(t => t.username === username);
    if (!exists) {
      set(state => ({
        threads: [...state.threads, { username, messages: [] }],
        openThread: username,
      }));
    } else {
      set({ openThread: username });
    }
  },
  sendMessage: (username, text, sender) => {
    set(state => ({
      threads: state.threads.map(t =>
        t.username === username
          ? { ...t, messages: [...t.messages, { sender, text, timestamp: Date.now() }] }
          : t
      ),
    }));
  },
  getMessages: (username) => {
    const thread = get().threads.find(t => t.username === username);
    return thread ? thread.messages : [];
  },
  setOpenThread: (username) => set({ openThread: username }),
}));