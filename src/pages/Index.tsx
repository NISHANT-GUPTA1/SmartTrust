
import { useState, useEffect, createContext, useContext } from 'react';
import Header from '../components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/store/cartStore';
import CommunityHub from '../components/CommunityHub';
import SecurityBanner from '../components/SecurityBanner';
import CommunityBanner from '../components/CommunityBanner';
import RecommendedProducts from '../components/RecommendedProducts';

// CartSidebar context for global open/close
export const CartSidebarContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (open: boolean) => {},
});

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { loadCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <CartSidebarContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CommunityBanner />
        <HeroSection />
        <ProductGrid />
        <RecommendedProducts preferences={{ categories: ['Electronics', 'Eco-friendly', 'Fashion'], ecoFriendly: true, budget: 1000 }} />
        <SecurityBanner />
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartSidebarContext.Provider>
  );
};

export default Index;
