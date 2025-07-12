
import React from 'react';
import { FaShieldAlt, FaShoppingCart, FaUsers, FaUserCircle, FaRobot } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useCommunityStore } from '@/store/communityStore';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' }, // Telugu
  { code: 'bn', label: 'বাংলা' },  // Bengali
];

const Header: React.FC = () => {
  const { currentUser } = useCommunityStore();
  const trustScore = currentUser?.trust_score ?? 8.8;
  const location = useLocation();
  const { i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        <div className="flex items-center gap-3">
          <img src="/placeholder.svg" alt="Logo" className="w-10 h-10 rounded-full bg-white p-1" />
          <span className="text-2xl font-extrabold text-white tracking-tight">SmartTrust</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-white text-lg font-semibold hover:underline flex items-center gap-1"><FaShieldAlt /> Home</Link>
          <Link to="/community" className="text-white text-lg font-semibold hover:underline flex items-center gap-1"><FaUsers /> Community</Link>
          <Link to="/profile" className="text-white text-lg font-semibold hover:underline flex items-center gap-1"><FaUserCircle /> Profile</Link>
          <Link to="/cart" className="text-white text-lg font-semibold hover:underline flex items-center gap-1"><FaShoppingCart /> Cart</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/ai-assistant"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 animate-pulse hover:scale-105"
            style={{ boxShadow: '0 2px 12px 0 rgba(30, 64, 175, 0.15)' }}
            aria-label="AI Shopping Assistant"
          >
            <FaRobot className="text-yellow-300 text-xl animate-bounce" />
            <span>AI Shopping Assistant</span>
          </Link>
          <div className="flex items-center gap-2 bg-blue-900 px-4 py-1 rounded-full shadow text-white font-semibold">
            <FaShieldAlt className="text-yellow-300" /> Trust Score: <span className="text-yellow-300 font-bold">{trustScore.toFixed(1)}</span>
          </div>
          {/* Language Switcher */}
          <select
            className="border rounded px-2 py-1 text-blue-900 font-semibold bg-white shadow ml-2"
            value={i18n.language}
            onChange={e => i18n.changeLanguage(e.target.value)}
            aria-label="Select language"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
