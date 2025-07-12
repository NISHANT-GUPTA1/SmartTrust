import React, { useState } from 'react';
import CommunityReviews from './CommunityReviews';
import CommunityQA from './CommunityQA';
import { FaTrophy, FaUsers, FaLeaf } from 'react-icons/fa';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const tabs = [
  { id: 'reviews', label: 'Reviews' },
  { id: 'qa', label: 'Q&A' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'buddies', label: 'Shopping Buddies' },
];

const mockChallenges = [
  {
    id: 'c1',
    title: 'Sustainable Shopping Challenge',
    description: 'Buy 5 eco-friendly products this month and earn a Green Shopper badge!',
    icon: <FaLeaf className="text-green-500" />,
    progress: 3,
    total: 5,
    badge: 'Green Shopper',
  },
  {
    id: 'c2',
    title: 'Community Helper',
    description: 'Answer 3 product questions to help fellow shoppers.',
    icon: <FaUsers className="text-blue-500" />,
    progress: 2,
    total: 3,
    badge: 'Helper',
  },
  {
    id: 'c3',
    title: 'Bulk Buy Bonus',
    description: 'Join a group buy and save together!',
    icon: <FaTrophy className="text-yellow-500" />,
    progress: 1,
    total: 1,
    badge: 'Bulk Saver',
  },
];

// Mock data for buddy requests and chats
const mockIncoming = [
  { id: 'u4', username: 'NewFriend', trustScore: 8.2, similarity: 80, sharedInterests: ['Books', 'Deals'], status: 'online' },
];
const mockSent = [
  { id: 'u5', username: 'PendingPal', trustScore: 7.9, similarity: 75, sharedInterests: ['Fashion'], status: 'offline' },
];
const mockPending = [
  { id: 'u6', username: 'WaitingBuddy', trustScore: 8.5, similarity: 85, sharedInterests: ['Electronics'], status: 'shopping' },
];
const mockChats = [
  { id: 'u1', username: 'EcoShopper99', lastMessage: 'Let’s shop eco deals!', status: 'online' },
  { id: 'u2', username: 'DealHunter', lastMessage: 'Found a great sale!', status: 'shopping' },
];

// Add mock discoverable buddies
const mockDiscover = [
  { id: 'u7', username: 'SmartSaver', trustScore: 8.9, similarity: 90, sharedInterests: ['Deals', 'Groceries'], status: 'online' },
  { id: 'u8', username: 'GreenGuru', trustScore: 9.1, similarity: 88, sharedInterests: ['Eco-friendly', 'Home & Garden'], status: 'online' },
  { id: 'u9', username: 'Fashionista', trustScore: 8.3, similarity: 75, sharedInterests: ['Fashion', 'Toys'], status: 'offline' },
];

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  // New: Buddy sub-tabs
  const [buddyTab, setBuddyTab] = useState('incoming');
  const buddyTabs = [
    { id: 'incoming', label: 'Incoming Requests' },
    { id: 'sent', label: 'Sent Requests' },
    { id: 'pending', label: 'Pending Requests' },
    { id: 'chat', label: 'Chat' },
  ];

  // Interactive mock state
  const [incoming, setIncoming] = useState([
    { id: 'u4', username: 'NewFriend', trustScore: 8.2, similarity: 80, sharedInterests: ['Books', 'Deals'], status: 'online' },
  ]);
  const [sent, setSent] = useState([
    { id: 'u5', username: 'PendingPal', trustScore: 7.9, similarity: 75, sharedInterests: ['Fashion'], status: 'offline' },
  ]);
  const [pending, setPending] = useState([
    { id: 'u6', username: 'WaitingBuddy', trustScore: 8.5, similarity: 85, sharedInterests: ['Electronics'], status: 'shopping' },
  ]);
  const [chats, setChats] = useState([
    { id: 'u1', username: 'EcoShopper99', lastMessage: 'Let’s shop eco deals!', status: 'online' },
    { id: 'u2', username: 'DealHunter', lastMessage: 'Found a great sale!', status: 'shopping' },
  ]);
  const [discover, setDiscover] = useState(mockDiscover);
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ [id: string]: { user: string; text: string }[] }>({
    u1: [
      { user: 'EcoShopper99', text: 'Let’s shop eco deals!' },
      { user: 'You', text: 'Sounds great!' },
    ],
    u2: [
      { user: 'DealHunter', text: 'Found a great sale!' },
      { user: 'You', text: 'Show me!' },
    ],
  });

  // Actions
  const handleAccept = (id: string) => {
    const buddy = incoming.find(b => b.id === id);
    if (buddy) {
      setIncoming(incoming.filter(b => b.id !== id));
      setChats(prev => [
        ...prev,
        { id: buddy.id, username: buddy.username, lastMessage: 'Say hi to your new buddy!', status: buddy.status }
      ]);
      toast.success(`Accepted request from ${buddy.username}`);
    }
  };
  const handleDecline = (id: string) => {
    const buddy = incoming.find(b => b.id === id);
    setIncoming(incoming.filter(b => b.id !== id));
    toast.info(`Declined request from ${buddy?.username}`);
  };
  const handleCancel = (id: string) => {
    const buddy = sent.find(b => b.id === id);
    setSent(sent.filter(b => b.id !== id));
    toast.info(`Cancelled request to ${buddy?.username}`);
  };
  const handleOpenChat = (id: string) => {
    setOpenChatId(id);
  };
  const handleSendChat = () => {
    if (!openChatId || !chatInput.trim()) return;
    setChatMessages(prev => ({
      ...prev,
      [openChatId]: [...(prev[openChatId] || []), { user: 'You', text: chatInput }],
    }));
    setChatInput('');
  };
  const handleSendRequest = (id: string) => {
    const buddy = discover.find(b => b.id === id);
    if (buddy) {
      setDiscover(discover.filter(b => b.id !== id));
      setSent([...sent, buddy]);
      toast.success(`Sent request to ${buddy.username}`);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto mt-12 mb-16">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-100 p-0 sm:p-1">
        <div className="px-6 pt-6 pb-2 flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-1">TrustConnect Community Hub</h2>
          <p className="text-blue-700 text-base mb-2">Join real shoppers, ask questions, share experiences, and build trust together.</p>
        </div>
        <div className="flex border-b border-blue-200 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`py-3 px-6 text-lg font-semibold focus:outline-none transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'text-blue-700 border-b-4 border-blue-600 bg-white rounded-t-xl shadow-sm'
                  : 'text-blue-400 hover:text-blue-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 sm:p-8">
          {activeTab === 'reviews' && <CommunityReviews />}
          {activeTab === 'qa' && <CommunityQA />}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Community Challenges</h3>
              {mockChallenges.map(challenge => (
                <div key={challenge.id} className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3 min-w-[60px]">
                    {challenge.icon}
                    <span className="font-bold text-blue-900 text-lg">{challenge.title}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-700 mb-2">{challenge.description}</div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      Progress: {challenge.progress} / {challenge.total}
                      <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">{challenge.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'buddies' && (
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">Shopping Buddies</h3>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Discover Buddies Column */}
                <div className="lg:w-1/3 bg-white rounded-xl shadow p-4 mb-6 lg:mb-0 border border-blue-100">
                  <h4 className="text-lg font-bold text-blue-700 mb-3">Discover Buddies</h4>
                  {discover.length === 0 ? (
                    <div className="text-blue-900 font-semibold">No more people to discover.</div>
                  ) : (
                    <ul className="space-y-3">
                      {discover.map(buddy => (
                        <li key={buddy.id} className="flex flex-col gap-1 border-b pb-2 last:border-b-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-900">{buddy.username}</span>
                            <span className="text-xs text-blue-700">Trust: {buddy.trustScore}</span>
                            <span className="text-xs text-gray-500">Similarity: {buddy.similarity}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Interests: {buddy.sharedInterests.join(', ')}</span>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold ml-auto" onClick={() => handleSendRequest(buddy.id)}>Send Request</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Existing Buddy Tabs/Columns */}
                <div className="flex-1">
                  <div className="flex gap-2 mb-6">
                    {buddyTabs.map(tab => (
                      <button
                        key={tab.id}
                        className={`py-2 px-4 text-base font-semibold rounded focus:outline-none transition-colors duration-150 ${
                          buddyTab === tab.id
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                        onClick={() => setBuddyTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl shadow p-6 min-h-[180px]">
                    {buddyTab === 'incoming' && (
                      <div>
                        {incoming.length === 0 ? (
                          <div className="text-blue-900 font-semibold">No incoming requests.</div>
                        ) : (
                          <ul className="space-y-3">
                            {incoming.map(buddy => (
                              <li key={buddy.id} className="flex items-center gap-3">
                                <span className="font-semibold text-blue-900">{buddy.username}</span>
                                <span className="text-xs text-blue-700">Trust: {buddy.trustScore}</span>
                                <span className="text-xs text-gray-500">Similarity: {buddy.similarity}%</span>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold" onClick={() => handleAccept(buddy.id)}>Accept</button>
                                <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold" onClick={() => handleDecline(buddy.id)}>Decline</button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {buddyTab === 'sent' && (
                      <div>
                        {sent.length === 0 ? (
                          <div className="text-blue-900 font-semibold">No sent requests.</div>
                        ) : (
                          <ul className="space-y-3">
                            {sent.map(buddy => (
                              <li key={buddy.id} className="flex items-center gap-3">
                                <span className="font-semibold text-blue-900">{buddy.username}</span>
                                <span className="text-xs text-blue-700">Trust: {buddy.trustScore}</span>
                                <span className="text-xs text-gray-500">Similarity: {buddy.similarity}%</span>
                                <button className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold" onClick={() => handleCancel(buddy.id)}>Cancel</button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {buddyTab === 'pending' && (
                      <div>
                        {pending.length === 0 ? (
                          <div className="text-blue-900 font-semibold">No pending requests.</div>
                        ) : (
                          <ul className="space-y-3">
                            {pending.map(buddy => (
                              <li key={buddy.id} className="flex items-center gap-3">
                                <span className="font-semibold text-blue-900">{buddy.username}</span>
                                <span className="text-xs text-blue-700">Trust: {buddy.trustScore}</span>
                                <span className="text-xs text-gray-500">Similarity: {buddy.similarity}%</span>
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-semibold">Pending</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {buddyTab === 'chat' && (
                      <div>
                        {chats.length === 0 ? (
                          <div className="text-blue-900 font-semibold">No active chats.</div>
                        ) : (
                          <ul className="space-y-3">
                            {chats.map(chat => (
                              <li key={chat.id} className="flex items-center gap-3">
                                <span className="font-semibold text-blue-900">{chat.username}</span>
                                <span className="text-xs text-gray-500">{chat.lastMessage}</span>
                                <Dialog open={openChatId === chat.id} onOpenChange={open => setOpenChatId(open ? chat.id : null)}>
                                  <DialogTrigger asChild>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-semibold" onClick={() => handleOpenChat(chat.id)}>Open Chat</button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md p-0 overflow-hidden">
                                    <DialogHeader>
                                      <DialogTitle className="text-xl font-bold text-blue-900 mb-1">Chat with {chat.username}</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-2 p-4 max-h-64 overflow-y-auto">
                                      {(chatMessages[chat.id] || []).map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                                          <div className={`rounded-lg px-3 py-1 max-w-[70%] text-sm shadow ${msg.user === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>{msg.text}</div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="p-3 border-t bg-white flex gap-2">
                                      <input
                                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        placeholder="Type a message..."
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
                                        autoFocus
                                      />
                                      <Button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        onClick={handleSendChat}
                                        disabled={!chatInput.trim()}
                                      >
                                        Send
                                      </Button>
                                    </div>
                                    <DialogClose asChild>
                                      <Button variant="ghost" className="mt-2 w-full text-gray-500 hover:text-blue-700">Close</Button>
                                    </DialogClose>
                                  </DialogContent>
                                </Dialog>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunityHub; 