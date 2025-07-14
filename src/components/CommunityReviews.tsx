// import React, { useState, useEffect } from 'react';
// import { FaUserCircle, FaCheckCircle, FaStar, FaRegStar, FaShieldAlt, FaCamera, FaThumbsUp, FaFlag, FaComments, FaTrash } from 'react-icons/fa';
// import { useUserStore, UserReview } from '@/store/userStore';
// import { useAuth } from '@/hooks/useAuth';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// interface CommunityReviewsProps {
//   productId?: string;
// }

// const CommunityReviews: React.FC<CommunityReviewsProps> = ({ productId }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { 
//     userReviews, 
//     addUserReview, 
//     updateUserReview, 
//     deleteUserReview, 
//     getUserReviewsByProduct,
//     addReviewChatMessage,
//     getReviewChatMessages,
//     calculateUserTrustScore 
//   } = useUserStore();
  
//   const [comment, setComment] = useState('');
//   const [rating, setRating] = useState(5);
//   const [anonymous, setAnonymous] = useState(false);
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [error, setError] = useState('');
//   const [showChat, setShowChat] = useState<string | null>(null);
//   const [chatMessage, setChatMessage] = useState('');

//   // Get reviews for this product
//   const productReviews = productId ? getUserReviewsByProduct(productId) : [];

//   // Spam detection
//   const spamWords = ['spam', 'fake', 'scam', 'fraud', 'bot', 'automated'];
  
//   const isSpam = (text: string) => {
//     return spamWords.some(word => text.toLowerCase().includes(word));
//   };

//   const handleAddReview = () => {
//     if (!user) {
//       toast.error('Please login to write reviews');
//       return;
//     }

//     if (isSpam(comment)) {
//       setError('Your review was flagged as spam. Please revise your comment.');
//       return;
//     }

//     if (!comment.trim()) {
//       setError('Please write a review.');
//       return;
//     }

//     setError('');
    
//     const trustScore = calculateUserTrustScore(user.id);
    
//     addUserReview({
//       productId: productId || 'unknown',
//       userId: user.id,
//       username: anonymous ? 'Anonymous' : user.username || 'User',
//       rating,
//       comment: comment.trim(),
//       photos: photo ? [photo] : [],
//       videos: [],
//       isVerified: true,
//       trustScore,
//       anonymous,
//     });

//     setComment('');
//     setRating(5);
//     setAnonymous(false);
//     setPhoto(null);
//     toast.success('Review submitted successfully!');
//   };

//   const handleVote = (reviewId: string, isHelpful: boolean) => {
//     if (!user) {
//       toast.error('Please login to vote');
//       return;
//     }

//     const review = productReviews.find(r => r.id === reviewId);
//     if (!review) return;

//     const newHelpfulVotes = isHelpful ? review.helpfulVotes + 1 : review.helpfulVotes - 1;
//     updateUserReview(reviewId, { helpfulVotes: Math.max(0, newHelpfulVotes) });
//     toast.success(isHelpful ? 'Voted as helpful!' : 'Vote removed');
//   };

//   const handleReport = (reviewId: string) => {
//     if (!user) {
//       toast.error('Please login to report');
//       return;
//     }

//     updateUserReview(reviewId, { reported: true });
//     toast.success('Review reported. Our team will review it.');
//   };

//   const handleDelete = (reviewId: string) => {
//     const review = productReviews.find(r => r.id === reviewId);
//     if (!review || review.userId !== user?.id) {
//       toast.error('You can only delete your own reviews');
//       return;
//     }

//     deleteUserReview(reviewId);
//     toast.success('Review deleted successfully');
//   };

//   const handleChatMessage = (reviewId: string) => {
//     if (!user) {
//       toast.error('Please login to send messages');
//       return;
//     }

//     if (!chatMessage.trim()) {
//       toast.error('Please enter a message');
//       return;
//     }

//     if (isSpam(chatMessage)) {
//       toast.error('Message was flagged as spam. Please revise.');
//       return;
//     }

//     addReviewChatMessage(reviewId, {
//       userId: user.id,
//       username: user.username || 'User',
//       message: chatMessage.trim(),
//       isVerified: true,
//       anonymous: false,
//     });

//     setChatMessage('');
//     toast.success('Message sent!');
//   };

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPhoto(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChatWithUser = (username: string) => {
//     if (!user) {
//       toast.error('Please login to chat with users');
//       return;
//     }
    
//     // Store the chat in localStorage for the community page
//     const existingChats = JSON.parse(localStorage.getItem('communityChats') || '[]');
//     const newChat = {
//       id: `chat_${Date.now()}`,
//       username: username,
//       lastMessage: '',
//       status: 'online'
//     };
    
//     // Add to existing chats if not already present
//     if (!existingChats.find((chat: any) => chat.username === username)) {
//       existingChats.push(newChat);
//       localStorage.setItem('communityChats', JSON.stringify(existingChats));
//     }
    
//     // Navigate to community page with chat parameter
//     navigate(`/community?chat=${encodeURIComponent(username)}`);
//     toast.success(`Starting chat with ${username}`);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-full sm:max-w-2xl mx-auto mt-8 mb-10 border border-gray-100">
//       <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
//         <FaShieldAlt className="text-blue-500" /> Community Reviews
//         <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
//           {productReviews.length} reviews
//         </span>
//       </h2>
      
//       {/* Add Review Form */}
//       <div className="mb-8 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
//         <div className="flex items-center gap-4 mb-3">
//           <FaUserCircle className="text-3xl text-gray-400" />
//           <span className="font-semibold text-lg">Add Your Review</span>
//         </div>
//         <textarea
//           className="w-full border rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//           rows={3}
//           placeholder="Write your review..."
//           value={comment}
//           onChange={e => setComment(e.target.value)}
//         />
        
//         {/* Rating */}
//         <div className="flex items-center gap-2 mb-3">
//           <span className="text-sm font-medium">Rating:</span>
//           <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map(i => (
//               <button
//                 key={i}
//                 onClick={() => setRating(i)}
//                 className="text-2xl hover:scale-110 transition-transform"
//               >
//                 {i <= rating ? (
//                   <FaStar className="text-yellow-400" />
//                 ) : (
//                   <FaRegStar className="text-gray-300" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Photo Upload */}
//         <div className="flex items-center gap-4 mb-3">
//           <label className="flex items-center gap-2 text-sm cursor-pointer">
//             <FaCamera className="text-gray-500" />
//             <span>Add Photo</span>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoUpload}
//               className="hidden"
//             />
//           </label>
//           {photo && (
//             <div className="flex items-center gap-2">
//               <img src={photo} alt="Preview" className="w-12 h-12 object-cover rounded" />
//               <button
//                 onClick={() => setPhoto(null)}
//                 className="text-red-500 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           )}
//         </div>
        
//         {/* Anonymous Option */}
//         <div className="flex items-center gap-2 mb-3">
//           <label className="flex items-center gap-2 text-sm">
//             <input
//               type="checkbox"
//               checked={anonymous}
//               onChange={e => setAnonymous(e.target.checked)}
//             />
//             Post anonymously
//           </label>
//         </div>
        
//         {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
//           onClick={handleAddReview}
//           disabled={!comment.trim() || !user}
//         >
//           {user ? 'Submit Review' : 'Login to Review'}
//         </button>
//       </div>
      
//       {/* Reviews List */}
//       <div className="space-y-6">
//         {productReviews.slice().reverse().map(review => (
//           <div key={review.id} className="bg-white rounded-xl shadow border border-gray-100 p-4">
//             <div className="flex flex-col sm:flex-row gap-4">
//               {/* User Info */}
//               <div className="flex flex-col items-center sm:items-start gap-2 min-w-[90px]">
//                 <FaUserCircle className="text-4xl text-gray-300" />
//                 <span className="font-semibold text-blue-700 text-sm flex items-center gap-1">
//                   {review.username}
//                   {review.isVerified && <FaCheckCircle className="text-green-500 ml-1" title="Verified Buyer" />}
//                 </span>
//                 <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
//                   <FaShieldAlt className="text-blue-400" /> Trust: {review.trustScore.toFixed(1)}
//                 </span>
//                 <span className="flex gap-0.5 mt-1">
//                   {[1, 2, 3, 4, 5].map(i =>
//                     i <= review.rating ? (
//                       <FaStar key={i} className="text-yellow-400 text-xs" />
//                     ) : (
//                       <FaRegStar key={i} className="text-gray-300 text-xs" />
//                     )
//                   )}
//                 </span>
//                 {review.anonymous && <span className="text-gray-400 text-xs">(Anonymous)</span>}
//                 <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
//               </div>
              
//               {/* Review Content */}
//               <div className="flex-1">
//                 <div className="text-gray-800 mb-3">{review.comment}</div>
                
//                 {/* Photos */}
//                 {review.photos.length > 0 && (
//                   <div className="flex gap-2 mb-3">
//                     {review.photos.map((photo, index) => (
//                       <img
//                         key={index}
//                         src={photo}
//                         alt={`Review photo ${index + 1}`}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 )}
                
//                                  {/* Review Actions */}
//                  <div className="flex items-center gap-3 mb-3">
//                    <button
//                      onClick={() => handleVote(review.id, true)}
//                      className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
//                    >
//                      <FaThumbsUp />
//                      Helpful ({review.helpfulVotes})
//                    </button>
//                    <button
//                      onClick={() => setShowChat(showChat === review.id ? null : review.id)}
//                      className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
//                    >
//                      <FaComments />
//                      Chat ({getReviewChatMessages(review.id).length})
//                    </button>
//                    {review.userId !== user?.id && (
//                      <button
//                        onClick={() => handleChatWithUser(review.username)}
//                        className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800"
//                        title="Start a new chat with this user"
//                      >
//                        <FaComments />
//                        Chat with User
//                      </button>
//                    )}
//                    {review.userId === user?.id && (
//                      <button
//                        onClick={() => handleDelete(review.id)}
//                        className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
//                      >
//                        <FaTrash />
//                        Delete
//                      </button>
//                    )}
//                    {review.userId !== user?.id && (
//                      <button
//                        onClick={() => handleReport(review.id)}
//                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600"
//                      >
//                        <FaFlag />
//                        Report
//                      </button>
//                    )}
//                  </div>
                
//                 {/* Chat Section */}
//                 {showChat === review.id && (
//                   <div className="bg-gray-50 rounded-lg p-3 mt-3">
//                     <div className="text-sm font-semibold mb-2">Review Chat</div>
                    
//                     {/* Chat Messages */}
//                     <div className="max-h-40 overflow-y-auto mb-3 space-y-2">
//                       {getReviewChatMessages(review.id).map((msg, index) => (
//                         <div key={index} className="flex items-start gap-2">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-1">
//                               <span className="text-xs font-semibold text-blue-700">{msg.username}</span>
//                               {msg.isVerified && <FaCheckCircle className="text-green-500 text-xs" />}
//                               <span className="text-xs text-gray-400">
//                                 {new Date(msg.timestamp).toLocaleTimeString()}
//                               </span>
//                             </div>
//                             <div className="text-sm text-gray-700">{msg.message}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     {/* Chat Input */}
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Type a message..."
//                         value={chatMessage}
//                         onChange={e => setChatMessage(e.target.value)}
//                         className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         onKeyPress={e => e.key === 'Enter' && handleChatMessage(review.id)}
//                       />
//                       <button
//                         onClick={() => handleChatMessage(review.id)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//                         disabled={!chatMessage.trim()}
//                       >
//                         Send
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {productReviews.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           <div className="text-lg font-semibold mb-2">No reviews yet</div>
//           <div className="text-sm">Be the first to review this product!</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommunityReviews; 
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCheckCircle, FaStar, FaRegStar, FaShieldAlt, FaCamera, FaThumbsUp, FaFlag, FaComments, FaTrash } from 'react-icons/fa';
import { useUserStore, UserReview } from '@/store/userStore';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CommunityReviewsProps {
  productId?: string;
}

const CommunityReviews: React.FC<CommunityReviewsProps> = ({ productId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    userReviews, 
    addUserReview, 
    updateUserReview, 
    deleteUserReview, 
    getUserReviewsByProduct,
    addReviewChatMessage,
    getReviewChatMessages,
    calculateUserTrustScore 
  } = useUserStore();
  
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [anonymous, setAnonymous] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  // Get reviews for this product
  const productReviews = productId ? getUserReviewsByProduct(productId) : [];

  // Spam detection
  const spamWords = ['spam', 'fake', 'scam', 'fraud', 'bot', 'automated'];
  
  const isSpam = (text: string) => {
    return spamWords.some(word => text.toLowerCase().includes(word));
  };

  const handleAddReview = () => {
    if (!user) {
      toast.error('Please login to write reviews');
      return;
    }

    if (isSpam(comment)) {
      setError('Your review was flagged as spam. Please revise your comment.');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a review.');
      return;
    }

    setError('');
    
    const trustScore = calculateUserTrustScore(user.id);
    
    addUserReview({
      productId: productId || 'unknown',
      userId: user.id,
      username: anonymous ? 'Anonymous' : user.username || 'User',
      rating,
      comment: comment.trim(),
      photos: photo ? [photo] : [],
      videos: [],
      isVerified: true,
      trustScore,
      anonymous,
    });

    setComment('');
    setRating(5);
    setAnonymous(false);
    setPhoto(null);
    toast.success('Review submitted successfully!');
  };

  const handleVote = (reviewId: string, isHelpful: boolean) => {
    if (!user) {
      toast.error('Please login to vote');
      return;
    }

    const review = productReviews.find(r => r.id === reviewId);
    if (!review) return;

    const newHelpfulVotes = isHelpful ? review.helpfulVotes + 1 : review.helpfulVotes - 1;
    updateUserReview(reviewId, { helpfulVotes: Math.max(0, newHelpfulVotes) });
    toast.success(isHelpful ? 'Voted as helpful!' : 'Vote removed');
  };

  const handleReport = (reviewId: string) => {
    if (!user) {
      toast.error('Please login to report');
      return;
    }

    updateUserReview(reviewId, { reported: true });
    toast.success('Review reported. Our team will review it.');
  };

  const handleDelete = (reviewId: string) => {
    const review = productReviews.find(r => r.id === reviewId);
    if (!review || review.userId !== user?.id) {
      toast.error('You can only delete your own reviews');
      return;
    }

    deleteUserReview(reviewId);
    toast.success('Review deleted successfully');
  };

  const handleChatMessage = (reviewId: string) => {
    if (!user) {
      toast.error('Please login to send messages');
      return;
    }

    if (!chatMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    if (isSpam(chatMessage)) {
      toast.error('Message was flagged as spam. Please revise.');
      return;
    }

    addReviewChatMessage(reviewId, {
      userId: user.id,
      username: user.username || 'User',
      message: chatMessage.trim(),
      isVerified: true,
      anonymous: false,
    });

    setChatMessage('');
    toast.success('Message sent!');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatWithUser = (username: string) => {
    if (!user) {
      toast.error('Please login to chat with users');
      return;
    }
    
    // Store the chat in localStorage for the community page
    const existingChats = JSON.parse(localStorage.getItem('communityChats') || '[]');
    const newChat = {
      id: `chat_${Date.now()}`,
      username: username,
      lastMessage: '',
      status: 'online'
    };
    
    // Add to existing chats if not already present
    if (!existingChats.find((chat: any) => chat.username === username)) {
      existingChats.push(newChat);
      localStorage.setItem('communityChats', JSON.stringify(existingChats));
    }
    
    // Navigate to community page with chat parameter
    navigate(`/community?chat=${encodeURIComponent(username)}`);
    toast.success(`Starting chat with ${username}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-full sm:max-w-2xl mx-auto mt-8 mb-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center gap-2">
        <FaShieldAlt className="text-blue-500" /> Community Reviews
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {productReviews.length} reviews
        </span>
      </h2>
      
      {/* Add Review Form */}
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
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">Rating:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                onClick={() => setRating(i)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {i <= rating ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar className="text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Photo Upload */}
        <div className="flex items-center gap-4 mb-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <FaCamera className="text-gray-500" />
            <span>Add Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
          {photo && (
            <div className="flex items-center gap-2">
              <img src={photo} alt="Preview" className="w-12 h-12 object-cover rounded" />
              <button
                onClick={() => setPhoto(null)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
        {/* Anonymous Option */}
        <div className="flex items-center gap-2 mb-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={e => setAnonymous(e.target.checked)}
            />
            Post anonymously
          </label>
        </div>
        
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
          onClick={handleAddReview}
          disabled={!comment.trim() || !user}
        >
          {user ? 'Submit Review' : 'Login to Review'}
        </button>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {productReviews.slice().reverse().map(review => (
          <div key={review.id} className="bg-white rounded-xl shadow border border-gray-100 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* User Info */}
              <div className="flex flex-col items-center sm:items-start gap-2 min-w-[90px]">
                <FaUserCircle className="text-4xl text-gray-300" />
                <span className="font-semibold text-blue-700 text-sm flex items-center gap-1">
                  {review.username}
                  {review.isVerified && <FaCheckCircle className="text-green-500 ml-1" title="Verified Buyer" />}
                </span>
                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                  <FaShieldAlt className="text-blue-400" /> Trust: {review.trustScore.toFixed(1)}
                </span>
                <span className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map(i =>
                    i <= review.rating ? (
                      <FaStar key={i} className="text-yellow-400 text-xs" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300 text-xs" />
                    )
                  )}
                </span>
                {review.anonymous && <span className="text-gray-400 text-xs">(Anonymous)</span>}
                <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              
              {/* Review Content */}
              <div className="flex-1">
                <div className="text-gray-800 mb-3">{review.comment}</div>
                
                {/* Photos */}
                {review.photos.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
                
                                 {/* Review Actions */}
                 <div className="flex items-center gap-3 mb-3">
                   <button
                     onClick={() => handleVote(review.id, true)}
                     className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
                   >
                     <FaThumbsUp />
                     Helpful ({review.helpfulVotes})
                   </button>
                   <button
                     onClick={() => setShowChat(showChat === review.id ? null : review.id)}
                     className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600"
                   >
                     <FaComments />
                     Chat ({getReviewChatMessages(review.id).length})
                   </button>
                   {review.userId !== user?.id && (
                     <button
                       onClick={() => handleChatWithUser(review.username)}
                       className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800"
                       title="Start a new chat with this user"
                     >
                       <FaComments />
                       Chat with User
                     </button>
                   )}
                   {review.userId === user?.id && (
                     <button
                       onClick={() => handleDelete(review.id)}
                       className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
                     >
                       <FaTrash />
                       Delete
                     </button>
                   )}
                   {review.userId !== user?.id && (
                     <button
                       onClick={() => handleReport(review.id)}
                       className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600"
                     >
                       <FaFlag />
                       Report
                     </button>
                   )}
                 </div>
                
                {/* Chat Section */}
                {showChat === review.id && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <div className="text-sm font-semibold mb-2">Review Chat</div>
                    
                    {/* Chat Messages */}
                    <div className="max-h-40 overflow-y-auto mb-3 space-y-2">
                      {getReviewChatMessages(review.id).map((msg, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-semibold text-blue-700">{msg.username}</span>
                              {msg.isVerified && <FaCheckCircle className="text-green-500 text-xs" />}
                              <span className="text-xs text-gray-400">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700">{msg.message}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={e => setChatMessage(e.target.value)}
                        className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onKeyPress={e => e.key === 'Enter' && handleChatMessage(review.id)}
                      />
                      <button
                        onClick={() => handleChatMessage(review.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        disabled={!chatMessage.trim()}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {productReviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-lg font-semibold mb-2">No reviews yet</div>
          <div className="text-sm">Be the first to review this product!</div>
        </div>
      )}
    </div>
  );
};

export default CommunityReviews; 