import React, { useState } from 'react';
import { FaUserCircle, FaCheckCircle, FaStar, FaRegStar, FaShieldAlt, FaCamera } from 'react-icons/fa';

const mockReviews = [
  {
    id: 'r1',
    username: 'EcoShopper99',
    isVerified: true,
    trustScore: 9.2,
    rating: 5,
    comment: 'Amazing product! Fast delivery and great quality.',
    photos: ['/placeholder.svg'],
    videos: [],
    createdAt: '2024-06-01T10:00:00Z',
    anonymous: false,
  },
  {
    id: 'r2',
    username: 'Anonymous',
    isVerified: false,
    trustScore: 7.1,
    rating: 3,
    comment: 'It was okay, but packaging could be better.',
    photos: [],
    videos: [],
    createdAt: '2024-06-02T14:30:00Z',
    anonymous: true,
  },
  {
    id: 'r3',
    username: 'TrustedBuyer',
    isVerified: true,
    trustScore: 8.7,
    rating: 4,
    comment: 'Good value for money. Would recommend to friends!',
    photos: [],
    videos: [],
    createdAt: '2024-06-03T09:15:00Z',
    anonymous: false,
  },
];

const spamWords = ['spam', 'fake', 'scam', 'fraud'];

const CommunityReviews: React.FC = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [anonymous, setAnonymous] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleAddReview = () => {
    if (spamWords.some(word => comment.toLowerCase().includes(word))) {
      setError('Your review was flagged as spam. Please revise your comment.');
      return;
    }
    setError('');
    setReviews([
      ...reviews,
      {
        id: `r${reviews.length + 1}`,
        username: anonymous ? 'Anonymous' : 'You',
        isVerified: true,
        trustScore: 8.5,
        rating,
        comment,
        photos: photo ? [photo] : [],
        videos: [],
        createdAt: new Date().toISOString(),
        anonymous,
      },
    ]);
    setComment('');
    setRating(5);
    setAnonymous(false);
    setPhoto(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-full sm:max-w-2xl mx-auto mt-8 mb-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
        <FaShieldAlt className="text-blue-500" /> Community Reviews
      </h2>
      <div className="mb-8 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-3">
          <FaUserCircle className="text-3xl text-gray-400" />
          <span className="font-semibold text-lg">Add Your Review</span>
        </div>
        <textarea
          className="w-full border rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          rows={3}
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <label className="text-sm font-medium">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(r =>
              r <= rating ? (
                <FaStar key={r} className="text-yellow-400 cursor-pointer" onClick={() => setRating(r)} />
              ) : (
                <FaRegStar key={r} className="text-gray-300 cursor-pointer" onClick={() => setRating(r)} />
              )
            )}
          </div>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={e => setAnonymous(e.target.checked)}
            />
            Post as anonymous
          </label>
          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = ev => setPhoto(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <span className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"><FaCamera /> Add Photo</span>
          </label>
        </div>
        {photo && (
          <div className="mb-2">
            <img src={photo} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
          </div>
        )}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
          onClick={handleAddReview}
          disabled={!comment.trim()}
        >
          Submit Review
        </button>
      </div>
      <div className="space-y-6">
        {reviews.slice().reverse().map(r => (
          <div key={r.id} className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col items-center sm:items-start gap-2 min-w-[90px]">
              <FaUserCircle className="text-4xl text-gray-300" />
              <span className="font-semibold text-blue-700 text-sm flex items-center gap-1">
                {r.username}
                {r.isVerified && <FaCheckCircle className="text-green-500 ml-1" title="Verified Buyer" />}
              </span>
              <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                <FaShieldAlt className="text-blue-400" /> Trust: {r.trustScore}
              </span>
              <span className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map(i =>
                  i <= r.rating ? (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 text-xs" />
                  )
                )}
              </span>
              {r.anonymous && <span className="text-gray-400 text-xs">(Anonymous)</span>}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="mb-1 text-gray-800 text-base font-medium">{r.comment}</div>
              {r.photos.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {r.photos.map((p, i) => (
                    <img key={i} src={p} alt="Review" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityReviews; 