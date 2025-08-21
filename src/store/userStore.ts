import { create } from 'zustand';

// Minimal user store for compatibility
interface UserStore {
  getUserReviewsByProduct: (productId: string) => any[];
}

export const useUserStore = create<UserStore>(() => ({
  getUserReviewsByProduct: () => [], // Returns empty array by default
}));
