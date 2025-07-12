
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

export const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'HP', 'Dell', 'Nike', 'Adidas'];
  const ratings = [4, 3, 2, 1];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

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
              max={1000}
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

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => 
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm cursor-pointer"
                >
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
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="free-shipping" />
              <label htmlFor="free-shipping" className="text-sm cursor-pointer">
                Free Shipping
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" />
              <label htmlFor="on-sale" className="text-sm cursor-pointer">
                On Sale
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rollback" />
              <label htmlFor="rollback" className="text-sm cursor-pointer">
                Rollback
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {selectedBrands.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedBrands.map((brand) => (
                <Badge
                  key={brand}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => handleBrandChange(brand, false)}
                >
                  {brand} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
