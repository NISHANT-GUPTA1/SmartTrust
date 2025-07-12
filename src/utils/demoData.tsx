import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Database, Calendar, ShoppingCart } from 'lucide-react';
import { seedSamplePurchaseHistory } from './demoDataUtils';

/**
 * Component to add a demo button for seeding sample data
 */
export const DemoDataSeeder = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoaded, setLastLoaded] = useState<string | null>(null);

  const handleLoadDemoData = () => {
    setIsLoading(true);
    console.log('🚀 Demo data button clicked, timeframe:', selectedTimeframe);
    
    try {
      // Load demo data for the selected timeframe
      seedSamplePurchaseHistory(selectedTimeframe);
      console.log('📤 Demo data function called successfully');
      
      // Update last loaded status
      const timeframeName = {
        week: 'Last 7 Days',
        month: 'Last 30 Days', 
        quarter: 'Last 90 Days'
      }[selectedTimeframe];
      
      setLastLoaded(timeframeName);
      console.log('✅ Demo data UI state updated');
      
      // Show loading state briefly for user feedback
      setTimeout(() => {
        setIsLoading(false);
        console.log('🎯 Demo data loading completed');
      }, 1200);
      
    } catch (error) {
      console.error('❌ Error loading demo data:', error);
      setIsLoading(false);
    }
  };

  const getTimeframeDetails = (timeframe: 'week' | 'month' | 'quarter') => {
    switch (timeframe) {
      case 'week':
        return {
          label: 'Last 7 Days',
          description: 'Recent purchases only - 4 essential products',
          products: '4 products',
          purchases: '~8 purchases',
          icon: <Calendar className="h-4 w-4" />
        };
      case 'month':
        return {
          label: 'Last 30 Days',
          description: 'Regular shopping pattern - comprehensive groceries',
          products: '8 products',
          purchases: '~25 purchases',
          icon: <ShoppingCart className="h-4 w-4" />
        };
      case 'quarter':
        return {
          label: 'Last 90 Days',
          description: 'Extensive history - all categories & patterns',
          products: '10 products',
          purchases: '~75 purchases',
          icon: <Database className="h-4 w-4" />
        };
    }
  };

  const currentDetails = getTimeframeDetails(selectedTimeframe);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Demo Data Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timeframe Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Timeframe</label>
          <Select value={selectedTimeframe} onValueChange={(value: 'week' | 'month' | 'quarter') => setSelectedTimeframe(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Last 7 Days
                </div>
              </SelectItem>
              <SelectItem value="month">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Last 30 Days
                </div>
              </SelectItem>
              <SelectItem value="quarter">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Last 90 Days
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current Selection Details */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {currentDetails.icon}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{currentDetails.label}</h4>
                  <Badge variant="secondary">{currentDetails.products}</Badge>
                  <Badge variant="outline">{currentDetails.purchases}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentDetails.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Load Demo Data Button */}
        <Button 
          onClick={handleLoadDemoData} 
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading {currentDetails.label} Data...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Load {currentDetails.label} Demo Data
            </>
          )}
        </Button>

        {/* Status */}
        {lastLoaded && !isLoading && (
          <div className="text-center">
            <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
              ✓ {lastLoaded} Data Loaded Successfully
            </Badge>
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>This will replace current demo data with realistic purchase patterns.</p>
          <p>Different timeframes show different product sets and shopping behaviors.</p>
        </div>
      </CardContent>
    </Card>
  );
};
