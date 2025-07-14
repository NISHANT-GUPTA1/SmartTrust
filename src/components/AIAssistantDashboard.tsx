import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Leaf, 
  Target, 
  Brain, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Package, 
  Star,
  Filter,
  RefreshCw,
  Settings,
  ChevronRight,
  Lightbulb,
  BarChart3,
  Activity,
  MessageCircle,
  Send,
  User,
  Bot,
  X,
  Minimize2,
  Maximize2,
  Plus,
  Minus,
  ShoppingBag,
  Calendar,
  Zap,
  Archive,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  AlarmClock,
  Timer,
  Repeat,
  CheckSquare,
  Square
} from 'lucide-react';

// Mock restock data with alarm features
const mockRestockItems = [
  {
    id: 1,
    name: 'Organic Milk',
    category: 'Groceries',
    currentStock: 1,
    suggestedQuantity: 4,
    lastPurchased: '2024-07-01',
    avgConsumption: '3 per week',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100',
    priority: 'high',
    daysUntilEmpty: 2,
    alarmEnabled: true,
    nextAlarm: new Date(Date.now() + 86400000), // 1 day from now
    recurring: true,
    consumptionPattern: 'weekly'
  },
  {
    id: 2,
    name: 'Greek Yogurt',
    category: 'Groceries',
    currentStock: 2,
    suggestedQuantity: 6,
    lastPurchased: '2024-06-28',
    avgConsumption: '2 per week',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1571212515416-06038b3ef12b?w=100',
    priority: 'medium',
    daysUntilEmpty: 4,
    alarmEnabled: false,
    nextAlarm: null,
    recurring: false,
    consumptionPattern: 'bi-weekly'
  },
  {
    id: 3,
    name: 'Whole Wheat Bread',
    category: 'Groceries',
    currentStock: 0,
    suggestedQuantity: 3,
    lastPurchased: '2024-06-25',
    avgConsumption: '1 per week',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100',
    priority: 'high',
    daysUntilEmpty: 0,
    alarmEnabled: true,
    nextAlarm: new Date(Date.now() + 3600000), // 1 hour from now
    recurring: true,
    consumptionPattern: 'weekly'
  },
  {
    id: 4,
    name: 'Bananas',
    category: 'Produce',
    currentStock: 3,
    suggestedQuantity: 8,
    lastPurchased: '2024-06-30',
    avgConsumption: '6 per week',
    price: 1.29,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100',
    priority: 'medium',
    daysUntilEmpty: 3,
    alarmEnabled: true,
    nextAlarm: new Date(Date.now() + 259200000), // 3 days from now
    recurring: true,
    consumptionPattern: 'twice-weekly'
  },
  {
    id: 5,
    name: 'Toothpaste',
    category: 'Personal Care',
    currentStock: 0,
    suggestedQuantity: 2,
    lastPurchased: '2024-05-15',
    avgConsumption: '1 per month',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100',
    priority: 'high',
    daysUntilEmpty: 0,
    alarmEnabled: true,
    nextAlarm: new Date(Date.now() + 1800000), // 30 minutes from now
    recurring: true,
    consumptionPattern: 'monthly'
  },
  {
    id: 6,
    name: 'Chicken Breast',
    category: 'Meat',
    currentStock: 1,
    suggestedQuantity: 3,
    lastPurchased: '2024-06-20',
    avgConsumption: '1 per 3 weeks',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100',
    priority: 'medium',
    daysUntilEmpty: 7,
    alarmEnabled: true,
    nextAlarm: new Date(Date.now() + 604800000), // 7 days from now
    recurring: true,
    consumptionPattern: 'tri-weekly'
  }
];

const AIAssistantDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [budget, setBudget] = useState(800);
  const [categories, setCategories] = useState(['Electronics', 'Groceries']);
  const [ecoFriendly, setEcoFriendly] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockItems, setRestockItems] = useState([]);
  const [alarmSettings, setAlarmSettings] = useState({
    enabled: true,
    sound: true,
    reminderDays: 3,
    autoReorder: false
  });
  const [activeAlarms, setActiveAlarms] = useState([]);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI Shopping Assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cartItems, setCartItems] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartNotificationMessage, setCartNotificationMessage] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);

  const userTrustScore = 8.8;
  const allCategories = ['Electronics', 'Groceries', 'Home & Garden', 'Fashion', 'Eco-friendly', 'Toys', 'Sports'];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize restock items and alarms
  useEffect(() => {
    const itemsWithQuantity = mockRestockItems.map(item => ({
      ...item,
      selectedQuantity: item.suggestedQuantity,
      unit: 'pieces'
    }));
    setRestockItems(itemsWithQuantity);

    // Set up active alarms
    const urgentAlarms = itemsWithQuantity.filter(item => 
      item.alarmEnabled && item.daysUntilEmpty <= 2
    );
    setActiveAlarms(urgentAlarms);
  }, []);

  // Check for triggered alarms
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const triggeredAlarms = restockItems.filter(item => 
        item.alarmEnabled && 
        item.nextAlarm && 
        now >= item.nextAlarm
      );
      
      if (triggeredAlarms.length > 0) {
        setActiveAlarms(prev => [...prev, ...triggeredAlarms]);
        if (alarmSettings.sound) {
          // Play alarm sound (simulated)
          console.log('🔔 ALARM: Items need restocking!');
        }
      }
    };

    const interval = setInterval(checkAlarms, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [restockItems, alarmSettings]);

  // Mock data for charts
  const spendingData = [
    { month: 'Jan', spending: 650, budget: 800, savings: 150 },
    { month: 'Feb', spending: 720, budget: 800, savings: 80 },
    { month: 'Mar', spending: 590, budget: 800, savings: 210 },
    { month: 'Apr', spending: 680, budget: 800, savings: 120 },
    { month: 'May', spending: 750, budget: 800, savings: 50 },
    { month: 'Jun', spending: 620, budget: 800, savings: 180 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 320, color: '#3B82F6' },
    { name: 'Groceries', value: 280, color: '#10B981' },
    { name: 'Fashion', value: 120, color: '#F59E0B' },
    { name: 'Home & Garden', value: 80, color: '#EF4444' },
  ];

  const sustainabilityData = [
    { month: 'Jan', score: 7.2, target: 8.0 },
    { month: 'Feb', score: 7.8, target: 8.0 },
    { month: 'Mar', score: 8.1, target: 8.0 },
    { month: 'Apr', score: 7.9, target: 8.0 },
    { month: 'May', score: 8.3, target: 8.0 },
    { month: 'Jun', score: 8.2, target: 8.0 },
  ];

  const smartRecommendations = [
    {
      id: 1,
      name: 'EcoSmart LED Bulbs',
      price: 19.99,
      reason: 'Save energy and money with these long-lasting bulbs',
      category: 'Eco-friendly',
      confidence: 94,
      savings: 45,
      impact: 'High',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=100',
    },
    {
      id: 2,
      name: 'Reusable Water Bottle',
      price: 12.99,
      reason: 'Reduce plastic waste and stay hydrated',
      category: 'Eco-friendly',
      confidence: 87,
      savings: 25,
      impact: 'Medium',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100',
    },
    {
      id: 3,
      name: 'Smart Thermostat',
      price: 149.99,
      reason: 'Optimize home energy usage automatically',
      category: 'Electronics',
      confidence: 91,
      savings: 120,
      impact: 'High',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100',
    },
  ];

  const budgetInsights = {
    currentSpending: 680,
    predictedSpending: 750,
    savingsOpportunities: 120,
    alerts: [
      { type: 'warning', message: 'Approaching budget limit for Electronics' },
      { type: 'success', message: 'Great savings on Groceries this month!' },
    ],
  };

  const toggleCategory = (cat) => {
    setCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat) 
        : [...prev, cat]
    );
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleQuantityChange = (itemId, change) => {
    setRestockItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, selectedQuantity: Math.max(0, item.selectedQuantity + change) }
        : item
    ));
  };

  const toggleAlarm = (itemId) => {
    setRestockItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, alarmEnabled: !item.alarmEnabled }
        : item
    ));
  };

  const snoozeAlarm = (itemId, hours = 1) => {
    setRestockItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, nextAlarm: new Date(Date.now() + hours * 3600000) }
        : item
    ));
    setActiveAlarms(prev => prev.filter(alarm => alarm.id !== itemId));
  };

  const dismissAlarm = (itemId) => {
    setActiveAlarms(prev => prev.filter(alarm => alarm.id !== itemId));
  };

  const handleAddToCart = (item) => {
    console.log(`Added ${item.selectedQuantity || item.suggestedQuantity} of ${item.name} to cart`);
    
    // Add item to cart
    const cartItem = {
      id: item.id + '_' + Date.now(),
      name: item.name,
      quantity: item.selectedQuantity || item.suggestedQuantity,
      price: item.estimatedCost || item.price,
      unit: item.unit || 'pieces'
    };
    setCartItems(prev => [...prev, cartItem]);
    
    // Show notification
    setCartNotificationMessage(`Items added to the cart`);
    setShowCartNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
    
    // Dismiss alarm when item is added to cart
    if (activeAlarms.some(alarm => alarm.id === item.id)) {
      dismissAlarm(item.id);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setShowCartModal(false);
  };

  const handleRestockAll = () => {
    const selectedItems = restockItems.filter(item => item.selectedQuantity > 0);
    if (selectedItems.length > 0) {
      console.log('Adding all selected items to cart:', selectedItems);
      // Dismiss all alarms for selected items
      selectedItems.forEach(item => {
        if (activeAlarms.some(alarm => alarm.id === item.id)) {
          dismissAlarm(item.id);
        }
      });
      setShowRestockModal(false);
    }
  };

  const getTotalRestockCost = () => {
    return restockItems.reduce((total, item) => total + (item.price * item.selectedQuantity), 0);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTimeUntilAlarm = (nextAlarm: Date | null) => {
    if (!nextAlarm) return 'No alarm set';
    const now = new Date();
    const diff = nextAlarm.getTime() - now.getTime();
    if (diff <= 0) return 'Alarm triggered!';
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "I'd recommend checking out our eco-friendly LED bulbs - they're 75% more energy efficient!",
        "Based on your budget, I found some great deals in Electronics. Would you like me to show them?",
        "Your current spending pattern looks healthy. You're $120 under budget this month!",
        "I notice you're interested in sustainable products. Here are some eco-friendly alternatives...",
        "Would you like me to add those items to your cart? I can also check for better deals.",
        "Your trust score is 8.8/10! You're making smart purchasing decisions consistently.",
        "I can help you set up automatic reorders for your frequently bought items."
      ];
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            change > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );

  // Function aliases for the new tabs
  const updateQuantity = handleQuantityChange;
  const addToCart = handleAddToCart;
  const categorySpending = categoryData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Active Alarms Notification */}
      {activeAlarms.length > 0 && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white p-4 rounded-2xl shadow-2xl animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="h-5 w-5" />
              <div>
                <div className="font-bold">Restock Alert!</div>
                <div className="text-sm">
                  {activeAlarms.length} item{activeAlarms.length !== 1 ? 's' : ''} need{activeAlarms.length === 1 ? 's' : ''} restocking
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveAlarms([])}
              className="text-white hover:text-red-200 hover:bg-red-600 p-1 rounded-full transition-colors ml-3"
              title="Close alerts"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-4 left-4 z-50 bg-green-500 text-white p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{cartNotificationMessage}</span>
          </div>
        </div>
      )}

      {/* Alarm Modal */}
      {showAlarmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Active Restock Alarms</h3>
              <button
                onClick={() => setShowAlarmModal(false)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                title="Close alerts"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {activeAlarms.map((alarm) => (
                <div key={alarm.id} className="p-3 bg-red-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{alarm.name}</span>
                    <span className="text-sm text-red-600 font-medium">
                      {alarm.daysUntilEmpty === 0 ? 'Empty!' : `${alarm.daysUntilEmpty} days left`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => snoozeAlarm(alarm.id, 1)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg text-sm transition-colors"
                    >
                      Snooze 1h
                    </button>
                    <button
                      onClick={() => dismissAlarm(alarm.id)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-lg text-sm transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
              {activeAlarms.length > 1 && (
                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setActiveAlarms([])}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Close All Alerts
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-full transition-all duration-200"
                title="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add items from the restock recommendations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity} {item.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id))}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex items-center justify-between font-bold text-lg mb-3">
                    <span>Total:</span>
                    <span>${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={clearCart}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Shopping Assistant</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Trust Score: {userTrustScore}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowCartModal(true)}
                className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title={`Cart (${cartItems.length} items)`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowAlarmModal(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Bell className={`h-5 w-5 ${activeAlarms.length > 0 ? 'text-red-500' : ''}`} />
                {activeAlarms.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {activeAlarms.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white p-1 rounded-2xl shadow-sm mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'restock', label: 'Smart Restock', icon: Package },
            { id: 'budget', label: 'Budget', icon: DollarSign },
            { id: 'sustainability', label: 'Sustainability', icon: Leaf },
            { id: 'recommendations', label: 'AI Recommendations', icon: Brain },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === 'restock' && activeAlarms.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeAlarms.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Monthly Budget"
                value={`$${budget}`}
                change={5}
                icon={Target}
                color="blue"
              />
              <StatCard
                title="Current Spending"
                value={`$${budgetInsights.currentSpending}`}
                change={-3}
                icon={DollarSign}
                color="green"
              />
              <StatCard
                title="Eco Score"
                value="8.2/10"
                change={8}
                icon={Leaf}
                color="green"
              />
              <StatCard
                title="Items to Restock"
                value={restockItems.filter(item => item.priority === 'high').length}
                change={-2}
                icon={Package}
                color="red"
              />
            </div>

            {/* Spending Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Spending Trends</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       >
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 6 months</option>
                    <option value="year">Last year</option>
                  </select>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="spending" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="budget" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Smart Restock Tab */}
        {activeTab === 'restock' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Smart Restock Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restockItems.filter(item => item.priority === 'high').map((item) => (
                  <div key={item.id} className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <span className="text-sm text-red-600 font-medium">
                        {item.daysUntilEmpty === 0 ? 'Empty!' : `${item.daysUntilEmpty} days left`}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Current Stock:</span>
                        <span className="font-medium">{item.currentStock} {item.unit}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Suggested Order:</span>
                        <span className="font-medium text-blue-600">{item.suggestedQuantity} {item.unit}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Estimated Cost:</span>
                        <span className="font-medium text-green-600">${item.estimatedCost}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          value={item.selectedQuantity}
                          className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm"
                          readOnly
                        />
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => addToCart(item)}
                          className="ml-2 flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-red-200">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.alarmEnabled}
                            onChange={() => toggleAlarm(item.id)}
                            className="rounded"
                          />
                          <span className="text-gray-600">Enable alerts</span>
                        </label>
                        {item.alarmEnabled && (
                          <span className="text-xs text-gray-500">
                            Next: {getTimeUntilAlarm(item.nextAlarm)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {restockItems.filter(item => item.priority === 'high').length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All Good!</h3>
                  <p className="text-gray-600">No urgent restocking needed at the moment.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Budget Management</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Budget Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Budget:</span>
                      <span className="text-2xl font-bold text-blue-600">${budget}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Spent:</span>
                      <span className="text-lg font-medium text-gray-900">${budgetInsights.currentSpending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Remaining:</span>
                      <span className={`text-lg font-medium ${budget - budgetInsights.currentSpending > 100 ? 'text-green-600' : 'text-red-600'}`}>
                        ${budget - budgetInsights.currentSpending}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${budgetInsights.currentSpending / budget > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{width: `${Math.min(100, (budgetInsights.currentSpending / budget) * 100)}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Spending by Category</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categorySpending}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categorySpending.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Alerts</h3>
                <div className="space-y-3">
                  {budgetInsights.alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg ${alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' : 'bg-green-50 text-green-800'}`}>
                      <div className="flex items-center gap-2">
                        {alert.type === 'warning' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <span className="text-sm">{alert.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sustainability Tab */}
        {activeTab === 'sustainability' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sustainability Tracking</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Eco Score Progress</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sustainabilityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e5e5',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="target" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sustainable Choices</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Leaf className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Organic Products</span>
                      </div>
                      <span className="text-green-600 font-bold">+2.1 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Eco Packaging</span>
                      </div>
                      <span className="text-green-600 font-bold">+1.8 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Local Sourcing</span>
                      </div>
                      <span className="text-green-600 font-bold">+1.5 pts</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        💡 Switch to biodegradable cleaning products for +0.5 eco points
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        🌱 Choose items with minimal packaging when possible
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI-Powered Recommendations</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Smart Suggestions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start gap-3">
                        <Brain className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Bundle Deal Alert</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Buy Organic Milk + Cereal together and save 15% ($3.50 off)
                          </p>
                          <button className="mt-2 text-blue-600 text-sm font-medium hover:underline">
                            View Bundle →
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start gap-3">
                        <Leaf className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Eco-Friendly Alternative</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Switch to bamboo toothbrushes - better for environment, same price
                          </p>
                          <button className="mt-2 text-green-600 text-sm font-medium hover:underline">
                            Learn More →
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-purple-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-gray-900">Quality Upgrade</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Premium detergent lasts 30% longer - better value per wash
                          </p>
                          <button className="mt-2 text-purple-600 text-sm font-medium hover:underline">
                            Compare Options →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Trending Products</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Eco Laundry Pods</h4>
                        <p className="text-sm text-gray-600">95% organic ingredients</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">4.8 (1,234 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">$12.99</p>
                        <p className="text-sm text-green-600">20% off</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Bamboo Toothbrush Set</h4>
                        <p className="text-sm text-gray-600">4-pack, biodegradable</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gray-600">4.6 (892 reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">$15.99</p>
                        <p className="text-sm text-blue-600">Best seller</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Shopping Insights</h4>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Weekly Pattern</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        You typically shop on Sundays. Consider ordering Saturday evening for better deals and faster delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">AI Assistant</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-sm text-blue-800">
                  Hi! I'm your AI shopping assistant. How can I help you today?
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-xl">
                <p className="text-sm text-gray-800">
                  Can you help me find budget-friendly eco products?
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-sm text-blue-800">
                  Absolutely! Based on your shopping history, I recommend checking out our sustainable household products section. You can save 15% this month!
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantDashboard;