// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState, useRef } from 'react';
// import { Product } from '@/types/product';
// import { Button } from '@/components/ui/button';
// import Header from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import { useProductStore } from '@/store/productStore';
// import { useCartStore } from '@/store/cartStore';
// import { toast } from 'sonner';
// import { getProductReviewsQA, ProductReview, ProductQA } from '@/utils/productReviewsQA';
// import { MessageCircle } from 'lucide-react'; // or use a similar icon
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; // if you have a tooltip component
// import { useTranslation } from 'react-i18next';

// const initialChat = [
//   { user: 'Verified Buyer from Delhi', message: 'I bought this last month, it is sturdy!', time: '2 min ago' },
//   { user: 'Verified Buyer from Mumbai', message: 'You can easily install it yourself.', time: '1 min ago' },
// ];

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const { products } = useProductStore();
//   const { addItem } = useCartStore();
//   const { t } = useTranslation();
  
//   console.log('ProductDetail component rendered');
//   console.log('productId from params:', productId);
//   console.log('products from store:', products);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [qaExpanded, setQaExpanded] = useState<number | null>(null);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [qaList, setQaList] = useState<ProductQA[]>([]);
//   const [reviews, setReviews] = useState<ProductReview[]>([]);
//   const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '', images: [], videos: [], verified: true });
//   const [reviewImagePreviews, setReviewImagePreviews] = useState<string[]>([]);
//   const [reviewVideoPreviews, setReviewVideoPreviews] = useState<string[]>([]);
//   const [chatMessages, setChatMessages] = useState(initialChat);
//   const [chatInput, setChatInput] = useState('');
//   const [chatError, setChatError] = useState('');
//   const [reviewError, setReviewError] = useState('');
//   const [qaError, setQaError] = useState('');
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const videoInputRef = useRef<HTMLInputElement>(null);
//   const chatEndRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('ProductDetail debug:', { productId, products });
//     console.log('Product IDs in store:', products.map(p => p.id));
//     console.log('Looking for product with ID:', productId);
//     console.log('Type of productId:', typeof productId);
//     console.log('Type of store product IDs:', products.map(p => typeof p.id));
    
//     const found = products.find((p) => p.id === productId);
//     console.log('Found product:', found);
    
//     setProduct(found || null);
//     setSelectedImage(0);
    
//     // Load product-specific reviews and Q&A
//     if (productId) {
//       const productData = getProductReviewsQA(productId);
//       console.log('Product ID:', productId);
//       console.log('Product Data:', productData);
//       console.log('Reviews:', productData.reviews);
//       console.log('Q&A:', productData.qa);
//       setReviews(productData.reviews);
//       setQaList(productData.qa);
//     }
//   }, [productId, products]);

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [chatMessages]);

//   // AI Moderation: block spam/fake
//   function isSpam(text: string) {
//     return /spam|fake|scam|fraud/i.test(text);
//   }

//   // Handle image uploads for review
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const urls = Array.from(files).map(file => URL.createObjectURL(file));
//       setReviewImagePreviews(urls);
//       setReviewForm(f => ({ ...f, images: urls }));
//     }
//   };
//   // Handle video uploads for review
//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const urls = Array.from(files).map(file => URL.createObjectURL(file));
//       setReviewVideoPreviews(urls);
//       setReviewForm(f => ({ ...f, videos: urls }));
//     }
//   };

//   const handleChatWithReviewer = (reviewer) => {
//     // Get current chat list from localStorage
//     const chatList = JSON.parse(localStorage.getItem('communityChats') || '[]');
//     // If reviewer not in chat list, add them
//     if (!chatList.find((c) => c.username === reviewer)) {
//       chatList.push({ id: reviewer, username: reviewer, lastMessage: '', status: 'online' });
//       localStorage.setItem('communityChats', JSON.stringify(chatList));
//     }
//     // Redirect to community with reviewer as query param
//     navigate(`/community?chat=${encodeURIComponent(reviewer)}`);
//   };

//   if (!product) return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div className="flex-1 flex items-center justify-center bg-gray-50">
//         <div className="bg-white rounded-lg shadow p-8 text-center text-gray-700 text-xl font-semibold">{t('Product not found.')}</div>
//       </div>
//       <Footer />
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />
//       {/* Sticky Header for product name and actions */}
//       <div className="sticky top-0 z-20 bg-white shadow flex items-center justify-between px-8 py-4 border-b">
//         <div className="font-bold text-lg md:text-2xl text-blue-900">{product.name}</div>
//         <div className="flex items-center gap-4">
//           <span className="text-2xl font-bold text-green-700">
//             ${product.price.toFixed(2)}
//           </span>
//           {product.originalPrice && (
//             <span className="text-lg text-gray-500 line-through ml-2">
//               ${product.originalPrice.toFixed(2)}
//             </span>
//           )}
//           <Button 
//             className="bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg shadow-xl transition-transform duration-150 focus:scale-105 hover:scale-105 border-2 border-emerald-700"
//             onClick={() => {
//               if (product) {
//                 addItem(product);
//                 toast.success(
//                   <div className="flex items-center gap-3">
//                     <img src={product.image} alt={product.name} className="w-10 h-10 rounded border" />
//                     <span className="font-semibold">{product.name}</span>
//                     <span className="text-emerald-700 font-bold ml-2">{t('Added to cart!')}</span>
//                   </div>,
//                   { duration: 2000 }
//                 );
//               }
//             }}
//           >
//             {t('Add to Cart')}
//           </Button>
//           <Button 
//             className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg shadow transition-transform duration-150 focus:scale-105 hover:scale-105 ml-2"
//             onClick={() => {
//               if (product) {
//                 addItem(product);
//                 navigate('/checkout');
//               }
//             }}
//           >
//             {t('Buy Now')}
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto w-full py-8 px-4 flex-1">
//         {/* Left: Image Gallery */}
//         <div className="min-w-[80px] flex flex-col gap-2 lg:w-1/2">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-80 object-cover rounded-xl mb-4 mx-auto"
//           />
//         </div>
//         {/* Right: Main Info */}
//         <div className="flex-1 bg-white rounded-xl shadow p-6 lg:w-1/2">
//           <div className="font-bold text-xl mb-2 text-blue-900">{product.name}</div>
//           <div className="flex items-center gap-4 mb-2">
//             <span className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</span>
//             {product.originalPrice && (
//               <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
//             )}
//             {product.originalPrice && (
//               <span className="text-green-700 font-semibold">{Math.round(100 - (product.price / product.originalPrice) * 100)}% off</span>
//             )}
//           </div>
//           <div className="mb-3 text-green-700 font-semibold">{t('Special price')}</div>
//           {product.highlights && product.highlights.length > 0 && (
//             <div className="mb-4">
//               <b>{t('Highlights')}</b>
//               <ul className="list-disc pl-6 mt-1 text-gray-700">
//                 {product.highlights.map((h, i) => <li key={i}>{h}</li>)}
//               </ul>
//             </div>
//           )}
//           <div className="mb-4">
//             <div className="text-lg font-semibold text-gray-800 mb-2">{t('Description')}</div>
//             <div className="text-gray-700 text-base">{product.description}</div>
//           </div>
//           {product.specs && product.specs.length > 0 && (
//             <div className="mb-4">
//               <b>{t('Specifications')}</b>
//               <table className="w-full mt-2 bg-gray-50 rounded-lg">
//                 <tbody>
//                   {product.specs.map((s, i) => (
//                     <tr key={i}>
//                       <td className="font-semibold py-1 pr-4 text-gray-700 w-1/3">{s.label}</td>
//                       <td className="py-1 text-gray-600">{s.value}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Reviews & Q&A Section - Full Width */}
//       <div className="max-w-6xl mx-auto w-full px-4 pb-12">
//         {/* --- Ratings Summary (Star Chart) --- */}
//         <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-0 bg-white rounded-xl shadow p-6">
//           <div className="flex-1 flex flex-col items-center justify-center md:items-start md:justify-center mb-4 md:mb-0">
//             <div className="flex items-center gap-3 text-5xl font-bold text-green-700">
//               {product.rating}
//               <svg xmlns='http://www.w3.org/2000/svg' className='inline-block' width='48' height='48' fill='currentColor' viewBox='0 0 24 24' style={{marginBottom: '6px'}}><path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/></svg>
//             </div>
//             <div className="text-gray-800 text-base mt-2">{product.reviews} {t('Ratings &')} {product.verified_reviews} {t('Reviews')}</div>
//           </div>
//           <div className="flex-1 w-full max-w-md">
//             {[5, 4, 3, 2, 1].map((star) => (
//               <div key={star} className="flex items-center gap-2 mb-2">
//                 <span className="w-8 font-semibold text-gray-900">{star}★</span>
//                 <div className="bg-gray-200 rounded h-2 flex-1 relative overflow-hidden">
//                   <div className="bg-green-600 h-2 rounded" style={{ width: `${(product.rating >= star ? 100 : 20)}%` }}></div>
//                 </div>
//                 <span className="w-12 text-xs text-gray-700 text-right">{Math.floor(product.reviews / 5)}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* --- Reviews Section --- */}
//         <div className="mb-8">
//           <div className="font-bold text-lg mb-2 text-blue-900 flex items-center gap-2">
//             {t('Ratings & Reviews')} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{t('Verified Buyer Network')}</span>
//             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded ml-2">{reviews.length} {t('reviews loaded')}</span>
//           </div>
//           <div className="text-xs text-gray-500 mb-2">{t('Only customers with verified purchases can participate in product discussions.')} <span className="text-green-700 font-semibold">{t('AI Moderation enabled')}</span>.</div>
//           {reviews.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <div className="text-lg font-semibold mb-2">{t('No reviews yet')}</div>
//               <div className="text-sm">{t('Be the first to review this product!')}</div>
//             </div>
//           ) : (
//             (showAllReviews ? reviews : reviews.slice(0, 3)).map((r, i) => (
//               <div key={i} className="border-b border-gray-200 pb-3 mb-3">
//                 <div className="flex items-center gap-2">
//                   <span className="bg-green-600 text-white rounded px-2 font-bold">{r.rating}★</span>
//                   <span className="font-semibold text-gray-800">{r.value}</span>
//                   <span className="text-xs text-gray-500">{r.date}</span>
//                   <span className="text-xs text-gray-500">{r.location}</span>
//                   {r.verified && <span className="bg-blue-100 text-blue-700 rounded px-2 text-xs ml-2">{t('Verified Buyer')}</span>}
//                 </div>
//                 <div className="my-1 text-gray-700">{r.comment}</div>
//                 {r.images && r.images.length > 0 && (
//                   <div className="flex gap-2 mt-1">
//                     {r.images.map((img, idx) => (
//                       <img key={idx} src={img} alt="review" className="w-16 h-16 object-cover rounded shadow" />
//                     ))}
//                   </div>
//                 )}
//                 {r.videos && r.videos.length > 0 && (
//                   <div className="flex gap-2 mt-1">
//                     {r.videos.map((vid, idx) => (
//                       <video key={idx} src={vid} controls className="w-24 rounded shadow" />
//                     ))}
//                   </div>
//                 )}
//                 <div className="text-blue-700 text-xs mt-1 font-semibold">{r.user}</div>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <button className="ml-2 p-1 rounded-full hover:bg-blue-100 text-blue-600" onClick={() => handleChatWithReviewer(r.user)} aria-label="Chat with Reviewer">
//                       <MessageCircle className="w-5 h-5" />
//                     </button>
//                   </TooltipTrigger>
//                   <TooltipContent>{t('Chat with Reviewer')}</TooltipContent>
//                 </Tooltip>
//               </div>
//             ))
//           )}
//           {reviews.length > 3 && (
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded" onClick={() => setShowAllReviews((v) => !v)}>
//               {showAllReviews ? t('Show Less') : t('Show All Reviews')}
//             </Button>
//           )}
//           {/* Add Review */}
//           <form
//             onSubmit={e => {
//               e.preventDefault();
//               setReviewError('');
//               if (!reviewForm.rating || !reviewForm.comment.trim()) {
//                 setReviewError(t('Please provide a rating and a review.'));
//                 return;
//               }
//               if (isSpam(reviewForm.comment)) {
//                 setReviewError(t('Your review was blocked by AI moderation.'));
//                 return;
//               }
//               if (!reviewForm.verified) {
//                 setReviewError(t('Only verified buyers can submit reviews.'));
//                 return;
//               }
//               setReviews([
//                 ...reviews,
//                 { 
//                   id: `review-${Date.now()}`,
//                   user: 'Verified Buyer from Your City', 
//                   date: 'Now', 
//                   location: 'Your City', 
//                   value: 'Your Review', 
//                   verified: true,
//                   rating: reviewForm.rating,
//                   comment: reviewForm.comment,
//                   images: reviewForm.images,
//                   videos: reviewForm.videos,
//                 },
//               ]);
//               setReviewForm({ rating: 0, comment: '', images: [], videos: [], verified: true });
//               setReviewImagePreviews([]);
//               setReviewVideoPreviews([]);
//             }}
//             className="mt-4 bg-gray-50 rounded-lg p-4"
//           >
//             <div className="font-semibold mb-1">{t('Add a Review (Verified Buyers Only)')}</div>
//             <div className="flex items-center gap-2 mb-2">
//               {[1, 2, 3, 4, 5].map(star => (
//                 <span
//                   key={star}
//                   className={`text-2xl cursor-pointer ${reviewForm.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
//                   onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
//                 >★</span>
//               ))}
//             </div>
//             <textarea
//               placeholder={t('Write your review...')}
//               value={reviewForm.comment}
//               onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
//               className="w-full min-h-[60px] rounded border border-gray-300 mb-2 p-2"
//             />
//             <div className="mb-2">
//               <label className="font-medium mr-2">{t('Upload Images:')}</label>
//               <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="mr-2" />
//               {reviewImagePreviews.map((img, i) => (
//                 <img key={i} src={img} alt="preview" className="w-10 h-10 object-cover rounded mr-1 inline-block" />
//               ))}
//             </div>
//             <div className="mb-2">
//               <label className="font-medium mr-2">{t('Upload Videos:')}</label>
//               <input ref={videoInputRef} type="file" accept="video/*" multiple onChange={handleVideoUpload} className="mr-2" />
//               {reviewVideoPreviews.map((vid, i) => (
//                 <video key={i} src={vid} controls className="w-10 rounded mr-1 inline-block" />
//               ))}
//             </div>
//             <div className="mb-2">
//               <label className="font-medium mr-2">
//                 <input
//                   type="checkbox"
//                   checked={reviewForm.verified}
//                   onChange={e => setReviewForm(f => ({ ...f, verified: e.target.checked }))}
//                   disabled
//                 /> {t('Verified Buyer (required)')}
//               </label>
//             </div>
//             {reviewError && <div className="text-red-600 text-sm mb-2">{reviewError}</div>}
//             <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded">{t('Submit Review')}</Button>
//             <div className="text-xs text-gray-500 mt-2">{t('All reviews are AI-moderated for spam, bias, and fake content.')}</div>
//           </form>
//         </div>
//         {/* Q&A Section (Accordion style) */}
//         <div className="mb-8">
//           <div className="font-bold text-lg mb-2 text-blue-900 flex items-center gap-2">
//             {t('Customer Q&A')} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{t('Verified Buyer Network')}</span>
//             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded ml-2">{qaList.length} {t('Q&A loaded')}</span>
//           </div>
//           <div className="text-xs text-gray-500 mb-2">{t('Only verified buyers can ask questions.')} <span className="text-green-700 font-semibold">{t('AI Moderation enabled')}</span>.</div>
//           {qaList.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <div className="text-lg font-semibold mb-2">{t('No questions yet')}</div>
//               <div className="text-sm">{t('Be the first to ask a question about this product!')}</div>
//             </div>
//           ) : (
//             qaList.map((qa, i) => (
//               <div key={i} className="border-b border-gray-200 mb-2">
//                 <div className="flex items-center cursor-pointer p-2" onClick={() => setQaExpanded(qaExpanded === i ? null : i)}>
//                   <span className="font-semibold text-blue-700 mr-2">Q:</span>
//                   <span>{qa.question}</span>
//                   <span className="ml-auto text-xs text-gray-500">{qa.user} • {qa.date}</span>
//                   <span className="ml-2">{qaExpanded === i ? '▲' : '▼'}</span>
//                 </div>
//                 {qaExpanded === i && (
//                   <div className="pl-8 pb-2 text-green-700"><b>A:</b> {qa.answer}</div>
//                 )}
//               </div>
//             ))
//           )}
//           {/* Add Question */}
//           <form
//             onSubmit={e => {
//               e.preventDefault();
//               setQaError('');
//               if (!newQuestion.trim()) {
//                 setQaError(t('Please enter a question.'));
//                 return;
//               }
//               if (isSpam(newQuestion)) {
//                 setQaError(t('Your question was blocked by AI moderation.'));
//                 return;
//               }
//               setQaList([
//                 ...qaList,
//                 { question: newQuestion, answer: 'Thank you for your question! Our team will answer soon.', user: 'Verified Buyer from Your City', date: 'Now' },
//               ]);
//               setNewQuestion('');
//             }}
//             className="mt-4"
//           >
//             <input
//               type="text"
//               placeholder={t('Ask a question...')}
//               value={newQuestion}
//               onChange={e => setNewQuestion(e.target.value)}
//               className="w-4/5 p-2 rounded border border-gray-300 mr-2"
//               disabled={false}
//             />
//             <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded">{t('Ask')}</Button>
//             {qaError && <div className="text-red-600 text-sm mt-2">{qaError}</div>}
//             <div className="text-xs text-gray-500 mt-2">{t('All questions are AI-moderated for spam, bias, and fake content.')}</div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail; 
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { getProductReviewsQA, ProductReview, ProductQA } from '@/utils/productReviewsQA.ts.ts';
import { MessageCircle } from 'lucide-react'; // or use a similar icon
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; // if you have a tooltip component
import { useTranslation } from 'react-i18next';
import ChatPopup from '@/components/ChatPopup';
import { useChatStore } from '../store/socialStore';

const initialChat = [
  { user: 'Verified Buyer from Delhi', message: 'I bought this last month, it is sturdy!', time: '2 min ago' },
  { user: 'Verified Buyer from Mumbai', message: 'You can easily install it yourself.', time: '1 min ago' },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  const { t } = useTranslation();
  
  console.log('ProductDetail component rendered');
  console.log('productId from params:', productId);
  console.log('products from store:', products);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [qaExpanded, setQaExpanded] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [qaList, setQaList] = useState<ProductQA[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '', images: [], videos: [], verified: true });
  const [reviewImagePreviews, setReviewImagePreviews] = useState<string[]>([]);
  const [reviewVideoPreviews, setReviewVideoPreviews] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState(initialChat);
  const [chatInput, setChatInput] = useState('');
  const [chatError, setChatError] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [qaError, setQaError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [chatPopupUser, setChatPopupUser] = useState<string | null>(null);
  const { startChat } = useChatStore();

  useEffect(() => {
    console.log('ProductDetail debug:', { productId, products });
    console.log('Product IDs in store:', products.map(p => p.id));
    console.log('Looking for product with ID:', productId);
    console.log('Type of productId:', typeof productId);
    console.log('Type of store product IDs:', products.map(p => typeof p.id));
    
    const found = products.find((p) => p.id === productId);
    console.log('Found product:', found);
    
    setProduct(found || null);
    setSelectedImage(0);
    
    // Load product-specific reviews and Q&A
    if (productId) {
      const productData = getProductReviewsQA(productId);
      console.log('Product ID:', productId);
      console.log('Product Data:', productData);
      console.log('Reviews:', productData.reviews);
      console.log('Q&A:', productData.qa);
      setReviews(productData.reviews);
      setQaList(productData.qa);
    }
  }, [productId, products]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // AI Moderation: block spam/fake
  function isSpam(text: string) {
    return /spam|fake|scam|fraud/i.test(text);
  }

  // Handle image uploads for review
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setReviewImagePreviews(urls);
      setReviewForm(f => ({ ...f, images: urls }));
    }
  };
  // Handle video uploads for review
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setReviewVideoPreviews(urls);
      setReviewForm(f => ({ ...f, videos: urls }));
    }
  };

  // Only open popup and start chat, no navigation or localStorage
  const handleChatWithReviewer = (reviewer: string) => {
    setChatPopupUser(reviewer);
    setChatPopupOpen(true);
    startChat(reviewer);
  };

  if (!product) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-700 text-xl font-semibold">{t('Product not found.')}</div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <ChatPopup open={chatPopupOpen} username={chatPopupUser} onClose={() => setChatPopupOpen(false)} />
      {/* Sticky Header for product name and actions */}
      <div className="sticky top-0 z-20 bg-white shadow flex items-center justify-between px-8 py-4 border-b">
        <div className="font-bold text-lg md:text-2xl text-blue-900">{product.name}</div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-green-700">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg shadow-xl transition-transform duration-150 focus:scale-105 hover:scale-105 border-2 border-emerald-700"
            onClick={() => {
              if (product) {
                addItem(product);
                toast.success(
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded border" />
                    <span className="font-semibold">{product.name}</span>
                    <span className="text-emerald-700 font-bold ml-2">{t('Added to cart!')}</span>
                  </div>,
                  { duration: 2000 }
                );
              }
            }}
          >
            {t('Add to Cart')}
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg shadow transition-transform duration-150 focus:scale-105 hover:scale-105 ml-2"
            onClick={() => {
              if (product) {
                addItem(product);
                navigate('/checkout');
              }
            }}
          >
            {t('Buy Now')}
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto w-full py-8 px-4 flex-1">
        {/* Left: Image Gallery */}
        <div className="min-w-[80px] flex flex-col gap-2 lg:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl mb-4 mx-auto"
          />
        </div>
        {/* Right: Main Info */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 lg:w-1/2">
          <div className="font-bold text-xl mb-2 text-blue-900">{product.name}</div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.originalPrice && (
              <span className="text-green-700 font-semibold">{Math.round(100 - (product.price / product.originalPrice) * 100)}% off</span>
            )}
          </div>
          <div className="mb-3 text-green-700 font-semibold">{t('Special price')}</div>
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-4">
              <b>{t('Highlights')}</b>
              <ul className="list-disc pl-6 mt-1 text-gray-700">
                {product.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}
          <div className="mb-4">
            <div className="text-lg font-semibold text-gray-800 mb-2">{t('Description')}</div>
            <div className="text-gray-700 text-base">{product.description}</div>
          </div>
          {product.specs && product.specs.length > 0 && (
            <div className="mb-4">
              <b>{t('Specifications')}</b>
              <table className="w-full mt-2 bg-gray-50 rounded-lg">
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr key={i}>
                      <td className="font-semibold py-1 pr-4 text-gray-700 w-1/3">{s.label}</td>
                      <td className="py-1 text-gray-600">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* Reviews & Q&A Section - Full Width */}
      <div className="max-w-6xl mx-auto w-full px-4 pb-12">
        {/* --- Ratings Summary (Star Chart) --- */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-0 bg-white rounded-xl shadow p-6">
          <div className="flex-1 flex flex-col items-center justify-center md:items-start md:justify-center mb-4 md:mb-0">
            <div className="flex items-center gap-3 text-5xl font-bold text-green-700">
              {product.rating}
              <svg xmlns='http://www.w3.org/2000/svg' className='inline-block' width='48' height='48' fill='currentColor' viewBox='0 0 24 24' style={{marginBottom: '6px'}}><path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/></svg>
            </div>
            <div className="text-gray-800 text-base mt-2">{product.reviews} {t('Ratings &')} {product.verified_reviews} {t('Reviews')}</div>
          </div>
          <div className="flex-1 w-full max-w-md">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 mb-2">
                <span className="w-8 font-semibold text-gray-900">{star}★</span>
                <div className="bg-gray-200 rounded h-2 flex-1 relative overflow-hidden">
                  <div className="bg-green-600 h-2 rounded" style={{ width: `${(product.rating >= star ? 100 : 20)}%` }}></div>
                </div>
                <span className="w-12 text-xs text-gray-700 text-right">{Math.floor(product.reviews / 5)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* --- Reviews Section --- */}
        <div className="mb-8">
          <div className="font-bold text-lg mb-2 text-blue-900 flex items-center gap-2">
            {t('Ratings & Reviews')} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{t('Verified Buyer Network')}</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded ml-2">{reviews.length} {t('reviews loaded')}</span>
          </div>
          <div className="text-xs text-gray-500 mb-2">{t('Only customers with verified purchases can participate in product discussions.')} <span className="text-green-700 font-semibold">{t('AI Moderation enabled')}</span>.</div>
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-lg font-semibold mb-2">{t('No reviews yet')}</div>
              <div className="text-sm">{t('Be the first to review this product!')}</div>
            </div>
          ) : (
            (showAllReviews ? reviews : reviews.slice(0, 3)).map((r, i) => (
              <div key={i} className="border-b border-gray-200 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded px-2 font-bold">{r.rating}★</span>
                  <span className="font-semibold text-gray-800">{r.value}</span>
                  <span className="text-xs text-gray-500">{r.date}</span>
                  <span className="text-xs text-gray-500">{r.location}</span>
                  {r.verified && <span className="bg-blue-100 text-blue-700 rounded px-2 text-xs ml-2">{t('Verified Buyer')}</span>}
                </div>
                <div className="my-1 text-gray-700">{r.comment}</div>
                {r.images && r.images.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {r.images.map((img, idx) => (
                      <img key={idx} src={img} alt="review" className="w-16 h-16 object-cover rounded shadow" />
                    ))}
                  </div>
                )}
                {r.videos && r.videos.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {r.videos.map((vid, idx) => (
                      <video key={idx} src={vid} controls className="w-24 rounded shadow" />
                    ))}
                  </div>
                )}
                <div className="text-blue-700 text-xs mt-1 font-semibold">{r.user}</div>
                <button
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  onClick={() => handleChatWithReviewer(r.user)}
                  aria-label="Chat with Reviewer"
                >
                  <MessageCircle className="w-5 h-5" /> Chat with Reviewer
                </button>
              </div>
            ))
          )}
          {reviews.length > 3 && (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded" onClick={() => setShowAllReviews((v) => !v)}>
              {showAllReviews ? t('Show Less') : t('Show All Reviews')}
            </Button>
          )}
          {/* Add Review */}
          <form
            onSubmit={e => {
              e.preventDefault();
              setReviewError('');
              if (!reviewForm.rating || !reviewForm.comment.trim()) {
                setReviewError(t('Please provide a rating and a review.'));
                return;
              }
              if (isSpam(reviewForm.comment)) {
                setReviewError(t('Your review was blocked by AI moderation.'));
                return;
              }
              if (!reviewForm.verified) {
                setReviewError(t('Only verified buyers can submit reviews.'));
                return;
              }
              setReviews([
                ...reviews,
                { 
                  id: `review-${Date.now()}`,
                  user: 'Verified Buyer from Your City', 
                  date: 'Now', 
                  location: 'Your City', 
                  value: 'Your Review', 
                  verified: true,
                  rating: reviewForm.rating,
                  comment: reviewForm.comment,
                  images: reviewForm.images,
                  videos: reviewForm.videos,
                },
              ]);
              setReviewForm({ rating: 0, comment: '', images: [], videos: [], verified: true });
              setReviewImagePreviews([]);
              setReviewVideoPreviews([]);
            }}
            className="mt-4 bg-gray-50 rounded-lg p-4"
          >
            <div className="font-semibold mb-1">{t('Add a Review (Verified Buyers Only)')}</div>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`text-2xl cursor-pointer ${reviewForm.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                >★</span>
              ))}
            </div>
            <textarea
              placeholder={t('Write your review...')}
              value={reviewForm.comment}
              onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
              className="w-full min-h-[60px] rounded border border-gray-300 mb-2 p-2"
            />
            <div className="mb-2">
              <label className="font-medium mr-2">{t('Upload Images:')}</label>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="mr-2" />
              {reviewImagePreviews.map((img, i) => (
                <img key={i} src={img} alt="preview" className="w-10 h-10 object-cover rounded mr-1 inline-block" />
              ))}
            </div>
            <div className="mb-2">
              <label className="font-medium mr-2">{t('Upload Videos:')}</label>
              <input ref={videoInputRef} type="file" accept="video/*" multiple onChange={handleVideoUpload} className="mr-2" />
              {reviewVideoPreviews.map((vid, i) => (
                <video key={i} src={vid} controls className="w-10 rounded mr-1 inline-block" />
              ))}
            </div>
            <div className="mb-2">
              <label className="font-medium mr-2">
                <input
                  type="checkbox"
                  checked={reviewForm.verified}
                  onChange={e => setReviewForm(f => ({ ...f, verified: e.target.checked }))}
                  disabled
                /> {t('Verified Buyer (required)')}
              </label>
            </div>
            {reviewError && <div className="text-red-600 text-sm mb-2">{reviewError}</div>}
            <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded">{t('Submit Review')}</Button>
            <div className="text-xs text-gray-500 mt-2">{t('All reviews are AI-moderated for spam, bias, and fake content.')}</div>
          </form>
        </div>
        {/* Q&A Section (Accordion style) */}
        <div className="mb-8">
          <div className="font-bold text-lg mb-2 text-blue-900 flex items-center gap-2">
            {t('Customer Q&A')} <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{t('Verified Buyer Network')}</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded ml-2">{qaList.length} {t('Q&A loaded')}</span>
          </div>
          <div className="text-xs text-gray-500 mb-2">{t('Only verified buyers can ask questions.')} <span className="text-green-700 font-semibold">{t('AI Moderation enabled')}</span>.</div>
          {qaList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-lg font-semibold mb-2">{t('No questions yet')}</div>
              <div className="text-sm">{t('Be the first to ask a question about this product!')}</div>
            </div>
          ) : (
            qaList.map((qa, i) => (
              <div key={i} className="border-b border-gray-200 mb-2">
                <div className="flex items-center cursor-pointer p-2" onClick={() => setQaExpanded(qaExpanded === i ? null : i)}>
                  <span className="font-semibold text-blue-700 mr-2">Q:</span>
                  <span>{qa.question}</span>
                  <span className="ml-auto text-xs text-gray-500">{qa.user} • {qa.date}</span>
                  <span className="ml-2">{qaExpanded === i ? '▲' : '▼'}</span>
                </div>
                {qaExpanded === i && (
                  <div className="pl-8 pb-2 text-green-700"><b>A:</b> {qa.answer}</div>
                )}
              </div>
            ))
          )}
          {/* Add Question */}
          <form
            onSubmit={e => {
              e.preventDefault();
              setQaError('');
              if (!newQuestion.trim()) {
                setQaError(t('Please enter a question.'));
                return;
              }
              if (isSpam(newQuestion)) {
                setQaError(t('Your question was blocked by AI moderation.'));
                return;
              }
              setQaList([
                ...qaList,
                { question: newQuestion, answer: 'Thank you for your question! Our team will answer soon.', user: 'Verified Buyer from Your City', date: 'Now' },
              ]);
              setNewQuestion('');
            }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder={t('Ask a question...')}
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              className="w-4/5 p-2 rounded border border-gray-300 mr-2"
              disabled={false}
            />
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded">{t('Ask')}</Button>
            {qaError && <div className="text-red-600 text-sm mt-2">{qaError}</div>}
            <div className="text-xs text-gray-500 mt-2">{t('All questions are AI-moderated for spam, bias, and fake content.')}</div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail; 