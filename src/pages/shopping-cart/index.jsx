import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      productId: 101,
      name: {
        en: "Custom Business Cards - Premium",
        ar: "بطاقات عمل مخصصة - بريميوم"
      },
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      price: 89.99,
      originalPrice: 109.99,
      quantity: 2,
      category: {
        en: "Printing Services",
        ar: "خدمات الطباعة"
      },
      customization: {
        text: "John Smith - CEO",
        image: true
      }
    },
    {
      id: 2,
      productId: 102,
      name: {
        en: "Promotional Coffee Mugs",
        ar: "أكواب قهوة ترويجية"
      },
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
      price: 24.50,
      quantity: 5,
      category: {
        en: "Custom Gifts",
        ar: "هدايا مخصصة"
      },
      customization: {
        text: "Best Employee 2024"
      }
    },
    {
      id: 3,
      productId: 103,
      name: {
        en: "Corporate Branded Keychains",
        ar: "سلاسل مفاتيح للشركات"
      },
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      price: 15.75,
      quantity: 10,
      category: {
        en: "Wholesale Items",
        ar: "عناصر الجملة"
      }
    }
  ];

  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');

    // Load cart items from localStorage or use mock data
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
    } else {
      // Use mock data for demonstration
      setCartItems(mockCartItems);
      localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
    }

    setIsLoading(false);
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const removeItem = async (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.15; // 15% VAT
  };

  const calculateShipping = (subtotal) => {
    return subtotal >= 500 ? 0 : 25; // Free shipping over $500
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-48 mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <CartHeader itemCount={cartItems.length} currentLanguage={currentLanguage} />

          {cartItems.length === 0 ? (
            <EmptyCart currentLanguage={currentLanguage} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  total={total}
                  itemCount={cartItems.length}
                  currentLanguage={currentLanguage}
                  onProceedToCheckout={handleProceedToCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;