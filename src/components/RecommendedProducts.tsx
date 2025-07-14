import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ShoppingCart, Plus, Minus, Filter, X, ChevronDown } from 'lucide-react';

const mockProducts = [
  {
    id: 'p1',
    name: 'EcoSmart LED Bulbs',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
    reason: 'Eco-friendly & in your favorite category',
    category: 'Electronics',
    eco: true,
  },
  {
    id: 'p2',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200',
    reason: 'Matches your eco-friendly and fashion preferences',
    category: 'Fashion',
    eco: true,
  },
  {
    id: 'p3',
    name: 'Bluetooth Headphones',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
    reason: 'Popular in Electronics, your top category',
    category: 'Electronics',
    eco: false,
  },
  {
    id: 'p4',
    name: 'Reusable Water Bottle',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200',
    reason: 'Eco-friendly and budget-friendly',
    category: 'Lifestyle',
    eco: true,
  },
  {
    id: 'p5',
    name: 'Smart Fitness Tracker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
    reason: 'Trending in your favorite categories',
    category: 'Electronics',
    eco: false,
  },
  {
    id: 'p6',
    name: 'Bamboo Phone Case',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200',
    reason: 'Sustainable tech accessories',
    category: 'Electronics',
    eco: true,
  },
  {
    id: 'p7',
    name: 'Wireless Charging Pad',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200',
    reason: 'Convenient tech for your workspace',
    category: 'Electronics',
    eco: false,
  },
  {
    id: 'p8',
    name: 'Recycled Yoga Mat',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200',
    reason: 'Eco-friendly fitness gear',
    category: 'Lifestyle',
    eco: true,
  },
];

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const categories = [...new Set(mockProducts.map(p => p.category))];
  
  const handlePriceChange = (type, value) => {
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: value
      }
    });
  };

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: { min: 0, max: 100 },
      categories: [],
      ecoFriendly: false,
      sortBy: 'recommended'
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.ecoFriendly || 
                          filters.priceRange.min > 0 || 
                          filters.priceRange.max < 100;

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 mb-6 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900">Filters</h3>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-500 hover:text-blue-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price Range</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Min:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs font-medium text-blue-900 min-w-[3rem]">${filters.priceRange.min}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Max:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs font-medium text-blue-900 min-w-[3rem]">${filters.priceRange.max}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Categories</label>
          <div className="space-y-1">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Eco-Friendly */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sustainability</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.ecoFriendly}
              onChange={(e) => onFiltersChange({ ...filters, ecoFriendly: e.target.checked })}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">Eco-friendly only</span>
          </label>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const RecommendedProducts = ({ preferences }) => {
  const [openId, setOpenId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100 },
    categories: [],
    ecoFriendly: false,
    sortBy: 'recommended'
  });

  const handleAddToCart = (product) => {
    // Mock cart functionality
    console.log(`Added ${quantity} of ${product.name} to cart`);
    setOpenId(null);
    setQuantity(1);
  };

  const filterProducts = (products) => {
    let filtered = products.filter(product => {
      // Price filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }
      
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Eco-friendly filter
      if (filters.ecoFriendly && !product.eco) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep recommended order
        break;
    }

    return filtered;
  };

  const filteredProducts = filterProducts(mockProducts);
  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.ecoFriendly || 
                          filters.priceRange.min > 0 || 
                          filters.priceRange.max < 100 ||
                          filters.sortBy !== 'recommended';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-900">Recommended for You</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {filteredProducts.length} of {mockProducts.length} products
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`${showFilters ? 'bg-blue-50 text-blue-700' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-700`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        isOpen={showFilters}
        onToggle={() => setShowFilters(!showFilters)}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Filter className="h-12 w-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters to see more products</p>
          <Button
            onClick={() => setFilters({
              priceRange: { min: 0, max: 100 },
              categories: [],
              ecoFriendly: false,
              sortBy: 'recommended'
            })}
            variant="outline"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-2">
          {filteredProducts.map(product => (
            <Dialog key={product.id} open={openId === product.id} onOpenChange={open => setOpenId(open ? product.id : null)}>
              <div className="min-w-[220px] bg-blue-50 rounded-xl shadow p-4 flex flex-col items-center relative">
                {product.eco && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    Eco
                  </div>
                )}
                <img src={product.image} alt={product.name} className="w-28 h-28 object-cover rounded-lg mb-2" />
                <div className="font-semibold text-blue-900 text-lg mb-1 text-center">{product.name}</div>
                <div className="text-blue-700 font-bold mb-1">${product.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500 text-center mb-2">Why this? {product.reason}</div>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow w-full">
                    View Product
                  </Button>
                </DialogTrigger>
              </div>
              <DialogContent className="max-w-md p-0 overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-blue-900 mb-1">{product.name}</DialogTitle>
                  <DialogDescription className="text-gray-700 mb-2">{product.reason}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 p-4">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-xl shadow-lg mb-2" />
                    {product.eco && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Eco-friendly
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-black mb-2">${product.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-600">Qty:</span>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-base w-6 text-center">{quantity}</span>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base py-2 rounded shadow-lg"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add {quantity} to cart
                  </Button>
                  <DialogClose asChild>
                    <Button variant="ghost" className="mt-2 w-full text-gray-500 hover:text-blue-700">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;