// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { 
//   Heart, 
//   Star, 
//   ShoppingCart, 
//   Plus, 
//   Minus, 
//   Share2, 
//   ChevronRight,
//   Truck,
//   Shield,
//   RotateCcw,
//   Clock,
//   Camera,
//   Eye,
//   Sparkles
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useCartStore } from '@/store/cartStore';
// import { Product } from '@/types/product';
// import { toast } from 'sonner';
// import Header from './Header';
// import { Footer } from './Footer';
// import { mockApiService } from '@/services/mockApiService';
// import ARTryOn from './ARTryOn';
// import { Modal } from '@/components/ui'; // adjust import if you have a modal/ui library
// import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
// import { useUserStore } from '@/store/userStore';

// const ProductDetailPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('overview');
//   const { addItem } = useCartStore();
//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatWith, setChatWith] = useState<string | null>(null);
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatFiles, setChatFiles] = useState<File[]>([]);
//   const [chatHistory, setChatHistory] = useState<{user: string, message: string, files?: string[]}[]>([]);
//   const navigate = useNavigate();
//   const { getUserReviewsByProduct } = useUserStore();

//   // Load chat history from localStorage when chatWith changes
//   React.useEffect(() => {
//     if (chatWith) {
//       const saved = localStorage.getItem(`reviewChat_${chatWith}`);
//       setChatHistory(saved ? JSON.parse(saved) : []);
//     }
//   }, [chatWith]);

//   const handleOpenChat = (reviewer: string) => {
//     setChatWith(reviewer);
//     setChatOpen(true);
//   };

//   const handleSendChat = () => {
//     if (!chatMessage.trim() && chatFiles.length === 0) return;
//     const filesData: string[] = [];
//     if (chatFiles.length > 0) {
//       chatFiles.forEach(file => {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           filesData.push(e.target?.result as string);
//           if (filesData.length === chatFiles.length) {
//             const newMsg = { user: 'You', message: chatMessage, files: filesData };
//             const updated = [...chatHistory, newMsg];
//             setChatHistory(updated);
//             localStorage.setItem(`reviewChat_${chatWith}`, JSON.stringify(updated));
//             setChatMessage('');
//             setChatFiles([]);
//           }
//         };
//         reader.readAsDataURL(file);
//       });
//     } else {
//       const newMsg = { user: 'You', message: chatMessage };
//       const updated = [...chatHistory, newMsg];
//       setChatHistory(updated);
//       localStorage.setItem(`reviewChat_${chatWith}`, JSON.stringify(updated));
//       setChatMessage('');
//     }
//   };

//   useEffect(() => {
//     const loadProduct = async () => {
//       if (!productId) {
//         setLoading(false);
//         return;
//       }
      
//       try {
//         const products = await mockApiService.getProducts();
//         const foundProduct = products.find(p => p.id === productId);
//         setProduct(foundProduct || null);
//       } catch (error) {
//         console.error('Error loading product:', error);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadProduct();
//   }, [productId]);

//   const handleAddToCart = () => {
//     if (!product) return;
    
//     for (let i = 0; i < quantity; i++) {
//       addItem(product);
//     }
    
//     toast.success('Added to cart!', {
//       description: `${product.name} (Quantity: ${quantity})`,
//     });
    
//     setQuantity(1);
//   };

//   // Check if product supports AR
//   const getARSupport = (category: string) => {
//     const clothingCategories = ['fashion', 'clothing', 'apparel', 'accessories'];
//     const furnitureCategories = ['home & garden', 'furniture', 'home', 'garden', 'decor'];
    
//     const normalizedCategory = category.toLowerCase();
    
//     if (clothingCategories.some(cat => normalizedCategory.includes(cat))) {
//       return { supported: true, type: 'clothing' as const };
//     }
    
//     if (furnitureCategories.some(cat => normalizedCategory.includes(cat))) {
//       return { supported: true, type: 'furniture' as const };
//     }
    
//     return { supported: false, type: null };
//   };

//   const renderStars = (rating: number) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(
//           <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//         );
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative">
//             <Star className="h-4 w-4 text-gray-300" />
//             <div className="absolute inset-0 overflow-hidden w-1/2">
//               <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(
//           <Star key={i} className="h-4 w-4 text-gray-300" />
//         );
//       }
//     }
//     return stars;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             <span className="ml-3 text-lg text-gray-600">Loading product details...</span>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
//             <p className="text-gray-600 mb-4">Sorry, we couldn't find the product you're looking for.</p>
//             <Link to="/" className="text-blue-600 hover:underline">
//               Back to Home
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // Generate multiple images for the gallery
//   const productImages = [
//     product.image,
//     product.image.includes('unsplash.com') ? product.image.replace('w=400', 'w=600&bg=f8f9fa') : product.image,
//     product.image.includes('unsplash.com') ? product.image.replace('w=400', 'w=600&bg=ffffff') : product.image,
//     product.image.includes('unsplash.com') ? product.image.replace('w=400', 'w=600&bg=f1f3f4') : product.image
//   ];

//   const arSupport = getARSupport(product.category);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       {/* Breadcrumb */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <nav className="flex text-sm">
//             <Link to="/" className="text-blue-600 hover:underline">Home</Link>
//             <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
//             <Link to={`/category/${product.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
//               {product.category}
//             </Link>
//             <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
//             <span className="text-gray-600 truncate">{product.name}</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Product Images */}
//           <div className="space-y-4">
//             <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
//               <img
//                 src={productImages[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {productImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   title={`View image ${index + 1}`}
//                   className={`aspect-square bg-white rounded border-2 overflow-hidden ${
//                     selectedImage === index ? 'border-blue-500' : 'border-gray-200'
//                   }`}
//                 >
//                   <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center gap-2">
//                   {renderStars(product.rating)}
//                   <span className="text-lg font-semibold">{product.rating}</span>
//                   <span className="text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
//                 </div>
//                 <Badge variant="outline" className="text-green-600 border-green-600">
//                   {product.verified_reviews.toLocaleString()} verified purchases
//                 </Badge>
//               </div>
              
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="text-3xl font-bold text-red-600">${product.price}</div>
//                 {product.originalPrice && (
//                   <>
//                     <div className="text-xl text-gray-500 line-through">${product.originalPrice}</div>
//                     <Badge variant="destructive">
//                       Save ${(product.originalPrice - product.price).toFixed(2)}
//                     </Badge>
//                   </>
//                 )}
//               </div>

//               <div className="flex items-center gap-4 mb-6">
//                 <Badge variant="outline" className="text-blue-600 border-blue-600">
//                   Trust Score: {product.trust_score}/10
//                 </Badge>
//                 {product.eco_friendly && (
//                   <Badge variant="outline" className="text-green-600 border-green-600">
//                     🌱 Eco-Friendly
//                   </Badge>
//                 )}
//                 {product.freeShipping && (
//                   <Badge variant="outline" className="text-purple-600 border-purple-600">
//                     🚚 Free Shipping
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             {/* Quantity and Actions */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center border rounded-lg">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     title="Decrease quantity"
//                     className="p-2 hover:bg-gray-100"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="px-4 py-2 border-x">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     title="Increase quantity"
//                     className="p-2 hover:bg-gray-100"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   {product.inStock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={!product.inStock}
//                   className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
//                 >
//                   <ShoppingCart className="h-4 w-4 mr-2" />
//                   Add to Cart
//                 </Button>
//                 <Button variant="outline" className="px-3">
//                   <Heart className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" className="px-3">
//                   <Share2 className="h-4 w-4" />
//                 </Button>
//               </div>

//               {/* AR Try-On Button - Only show if product supports AR */}
//               {arSupport.supported && (
//                 <Button
//                   onClick={() => setActiveTab('ar-tryOn')}
//                   className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
//                 >
//                   <Eye className="h-4 w-4 mr-2" />
//                   Try in AR
//                   <Sparkles className="h-4 w-4 ml-2" />
//                 </Button>
//               )}
//             </div>

//             {/* Trust Features */}
//             <div className="grid grid-cols-2 gap-4 pt-6 border-t">
//               <div className="flex items-center gap-2">
//                 <Truck className="h-5 w-5 text-green-600" />
//                 <div>
//                   <div className="font-semibold text-sm">Fast Delivery</div>
//                   <div className="text-xs text-gray-600">2-day shipping</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Shield className="h-5 w-5 text-blue-600" />
//                 <div>
//                   <div className="font-semibold text-sm">Secure Payment</div>
//                   <div className="text-xs text-gray-600">Protected checkout</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <RotateCcw className="h-5 w-5 text-orange-600" />
//                 <div>
//                   <div className="font-semibold text-sm">Easy Returns</div>
//                   <div className="text-xs text-gray-600">90-day policy</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock className="h-5 w-5 text-purple-600" />
//                 <div>
//                   <div className="font-semibold text-sm">24/7 Support</div>
//                   <div className="text-xs text-gray-600">Customer service</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Tabs */}
//         <div className="bg-white rounded-lg shadow-sm">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="specifications">Specifications</TabsTrigger>
//               <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               {arSupport.supported && (
//                 <TabsTrigger value="ar-tryOn" className="text-purple-600 font-semibold">
//                   <Camera className="h-4 w-4 mr-1" />
//                   AR Try-On
//                 </TabsTrigger>
//               )}
//             </TabsList>
            
//             <TabsContent value="overview" className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
//               <div className="prose max-w-none">
//                 <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                
//                 {/* Key Features */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
//                     <ul className="text-sm text-gray-600 space-y-1">
//                       <li>• Premium quality materials</li>
//                       <li>• Excellent customer reviews</li>
//                       <li>• Fast shipping available</li>
//                       {product.eco_friendly && <li>• Eco-friendly product</li>}
//                     </ul>
//                   </div>
                  
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <h4 className="font-semibold text-blue-900 mb-2">Trust Indicators</h4>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span>Trust Score:</span>
//                         <span className="font-semibold">{product.trust_score}/10</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Verified Reviews:</span>
//                         <span className="font-semibold">{product.verified_reviews}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Sustainability:</span>
//                         <span className="font-semibold">{product.sustainability_score}/10</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="specifications" className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-gray-600">Category:</span>
//                     <span className="font-semibold">{product.category}</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-gray-600">Rating:</span>
//                     <span className="font-semibold">{product.rating}/5</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-gray-600">Reviews:</span>
//                     <span className="font-semibold">{product.reviews}</span>
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-gray-600">Free Shipping:</span>
//                     <span className="font-semibold">{product.freeShipping ? 'Yes' : 'No'}</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-gray-600">In Stock:</span>
//                     <span className="font-semibold">{product.inStock ? 'Yes' : 'No'}</span>
//                   </div>
//                   <div className="flex justify-between border-b pb-2">
//                     <span className="text-gray-600">Eco-Friendly:</span>
//                     <span className="font-semibold">{product.eco_friendly ? 'Yes' : 'No'}</span>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="reviews" className="p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
//               <div className="space-y-4">
//                 {getUserReviewsByProduct(product.id).length === 0 && (
//                   <div className="text-gray-500 text-center">No reviews yet. Be the first to review this product!</div>
//                 )}
//                 {getUserReviewsByProduct(product.id).map((review) => (
//                   <div key={review.id} className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-2">
//                         {renderStars(review.rating)}
//                         <span className="font-semibold">{review.username}</span>
//                       </div>
//                       <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
//                     </div>
//                     <p className="text-gray-700 text-sm">{review.comment}</p>
//                     <div className="mt-2 flex items-center gap-2">
//                       <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
//                         Verified Purchase
//                       </Badge>
//                       <button
//                         className="ml-2 bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700"
//                         onClick={() => navigate(`/community?chat=${encodeURIComponent(review.username)}`)}
//                       >
//                         Chat
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* Chat Modal remains unchanged */}
//               {chatOpen && chatWith && (
//                 <Modal open={chatOpen} onClose={() => setChatOpen(false)}>
//                   <div className="p-4 w-full max-w-md">
//                     <h3 className="text-lg font-bold mb-2">Chat with {chatWith}</h3>
//                     <div className="h-64 overflow-y-auto bg-gray-50 rounded p-2 mb-2">
//                       {chatHistory.map((msg, idx) => (
//                         <div key={idx} className={`mb-2 ${msg.user === 'You' ? 'text-right' : 'text-left'}`}>
//                           <div className={`inline-block px-3 py-2 rounded-lg ${msg.user === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
//                             <div>{msg.message}</div>
//                             {msg.files && msg.files.map((file, i) => (
//                               file.startsWith('data:image') ? (
//                                 <img key={i} src={file} alt="attachment" className="w-24 h-24 object-cover rounded mt-2" />
//                               ) : (
//                                 <video key={i} src={file} controls className="w-32 rounded mt-2" />
//                               )
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Input
//                         type="text"
//                         placeholder="Type a message..."
//                         value={chatMessage}
//                         onChange={e => setChatMessage(e.target.value)}
//                         className="flex-1"
//                       />
//                       <label className="cursor-pointer">
//                         <FaPaperclip className="text-xl text-gray-500" />
//                         <input
//                           type="file"
//                           accept="image/*,video/*"
//                           multiple
//                           className="hidden"
//                           onChange={e => setChatFiles(e.target.files ? Array.from(e.target.files) : [])}
//                         />
//                       </label>
//                       <Button onClick={handleSendChat} className="bg-blue-600 text-white px-3 py-2 rounded-full">
//                         <FaPaperPlane />
//                       </Button>
//                     </div>
//                   </div>
//                 </Modal>
//               )}
//             </TabsContent>

//             {arSupport.supported && (
//               <TabsContent value="ar-tryOn" className="p-6">
//                 <div className="mb-4">
//                   <h2 className="text-xl font-bold text-gray-900 mb-2">
//                     Virtual Try-On Experience
//                   </h2>
//                   <p className="text-gray-600">
//                     Use your camera to see how this {arSupport.type === 'clothing' ? 'clothing item' : 'furniture'} looks {arSupport.type === 'clothing' ? 'on you' : 'in your space'}!
//                   </p>
//                 </div>
                
//                 <ARTryOn 
//                   productType={arSupport.type}
//                   productName={product.name}
//                   productImage={product.image}
//                   productCategory={product.category}
//                 />
//               </TabsContent>
//             )}
//           </Tabs>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetailPage;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Share2, 
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Clock,
  Camera,
  Eye,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import Header from './Header';
import { Footer } from './Footer';
import { mockApiService } from '@/services/mockApiService';
import ARTryOn from './ARTryOn';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { useUserStore } from '@/store/userStore';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const { addItem } = useCartStore();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatWith, setChatWith] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistories, setChatHistories] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();
  const { getUserReviewsByProduct } = useUserStore();
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showChatWithMe, setShowChatWithMe] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('You'); // Replace with actual username if available

  // Load chat history from localStorage when chatWith changes
  React.useEffect(() => {
    if (chatWith) {
      const saved = localStorage.getItem(`reviewChat_${chatWith}`);
      setChatHistories(prev => ({
        ...prev,
        [chatWith]: saved ? JSON.parse(saved) : []
      }));
    }
  }, [chatWith]);

  const handleOpenChat = (reviewer: string) => {
    setChatWith(reviewer);
    setChatOpen(true);
  };

  const handleSendMessage = () => {
    if (!chatWith || !chatInput.trim()) return;
    setChatHistories(prev => ({
      ...prev,
      [chatWith]: [...(prev[chatWith] || []), chatInput.trim()]
    }));
    setChatInput('');
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      
      try {
        const products = await mockApiService.getProducts();
        const foundProduct = products.find(p => p.id === productId);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    toast.success('Added to cart!', {
      description: `${product.name} (Quantity: ${quantity})`,
    });
    
    setQuantity(1);
  };

  const handleSubmitReview = () => {
    // Here you would normally submit the review to the backend or store
    setShowChatWithMe(true);
    setCurrentUsername('You'); // Replace with actual username if available
    setReviewComment('');
    setReviewRating(5);
  };

  // Check if product supports AR
  const getARSupport = (category: string) => {
    const clothingCategories = ['fashion', 'clothing', 'apparel', 'accessories'];
    const furnitureCategories = ['home & garden', 'furniture', 'home', 'garden', 'decor'];
    
    const normalizedCategory = category.toLowerCase();
    
    if (clothingCategories.some(cat => normalizedCategory.includes(cat))) {
      return { supported: true, type: 'clothing' as const };
    }
    
    if (furnitureCategories.some(cat => normalizedCategory.includes(cat))) {
      return { supported: true, type: 'furniture' as const };
    }
    
    return { supported: false, type: null };
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading product details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-4">Sorry, we couldn't find the product you're looking for.</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate multiple images for the gallery
  const productImages = [
    product.image,
    product.image.includes('unsplash.com') ? product.image.replace('w=400', 'w=600&bg=f8f9fa') : product.image,
    product.image.includes('unsplash.com') ? product.image.replace('w=400', 'w=600&bg=ffffff') : product.image,
    product.image.includes('unsplash.com') ? product.image.replace('w=400', 'w=600&bg=f1f3f4') : product.image
  ];

  const arSupport = getARSupport(product.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link to={`/category/${product.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`} className="text-blue-600 hover:underline">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-600 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  title={`View image ${index + 1}`}
                  className={`aspect-square bg-white rounded border-2 overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {product.verified_reviews.toLocaleString()} verified purchases
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-red-600">${product.price}</div>
                {product.originalPrice && (
                  <>
                    <div className="text-xl text-gray-500 line-through">${product.originalPrice}</div>
                    <Badge variant="destructive">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Trust Score: {product.trust_score}/10
                </Badge>
                {product.eco_friendly && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    🌱 Eco-Friendly
                  </Badge>
                )}
                {product.freeShipping && (
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    🚚 Free Shipping
                  </Badge>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    title="Decrease quantity"
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    title="Increase quantity"
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
                <button className="px-3">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="px-3">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* AR Try-On Button - Only show if product supports AR */}
              {arSupport.supported && (
                <button
                  onClick={() => setActiveTab('ar-tryOn')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Try in AR
                  <Sparkles className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold text-sm">Fast Delivery</div>
                  <div className="text-xs text-gray-600">2-day shipping</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-sm">Secure Payment</div>
                  <div className="text-xs text-gray-600">Protected checkout</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-600">90-day policy</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-semibold text-sm">24/7 Support</div>
                  <div className="text-xs text-gray-600">Customer service</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              {arSupport.supported && (
                <TabsTrigger value="ar-tryOn" className="text-purple-600 font-semibold">
                  <Camera className="h-4 w-4 mr-1" />
                  AR Try-On
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                
                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Premium quality materials</li>
                      <li>• Excellent customer reviews</li>
                      <li>• Fast shipping available</li>
                      {product.eco_friendly && <li>• Eco-friendly product</li>}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Trust Indicators</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Trust Score:</span>
                        <span className="font-semibold">{product.trust_score}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verified Reviews:</span>
                        <span className="font-semibold">{product.verified_reviews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sustainability:</span>
                        <span className="font-semibold">{product.sustainability_score}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-semibold">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-semibold">{product.rating}/5</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Reviews:</span>
                    <span className="font-semibold">{product.reviews}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Free Shipping:</span>
                    <span className="font-semibold">{product.freeShipping ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">In Stock:</span>
                    <span className="font-semibold">{product.inStock ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Eco-Friendly:</span>
                    <span className="font-semibold">{product.eco_friendly ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {/* Static Review 1 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {renderStars(5)}
                      <span className="font-semibold">Excellent Product!</span>
                    </div>
                    <span className="text-sm text-gray-600">2 days ago</span>
                  </div>
                  <div className="mb-2">Great quality and fast delivery. Highly recommended!</div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Verified Purchase</span>
                  </div>
                  {/* Chat Button for Static Review 1 */}
                  <button
                    className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition border-2 border-blue-600"
                    onClick={() => navigate(`/community?chat=Excellent Product!&new=1`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.668c0 .456-.122.905-.353 1.294l-7.5 12.5a2.25 2.25 0 01-3.794 0l-7.5-12.5A2.25 2.25 0 014.5 4.5h15z" />
                    </svg>
                    Chat with Reviewer
                  </button>
                </div>
                {/* Static Review 2 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {renderStars(4)}
                      <span className="font-semibold">Good value for money</span>
                    </div>
                    <span className="text-sm text-gray-600">1 week ago</span>
                  </div>
                  <div className="mb-2">Product as described. Good quality and reasonable price.</div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Verified Purchase</span>
                  </div>
                  {/* Chat Button for Static Review 2 */}
                  <button
                    className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition border-2 border-blue-600"
                    onClick={() => navigate(`/community?chat=Good value for money&new=1`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.668c0 .456-.122.905-.353 1.294l-7.5 12.5a2.25 2.25 0 01-3.794 0l-7.5-12.5A2.25 2.25 0 014.5 4.5h15z" />
                    </svg>
                    Chat with Reviewer
                  </button>
                </div>
                {/* Dynamic Reviews */}
                {getUserReviewsByProduct(product.id).map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="font-semibold">{review.username}</span>
                      </div>
                      <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2">{review.comment}</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Verified Purchase</span>
                    </div>
                    {/* Chat Button for Dynamic Review */}
                    <button
                      className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition border-2 border-blue-600"
                      onClick={() => navigate(`/community?chat=${encodeURIComponent(review.username)}&new=1`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.668c0 .456-.122.905-.353 1.294l-7.5 12.5a2.25 2.25 0 01-3.794 0l-7.5-12.5A2.25 2.25 0 014.5 4.5h15z" />
                      </svg>
                      Chat with Reviewer
                    </button>
                  </div>
                ))}
              </div>
              {/* Chat Modal */}
              {chatOpen && chatWith && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setChatOpen(false)}>&times;</button>
                    <h3 className="text-lg font-bold mb-2">Chat with {chatWith}</h3>
                    <div className="h-48 overflow-y-auto bg-gray-50 rounded p-2 mb-2 border">
                      {(chatHistories[chatWith] || []).length === 0 ? (
                        <div className="text-gray-400 text-center mt-12">No messages yet.</div>
                      ) : (
                        (chatHistories[chatWith] || []).map((msg, idx) => (
                          <div key={idx} className="mb-1 text-sm text-gray-800 bg-blue-100 rounded px-2 py-1 w-fit max-w-full">{msg}</div>
                        ))
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 border rounded px-3 py-2"
                        type="text"
                        placeholder="Type your message..."
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                      />
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                        onClick={handleSendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {arSupport.supported && (
              <TabsContent value="ar-tryOn" className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Virtual Try-On Experience
                  </h2>
                  <p className="text-gray-600">
                    Use your camera to see how this {arSupport.type === 'clothing' ? 'clothing item' : 'furniture'} looks {arSupport.type === 'clothing' ? 'on you' : 'in your space'}!
                  </p>
                </div>
                
                <ARTryOn 
                  productType={arSupport.type}
                  productName={product.name}
                  productImage={product.image}
                  productCategory={product.category}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
