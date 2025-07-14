import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import SecurityBanner from '../components/SecurityBanner';
import { ShoppingCircleDashboard } from '../components/ShoppingCircleDashboard';
import ChatPopup from '../components/ChatPopup';
import { useChatStore } from '../store/socialStore';

const Community: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [chatPopupUser, setChatPopupUser] = useState<string | null>(null);
  const { startChat } = useChatStore();

  useEffect(() => {
    const chatParam = searchParams.get('chat');
    const isNewChat = searchParams.get('new');
    
    if (chatParam && isNewChat) {
      // Extract reviewer name from the chat parameter or use a default
      let reviewerName;
      if (chatParam.includes('Excellent')) {
        reviewerName = 'Sarah Johnson';
      } else if (chatParam.includes('Good value')) {
        reviewerName = 'Mike Chen';
      } else if (chatParam.includes('Amazing') || chatParam.includes('Love')) {
        reviewerName = 'Emma Wilson';
      } else if (chatParam.includes('Quality') || chatParam.includes('Durable')) {
        reviewerName = 'David Rodriguez';
      } else if (chatParam.length < 50 && !chatParam.includes(' ')) {
        // If it looks like a username (short and no spaces), use it directly
        reviewerName = chatParam;
      } else {
        // Default reviewer name
        reviewerName = 'ProductExpert';
      }
      
      setChatPopupUser(reviewerName);
      setChatPopupOpen(true);
      
      // Start the chat and add an initial message from the reviewer
      startChat(reviewerName);
      
      // Clear the URL parameters after opening the chat
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, startChat]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full max-w-7xl mx-auto mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Shop together with family and friends for special occasions</p>
        </div>
        <ShoppingCircleDashboard />
      </div>
      <SecurityBanner />
      <Footer />
      
      {/* Chat Popup for Reviewer Communication */}
      <ChatPopup 
        open={chatPopupOpen} 
        username={chatPopupUser} 
        onClose={() => setChatPopupOpen(false)} 
      />
    </div>
  );
};

export default Community;
