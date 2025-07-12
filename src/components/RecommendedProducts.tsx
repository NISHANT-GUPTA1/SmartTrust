import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const mockProducts = [
  {
    id: 'p1',
    name: 'EcoSmart LED Bulbs',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
    reason: 'Eco-friendly & in your favorite category',
  },
  {
    id: 'p2',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200',
    reason: 'Matches your eco-friendly and fashion preferences',
  },
  {
    id: 'p3',
    name: 'Bluetooth Headphones',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
    reason: 'Popular in Electronics, your top category',
  },
  {
    id: 'p4',
    name: 'Reusable Water Bottle',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200',
    reason: 'Eco-friendly and budget-friendly',
  },
  {
    id: 'p5',
    name: 'Smart Fitness Tracker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
    reason: 'Trending in your favorite categories',
  },
];

const RecommendedProducts: React.FC<{ preferences: any }> = ({ preferences }) => {
  const { addItem } = useCartStore();
  const [openId, setOpenId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product: any) => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setOpenId(null);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 mt-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Recommended for You</h2>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {mockProducts.map(product => (
          <Dialog key={product.id} open={openId === product.id} onOpenChange={open => setOpenId(open ? product.id : null)}>
            <div className="min-w-[220px] bg-blue-50 rounded-xl shadow p-4 flex flex-col items-center">
              <img src={product.image} alt={product.name} className="w-28 h-28 object-cover rounded-lg mb-2" />
              <div className="font-semibold text-blue-900 text-lg mb-1">{product.name}</div>
              <div className="text-blue-700 font-bold mb-1">${product.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500 text-center mb-2">Why this? {product.reason}</div>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow w-full">View Product</Button>
              </DialogTrigger>
            </div>
            <DialogContent className="max-w-md p-0 overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-blue-900 mb-1">{product.name}</DialogTitle>
                <DialogDescription className="text-gray-700 mb-2">{product.reason}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 p-4">
                <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-xl shadow-lg mb-2" />
                <div className="text-2xl font-bold text-black mb-2">${product.price.toFixed(2)}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-600">Qty:</span>
                  <Button size="icon" variant="outline" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button>
                  <span className="font-semibold text-base w-6 text-center">{quantity}</span>
                  <Button size="icon" variant="outline" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-amazon-orange hover:bg-orange-600 text-white font-bold text-base py-2 rounded shadow-lg"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add {quantity} to cart
                </Button>
                <DialogClose asChild>
                  <Button variant="ghost" className="mt-2 w-full text-gray-500 hover:text-blue-700">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts; 