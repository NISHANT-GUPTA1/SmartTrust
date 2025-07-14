
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Index from './pages/Index';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Category from './pages/Category';
import TodaysDeals from './pages/TodaysDeals';
import AIAssistantDashboard from './components/AIAssistantDashboard';
import ProductDetailPage from './components/ProductDetailPage';
import { FaRobot } from 'react-icons/fa';
import { useAIStore } from './store/aiStore';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Chats from './pages/Chats';

// Global chat state
const GlobalChatButton: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { chatHistory, chatWithAI } = useAIStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (chatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatOpen, chatHistory]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setSending(true);
    const response = await chatWithAI(userInput);
    setUserInput('');
    setSending(false);

    // Handle navigation commands from AI
    if (response.startsWith('NAVIGATE:')) {
      const path = response.replace('NAVIGATE:', '');
      navigate(path);
      setChatOpen(false);
    }
  };

  return (
    <>
      {/* Global Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-full shadow-2xl w-20 h-20 flex items-center justify-center text-5xl focus:outline-none border-4 border-white hover:scale-110 transition-all duration-300 animate-pulse"
        onClick={() => setChatOpen(true)}
        aria-label="Open AI Assistant Chat"
        style={{ 
          boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.4)',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        <FaRobot className="text-yellow-300 drop-shadow-lg" />
      </button>

      {/* Global Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-[9998] flex items-end justify-end sm:items-center sm:justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-full sm:max-w-md m-0 sm:m-8 flex flex-col h-[70vh] sm:h-[70vh] max-h-[90vh] border-2 border-blue-200">
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl">
              <h2 className="text-lg font-bold flex items-center gap-2 text-blue-700"><FaRobot className="text-yellow-400" /> AI Shopping Assistant</h2>
              <button
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setChatOpen(false)}
                aria-label="Close Chat"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-blue-50">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-3 max-w-[85%] text-sm shadow-lg mb-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-blue-100'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>
                    <div className="text-[10px] text-gray-400 mt-2 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t bg-white flex flex-col gap-3 rounded-b-2xl">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={async () => {
                    const response = await chatWithAI('Show my budget');
                    if (response.startsWith('NAVIGATE:')) {
                      const path = response.replace('NAVIGATE:', '');
                      navigate(path);
                      setChatOpen(false);
                    }
                  }}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  💰 Budget
                </button>
                <button
                  onClick={async () => {
                    const response = await chatWithAI('Eco-friendly recommendations');
                    if (response.startsWith('NAVIGATE:')) {
                      const path = response.replace('NAVIGATE:', '');
                      navigate(path);
                      setChatOpen(false);
                    }
                  }}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                >
                  🌱 Eco Tips
                </button>
                <button
                  onClick={async () => {
                    const response = await chatWithAI('Go to profile');
                    if (response.startsWith('NAVIGATE:')) {
                      const path = response.replace('NAVIGATE:', '');
                      navigate(path);
                      setChatOpen(false);
                    }
                  }}
                  className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                >
                  👤 Profile
                </button>
                <button
                  onClick={async () => {
                    const response = await chatWithAI('Go to community');
                    if (response.startsWith('NAVIGATE:')) {
                      const path = response.replace('NAVIGATE:', '');
                      navigate(path);
                      setChatOpen(false);
                    }
                  }}
                  className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                >
                  👥 Community
                </button>
                <button
                  onClick={async () => {
                    const response = await chatWithAI('Show cart');
                    if (response.startsWith('NAVIGATE:')) {
                      const path = response.replace('NAVIGATE:', '');
                      navigate(path);
                      setChatOpen(false);
                    }
                  }}
                  className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 transition-colors"
                >
                  🛒 Cart
                </button>
              </div>
              <div className="flex gap-3">
                <input
                  className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  type="text"
                  placeholder="Ask me anything about shopping..."
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                  disabled={sending}
                  autoFocus
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 font-semibold text-sm transition-colors"
                  onClick={handleSend}
                  disabled={sending || !userInput.trim()}
                >
                  {sending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/todays-deals" element={<TodaysDeals />} />
          <Route path="/ai-assistant" element={<AIAssistantDashboard />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
        <GlobalChatButton />
        <Toaster />
        <SonnerToaster />
      </div>
    </Router>
  );
}

export default App;
