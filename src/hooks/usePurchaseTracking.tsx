import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRestockStore } from '@/store/restockStore';
import { Product } from '@/types/product';

/**
 * Hook to automatically track purchases when items are added to cart
 * This will help build the purchase history for restock predictions
 */
export const usePurchaseTracking = () => {
  const { items } = useCartStore();
  const { addPurchase } = useRestockStore();

  // Track when cart items change (simulating a purchase)
  useEffect(() => {
    // We'll track purchases when items are added to cart
    // In a real app, this would happen when checkout is completed
    const trackPurchases = () => {
      items.forEach(item => {
        // Only track grocery items for restocking
        if (item.category === 'Groceries' || item.category === 'Health & Beauty' || item.category === 'Household') {
          // Create a mock purchase record
          // In reality, this would be called from a checkout success handler
          addPurchase(item, item.quantity);
        }
      });
    };

    // Simulate purchase tracking with a delay (as if checkout completed)
    const timeoutId = setTimeout(trackPurchases, 2000);

    return () => clearTimeout(timeoutId);
  }, [items, addPurchase]);

  return null;
};

/**
 * Utility function to manually add a purchase record
 * Call this when a real purchase is completed
 */
export const trackPurchase = (product: Product, quantity: number) => {
  const { addPurchase } = useRestockStore.getState();
  addPurchase(product, quantity);
};
