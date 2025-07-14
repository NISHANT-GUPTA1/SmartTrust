import React from 'react';
import Header from '../components/Header';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { t } = useTranslation();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error(t('Your cart is empty!'));
      return;
    }
    toast.success(t('Redirecting to checkout...'));
    // Here you would typically redirect to a checkout page
  };

  const handleClearCart = () => {
    clearCart();
    toast.success(t('Cart cleared!'));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingBag className="text-blue-600" />
                {t('Shopping Cart')} ({items.length})
              </h1>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  {t('Clear Cart')}
                </Button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('Your cart is empty')}</h2>
                <p className="text-gray-500 mb-6">{t('Add some products to get started!')}</p>
                <Button onClick={() => window.history.back()}>
                  {t('Continue Shopping')}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b pb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-blue-600 font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-3 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center text-2xl font-bold mb-6">
                    <span>{t('Total:')}</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      onClick={handleCheckout} 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    >
                      {t('Proceed to Checkout')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="w-full"
                    >
                      {t('Continue Shopping')}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    {t('Free shipping on orders over $35')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart; 