import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Plus,
  Eye,
  Users,
  Star,
  ShoppingCart,
  ArrowLeft,
  Heart,
  Share2,
  MessageCircle,
  Zap,
  Check
} from 'lucide-react';
import { useShoppingCircleStore } from '@/store/shoppingCircleStore';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface CollaborativeShoppingProps {
  circleId: string;
  onBack: () => void;
}

export const CollaborativeShoppingView: React.FC<CollaborativeShoppingProps> = ({ circleId, onBack }) => {
  const { myCircles, addItemToCircle } = useShoppingCircleStore();
  const productStore = useProductStore();
  const { filteredProducts, setSearchQuery: setStoreSearchQuery, setSelectedCategory: setStoreSelectedCategory, filterProducts } = productStore;
  const circle = myCircles.find(c => c.id === circleId);
  const { toast } = useToast();
  
  // Get unique categories from products
  const categories = Array.from(new Set(productStore.products.map(p => p.category)));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewingMembers, setViewingMembers] = useState<string[]>(['current-user']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [collaboratorViews, setCollaboratorViews] = useState<{[productId: string]: string[]}>({});

  // Simulate real-time collaboration
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate other members viewing products
      if (filteredProducts.length > 0) {
        const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
        const randomMember = circle?.members[Math.floor(Math.random() * circle.members.length)];
        
        if (randomMember && Math.random() > 0.7) {
          setCollaboratorViews(prev => ({
            ...prev,
            [randomProduct.id]: [...(prev[randomProduct.id] || []).filter(id => id !== randomMember.id), randomMember.id].slice(-2)
          }));
          
          // Remove after 5 seconds
          setTimeout(() => {
            setCollaboratorViews(prev => ({
              ...prev,
              [randomProduct.id]: (prev[randomProduct.id] || []).filter(id => id !== randomMember.id)
            }));
          }, 5000);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [filteredProducts, circle]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setStoreSearchQuery(query);
    filterProducts();
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setStoreSelectedCategory(category === 'all' ? 'All' : category);
    filterProducts();
  };

  const handleAddToCircle = (product: Product) => {
    const item = {
      product_name: product.name,
      category: product.category,
      quantity: 1,
      priority: 'medium' as const,
      estimated_price: product.price,
      notes: `Added from collaborative shopping`,
      is_private: false,
      status: 'needed' as const
    };
    
    addItemToCircle(circleId, item);
    
    // Show success toast
    toast({
      title: "Product Added! 🛍️",
      description: `${product.name} added to ${circle?.name} shopping list`,
      duration: 3000,
    });
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const currentViewers = collaboratorViews[product.id] || [];
    const viewerMembers = circle?.members.filter(m => currentViewers.includes(m.id)) || [];

    return (
      <Card className="group hover:shadow-lg transition-all duration-200 relative overflow-hidden">
        {/* Live Viewers Indicator */}
        {viewerMembers.length > 0 && (
          <div className="absolute top-2 right-2 z-10 flex -space-x-1">
            {viewerMembers.slice(0, 3).map(member => (
              <div key={member.id} className="relative">
                <Avatar className="h-6 w-6 border-2 border-white shadow-lg">
                  <AvatarFallback className="text-xs bg-green-500 text-white">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
              </div>
            ))}
            {viewerMembers.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-500 border-2 border-white flex items-center justify-center text-xs text-white">
                +{viewerMembers.length - 3}
              </div>
            )}
          </div>
        )}

        <CardContent className="p-4">
          <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image || "/placeholder.svg"} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-green-600">
                ${product.price}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedProduct(product)}
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleAddToCircle(product)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>

            {/* Live collaboration indicator */}
            {viewerMembers.length > 0 && (
              <div className="text-xs text-green-600 flex items-center gap-1 mt-2">
                <Users className="h-3 w-3" />
                {viewerMembers.length === 1 
                  ? `${viewerMembers[0].name} is viewing this`
                  : `${viewerMembers.length} members viewing`
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProductDetailDialog = () => {
    if (!selectedProduct) return null;

    const currentViewers = collaboratorViews[selectedProduct.id] || [];
    const viewerMembers = circle?.members.filter(m => currentViewers.includes(m.id)) || [];

    return (
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">{selectedProduct.name}</DialogTitle>
              {viewerMembers.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <div className="flex -space-x-1">
                    {viewerMembers.slice(0, 3).map(member => (
                      <Avatar key={member.id} className="h-5 w-5 border border-white">
                        <AvatarFallback className="text-xs bg-green-500 text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span>Also viewing</span>
                </div>
              )}
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleAddToCircle(selectedProduct)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Circle
                </Button>
                <Button variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {selectedProduct.category}
                </Badge>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl font-bold text-green-600">
                    ${selectedProduct.price}
                  </div>
                  {selectedProduct.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      ${selectedProduct.originalPrice}
                    </div>
                  )}
                </div>
                {selectedProduct.rating && (
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(selectedProduct.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({selectedProduct.rating})</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600 text-sm">
                  {selectedProduct.description || 'High-quality product perfect for your needs. Great value for money with excellent customer reviews.'}
                </p>
              </div>

              {/* Live Chat Simulation */}
              <div className="border rounded-lg p-3 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Family Discussion</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="text-xs">M</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-600">Mom: "This looks perfect for the wedding!"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="text-xs">S</AvatarFallback>
                    </Avatar>
                    <span className="text-gray-600">Sister: "I agree, great price too!"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (!circle) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Circle not found</h3>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            {circle.name} - Shop Together
          </h1>
          <p className="text-gray-600">Browse and add products collaboratively with your family</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {circle.members.slice(0, 4).map((member) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                <AvatarFallback className="text-xs">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-green-500" />
            Live Shopping
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Live Activity Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {circle.members.filter(m => Math.random() > 0.3).slice(0, 3).map((member) => (
                <div key={member.id} className="relative">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-xs bg-green-500 text-white">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">
                {circle.members.length} family members are shopping together
              </p>
              <p className="text-xs text-green-600">
                See what others are viewing in real-time • Add items they can see instantly
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      <ProductDetailDialog />
    </div>
  );
};

export default CollaborativeShoppingView;
