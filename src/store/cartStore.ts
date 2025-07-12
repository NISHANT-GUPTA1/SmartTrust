
import { create } from 'zustand';
import { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loadCart: () => void;
  saveCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({
        items: [...items, { ...product, quantity: 1 }]
      });
    }
    get().saveCart();
  },

  removeItem: (productId) => {
    set({
      items: get().items.filter(item => item.id !== productId)
    });
    get().saveCart();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    });
    get().saveCart();
  },

  clearCart: () => {
    set({ items: [] });
    get().saveCart();
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  loadCart: () => {
    try {
      const savedCart = localStorage.getItem('walmart-cart');
      if (savedCart) {
        set({ items: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  },

  saveCart: () => {
    try {
      localStorage.setItem('walmart-cart', JSON.stringify(get().items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },
}));
