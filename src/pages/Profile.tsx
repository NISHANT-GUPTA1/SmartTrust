import React, { useState } from 'react';
import { FaUserCircle, FaShieldAlt, FaLeaf, FaTrophy, FaUsers, FaBoxOpen, FaCheckCircle, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';
import { Footer } from '../components/Footer';

const mockUser = {
  name: 'Ansh Gupta',
  avatar: '',
  trustScore: 8.8,
  badges: ['Verified Buyer', 'Green Shopper', 'Helper'],
  orders: 24,
  reviews: 12,
  challenges: 3,
  preferences: {
    categories: ['Electronics', 'Eco-friendly', 'Fashion'],
    ecoFriendly: true,
    budget: 1000,
  },
  buddy: {
    name: 'EcoShopper99',
    trustScore: 9.2,
    avatar: '',
    similarity: 92,
  },
};

const allCategories = ['Electronics', 'Eco-friendly', 'Fashion', 'Home & Garden', 'Groceries', 'Toys', 'Sports'];

const mockOrders = [
  {
    id: 'o1',
    product: {
      name: 'EcoSmart LED Bulbs',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=200',
      price: 19.99,
    },
    date: '2024-06-01',
    status: 'Delivered',
    address: '123 Main St, New Delhi, India',
    summary: 'Pack of 4, 9W, B22 base, 2-year warranty',
  },
  {
    id: 'o2',
    product: {
      name: 'Organic Cotton T-Shirt',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200',
      price: 24.99,
    },
    date: '2024-05-20',
    status: 'Delivered',
    address: '123 Main St, New Delhi, India',
    summary: 'Size: M, Color: White, 100% organic cotton',
  },
  {
    id: 'o3',
    product: {
      name: 'Bluetooth Headphones',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
      price: 59.99,
    },
    date: '2024-05-10',
    status: 'Returned',
    address: '123 Main St, New Delhi, India',
    summary: 'Wireless, 20h battery, Color: Black',
  },
];

const Profile: React.FC = () => {
  const [prefs, setPrefs] = useState(mockUser.preferences);
  const [openOrder, setOpenOrder] = useState<null | typeof mockOrders[0]>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-full md:w-1/3">
            {mockUser.avatar ? (
              <img src={mockUser.avatar} alt={mockUser.name} className="w-24 h-24 rounded-full object-cover mb-3" />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-300 mb-3" />
            )}
            <h2 className="text-2xl font-bold text-blue-900 mb-1">{mockUser.name}</h2>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold mb-2">
              <FaShieldAlt className="text-blue-400" /> Trust Score: <span className="text-blue-900">{mockUser.trustScore}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {mockUser.badges.map(badge => (
                <span key={badge} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                  {badge === 'Green Shopper' && <FaLeaf className="text-green-500" />}
                  {badge === 'Helper' && <FaTrophy className="text-yellow-500" />}
                  {badge === 'Verified Buyer' && <FaShieldAlt className="text-blue-400" />}
                  {badge}
                </span>
              ))}
            </div>
            <div className="w-full mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Orders</span><span className="font-bold text-blue-900">{mockUser.orders}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Reviews</span><span className="font-bold text-blue-900">{mockUser.reviews}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Challenges</span><span className="font-bold text-blue-900">{mockUser.challenges}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><FaUserCircle /> Preferences</h3>
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Favorite Categories</label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-1 text-sm bg-blue-50 px-2 py-1 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prefs.categories.includes(cat)}
                        onChange={e => {
                          setPrefs(prev => ({
                            ...prev,
                            categories: e.target.checked
                              ? [...prev.categories, cat]
                              : prev.categories.filter(c => c !== cat),
                          }));
                        }}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Eco-Friendly Shopping</label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={prefs.ecoFriendly}
                    onChange={e => setPrefs(prev => ({ ...prev, ecoFriendly: e.target.checked }))}
                  />
                  <span>Show me eco-friendly products and deals</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Monthly Budget ($)</label>
                <input
                  type="number"
                  className="border rounded px-3 py-1 w-32"
                  value={prefs.budget}
                  onChange={e => setPrefs(prev => ({ ...prev, budget: Number(e.target.value) }))}
                  min={0}
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><FaUsers /> Your Shopping Buddy</h3>
              <div className="flex items-center gap-4">
                {mockUser.buddy.avatar ? (
                  <img src={mockUser.buddy.avatar} alt={mockUser.buddy.name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-gray-300" />
                )}
                <div>
                  <div className="font-bold text-blue-900 text-lg flex items-center gap-1">
                    {mockUser.buddy.name}
                    <FaShieldAlt className="text-blue-400 ml-1" title="Trust Score" />
                    <span className="text-xs text-blue-700 font-bold">{mockUser.buddy.trustScore}</span>
                  </div>
                  <div className="text-xs text-gray-500">Similarity: {mockUser.buddy.similarity}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><FaBoxOpen /> Your Orders</h3>
          <div className="space-y-4">
            {mockOrders.map(order => (
              <div key={order.id} className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 shadow-sm">
                <img src={order.product.image} alt={order.product.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                <div className="flex-1">
                  <div className="font-semibold text-blue-900 text-lg">{order.product.name}</div>
                  <div className="text-xs text-gray-500">Ordered on {order.date}</div>
                  <div className="text-xs text-green-700 flex items-center gap-1 mt-1">
                    {order.status === 'Delivered' && <FaCheckCircle className="text-green-500" />} {order.status}
                  </div>
                  {order.status === 'Returned' && <div className="text-xs text-red-500 mt-1">Returned</div>}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow" onClick={() => setOpenOrder(order)}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Order Details Modal */}
      {openOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setOpenOrder(null)} aria-label="Close">
              <FaTimes />
            </button>
            <div className="flex flex-col items-center mb-4">
              <img src={openOrder.product.image} alt={openOrder.product.name} className="w-24 h-24 object-cover rounded-lg mb-2" />
              <div className="font-bold text-blue-900 text-xl mb-1">{openOrder.product.name}</div>
              <div className="text-blue-700 font-bold mb-1">${openOrder.product.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mb-2">Ordered on {openOrder.date}</div>
              <div className="text-xs text-green-700 flex items-center gap-1 mb-2">
                {openOrder.status === 'Delivered' && <FaCheckCircle className="text-green-500" />} {openOrder.status}
              </div>
              {openOrder.status === 'Returned' && <div className="text-xs text-red-500 mb-2">Returned</div>}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Delivery Address:</span>
              <div className="text-sm text-gray-600">{openOrder.address}</div>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Order Summary:</span>
              <div className="text-sm text-gray-600">{openOrder.summary}</div>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow w-full" onClick={() => setOpenOrder(null)}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile; 