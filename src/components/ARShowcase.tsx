import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Smartphone, 
  Sparkles, 
  Camera, 
  Shirt, 
  Sofa, 
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

const ARShowcase: React.FC = () => {
  const arFeatures = [
    {
      icon: <Shirt className="h-8 w-8 text-blue-600" />,
      title: "Virtual Clothing Try-On",
      description: "See how clothes fit and look on you before buying",
      category: "Fashion & Apparel",
      gradient: "from-blue-500 to-cyan-500",
      stats: "98% accuracy"
    },
    {
      icon: <Sofa className="h-8 w-8 text-green-600" />,
      title: "Furniture Placement",
      description: "Visualize furniture in your actual room space",
      category: "Home & Garden",
      gradient: "from-green-500 to-emerald-500",
      stats: "Real-time preview"
    },
    {
      icon: <Camera className="h-8 w-8 text-purple-600" />,
      title: "AR Experience",
      description: "Revolutionary shopping with augmented reality",
      category: "All Categories",
      gradient: "from-purple-500 to-pink-500",
      stats: "Next-gen tech"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              Revolutionary Feature
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Try Before You Buy with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AR Technology
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the future of online shopping with our advanced Augmented Reality features. 
            See how products look in real life before making a purchase decision.
          </p>
        </div>

        {/* AR Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {arFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <Badge variant="outline" className="mb-2 w-fit mx-auto">
                  {feature.category}
                </Badge>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{feature.stats}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How AR Try-On Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Find AR-enabled products</h4>
                    <p className="text-gray-600 text-sm">Look for the "Try in AR" button on clothing and furniture items</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Allow camera access</h4>
                    <p className="text-gray-600 text-sm">Grant permission to use your device's camera for AR experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Try products virtually</h4>
                    <p className="text-gray-600 text-sm">See how clothes fit or how furniture looks in your space</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Make confident purchases</h4>
                    <p className="text-gray-600 text-sm">Buy with confidence knowing exactly how products will look</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to Try AR?</h4>
                <p className="text-gray-600 mb-6">Browse our AR-enabled products and experience the future of shopping</p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                  Explore AR Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-bounce">
                <Star className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
            <div className="text-sm text-gray-600">Return Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2M+</div>
            <div className="text-sm text-gray-600">AR Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9⭐</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARShowcase;
