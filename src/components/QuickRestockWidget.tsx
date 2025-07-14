import React from 'react';
import { useGroceryRestockStore } from '@/store/groceryRestockStore';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  ShoppingCart,
  ChevronRight,
  Zap
} from 'lucide-react';

const QuickRestockWidget = () => {
  const { restockSuggestions, getUrgentSuggestions } = useGroceryRestockStore();
  const navigate = useNavigate();
  const urgentSuggestions = getUrgentSuggestions();

  const handleViewAll = () => {
    // This would navigate to the AI Assistant with the grocery-restock tab active
    window.location.href = '#ai-assistant?tab=grocery-restock';
  };

  if (restockSuggestions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-xl">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Smart Restock</h3>
        </div>
        <div className="text-center py-4">
          <div className="text-green-600 font-medium mb-2">All groceries well stocked!</div>
          <p className="text-sm text-gray-600">We'll notify you when items need restocking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Smart Restock</h3>
            <p className="text-sm text-gray-600">
              {urgentSuggestions.length} {urgentSuggestions.length === 1 ? 'item' : 'items'} running out of stock
            </p>
          </div>
        </div>
        <button
          onClick={handleViewAll}
          className="text-blue-600 hover:text-blue-700 transition-colors"
          title="View all restock suggestions"
          aria-label="View all restock suggestions"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-xl font-bold text-red-600">
            {restockSuggestions.filter(s => s.urgency === 'critical').length}
          </div>
          <div className="text-xs text-red-700">Out of Stock</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-600">
            {restockSuggestions.filter(s => s.urgency === 'high').length}
          </div>
          <div className="text-xs text-orange-700">Running Low</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-xl font-bold text-yellow-600">
            {restockSuggestions.filter(s => s.urgency === 'medium').length}
          </div>
          <div className="text-xs text-yellow-700">Soon</div>
        </div>
      </div>

      {/* Top Urgent Items */}
      <div className="space-y-2 mb-4">
        {urgentSuggestions.slice(0, 3).map((suggestion) => (
          <div
            key={suggestion.item.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0">
              {suggestion.urgency === 'critical' ? (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              ) : (
                <Clock className="h-4 w-4 text-orange-500" />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {suggestion.item.name}
              </div>
              <div className="text-sm text-gray-600">
                {suggestion.daysRemaining === 0 
                  ? 'Out of stock' 
                  : `${suggestion.daysRemaining} days left`
                }
              </div>
            </div>
            <div className="text-sm font-bold text-gray-900">
              ${suggestion.item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleViewAll}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          View All Suggestions
        </button>
        
        {urgentSuggestions.length > 0 && (
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Potential savings: <span className="font-bold text-green-600">$12-25</span> this month
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickRestockWidget;
