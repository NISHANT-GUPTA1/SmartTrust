import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Sparkles, Camera, Zap } from 'lucide-react';
import ARTryOn from './ARTryOn';
import { Product } from '@/types/product';

interface ARModalProps {
  product: Product;
  children?: React.ReactNode;
}

const ARModal: React.FC<ARModalProps> = ({ product, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine if product supports AR
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

  const arSupport = getARSupport(product.category);

  if (!arSupport.supported) {
    return null; // Don't show AR button for unsupported products
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          >
            <Eye className="h-4 w-4 mr-2" />
            Try in AR
            <Sparkles className="h-4 w-4 ml-2" />
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <span>AR Virtual Try-On</span>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              Beta Feature
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-0 h-full overflow-auto">
          <ARTryOn 
            productType={arSupport.type!}
            productName={product.name}
            productImage={product.image}
            productCategory={product.category}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARModal;
