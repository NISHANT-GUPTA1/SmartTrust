import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaUserCircle, FaShieldAlt } from 'react-icons/fa';

interface ConnectBuddyProps {
  buddy: {
    id: string;
    username: string;
    trustScore: number;
    similarity: number;
    sharedInterests: string[];
    avatar?: string;
    status: string;
  };
  trigger?: React.ReactNode;
}

const statusColors = {
  online: 'bg-green-400',
  shopping: 'bg-blue-400',
  offline: 'bg-gray-400',
};

const ConnectBuddy: React.FC<ConnectBuddyProps> = ({ buddy, trigger }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setMessage('');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900 mb-1">Connect with {buddy.username}</DialogTitle>
          <DialogDescription className="text-gray-700 mb-2">Send a message to start a chat or request to connect.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 p-4 border-b">
          <div className="relative">
            {buddy.avatar ? (
              <img src={buddy.avatar} alt={buddy.username} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
            ) : (
              <FaUserCircle className="w-12 h-12 text-gray-300" />
            )}
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[buddy.status as keyof typeof statusColors]}`}></span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-blue-900 flex items-center gap-1">
              {buddy.username}
              <FaShieldAlt className="text-blue-400 ml-1" title="Trust Score" />
              <span className="text-xs text-blue-700 font-bold">{buddy.trustScore}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">Similarity: {buddy.similarity}%</div>
            <div className="flex flex-wrap gap-1">
              {buddy.sharedInterests.map((interest, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{interest}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          {sent ? (
            <div className="text-green-700 font-semibold text-center">Request sent! {buddy.username} will be notified.</div>
          ) : (
            <>
              <textarea
                className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={2}
                placeholder="Say hi or mention why you want to connect..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <Button
                onClick={handleSend}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-2 rounded shadow-lg"
                size="lg"
                disabled={!message.trim()}
              >
                Send Request / Chat
              </Button>
            </>
          )}
          <DialogClose asChild>
            <Button variant="ghost" className="mt-2 w-full text-gray-500 hover:text-blue-700">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectBuddy; 