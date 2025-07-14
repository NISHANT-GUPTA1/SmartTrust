
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';
import { Badge } from '@/components/ui/badge';

export const ProductGrid = () => {
  const { products, filteredProducts, getCurrentSearchQuery, selectedCategory, setSelectedCategory, filterProducts } = useProductStore();
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'popular'>('popular');
  const searchQuery = getCurrentSearchQuery();

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, filterProducts]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categories = ['All', 'Electronics', 'Home & Garden', 'Fashion', 'Health & Beauty', 'Sports', 'Books'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Search results for "{searchQuery}"
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} results found
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <ProductFilters 
            onFiltersApply={(filters) => {
              // TODO: Implement filter logic
              console.log('Filters applied:', filters);
            }}
            onFiltersClear={() => {
              // TODO: Implement clear filters logic  
              console.log('Filters cleared');
            }}
          />
        </div>

        {/* Products */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high' | 'rating' | 'popular')}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                title="Sort products by"
                aria-label="Sort products by"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria</p>
              <Button
                onClick={() => {
                  setSelectedCategory('All');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
