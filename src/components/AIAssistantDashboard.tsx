import Header from './Header';
import SmartRestockSuggestions from './SmartRestockSuggestions';
import React, { useEffect, useState, useRef } from 'react';
import { useAIStore } from '../store/aiStore';
import { useCartStore } from '../store/cartStore';
import { usePurchaseTracking } from '../hooks/usePurchaseTracking';
import { DemoDataSeeder } from '../utils/demoData';
import { FaShieldAlt, FaSyncAlt, FaRobot, FaLeaf, FaChartPie, FaShoppingCart, FaLightbulb } from 'react-icons/fa';

const userTrustScore = 8.8;
const allCategories = ['Electronics', 'Groceries', 'Home & Garden', 'Fashion', 'Eco-friendly', 'Toys', 'Sports'];

const AIAssistantDashboard: React.FC = () => {
  const {
    predictiveCart,
    budgetAnalysis,
    sustainabilityReport,
    isLoading,
    generatePredictiveCart,
    getBudgetAnalysis,
    getSustainabilityReport,
    chatHistory,
    chatWithAI
  } = useAIStore();
  const { items } = useCartStore();

  // Enable purchase tracking
  usePurchaseTracking();

  // User preferences state
  const [budget, setBudget] = useState(800);
  const [categories, setCategories] = useState<string[]>(['Electronics', 'Groceries']);
  const [ecoFriendly, setEcoFriendly] = useState(true);

  // Simulate ML model update on preferences change
  useEffect(() => {
    const cart = {
      id: 'mock-cart',
      user_id: 'mock-user',
      items: items.map(item => ({
        product: { ...item },
        quantity: item.quantity,
        price_at_time: item.price,
      })),
      predicted_items: [],
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      savings: 0,
      sustainability_score: 0,
      budget_impact: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    generatePredictiveCart(cart, { budget, categories, ecoFriendly });
    getBudgetAnalysis('mock-user');
    getSustainabilityReport('mock-user');
    // eslint-disable-next-line
  }, [budget, categories, ecoFriendly, items]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      // Scroll to the last message if chat history is not empty
      // This effect is now handled by the global chat component
    }
  }, [chatHistory]);

  // Mock sustainability insights
  const ecoScore = ecoFriendly ? 8.2 : 6.1;
  const ecoTips = ecoFriendly
    ? [
        'You are making great eco-friendly choices! Consider reusable shopping bags.',
        'Try to buy products with minimal packaging.',
        'Explore more plant-based options for a lower carbon footprint.'
      ]
    : [
        'Switching to eco-friendly products can reduce your carbon footprint.',
        'Try to add at least one green product to your cart each month.'
      ];

  // Mock smart recommendations
  const smartRecs = [
    {
      name: 'EcoSmart LED Bulbs',
      reason: 'Save energy and money with these long-lasting bulbs.',
      price: 19.99,
      category: 'Eco-friendly',
    },
    {
      name: 'Reusable Water Bottle',
      reason: 'Reduce plastic waste and stay hydrated on the go.',
      price: 12.99,
      category: 'Eco-friendly',
    },
    {
      name: 'Organic Cotton T-Shirt',
      reason: 'Sustainable fashion for everyday comfort.',
      price: 24.99,
      category: 'Fashion',
    },
  ];

  // Category selection logic
  const toggleCategory = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  return (
    <>
      <Header />
      {/* Main AI Assistant Page Content */}
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-2 sm:px-0 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 mb-10 animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <FaRobot className="text-yellow-400 text-4xl animate-bounce" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-1 tracking-tight">AI Shopping Assistant</h1>
              <div className="text-blue-600 font-semibold text-lg flex items-center gap-2"><FaShieldAlt className="text-blue-400" /> Trust Score: <span className="text-blue-900">{userTrustScore}</span></div>
            </div>
          </div>

          {isLoading && <div className="mb-4 text-blue-500 font-semibold flex items-center gap-2"><FaSyncAlt className="animate-spin" /> Loading smart insights...</div>}

          {/* Smart Restock Suggestions - Priority Feature */}
          <section className="mb-8">
            <DemoDataSeeder />
            <SmartRestockSuggestions onAddToCart={(productId, quantity) => {
              console.log(`Added ${quantity} of ${productId} to cart from AI suggestions`);
            }} />
          </section>

          {/* User Preferences Form */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><FaRobot className="text-blue-400" /> Personalize Your Experience</h2>
            <form className="flex flex-col gap-4 bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label htmlFor="budget-input" className="font-semibold text-blue-900">Monthly Budget ($):</label>
                <input
                  id="budget-input"
                  type="number"
                  min={100}
                  max={10000}
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-bold text-blue-700"
                  placeholder="Enter budget"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label className="font-semibold text-blue-900">Categories:</label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1 rounded-full border font-semibold text-sm transition-all duration-150 ${categories.includes(cat) ? 'bg-blue-600 text-white border-blue-700 shadow' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="eco-friendly-checkbox" className="font-semibold text-blue-900">Eco-Friendly Only:</label>
                <input
                  id="eco-friendly-checkbox"
                  type="checkbox"
                  checked={ecoFriendly}
                  onChange={e => setEcoFriendly(e.target.checked)}
                  className="w-5 h-5 accent-blue-600"
                  title="Enable eco-friendly products only"
                />
                <span className="text-blue-700 font-medium">{ecoFriendly ? 'Yes' : 'No'}</span>
              </div>
            </form>
          </section>

          {/* Predictive Cart Suggestions - Simplified */}
          {predictiveCart.suggested_items.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FaShoppingCart className="text-blue-400" /> Additional Recommendations</h2>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700 mb-3">Based on your preferences, you might also like:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {predictiveCart.suggested_items.slice(0, 4).map((item, idx) => (
                    <div key={item.product.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border">
                      <div>
                        <span className="font-semibold text-blue-900 text-sm">{item.product.name}</span>
                        <span className="ml-2 text-sm text-gray-600">${item.product.price.toFixed(2)}</span>
                      </div>
                      <span className="text-green-600 font-bold text-sm">{Math.round((predictiveCart.confidence_scores[item.product.id] || 0) * 100)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Smart Restock Suggestions - Removed from here as it's now at the top */}

          {/* Smart Budgeting */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FaChartPie className="text-blue-500" /> Smart Budgeting</h2>
            <div className="bg-blue-50 p-4 rounded-xl shadow border border-blue-100">
              <div>Monthly Budget: <span className="font-bold">${budgetAnalysis.monthly_budget}</span></div>
              <div>Current Spending: <span className="font-bold">${budgetAnalysis.current_spending}</span></div>
              <div>Predicted Spending: <span className="font-bold">${budgetAnalysis.predicted_spending}</span></div>
              <ul className="mt-2 text-sm text-yellow-700">
                {budgetAnalysis.budget_alerts.map((alert, idx) => (
                  <li key={idx}>⚠️ {alert}</li>
                ))}
              </ul>
              <ul className="mt-2 text-sm text-green-700">
                {budgetAnalysis.savings_opportunities.map((op, idx) => (
                  <li key={idx}>💡 {op.suggestion} (Save ${op.potential_savings} on {op.category})</li>
                ))}
              </ul>
              {/* Spending by Category */}
              {budgetAnalysis.category_breakdown && Object.keys(budgetAnalysis.category_breakdown).length > 0 && (
                <div className="mt-4">
                  <div className="font-semibold mb-1">Spending by Category:</div>
                  <ul className="text-sm text-blue-900">
                    {Object.entries(budgetAnalysis.category_breakdown).map(([cat, total]) => (
                      <li key={cat}>{cat}: <span className="font-bold">${total.toFixed(2)}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Top 3 Costliest Items */}
              {budgetAnalysis.top_items && budgetAnalysis.top_items.length > 0 && (
                <div className="mt-4">
                  <div className="font-semibold mb-1">Top 3 Costliest Items:</div>
                  <ul className="text-sm text-red-900">
                    {budgetAnalysis.top_items.map((item, idx) => (
                      <li key={idx}>{item.name}: <span className="font-bold">${item.total}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Sustainability Insights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FaLightbulb className="text-yellow-400" /> Sustainability Insights</h2>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-2 text-blue-900 font-semibold">Eco Score: <span className="font-bold">{ecoScore}</span> / 10</div>
            <ul className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 space-y-2">
              {ecoTips.map((tip, idx) => (
                <li key={idx}>🌱 {tip}</li>
              ))}
            </ul>
          </section>

          {/* Smart Recommendations */}
          <section>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FaRobot className="text-blue-400" /> Smart Recommendations</h2>
            <ul className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 space-y-3">
              {smartRecs.map((rec, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <span className="font-semibold text-blue-900 text-lg">{rec.name}</span>
                    <span className="ml-2 text-base text-gray-400 font-medium">${rec.price.toFixed(2)}</span>
                    <div className="text-xs text-gray-500 mt-1">{rec.reason}</div>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm mt-2 sm:mt-0">{rec.category}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default AIAssistantDashboard; 