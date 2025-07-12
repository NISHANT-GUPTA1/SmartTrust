
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 mb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Save Money. Live Better.
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Shop millions of items with everyday low prices and free shipping on orders $35+
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Today's Deals</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Electronics</span>
                  <span className="bg-red-500 px-2 py-1 rounded text-sm font-bold">Up to 50% off</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Home & Garden</span>
                  <span className="bg-red-500 px-2 py-1 rounded text-sm font-bold">Up to 30% off</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fashion</span>
                  <span className="bg-red-500 px-2 py-1 rounded text-sm font-bold">Up to 40% off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
