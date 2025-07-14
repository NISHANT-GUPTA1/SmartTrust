import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Flame, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';

// Today's Deals specific products with special discounts
const todaysDealsProducts = [
  {
    id: 'deal-1',
    name: 'Samsung 65" 4K Smart TV - Crystal UHD',
    price: 549.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.7,
    reviews: 892,
    freeShipping: true,
    inStock: true,
    description: 'Stunning 4K resolution with smart TV capabilities',
    sustainability_score: 8.2,
    eco_friendly: true,
    trust_score: 9.3,
    verified_reviews: 756,
    deal: {
      discount: 39,
      timeLeft: '2h 15m',
      type: 'flash',
      savings: 350
    }
  },
  {
    id: 'deal-2',
    name: 'Apple AirPods Pro (2nd Gen) with MagSafe',
    price: 179.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.9,
    reviews: 2156,
    freeShipping: true,
    inStock: true,
    description: 'Premium noise cancellation and spatial audio',
    sustainability_score: 7.8,
    eco_friendly: true,
    trust_score: 9.8,
    verified_reviews: 1892,
    deal: {
      discount: 28,
      timeLeft: '4h 32m',
      type: 'lightning',
      savings: 70
    }
  },
  {
    id: 'deal-3',
    name: 'Nike Air Max 270 Running Shoes',
    price: 89.99,
    originalPrice: 150.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.6,
    reviews: 1543,
    freeShipping: true,
    inStock: true,
    description: 'Comfortable running shoes with Max Air cushioning',
    sustainability_score: 6.5,
    eco_friendly: false,
    trust_score: 8.9,
    verified_reviews: 1321,
    deal: {
      discount: 40,
      timeLeft: '6h 45m',
      type: 'daily',
      savings: 60.01
    }
  },
  {
    id: 'deal-4',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    price: 69.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1585515656871-c7e8cdbcf3f0?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.8,
    reviews: 3247,
    freeShipping: true,
    inStock: true,
    description: 'Multi-functional pressure cooker for quick meals',
    sustainability_score: 8.7,
    eco_friendly: true,
    trust_score: 9.1,
    verified_reviews: 2856,
    deal: {
      discount: 42,
      timeLeft: '1h 23m',
      type: 'flash',
      savings: 50
    }
  },
  {
    id: 'deal-5',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 329.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1876,
    freeShipping: true,
    inStock: true,
    description: 'Industry-leading noise cancellation technology',
    sustainability_score: 7.9,
    eco_friendly: true,
    trust_score: 9.4,
    verified_reviews: 1654,
    deal: {
      discount: 18,
      timeLeft: '3h 12m',
      type: 'lightning',
      savings: 70
    }
  },
  {
    id: 'deal-6',
    name: 'Dyson V15 Detect Cordless Vacuum',
    price: 599.99,
    originalPrice: 749.99,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.7,
    reviews: 923,
    freeShipping: true,
    inStock: true,
    description: 'Advanced laser dust detection technology',
    sustainability_score: 8.1,
    eco_friendly: true,
    trust_score: 9.2,
    verified_reviews: 812,
    deal: {
      discount: 20,
      timeLeft: '5h 55m',
      type: 'daily',
      savings: 150
    }
  }
];

const TodaysDeals = () => {
  const navigate = useNavigate();
  const { setCurrentContext } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filters, setFilters] = useState({
    priceRange: [0, 1500],
    categories: [],
    ratings: 0,
    hasOffers: false
  });

  // Set context when component mounts
  useEffect(() => {
    setCurrentContext('deals');
  }, [setCurrentContext]);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden'];

  // Apply filters to products
  const applyFilters = (products: typeof todaysDealsProducts) => {
    return products.filter(product => {
      const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
      const ratingMatch = product.rating >= filters.ratings;
      const offerMatch = !filters.hasOffers || product.deal;
      
      return priceInRange && categoryMatch && ratingMatch && offerMatch;
    });
  };

  let filteredProducts = selectedCategory === 'All' 
    ? todaysDealsProducts 
    : todaysDealsProducts.filter(product => product.category === selectedCategory);
  
  // Apply additional filters from ProductFilters component
  filteredProducts = applyFilters(filteredProducts);

  const handleFiltersChange = (newFilters: {
    priceRange: [number, number];
    selectedBrands: string[];
    minRating: number;
    hasDiscount: boolean;
    specialOffers: string[];
  }) => {
    setFilters({
      priceRange: newFilters.priceRange,
      categories: newFilters.selectedBrands,
      ratings: newFilters.minRating,
      hasOffers: newFilters.hasDiscount
    });
  };

  const handleFiltersClear = () => {
    setFilters({
      priceRange: [0, 1500],
      categories: [],
      ratings: 0,
      hasOffers: false
    });
  };

  const getDealIcon = (type: string) => {
    switch (type) {
      case 'flash':
        return <Zap className="w-4 h-4" />;
      case 'lightning':
        return <Flame className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getDealColor = (type: string) => {
    switch (type) {
      case 'flash':
        return 'bg-red-500';
      case 'lightning':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔥 Today's Hot Deals
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Limited time offers - Save up to 50% on selected items
            </p>
            <div className="flex justify-center items-center gap-2 text-red-600 font-semibold">
              <Clock className="w-5 h-5" />
              <span>Deals refresh daily at midnight</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Shop by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mb-8">
          <ProductFilters onFiltersApply={handleFiltersChange} onFiltersClear={handleFiltersClear} />
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* Deal Badge */}
              <div className="absolute top-2 left-2 z-10 flex gap-2">
                <Badge className={`${getDealColor(product.deal.type)} text-white flex items-center gap-1`}>
                  {getDealIcon(product.deal.type)}
                  {product.deal.discount}% OFF
                </Badge>
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {product.deal.timeLeft}
                </Badge>
              </div>
              
              {/* Savings Badge */}
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-green-600 text-white">
                  Save ${product.deal.savings}
                </Badge>
              </div>
              
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* No Deals Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No deals found in this category</p>
            <Button
              onClick={() => setSelectedCategory('All')}
              className="mt-4"
            >
              View All Deals
            </Button>
          </div>
        )}

        {/* Deal Terms */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-3">Deal Terms & Conditions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Limited quantity available</li>
            <li>• Deals valid while supplies last</li>
            <li>• Prices may vary by location</li>
            <li>• Cannot be combined with other offers</li>
            <li>• New deals added daily</li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TodaysDeals;
