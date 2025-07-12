import React, { useEffect, useState } from 'react';
import { useRestockStore } from '@/store/restockStore';
import { useCartStore } from '@/store/cartStore';
import PurchaseAnalytics from './PurchaseAnalytics';
import { FaShoppingCart, FaClock, FaExclamationTriangle, FaCheckCircle, FaCalendarAlt, FaRobot, FaBell, FaChartLine } from 'react-icons/fa';

interface SmartRestockSuggestionsProps {
  onAddToCart?: (productId: string, quantity: number) => void;
}

interface RestockPrediction {
  product_id: string;
  product_name: string;
  category: string;
  last_purchase_date: string;
  average_consumption_days: number;
  predicted_runout_date: string;
  confidence_score: number;
  suggested_quantity: number;
  priority: 'high' | 'medium' | 'low';
  days_until_runout: number;
  price: number;
  image: string;
}

const SmartRestockSuggestions: React.FC<SmartRestockSuggestionsProps> = ({ onAddToCart }) => {
  const {
    restockPredictions,
    notifications,
    isAnalyzing,
    generateRestockPredictions,
    dismissNotification,
    markActionTaken,
    getGroceryRestockPlan,
    getLowStockItems
  } = useRestockStore();

  const { addItem, updateQuantity } = useCartStore();
  const [activeTab, setActiveTab] = useState<'urgent' | 'thisWeek' | 'plan' | 'analytics'>('urgent');

  useEffect(() => {
    // Generate predictions on component mount
    generateRestockPredictions();
  }, [generateRestockPredictions]);

  const lowStockItems = getLowStockItems();
  const groceryPlan = getGroceryRestockPlan();
  const urgentNotifications = notifications.filter(n => !n.is_read && n.type === 'restock_now');

  const handleAddToCart = (prediction: RestockPrediction) => {
    // Mock product object for cart
    const product = {
      id: prediction.product_id,
      name: prediction.product_name,
      price: prediction.price,
      image: prediction.image,
      category: prediction.category,
      rating: 4.5,
      reviews: 100,
      freeShipping: true,
      inStock: true,
      description: `Auto-suggested restock for ${prediction.product_name}`,
      sustainability_score: 0.8,
      eco_friendly: false,
      trust_score: 8.5,
      verified_reviews: 80
    };

    // Add to cart first
    addItem(product);
    
    // Then update quantity if it's more than 1
    if (prediction.suggested_quantity > 1) {
      updateQuantity(prediction.product_id, prediction.suggested_quantity);
    }
    
    // Mark related notifications as action taken
    const relatedNotifications = notifications.filter(n => n.product_id === prediction.product_id);
    relatedNotifications.forEach(notif => markActionTaken(notif.id));

    if (onAddToCart) {
      onAddToCart(prediction.product_id, prediction.suggested_quantity);
    }
  };

  const formatDaysUntilRunout = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaRobot className="text-blue-600 text-xl animate-spin" />
          <h3 className="text-xl font-bold text-gray-800">Analyzing Your Purchase Patterns...</h3>
        </div>
        <div className="space-y-3">
          <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
          <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-blue-600 text-2xl" />
        <div>
          <h3 className="text-xl font-bold text-gray-800">Smart Restock Predictions</h3>
          <p className="text-gray-600 text-sm">AI-powered grocery restocking based on your consumption patterns</p>
        </div>
      </div>

      {/* Urgent Notifications */}
      {urgentNotifications.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FaBell className="text-red-600" />
            <h4 className="font-semibold text-red-800">Urgent Restocking Needed!</h4>
          </div>
          {urgentNotifications.map(notification => (
            <div key={notification.id} className="flex items-center justify-between">
              <p className="text-red-700 text-sm">{notification.message}</p>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="text-red-600 hover:text-red-800 text-xs"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('urgent')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'urgent'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Urgent ({lowStockItems.length})
        </button>
        <button
          onClick={() => setActiveTab('thisWeek')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'thisWeek'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          This Week ({groceryPlan.thisWeek.length})
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'plan'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Monthly Plan
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'analytics'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaChartLine className="text-xs" />
          Analytics
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'urgent' && (
        <div className="space-y-4">
          {lowStockItems.length === 0 ? (
            <div className="text-center py-8">
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
              <p className="text-gray-600">No urgent restocking needed! 🎉</p>
              <p className="text-sm text-gray-500">All your essentials are well stocked.</p>
            </div>
          ) : (
            lowStockItems.map(prediction => (
              <div key={prediction.product_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={prediction.image} 
                        alt={prediction.product_name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{prediction.product_name}</h4>
                        <p className="text-sm text-gray-600">{prediction.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`px-2 py-1 rounded-full border ${getPriorityColor(prediction.priority)}`}>
                        {prediction.priority.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <FaClock />
                        {formatDaysUntilRunout(prediction.days_until_runout)}
                      </span>
                      <span className="text-gray-600">
                        Confidence: {Math.round(prediction.confidence_score * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">${prediction.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Qty: {prediction.suggested_quantity}</p>
                    <button
                      onClick={() => handleAddToCart(prediction)}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'thisWeek' && (
        <div className="space-y-4">
          {groceryPlan.thisWeek.length === 0 ? (
            <div className="text-center py-8">
              <FaCalendarAlt className="text-blue-500 text-4xl mx-auto mb-3" />
              <p className="text-gray-600">No restocking needed this week!</p>
            </div>
          ) : (
            groceryPlan.thisWeek.map(prediction => (
              <div key={prediction.product_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={prediction.image} 
                      alt={prediction.product_name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{prediction.product_name}</h4>
                      <p className="text-sm text-gray-600">
                        Runs out in {formatDaysUntilRunout(prediction.days_until_runout)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(prediction)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors"
                  >
                    Add ${prediction.price.toFixed(2)}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaExclamationTriangle className="text-orange-500" />
              Next Week ({groceryPlan.nextWeek.length} items)
            </h4>
            <div className="space-y-2">
              {groceryPlan.nextWeek.slice(0, 3).map(prediction => (
                <div key={prediction.product_id} className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg">
                  <span className="text-sm">{prediction.product_name}</span>
                  <span className="text-sm text-gray-600">{formatDaysUntilRunout(prediction.days_until_runout)}</span>
                </div>
              ))}
              {groceryPlan.nextWeek.length > 3 && (
                <p className="text-sm text-gray-500">...and {groceryPlan.nextWeek.length - 3} more items</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              Month End ({groceryPlan.monthEnd.length} items)
            </h4>
            <div className="space-y-2">
              {groceryPlan.monthEnd.slice(0, 3).map(prediction => (
                <div key={prediction.product_id} className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">{prediction.product_name}</span>
                  <span className="text-sm text-gray-600">{formatDaysUntilRunout(prediction.days_until_runout)}</span>
                </div>
              ))}
              {groceryPlan.monthEnd.length > 3 && (
                <p className="text-sm text-gray-500">...and {groceryPlan.monthEnd.length - 3} more items</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-800 mb-2">💡 Smart Tips</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Buy in bulk for better prices on month-end items</li>
              <li>• Check for bundle deals on frequently purchased items</li>
              <li>• Consider subscription delivery for regular essentials</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <PurchaseAnalytics />
      )}

      {restockPredictions.length === 0 && activeTab !== 'analytics' && (
        <div className="text-center py-12">
          <FaRobot className="text-gray-400 text-6xl mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-600 mb-2">Start Building Your Purchase History</h4>
          <p className="text-gray-500 mb-4">
            Make a few purchases and I'll learn your consumption patterns to predict when you'll need to restock!
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
            <h5 className="font-medium text-blue-800 mb-2">How it works:</h5>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. 🛒 Make grocery purchases</li>
              <li>2. 🤖 AI learns your consumption patterns</li>
              <li>3. 📅 Get smart restock predictions</li>
              <li>4. 🔔 Receive timely notifications</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRestockSuggestions;
