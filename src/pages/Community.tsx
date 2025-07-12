import React from 'react';
import CommunityBanner from '../components/CommunityBanner';
import CommunityHub from '../components/CommunityHub';
import SecurityBanner from '../components/SecurityBanner';
import Header from '../components/Header';
import { Footer } from '../components/Footer';

const Community: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <CommunityBanner />
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto mt-8">
      <div className="flex-1 min-w-0">
        <CommunityHub />
      </div>
    </div>
    <SecurityBanner />
    <Footer />
  </div>
);

export default Community; 