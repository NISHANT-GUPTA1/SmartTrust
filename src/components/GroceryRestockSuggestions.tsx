import React, { useEffect, useState } from 'react';
import { useGroceryRestockStore } from '@/store/groceryRestockStore';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import { 
  ShoppingCart, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Plus,
  Calendar,
  TrendingUp,
  Package,
  Zap,
  Bell,
  Settings
} from 'lucide-react';

interface RestockSuggestion {
  item: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    lastPurchased: string;
    purchaseFrequency: number;
    averageQuantity: number;
    currentStock: number;
    estimatedConsumptionRate: number;
    restockThreshold: number;
    isSubscribed: boolean;
  };
  urgency: 'low' | 'medium' | 'high' | 'critical';
  daysRemaining: number;
  suggestedQuantity: number;
  estimatedRunOutDate: string;
  reason: string;
  confidence: number;
}

const GroceryRestockSuggestions = () => {
  const {
    restockSuggestions,
    autoRestockEnabled,
    generateRestockSuggestions,
    dismissSuggestion,
    acceptSuggestion,
    toggleAutoRestock,
    getUrgentSuggestions,
    groceryItems
  } = useGroceryRestockStore();
  
  const { addItem } = useCartStore();
  const [showAll, setShowAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    generateRestockSuggestions();
    
    // Auto-generate suggestions every hour
    const interval = setInterval(() => {
      generateRestockSuggestions();
    }, 3600000);
    
    return () => clearInterval(interval);
  }, [generateRestockSuggestions]);

  const urgentSuggestions = getUrgentSuggestions();
  const displayedSuggestions = showAll ? restockSuggestions : urgentSuggestions.slice(0, 3);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'medium': return <Bell className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Package className="h-4 w-4 text-blue-500" />;
      default: return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAddToCart = (suggestion: RestockSuggestion) => {
    const product: Product = {
      id: suggestion.item.id,
      name: suggestion.item.name,
      price: suggestion.item.price,
      image: suggestion.item.image,
      category: suggestion.item.category,
      rating: 4.5,
      reviews: 0,
      inStock: true,
      description: `Auto-suggested restock for ${suggestion.item.name}`,
      freeShipping: true,
      sustainability_score: 8.0,
      eco_friendly: suggestion.item.category === 'Produce',
      trust_score: 8.5,
      verified_reviews: 0
    };
    
    addItem(product);
    acceptSuggestion(suggestion.item.id);
  };

  const handleBulkAddToCart = () => {
    selectedItems.forEach(itemId => {
      const suggestion = restockSuggestions.find(s => s.item.id === itemId);
      if (suggestion) {
        handleAddToCart(suggestion);
      }
    });
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (restockSuggestions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-xl">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Grocery Restock Assistant</h3>
        </div>
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">All your groceries are well stocked!</p>
          <p className="text-sm text-gray-500">We'll notify you when items need restocking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Smart Restock Suggestions</h3>
            <p className="text-sm text-gray-600">
              {urgentSuggestions.length} urgent • {restockSuggestions.length} total items
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoRestock}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              autoRestockEnabled
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bell className="h-4 w-4" />
            Auto-suggest {autoRestockEnabled ? 'ON' : 'OFF'}
          </button>
          
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkAddToCart}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              Add {selectedItems.length} to Cart
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-red-50 rounded-xl">
          <div className="text-2xl font-bold text-red-600">
            {restockSuggestions.filter(s => s.urgency === 'critical').length}
          </div>
          <div className="text-sm text-red-700">Out of Stock</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl">
          <div className="text-2xl font-bold text-orange-600">
            {restockSuggestions.filter(s => s.urgency === 'high').length}
          </div>
          <div className="text-sm text-orange-700">Running Low</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">
            {restockSuggestions.filter(s => s.daysRemaining <= 7).length}
          </div>
          <div className="text-sm text-blue-700">This Week</div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        {displayedSuggestions.map((suggestion) => (
          <div
            key={suggestion.item.id}
            className={`p-4 rounded-xl border-2 transition-all ${getUrgencyColor(suggestion.urgency)} ${
              selectedItems.includes(suggestion.item.id) ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Selection Checkbox */}
              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(suggestion.item.id)}
                  onChange={() => toggleItemSelection(suggestion.item.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  aria-label={`Select ${suggestion.item.name} for bulk action`}
                />
              </div>

              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={suggestion.item.image}
                  alt={suggestion.item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{suggestion.item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.reason}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        {getUrgencyIcon(suggestion.urgency)}
                        <span className="capitalize font-medium">{suggestion.urgency}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {suggestion.daysRemaining === 0 
                            ? 'Out now' 
                            : `${suggestion.daysRemaining} days left`
                          }
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span>{suggestion.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      ${suggestion.item.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Qty: {suggestion.suggestedQuantity}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => dismissSuggestion(suggestion.item.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Dismiss suggestion for ${suggestion.item.name}`}
                        title="Dismiss suggestion"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(suggestion)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less */}
      {restockSuggestions.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAll ? 'Show Less' : `Show All ${restockSuggestions.length} Suggestions`}
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Smart Shopping Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Enable auto-suggest to get timely restock notifications</li>
          <li>• Buy in bulk for non-perishables to save money</li>
          <li>• Check expiration dates when restocking perishables</li>
          <li>• Consider subscribing to frequently purchased items</li>
        </ul>
      </div>
    </div>
  );
};

export default GroceryRestockSuggestions;
