import { createContext } from 'react';

// CartSidebar context for global open/close
export const CartSidebarContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (open: boolean) => {},
});
