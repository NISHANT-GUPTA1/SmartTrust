
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
  // New grocery tracking methods
  trackGroceryPurchase: (productId: string, quantity: number) => void;
  getGroceryCategories: () => string[];
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
    
    // Track grocery purchase if it's a grocery item
    const groceryCategories = ['Dairy', 'Produce', 'Bakery', 'Pantry', 'Frozen', 'Meat & Seafood'];
    if (groceryCategories.includes(product.category)) {
      get().trackGroceryPurchase(product.id, existingItem ? existingItem.quantity + 1 : 1);
    }
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

  trackGroceryPurchase: (productId: string, quantity: number) => {
    // This would typically integrate with the grocery restock store
    // For now, we'll just save to localStorage
    try {
      const existingPurchases = JSON.parse(localStorage.getItem('grocery-purchases') || '[]');
      const newPurchase = {
        productId,
        quantity,
        date: new Date().toISOString(),
        price: get().items.find(item => item.id === productId)?.price || 0
      };
      existingPurchases.push(newPurchase);
      localStorage.setItem('grocery-purchases', JSON.stringify(existingPurchases));
    } catch (error) {
      console.error('Error tracking grocery purchase:', error);
    }
  },

  getGroceryCategories: () => {
    return ['Dairy', 'Produce', 'Bakery', 'Pantry', 'Frozen', 'Meat & Seafood', 'Beverages'];
  },
}));
