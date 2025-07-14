
import { useState } from 'react';
import { Heart, Star, ShoppingCart, X, Plus, Minus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { CartSidebarContext } from '@/contexts/CartSidebarContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { setIsCartOpen } = useContext(CartSidebarContext);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setIsCartOpen(true);
    toast.success(
      <div className="flex items-center gap-3">
        <img src={product.image} alt={product.name} className="w-10 h-10 rounded border" />
        <span className="font-semibold">{product.name}</span>
        <span className="text-green-700 font-bold ml-2">Added to cart!</span>
        <Button
          size="sm"
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => setIsCartOpen(true)}
        >
          View Cart
        </Button>
      </div>,
      { duration: 2500 }
    );
    setQuantity(1);
    setOpen(false);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="group hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
        <div className="relative">
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white z-10">
              -{discountPercentage}%
            </Badge>
          )}
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWishlist}
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
          >
            <Heart
              className={`h-4 w-4 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>
          {/* Product Image - Clickable to go to detail page */}
          <Link to={`/product/${product.id}`} className="block">
            <div className="aspect-square bg-gray-100 overflow-hidden cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </Link>
        </div>
        <CardContent className="p-4">
          {/* Product Name - Clickable to go to detail page */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-base mb-2 line-clamp-2 min-h-[2.5rem] text-blue-900 hover:text-blue-700 cursor-pointer transition-colors">
              {product.name}
            </h3>
          </Link>
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">
              ({product.reviews})
            </span>
          </div>
          {/* Price */}
          <div className="mb-3 flex items-center space-x-2">
            <span className="text-lg font-bold text-black">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white ml-2">-{discountPercentage}%</Badge>
            )}
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-600">Qty:</span>
            <Button size="icon" variant="outline" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button>
            <span className="font-semibold text-base w-6 text-center">{quantity}</span>
            <Button size="icon" variant="outline" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
          </div>
          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base py-2 rounded shadow-lg mb-1"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to cart
          </Button>
          {/* View Details Button */}
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full mt-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold"
              onClick={e => { e.stopPropagation(); setOpen(true); }}
              size="sm"
            >
              View Details
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>
      {/* Product Detail Modal */}
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
            <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-xl shadow-lg" />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col gap-3 relative">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-900 mb-1">{product.name}</DialogTitle>
              <DialogDescription className="text-gray-700 mb-2">{product.description}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 text-white ml-2">-{discountPercentage}%</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="outline" className="text-xs">Category: {product.category}</Badge>
              {product.eco_friendly && <Badge className="bg-green-500 text-white text-xs">Eco-Friendly</Badge>}
              <Badge variant="outline" className="text-xs">Sustainability: {product.sustainability_score}/10</Badge>
              <Badge variant="outline" className="text-xs">Trust: {product.trust_score}/10</Badge>
            </div>
            {/* Why you'll love this */}
            {(product.ai_recommendations || product.eco_friendly || product.trust_score > 8) && (
              <div className="bg-blue-50 rounded-lg p-3 mt-2 mb-2">
                <div className="font-semibold text-blue-800 mb-1">Why you'll love this</div>
                <ul className="list-disc list-inside text-blue-900 text-sm">
                  {product.ai_recommendations && product.ai_recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                  {product.eco_friendly && <li>Eco-friendly and sustainable choice</li>}
                  {product.trust_score > 8 && <li>Highly trusted by our community</li>}
                </ul>
              </div>
            )}
            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />
            {/* Quantity Selector in Modal */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-600">Qty:</span>
              <Button size="icon" variant="outline" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button>
              <span className="font-semibold text-base w-6 text-center">{quantity}</span>
              <Button size="icon" variant="outline" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            {/* Sticky Add to Cart Button */}
            <div className="sticky bottom-0 bg-white pt-2 pb-2 z-10">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded shadow-lg mb-2"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add {quantity} to cart
              </Button>
              
              {/* View Full Product Details Button */}
              <Link to={`/product/${product.id}`}>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Product Details
                </Button>
              </Link>
            </div>
            <Button onClick={handleWishlist} variant="outline" className={`mt-2 font-semibold text-base py-2 w-full ${isWishlisted ? 'border-red-500 text-red-500' : 'border-blue-600 text-blue-700'}`}>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</Button>
            <DialogClose asChild>
              <Button variant="ghost" className="mt-2 w-full text-gray-500 hover:text-blue-700">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
