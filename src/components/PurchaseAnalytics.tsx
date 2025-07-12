import React, { useState } from 'react';
import { useRestockStore } from '@/store/restockStore';
import ConsumptionFeedback from './ConsumptionFeedback';
import { FaHistory, FaChartLine, FaCalendarAlt, FaShoppingCart, FaBrain, FaClock, FaArrowRight } from 'react-icons/fa';

interface PurchaseAnalyticsProps {
  className?: string;
}

interface PurchaseRecord {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  purchase_date: string;
  estimated_consumption_days: number;
  category: string;
  price: number;
  actual_consumption_days?: number;
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

interface ProductGroup {
  product_id: string;
  product_name: string;
  category: string;
  purchases: PurchaseRecord[];
  total_quantity: number;
  total_spent: number;
  avg_days_between_purchases: number;
  predicted_consumption: RestockPrediction | null;
}

interface InsightData {
  fastest_consumed: ProductGroup | null;
  slowest_consumed: ProductGroup | null;
  most_frequent: ProductGroup | null;
  highest_spending: ProductGroup | null;
  total_items: number;
  total_spent: number;
}

const PurchaseAnalytics: React.FC<PurchaseAnalyticsProps> = ({ className = '' }) => {
  const { purchaseHistory, restockPredictions } = useRestockStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  // Filter purchase history by timeframe
  const getFilteredPurchases = () => {
    const now = new Date();
    const timeframes = {
      week: 7,
      month: 30,
      quarter: 90
    };
    
    const daysToFilter = timeframes[selectedTimeframe];
    const cutoffDate = new Date(now.getTime() - (daysToFilter * 24 * 60 * 60 * 1000));
    
    return purchaseHistory
      .filter(purchase => new Date(purchase.purchase_date) >= cutoffDate)
      .sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime());
  };

  // Group purchases by product
  const getProductAnalytics = (): ProductGroup[] => {
    const filteredPurchases = getFilteredPurchases();
    const productGroups: Record<string, ProductGroup> = {};

    filteredPurchases.forEach(purchase => {
      if (!productGroups[purchase.product_id]) {
        productGroups[purchase.product_id] = {
          product_id: purchase.product_id,
          product_name: purchase.product_name,
          category: purchase.category,
          purchases: [],
          total_quantity: 0,
          total_spent: 0,
          avg_days_between_purchases: 0,
          predicted_consumption: null
        };
      }
      
      productGroups[purchase.product_id].purchases.push(purchase);
      productGroups[purchase.product_id].total_quantity += purchase.quantity;
      productGroups[purchase.product_id].total_spent += purchase.price * purchase.quantity;
    });

    // Calculate averages and add predictions
    Object.values(productGroups).forEach((group: ProductGroup) => {
      if (group.purchases.length > 1) {
        // Calculate average days between purchases
        const sortedPurchases = group.purchases.sort((a: PurchaseRecord, b: PurchaseRecord) => 
          new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime()
        );
        
        let totalDaysBetween = 0;
        for (let i = 1; i < sortedPurchases.length; i++) {
          const daysBetween = Math.ceil(
            (new Date(sortedPurchases[i].purchase_date).getTime() - 
             new Date(sortedPurchases[i-1].purchase_date).getTime()) / (24 * 60 * 60 * 1000)
          );
          totalDaysBetween += daysBetween;
        }
        group.avg_days_between_purchases = Math.round(totalDaysBetween / (sortedPurchases.length - 1));
      }

      // Find corresponding prediction
      group.predicted_consumption = restockPredictions.find(
        pred => pred.product_id === group.product_id
      );
    });

    return Object.values(productGroups);
  };

  // Get consumption insights
  const getConsumptionInsights = (): InsightData => {
    const analytics = getProductAnalytics();
    const insights: InsightData = {
      fastest_consumed: null,
      slowest_consumed: null,
      most_frequent: null,
      highest_spending: null,
      total_items: analytics.length,
      total_spent: analytics.reduce((sum: number, item: ProductGroup) => sum + item.total_spent, 0)
    };

    analytics.forEach(item => {
      // Fastest consumed (shortest avg days between purchases)
      if (item.avg_days_between_purchases > 0) {
        if (!insights.fastest_consumed || 
            item.avg_days_between_purchases < insights.fastest_consumed.avg_days_between_purchases) {
          insights.fastest_consumed = item;
        }
        
        // Slowest consumed
        if (!insights.slowest_consumed || 
            item.avg_days_between_purchases > insights.slowest_consumed.avg_days_between_purchases) {
          insights.slowest_consumed = item;
        }
      }

      // Most frequent purchases
      if (!insights.most_frequent || item.purchases.length > insights.most_frequent.purchases.length) {
        insights.most_frequent = item;
      }

      // Highest spending
      if (!insights.highest_spending || item.total_spent > insights.highest_spending.total_spent) {
        insights.highest_spending = item;
      }
    });

    return insights;
  };

  const productAnalytics = getProductAnalytics();
  const insights = getConsumptionInsights();
  const filteredPurchases = getFilteredPurchases();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeframeLabel = () => {
    const labels = {
      week: 'Past Week',
      month: 'Past Month', 
      quarter: 'Past 3 Months'
    };
    return labels[selectedTimeframe];
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaHistory className="text-blue-600 text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Purchase Analytics & AI Predictions</h3>
            <p className="text-gray-600 text-sm">Detailed consumption patterns and restocking insights</p>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(['week', 'month', 'quarter'] as const).map(timeframe => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {timeframe === 'week' ? '7 Days' : timeframe === 'month' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {filteredPurchases.length === 0 ? (
        <div className="text-center py-8">
          <FaHistory className="text-gray-400 text-4xl mx-auto mb-3" />
          <p className="text-gray-600">No purchases found in the selected timeframe</p>
          <p className="text-sm text-gray-500">Start shopping to see your consumption analytics!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Consumption Feedback */}
          <ConsumptionFeedback />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FaShoppingCart className="text-blue-600" />
                <span className="font-semibold text-blue-800">Total Purchases</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{filteredPurchases.length}</p>
              <p className="text-sm text-blue-700">{insights.total_items} unique products</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <FaChartLine className="text-green-600" />
                <span className="font-semibold text-green-800">Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-green-900">${insights.total_spent.toFixed(2)}</p>
              <p className="text-sm text-green-700">in {getTimeframeLabel().toLowerCase()}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-orange-600" />
                <span className="font-semibold text-orange-800">Fastest Consumed</span>
              </div>
              <p className="text-lg font-bold text-orange-900">
                {insights.fastest_consumed?.product_name || 'N/A'}
              </p>
              <p className="text-sm text-orange-700">
                {insights.fastest_consumed ? `Every ${insights.fastest_consumed.avg_days_between_purchases} days` : 'Not enough data'}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <FaBrain className="text-purple-600" />
                <span className="font-semibold text-purple-800">AI Predictions</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{restockPredictions.length}</p>
              <p className="text-sm text-purple-700">active predictions</p>
            </div>
          </div>

          {/* Product Analytics Table */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-600" />
              Product Consumption Analysis - {getTimeframeLabel()}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Purchases</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Qty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Spent</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg Days Between</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">AI Prediction</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Next Restock</th>
                  </tr>
                </thead>
                <tbody>
                  {productAnalytics.map((product, index) => (
                    <tr key={product.product_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-800">{product.product_name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                          {product.purchases.length}x
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{product.total_quantity}</td>
                      <td className="py-3 px-4 font-medium text-green-600">${product.total_spent.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        {product.avg_days_between_purchases > 0 ? (
                          <span className="text-gray-700">{product.avg_days_between_purchases} days</span>
                        ) : (
                          <span className="text-gray-400">Single purchase</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {product.predicted_consumption ? (
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              product.predicted_consumption.priority === 'high' ? 'bg-red-500' :
                              product.predicted_consumption.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm">
                              {Math.round(product.predicted_consumption.confidence_score * 100)}% confident
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Learning...</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {product.predicted_consumption ? (
                          <div>
                            <p className="font-medium text-gray-800">
                              {product.predicted_consumption.days_until_runout > 0 
                                ? `${product.predicted_consumption.days_until_runout} days`
                                : 'Overdue'
                              }
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {product.predicted_consumption.suggested_quantity}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No prediction</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Purchase History */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" />
              Recent Purchase Timeline - {getTimeframeLabel()}
            </h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredPurchases.slice(0, 10).map((purchase, index) => (
                <div key={`${purchase.id}-${index}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">{purchase.product_name}</p>
                      <span className="text-sm text-gray-600">{formatDate(purchase.purchase_date)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>Qty: {purchase.quantity}</span>
                      <span>•</span>
                      <span>${(purchase.price * purchase.quantity).toFixed(2)}</span>
                      <span>•</span>
                      <span>{purchase.category}</span>
                      {purchase.actual_consumption_days && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600">Lasted {purchase.actual_consumption_days} days</span>
                        </>
                      )}
                    </div>
                  </div>
                  <FaArrowRight className="text-gray-400" />
                </div>
              ))}
              {filteredPurchases.length > 10 && (
                <p className="text-center text-sm text-gray-500 py-2">
                  ... and {filteredPurchases.length - 10} more purchases
                </p>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaBrain className="text-purple-600" />
              AI Consumption Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Most Frequent Purchase:</span> {insights.most_frequent?.product_name || 'N/A'}
                  {insights.most_frequent && ` (${insights.most_frequent.purchases.length} times)`}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Highest Spending:</span> {insights.highest_spending?.product_name || 'N/A'}
                  {insights.highest_spending && ` ($${insights.highest_spending.total_spent.toFixed(2)})`}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Fastest Consumption:</span> {insights.fastest_consumed?.product_name || 'N/A'}
                  {insights.fastest_consumed && ` (every ${insights.fastest_consumed.avg_days_between_purchases} days)`}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Slowest Consumption:</span> {insights.slowest_consumed?.product_name || 'N/A'}
                  {insights.slowest_consumed && ` (every ${insights.slowest_consumed.avg_days_between_purchases} days)`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseAnalytics;
