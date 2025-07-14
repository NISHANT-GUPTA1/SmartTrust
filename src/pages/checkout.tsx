import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Checkout = () => {
  const { items, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Order Placed!</h2>
          <p className="mb-4">Thank you for your purchase, {form.name || 'Customer'}.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Checkout</h1>
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="mb-6">
          {items.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul>
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded border" />
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-gray-500 text-sm">x{item.quantity}</span>
                  </div>
                  <span className="font-bold text-green-700">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-2xl text-green-700">${total.toFixed(2)}</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            setOrderPlaced(true);
          }}
          className="space-y-4 mb-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full border rounded px-4 py-2"
            required
          />
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg mt-2">Place Order</Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 