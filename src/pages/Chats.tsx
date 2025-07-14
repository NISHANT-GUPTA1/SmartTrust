import React, { useState } from 'react';
import { useChatStore } from '../store/socialStore';
import ChatPopup from '../components/ChatPopup';
import Header from '../components/Header';
import { Footer } from '../components/Footer';

const Chats: React.FC = () => {
  const { threads } = useChatStore();
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [chatPopupUser, setChatPopupUser] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Your Chats</h1>
        {threads.length === 0 ? (
          <div className="text-gray-400 text-center mt-8">No chats yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
            {threads.map(thread => (
              <li key={thread.username} className="py-4 px-6 cursor-pointer hover:bg-blue-50 rounded" onClick={() => { setChatPopupUser(thread.username); setChatPopupOpen(true); }}>
                <span className="font-semibold text-blue-900">{thread.username}</span>
                <span className="block text-xs text-gray-500 mt-1">{thread.messages.length > 0 ? thread.messages[thread.messages.length-1].text : 'No messages yet.'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ChatPopup open={chatPopupOpen} username={chatPopupUser} onClose={() => setChatPopupOpen(false)} />
      <Footer />
    </div>
  );
};

export default Chats; 