import React from 'react';
import { FaUsers, FaShieldAlt } from 'react-icons/fa';

const CommunityBanner: React.FC = () => (
  <div className="w-full bg-gradient-to-r from-blue-600 to-yellow-400 py-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
    <div className="flex items-center gap-4">
      <FaUsers className="text-white text-4xl bg-blue-700 rounded-full p-2 shadow" />
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Join the TrustConnect Community</h2>
        <p className="text-white text-base font-medium">Share real experiences, ask questions, and shop smarter together.</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-full font-semibold shadow">
        <FaShieldAlt className="text-blue-500" /> Trusted by 10,000+ shoppers
      </span>
      <a href="#community" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg transition">Explore Community</a>
    </div>
  </div>
);

export default CommunityBanner; 