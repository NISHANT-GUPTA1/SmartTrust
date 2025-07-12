
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Track Your Order</a></li>
              <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:underline">Shipping Info</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Shop & Learn */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop & Learn</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">All Departments</a></li>
              <li><a href="#" className="hover:underline">Weekly Ad</a></li>
              <li><a href="#" className="hover:underline">Walmart+</a></li>
              <li><a href="#" className="hover:underline">Store Finder</a></li>
              <li><a href="#" className="hover:underline">Pharmacy</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Sign In</a></li>
              <li><a href="#" className="hover:underline">Create Account</a></li>
              <li><a href="#" className="hover:underline">Purchase History</a></li>
              <li><a href="#" className="hover:underline">Walmart Credit Card</a></li>
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Walmart</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Our Company</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Sustainability</a></li>
              <li><a href="#" className="hover:underline">Press Releases</a></li>
              <li><a href="#" className="hover:underline">Suppliers</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-blue-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm">Follow us:</span>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>&copy; 2024 Walmart Clone. All rights reserved.</p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
