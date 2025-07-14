import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { ChevronRight } from 'lucide-react';
import { useProductStore } from '@/store/productStore';

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { setSelectedCategory, setCurrentContext } = useProductStore();
  
  // Normalize category name for display
  let displayCategoryName = categoryName?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || '';
  
  // Handle special cases
  if (categoryName === 'home-garden') {
    displayCategoryName = 'Home & Garden';
  }

  useEffect(() => {
    if (categoryName) {
      // Convert URL category name back to the format used in store
      let normalizedCategory = categoryName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      // Handle special cases like "home garden" -> "Home & Garden"
      if (categoryName === 'home-garden') {
        normalizedCategory = 'Home & Garden';
      }
      
      setSelectedCategory(normalizedCategory);
      setCurrentContext('home');
    }
  }, [categoryName, setSelectedCategory, setCurrentContext]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-600">{displayCategoryName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayCategoryName}</h1>
          <p className="text-gray-600">
            Browse our selection of {displayCategoryName.toLowerCase()} products
          </p>
        </div>

        <ProductGrid />
      </div>

      <Footer />
    </div>
  );
};

export default Category;
