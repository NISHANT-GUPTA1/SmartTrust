import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/socialStore';

interface ChatPopupProps {
  open: boolean;
  username: string | null;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ open, username, onClose }) => {
  const { getMessages, sendMessage, startChat } = useChatStore();
  const [input, setInput] = useState('');
  const messages = username ? getMessages(username) : [];
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && username) {
      startChat(username);
    }
  }, [open, username, startChat]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!open || !username) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-bold mb-2">Chat with {username}</h3>
        <div className="h-64 overflow-y-auto bg-gray-50 rounded p-2 mb-2 border flex flex-col">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center mt-12">No messages yet.</div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`mb-1 text-sm ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}> 
                <span className={`inline-block px-2 py-1 rounded ${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.text}</span>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { sendMessage(username, input, 'You'); setInput(''); } }}
            autoFocus
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
            onClick={() => { if (input.trim()) { sendMessage(username, input, 'You'); setInput(''); } }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup; 