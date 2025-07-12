import React, { useState } from 'react';
import { useRestockStore } from '@/store/restockStore';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaCheck, FaTimes, FaBrain } from 'react-icons/fa';

interface ConsumptionFeedbackProps {
  className?: string;
}

const ConsumptionFeedback: React.FC<ConsumptionFeedbackProps> = ({ className = '' }) => {
  const { purchaseHistory, updateConsumptionRate } = useRestockStore();
  const [editingPurchase, setEditingPurchase] = useState<string | null>(null);
  const [actualDays, setActualDays] = useState<number>(0);

  // Get recent purchases that don't have actual consumption data
  const getRecentPurchasesForFeedback = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    return purchaseHistory
      .filter(purchase => {
        const purchaseDate = new Date(purchase.purchase_date);
        return purchaseDate >= thirtyDaysAgo && 
               !purchase.actual_consumption_days &&
               purchase.category === 'Groceries';
      })
      .sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime())
      .slice(0, 5); // Show only latest 5 for feedback
  };

  const handleStartEdit = (purchaseId: string, estimatedDays: number) => {
    setEditingPurchase(purchaseId);
    setActualDays(estimatedDays);
  };

  const handleSaveFeedback = (productId: string) => {
    if (actualDays > 0) {
      updateConsumptionRate(productId, actualDays);
      setEditingPurchase(null);
      setActualDays(0);
    }
  };

  const handleCancelEdit = () => {
    setEditingPurchase(null);
    setActualDays(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysAgo = (dateString: string) => {
    const now = new Date();
    const purchaseDate = new Date(dateString);
    const diffTime = now.getTime() - purchaseDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const feedbackPurchases = getRecentPurchasesForFeedback();

  if (feedbackPurchases.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <FaBrain className="text-blue-600 text-xl" />
        <div>
          <h3 className="text-lg font-bold text-gray-800">Help AI Learn Your Consumption Patterns</h3>
          <p className="text-gray-600 text-sm">
            Tell us how long these items actually lasted to improve future predictions
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {feedbackPurchases.map(purchase => {
          const daysAgo = getDaysAgo(purchase.purchase_date);
          const isEditing = editingPurchase === purchase.id;
          
          return (
            <div key={purchase.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{purchase.product_name}</h4>
                    <span className="text-sm text-gray-500">
                      Purchased {formatDate(purchase.purchase_date)} ({daysAgo} days ago)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Quantity: {purchase.quantity} | 
                    AI estimated: {purchase.estimated_consumption_days} days consumption
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => handleStartEdit(purchase.id, purchase.estimated_consumption_days)}
                        className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <FaEdit />
                        Update Actual Days
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Lasted:</span>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={actualDays}
                        onChange={(e) => setActualDays(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Days"
                      />
                      <span className="text-sm text-gray-600">days</span>
                      <button
                        onClick={() => handleSaveFeedback(purchase.product_id)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-1 rounded"
                        title="Save feedback"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-1 rounded"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {daysAgo >= purchase.estimated_consumption_days && !isEditing && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-700">
                    This item was expected to run out by now. How long did it actually last?
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <FaBrain className="text-blue-600" />
          <span className="font-semibold text-blue-800">How This Helps</span>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your feedback trains the AI to make more accurate predictions</li>
          <li>• Better predictions mean more timely restocking suggestions</li>
          <li>• The system learns your unique consumption patterns over time</li>
        </ul>
      </div>
    </div>
  );
};

export default ConsumptionFeedback;
