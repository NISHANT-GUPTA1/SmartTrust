import { create } from 'zustand';
import { Product } from '@/types/product';

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB - Natural Titanium',
    price: 1199.99,
    originalPrice: 1299.99,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 1247,
    freeShipping: true,
    inStock: true,
    description: 'Latest iPhone with advanced camera system and titanium design',
    sustainability_score: 7.5,
    eco_friendly: true,
    trust_score: 9.1,
    verified_reviews: 892,
    ai_recommendations: ['iPhone 15 Pro Max Case', 'MagSafe Charger', 'AirPods Pro 2'],
    consumption_rate: 0.08,
    restock_prediction: 'Popular item - restock weekly',
    carbon_footprint: 75,
    social_proof: {
      recent_purchases: 156,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['iPhone 15', 'iPhone 14 Pro'],
      eco_friendly: ['iPhone 15 (Refurbished)', 'Fairphone 5'],
      premium: ['iPhone 15 Pro Max 1TB', 'Custom iPhone 15 Pro Max']
    }
  },
  {
    id: '2',
    name: 'Samsung 65" 4K Smart TV',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.6,
    reviews: 892,
    freeShipping: true,
    inStock: true,
    description: 'Premium 4K Smart TV with HDR and streaming capabilities',
    sustainability_score: 6.8,
    eco_friendly: false,
    trust_score: 8.4,
    verified_reviews: 654,
    ai_recommendations: ['TV Wall Mount', 'Sound Bar', 'HDMI Cable'],
    consumption_rate: 0.02,
    restock_prediction: 'Regular restock schedule',
    carbon_footprint: 120,
    social_proof: {
      recent_purchases: 89,
      trending: false,
      community_favorite: false
    },
    alternatives: {
      cheaper: ['Samsung 55" 4K TV', 'TCL 65" 4K TV'],
      eco_friendly: ['Energy Star Certified TV', 'Refurbished Samsung TV'],
      premium: ['Samsung 75" QLED', 'LG OLED 65"']
    }
  },
  {
    id: '3',
    name: 'Nike Air Max 270 Running Shoes',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.5,
    reviews: 643,
    freeShipping: false,
    inStock: true,
    description: 'Comfortable running shoes with Air Max cushioning technology',
    sustainability_score: 5.5,
    eco_friendly: false,
    trust_score: 7.8,
    verified_reviews: 489,
    ai_recommendations: ['Athletic Socks', 'Shoe Cleaner', 'Insoles'],
    consumption_rate: 0.15,
    restock_prediction: 'Seasonal restock pattern',
    carbon_footprint: 45,
    social_proof: {
      recent_purchases: 67,
      trending: true,
      community_favorite: false
    },
    alternatives: {
      cheaper: ['Nike Revolution 6', 'Adidas Lite Racer'],
      eco_friendly: ['Nike Space Hippie', 'Allbirds Tree Runners'],
      premium: ['Nike Air Jordan', 'Nike Air Max 90']
    }
  },
  {
    id: '4',
    name: 'KitchenAid Stand Mixer - 5 Quart',
    price: 279.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.9,
    reviews: 1523,
    freeShipping: true,
    inStock: true,
    description: 'Professional-grade stand mixer for all your baking needs',
    sustainability_score: 8.2,
    eco_friendly: true,
    trust_score: 9.3,
    verified_reviews: 1344,
    ai_recommendations: ['Mixing Bowls', 'Dough Hook', 'Pasta Attachment'],
    consumption_rate: 0.03,
    restock_prediction: 'High-quality durable item',
    carbon_footprint: 85,
    social_proof: {
      recent_purchases: 45,
      trending: false,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Hamilton Beach Stand Mixer', 'Sunbeam Mixmaster'],
      eco_friendly: ['Refurbished KitchenAid', 'Hand Mixer Alternative'],
      premium: ['KitchenAid Pro 600', 'KitchenAid Artisan Design']
    }
  },
  {
    id: '5',
    name: 'Apple MacBook Air M2 13"',
    price: 999.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.7,
    reviews: 756,
    freeShipping: true,
    inStock: true,
    description: 'Ultra-lightweight laptop with M2 chip and all-day battery life',
    sustainability_score: 7.8,
    eco_friendly: true,
    trust_score: 8.9,
    verified_reviews: 621,
    ai_recommendations: ['MacBook Case', 'USB-C Hub', 'Wireless Mouse'],
    consumption_rate: 0.06,
    restock_prediction: 'Apple product - regular updates',
    carbon_footprint: 65,
    social_proof: {
      recent_purchases: 78,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['MacBook Air M1', 'Dell XPS 13'],
      eco_friendly: ['Refurbished MacBook', 'Framework Laptop'],
      premium: ['MacBook Pro 14"', 'MacBook Pro 16"']
    }
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 22 Running Shoes',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
    category: 'Fashion',
    rating: 4.4,
    reviews: 423,
    freeShipping: false,
    inStock: true,
    description: 'Energy-returning running shoes with Boost midsole',
    sustainability_score: 6.5,
    eco_friendly: true,
    trust_score: 8.1,
    verified_reviews: 334,
    ai_recommendations: ['Running Shorts', 'Performance Socks', 'Fitness Tracker'],
    consumption_rate: 0.12,
    restock_prediction: 'Active lifestyle product',
    carbon_footprint: 38,
    social_proof: {
      recent_purchases: 34,
      trending: false,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Adidas Duramo SL', 'New Balance Fresh Foam'],
      eco_friendly: ['Adidas Made with Nature', 'Veja V-10'],
      premium: ['Adidas Ultraboost 23', 'Nike ZoomX Vaporfly']
    }
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 349.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviews: 967,
    freeShipping: true,
    inStock: true,
    description: 'Industry-leading noise cancelling wireless headphones',
    sustainability_score: 7.0,
    eco_friendly: false,
    trust_score: 9.0,
    verified_reviews: 823,
    ai_recommendations: ['Headphone Stand', 'Carrying Case', 'Audio Cable'],
    consumption_rate: 0.04,
    restock_prediction: 'Premium audio equipment',
    carbon_footprint: 42,
    social_proof: {
      recent_purchases: 56,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Sony WH-CH720N', 'Anker Soundcore Life Q30'],
      eco_friendly: ['Refurbished Sony WH-1000XM4', 'House of Marley Positive Vibration'],
      premium: ['Bose QuietComfort Ultra', 'Sennheiser Momentum 4']
    }
  },
  {
    id: '8',
    name: 'Dyson V15 Detect Absolute Vacuum',
    price: 649.99,
    originalPrice: 749.99,
    image: 'https://images.unsplash.com/photo-1558618666-fbd14c5cd2cb?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.6,
    reviews: 534,
    freeShipping: true,
    inStock: true,
    description: 'Cordless vacuum with laser dust detection and powerful suction',
    sustainability_score: 6.0,
    eco_friendly: false,
    trust_score: 8.5,
    verified_reviews: 445,
    ai_recommendations: ['Extra Battery', 'Wall Mount', 'Vacuum Filters'],
    consumption_rate: 0.05,
    restock_prediction: 'Premium cleaning appliance',
    carbon_footprint: 95,
    social_proof: {
      recent_purchases: 23,
      trending: false,
      community_favorite: false
    },
    alternatives: {
      cheaper: ['Shark Navigator', 'Bissell CrossWave'],
      eco_friendly: ['Miele Complete C3', 'Refurbished Dyson V11'],
      premium: ['Dyson V15s Detect Submarine', 'Tineco Pure ONE S15 Pro']
    }
  },
  {
    id: '9',
    name: 'The Seven Husbands of Evelyn Hugo',
    price: 13.99,
    originalPrice: 16.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    category: 'Books',
    rating: 4.9,
    reviews: 2156,
    freeShipping: false,
    inStock: true,
    description: 'Captivating novel about love, ambition, and the price of fame',
    sustainability_score: 9.0,
    eco_friendly: true,
    trust_score: 9.4,
    verified_reviews: 1987,
    ai_recommendations: ['Book Light', 'Bookmarks', 'Similar Romance Novels'],
    consumption_rate: 0.8,
    restock_prediction: 'Bestseller - frequent restocks',
    carbon_footprint: 3,
    social_proof: {
      recent_purchases: 189,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Digital Edition', 'Library Rental'],
      eco_friendly: ['E-book Version', 'Used Book'],
      premium: ['Hardcover Edition', 'Signed Copy']
    }
  },
  {
    id: '10',
    name: 'Neutrogena Hydrating Foaming Cleanser',
    price: 8.99,
    originalPrice: 11.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Health & Beauty',
    rating: 4.3,
    reviews: 845,
    freeShipping: false,
    inStock: true,
    description: 'Gentle foaming cleanser for daily skincare routine',
    sustainability_score: 5.0,
    eco_friendly: false,
    trust_score: 7.6,
    verified_reviews: 698,
    ai_recommendations: ['Moisturizer', 'Sunscreen', 'Face Towels'],
    consumption_rate: 0.25,
    restock_prediction: 'Daily use item - monthly reorder',
    carbon_footprint: 15,
    social_proof: {
      recent_purchases: 67,
      trending: false,
      community_favorite: false
    },
    alternatives: {
      cheaper: ['Generic Foaming Cleanser', 'CeraVe Cleanser'],
      eco_friendly: ['Organic Cleanser', 'Refillable Cleanser'],
      premium: ['La Roche-Posay Cleanser', 'Dermalogica Cleanser']
    }
  },
  {
    id: '11',
    name: 'Yoga Mat - Extra Thick 6mm',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1592432678016-e910f7a5d84d?w=400&h=400&fit=crop',
    category: 'Sports',
    rating: 4.5,
    reviews: 367,
    freeShipping: false,
    inStock: true,
    description: 'Extra thick yoga mat for comfortable practice and workouts',
    sustainability_score: 8.5,
    eco_friendly: true,
    trust_score: 8.0,
    verified_reviews: 298,
    ai_recommendations: ['Yoga Blocks', 'Yoga Strap', 'Water Bottle'],
    consumption_rate: 0.02,
    restock_prediction: 'Durable fitness equipment',
    carbon_footprint: 22,
    social_proof: {
      recent_purchases: 45,
      trending: false,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Basic Yoga Mat', 'Foam Exercise Mat'],
      eco_friendly: ['Cork Yoga Mat', 'Natural Rubber Mat'],
      premium: ['Lululemon Yoga Mat', 'Manduka Pro Mat']
    }
  },
  {
    id: '12',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1556909114-8a4ec04e8e59?w=400&h=400&fit=crop',
    category: 'Home & Garden',
    rating: 4.7,
    reviews: 1893,
    freeShipping: true,
    inStock: true,
    description: 'Multi-functional electric pressure cooker for quick and easy meals',
    sustainability_score: 7.5,
    eco_friendly: true,
    trust_score: 8.8,
    verified_reviews: 1634,
    ai_recommendations: ['Recipe Book', 'Silicone Mitts', 'Steam Rack'],
    consumption_rate: 0.04,
    restock_prediction: 'Popular kitchen appliance',
    carbon_footprint: 68,
    social_proof: {
      recent_purchases: 78,
      trending: true,
      community_favorite: true
    },
    alternatives: {
      cheaper: ['Pressure Cooker Basic', 'Slow Cooker'],
      eco_friendly: ['Energy Efficient Model', 'Refurbished Instant Pot'],
      premium: ['Instant Pot Pro Plus', 'Ninja Foodi']
    }
  },
];

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  filterProducts: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: sampleProducts,
  filteredProducts: sampleProducts,
  searchQuery: '',
  selectedCategory: 'All',

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  filterProducts: () => {
    const { products, searchQuery, selectedCategory } = get();
    
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    set({ filteredProducts: filtered });
  },
}));