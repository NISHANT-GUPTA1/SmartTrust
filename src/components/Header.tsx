
import React from 'react';
import { FaShieldAlt, FaShoppingCart, FaUsers, FaUserCircle, FaRobot, FaSearch, FaComments, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useCommunityStore } from '@/store/communityStore';
import { useTranslation } from 'react-i18next';
import ChatPopup from './ChatPopup';
import { useChatStore } from '../store/socialStore';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
];

const Header: React.FC = () => {
  const { currentUser } = useCommunityStore();
  const trustScore = currentUser?.trust_score ?? 8.8;
  const location = useLocation();
  const { i18n } = useTranslation();
  const [chatListOpen, setChatListOpen] = React.useState(false);
  const [chatPopupOpen, setChatPopupOpen] = React.useState(false);
  const [chatPopupUser, setChatPopupUser] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { threads } = useChatStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 shadow-xl border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Section - Logo + Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/placeholder.svg" alt="Logo" className="w-10 h-10 rounded-full bg-white p-1 shadow-md" />
              <span className="text-2xl font-extrabold text-white tracking-tight">SmartTrust</span>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white font-semibold hover:bg-white/10 transition-all duration-200 ${
                  location.pathname === '/' ? 'bg-white/20' : ''
                }`}
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/community" 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white font-semibold hover:bg-white/10 transition-all duration-200 ${
                  location.pathname === '/community' ? 'bg-white/20' : ''
                }`}
              >
                <FaUsers className="text-lg" />
                <span>Community</span>
              </Link>
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, reviews, or community..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 focus:bg-white transition-all duration-200 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Right Section - Icons + Profile */}
          <div className="flex items-center gap-3">
            
            {/* Trust Score */}
            <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 rounded-full shadow-lg text-white font-semibold">
              <FaShieldAlt className="text-yellow-300 text-lg" />
              <span className="text-sm">{trustScore.toFixed(1)}</span>
            </div>

            {/* Chats */}
            <button
              onClick={() => setChatListOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-200 shadow-md"
              aria-label="Open chats"
            >
              <FaComments className="text-lg" />
              <span className="hidden sm:inline">Chats</span>
              {threads.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                  {threads.length}
                </span>
              )}
            </button>

            {/* AI Assistant */}
            <Link
              to="/ai-assistant"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-3 py-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              aria-label="AI Shopping Assistant"
            >
              <FaRobot className="text-yellow-300 text-lg animate-pulse" />
              <span className="hidden sm:inline">AI</span>
            </Link>

            {/* Language Switcher */}
            <select
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              aria-label="Select language"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="text-gray-800">
                  {lang.label}
                </option>
              ))}
            </select>

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-md"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="text-2xl text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Profile */}
            <Link 
              to="/profile" 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:scale-105"
              aria-label="User profile"
            >
              <FaUserCircle className="text-2xl text-white" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-3 flex items-center justify-center gap-4">
          <Link 
            to="/" 
            className={`flex items-center gap-1 px-2 py-1 rounded text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200 ${
              location.pathname === '/' ? 'bg-white/20' : ''
            }`}
          >
            <FaHome className="text-sm" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/community" 
            className={`flex items-center gap-1 px-2 py-1 rounded text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200 ${
              location.pathname === '/community' ? 'bg-white/20' : ''
            }`}
          >
            <FaUsers className="text-sm" />
            <span>Community</span>
          </Link>
        </div>
      </div>

      {/* Chat List Modal */}
      {chatListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" 
              onClick={() => setChatListOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2">Your Chats</h3>
            {threads.length === 0 ? (
              <div className="text-gray-400 text-center mt-8">No chats yet.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {threads.map(thread => (
                  <li 
                    key={thread.username} 
                    className="py-2 cursor-pointer hover:bg-blue-50 rounded px-2" 
                    onClick={() => { 
                      setChatPopupUser(thread.username); 
                      setChatPopupOpen(true); 
                      setChatListOpen(false); 
                    }}
                  >
                    <span className="font-semibold text-blue-900">{thread.username}</span>
                    <span className="block text-xs text-gray-500 mt-1">
                      {thread.messages.length > 0 ? thread.messages[thread.messages.length-1].text : 'No messages yet.'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Chat Popup */}
      <ChatPopup 
        open={chatPopupOpen} 
        username={chatPopupUser} 
        onClose={() => setChatPopupOpen(false)} 
      />
    </header>
  );
};

export default Header;
