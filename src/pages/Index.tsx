
import { useState, useEffect, createContext } from 'react';
import Header from '../components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { CartSidebar } from '@/components/CartSidebar';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/store/cartStore';
import SecurityBanner from '../components/SecurityBanner';
import RecommendedProducts from '../components/RecommendedProducts';
import QuickRestockWidget from '../components/QuickRestockWidget';
import { CartSidebarContext } from '@/contexts/CartSidebarContext';

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
        <HeroSection />
        
        {/* Smart Restock Widget Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <QuickRestockWidget />
              </div>
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Never Run Out Again!</h2>
                  <p className="text-gray-700 mb-4">
                    Our AI assistant tracks your grocery purchases and automatically suggests when to restock items 
                    before you run out. Save time, money, and never forget essentials again.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">95%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">$45</div>
                      <div className="text-sm text-gray-600">Avg Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">3M+</div>
                      <div className="text-sm text-gray-600">Items Tracked</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">24/7</div>
                      <div className="text-sm text-gray-600">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Products Section with Sidebar Layout */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Products</h2>
              <p className="text-gray-600">Browse our complete selection with advanced filters</p>
            </div>
            <ProductGrid />
          </div>
        </section>
        <RecommendedProducts preferences={{ categories: ['Electronics', 'Eco-friendly', 'Fashion'], ecoFriendly: true, budget: 1000 }} />
        <SecurityBanner />
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartSidebarContext.Provider>
  );
};

export default Index;
