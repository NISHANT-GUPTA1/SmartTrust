
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FilterState {
  priceRange: [number, number];
  selectedBrands: string[];
  minRating: number;
  hasDiscount: boolean;
  specialOffers: string[];
}

interface ProductFiltersProps {
  onFiltersApply: (filters: FilterState) => void;
  onFiltersClear: () => void;
}

export const ProductFilters = ({ onFiltersApply, onFiltersClear }: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [specialOffers, setSpecialOffers] = useState({
    freeShipping: false,
    onSale: false,
    rollback: false
  });

  // Updated to match actual product categories
  const brands = ['Electronics', 'Home & Garden', 'Clothing', 'Fashion', 'Health & Beauty', 'Sports', 'Books'];
  const ratings = [4, 3, 2, 1];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleSpecialOfferChange = (offer: string, checked: boolean) => {
    setSpecialOffers(prev => ({
      ...prev,
      [offer]: checked
    }));
  };

  const applyFilters = () => {
    const filters = {
      priceRange: [priceRange[0], priceRange[1]] as [number, number],
      selectedBrands: selectedBrands,
      minRating: selectedRating,
      hasDiscount: specialOffers.onSale,
      specialOffers: Object.keys(specialOffers).filter(key => 
        specialOffers[key as keyof typeof specialOffers]
      )
    };
    
    console.log('Applying filters:', filters);
    console.log('Price range being applied:', priceRange);
    console.log('Selected brands:', selectedBrands);
    console.log('Min rating:', selectedRating);
    console.log('Special offers:', filters.specialOffers);
    
    if (onFiltersApply) {
      onFiltersApply(filters);
    }
  };

  const handleClearAll = () => {
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
    setSelectedRating(0);
    setSpecialOffers({
      freeShipping: false,
      onSale: false,
      rollback: false
    });
    
    if (onFiltersClear) {
      onFiltersClear();
    }
  };

  const hasActiveFilters = selectedBrands.length > 0 || 
                          selectedRating > 0 || 
                          priceRange[0] > 0 || 
                          priceRange[1] < 2000 ||
                          Object.values(specialOffers).some(Boolean);

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={2000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRating === rating}
                  onCheckedChange={(checked) => 
                    setSelectedRating(checked ? rating : 0)
                  }
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm flex items-center cursor-pointer"
                >
                  <span className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="ml-2">& up</span>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => 
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Offers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special Offers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="freeShipping"
                checked={specialOffers.freeShipping}
                onCheckedChange={(checked) => 
                  handleSpecialOfferChange('freeShipping', checked as boolean)
                }
              />
              <label htmlFor="freeShipping" className="text-sm cursor-pointer">
                Free Shipping
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onSale"
                checked={specialOffers.onSale}
                onCheckedChange={(checked) => 
                  handleSpecialOfferChange('onSale', checked as boolean)
                }
              />
              <label htmlFor="onSale" className="text-sm cursor-pointer">
                On Sale
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rollback"
                checked={specialOffers.rollback}
                onCheckedChange={(checked) => 
                  handleSpecialOfferChange('rollback', checked as boolean)
                }
              />
              <label htmlFor="rollback" className="text-sm cursor-pointer">
                Rollback
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Apply/Clear Buttons */}
      <div className="space-y-3">
        <Button
          onClick={applyFilters}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Apply Filters
        </Button>
        
        {hasActiveFilters && (
          <Button
            onClick={handleClearAll}
            variant="outline"
            className="w-full"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Active Filters:</h4>
          <div className="flex flex-wrap gap-1">
            {priceRange[0] > 0 || priceRange[1] < 2000 ? (
              <Badge variant="secondary" className="text-xs">
                ${priceRange[0]} - ${priceRange[1]}
              </Badge>
            ) : null}
            {selectedBrands.map((brand) => (
              <Badge key={brand} variant="secondary" className="text-xs">
                {brand}
              </Badge>
            ))}
            {selectedRating > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selectedRating}+ stars
              </Badge>
            )}
            {Object.entries(specialOffers).map(([offer, active]) => 
              active ? (
                <Badge key={offer} variant="secondary" className="text-xs">
                  {offer === 'freeShipping' ? 'Free Shipping' : 
                   offer === 'onSale' ? 'On Sale' : 'Rollback'}
                </Badge>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};
