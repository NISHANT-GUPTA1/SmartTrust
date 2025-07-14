import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserQA {
  id: string;
  question: string;
  answer: string;
  productId: string;
  userId: string;
  username: string;
  isVerified: boolean;
  trustScore: number;
  anonymous: boolean;
  createdAt: string;
  helpfulVotes: number;
  reported: boolean;
}

export interface UserReview {
  id: string;
  productId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  photos: string[];
  videos: string[];
  isVerified: boolean;
  trustScore: number;
  anonymous: boolean;
  createdAt: string;
  helpfulVotes: number;
  reported: boolean;
  chatMessages: ReviewChatMessage[];
}

export interface ReviewChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  isVerified: boolean;
  anonymous: boolean;
}

export interface UserChat {
  id: string;
  participants: string[];
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isVerified: boolean;
  anonymous: boolean;
}

interface UserStore {
  // User Q&A
  userQAs: UserQA[];
  addUserQA: (qa: Omit<UserQA, 'id' | 'createdAt' | 'helpfulVotes' | 'reported'>) => void;
  updateUserQA: (id: string, updates: Partial<UserQA>) => void;
  deleteUserQA: (id: string) => void;
  getUserQAsByProduct: (productId: string) => UserQA[];
  getUserQAsByUser: (userId: string) => UserQA[];
  
  // User Reviews
  userReviews: UserReview[];
  addUserReview: (review: Omit<UserReview, 'id' | 'createdAt' | 'helpfulVotes' | 'reported' | 'chatMessages'>) => void;
  updateUserReview: (id: string, updates: Partial<UserReview>) => void;
  deleteUserReview: (id: string) => void;
  getUserReviewsByProduct: (productId: string) => UserReview[];
  getUserReviewsByUser: (userId: string) => UserReview[];
  
  // Review Chat
  addReviewChatMessage: (reviewId: string, message: Omit<ReviewChatMessage, 'id' | 'timestamp'>) => void;
  getReviewChatMessages: (reviewId: string) => ReviewChatMessage[];
  
  // User Chats
  userChats: UserChat[];
  addUserChat: (chat: Omit<UserChat, 'id'>) => void;
  addChatMessage: (chatId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  getUserChats: (userId: string) => UserChat[];
  getChatMessages: (chatId: string) => ChatMessage[];
  
  // User Preferences
  userPreferences: {
    allowAnonymousQA: boolean;
    allowAnonymousReviews: boolean;
    allowAnonymousChat: boolean;
    notificationSettings: {
      qaResponses: boolean;
      reviewReplies: boolean;
      chatMessages: boolean;
    };
  };
  updateUserPreferences: (preferences: Partial<UserStore['userPreferences']>) => void;
  
  // Trust and Verification
  calculateUserTrustScore: (userId: string) => number;
  verifyUserPurchase: (userId: string, productId: string) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userQAs: [],
      userReviews: [],
      userChats: [],
      userPreferences: {
        allowAnonymousQA: true,
        allowAnonymousReviews: true,
        allowAnonymousChat: true,
        notificationSettings: {
          qaResponses: true,
          reviewReplies: true,
          chatMessages: true,
        },
      },

      // Q&A Methods
      addUserQA: (qa) => {
        const newQA: UserQA = {
          ...qa,
          id: `qa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          helpfulVotes: 0,
          reported: false,
        };
        set(state => ({
          userQAs: [...state.userQAs, newQA]
        }));
      },

      updateUserQA: (id, updates) => {
        set(state => ({
          userQAs: state.userQAs.map(qa => 
            qa.id === id ? { ...qa, ...updates } : qa
          )
        }));
      },

      deleteUserQA: (id) => {
        set(state => ({
          userQAs: state.userQAs.filter(qa => qa.id !== id)
        }));
      },

      getUserQAsByProduct: (productId) => {
        return get().userQAs.filter(qa => qa.productId === productId);
      },

      getUserQAsByUser: (userId) => {
        return get().userQAs.filter(qa => qa.userId === userId);
      },

      // Review Methods
      addUserReview: (review) => {
        const newReview: UserReview = {
          ...review,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          helpfulVotes: 0,
          reported: false,
          chatMessages: [],
        };
        set(state => ({
          userReviews: [...state.userReviews, newReview]
        }));
      },

      updateUserReview: (id, updates) => {
        set(state => ({
          userReviews: state.userReviews.map(review => 
            review.id === id ? { ...review, ...updates } : review
          )
        }));
      },

      deleteUserReview: (id) => {
        set(state => ({
          userReviews: state.userReviews.filter(review => review.id !== id)
        }));
      },

      getUserReviewsByProduct: (productId) => {
        return get().userReviews.filter(review => review.productId === productId);
      },

      getUserReviewsByUser: (userId) => {
        return get().userReviews.filter(review => review.userId === userId);
      },

      // Review Chat Methods
      addReviewChatMessage: (reviewId, message) => {
        const newMessage: ReviewChatMessage = {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
        };
        set(state => ({
          userReviews: state.userReviews.map(review => 
            review.id === reviewId 
              ? { ...review, chatMessages: [...review.chatMessages, newMessage] }
              : review
          )
        }));
      },

      getReviewChatMessages: (reviewId) => {
        const review = get().userReviews.find(r => r.id === reviewId);
        return review?.chatMessages || [];
      },

      // Chat Methods
      addUserChat: (chat) => {
        const newChat: UserChat = {
          ...chat,
          id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        set(state => ({
          userChats: [...state.userChats, newChat]
        }));
      },

      addChatMessage: (chatId, message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
        };
        set(state => ({
          userChats: state.userChats.map(chat => 
            chat.id === chatId 
              ? { 
                  ...chat, 
                  messages: [...chat.messages, newMessage],
                  lastMessage: message.message,
                  lastMessageTime: newMessage.timestamp,
                  unreadCount: chat.unreadCount + 1
                }
              : chat
          )
        }));
      },

      getUserChats: (userId) => {
        return get().userChats.filter(chat => 
          chat.participants.includes(userId)
        );
      },

      getChatMessages: (chatId) => {
        const chat = get().userChats.find(c => c.id === chatId);
        return chat?.messages || [];
      },

      // Preferences
      updateUserPreferences: (preferences) => {
        set(state => ({
          userPreferences: { ...state.userPreferences, ...preferences }
        }));
      },

      // Trust and Verification
      calculateUserTrustScore: (userId) => {
        const { userReviews, userQAs } = get();
        const userReviewsList = userReviews.filter(r => r.userId === userId);
        const userQAsList = userQAs.filter(q => q.userId === userId);
        
        let totalScore = 0;
        let totalItems = 0;
        
        // Calculate from reviews
        userReviewsList.forEach(review => {
          totalScore += review.trustScore;
          totalItems++;
        });
        
        // Calculate from Q&As
        userQAsList.forEach(qa => {
          totalScore += qa.trustScore;
          totalItems++;
        });
        
        return totalItems > 0 ? totalScore / totalItems : 5.0;
      },

      verifyUserPurchase: (userId, productId) => {
        // Mock verification - in real app, this would check against purchase history
        const { userReviews } = get();
        return userReviews.some(review => 
          review.userId === userId && 
          review.productId === productId && 
          review.isVerified
        );
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        userQAs: state.userQAs,
        userReviews: state.userReviews,
        userChats: state.userChats,
        userPreferences: state.userPreferences,
      }),
    }
  )
); 