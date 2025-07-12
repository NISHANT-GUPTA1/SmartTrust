import React from 'react';
import { FaLock, FaFingerprint, FaShieldAlt } from 'react-icons/fa';

const SecurityBanner: React.FC = () => (
  <div className="w-full bg-gradient-to-r from-blue-600 to-yellow-400 py-4 px-2 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-lg mt-12 mb-0">
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow text-blue-700 font-semibold text-sm">
      <FaShieldAlt className="text-blue-500" /> Purchase Verified by Blockchain
    </div>
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow text-yellow-700 font-semibold text-sm">
      <FaFingerprint className="text-yellow-500" /> AI Fraud Detection
    </div>
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow text-blue-700 font-semibold text-sm">
      <FaLock className="text-blue-500" /> Zero-Knowledge Privacy
    </div>
  </div>
);

export default SecurityBanner; 