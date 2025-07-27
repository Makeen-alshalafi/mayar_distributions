import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    shipping: {
      fullName: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    payment: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      saveCard: false
    }
  });

  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');

    // Load cart items
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (savedCartItems.length === 0) {
      // Redirect to cart if empty
      navigate('/shopping-cart');
      return;
    }

    // Mock cart items for demonstration
    const mockCartItems = [
      {
        id: 1,
        name: {
          en: "Custom Business Cards",
          ar: "بطاقات عمل مخصصة"
        },
        price: 150,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
        customization: {
          text: "Ahmed Al-Rashid\nCEO & Founder",
          color: "Gold"
        }
      },
      {
        id: 2,
        name: {
          en: "Promotional Mugs",
          ar: "أكواب ترويجية"
        },
        price: 45,
        quantity: 5,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        name: {
          en: "Custom Keychains",
          ar: "سلاسل مفاتيح مخصصة"
        },
        price: 25,
        quantity: 10,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        customization: {
          text: "Mayar Distributions",
          color: "Teal"
        }
      }
    ];

    setCartItems(mockCartItems);
  }, [navigate]);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOrderConfirm = () => {
    // Clear cart and redirect to success page
    localStorage.removeItem('cartItems');
    
    // Show success message and redirect
    alert(currentLanguage === 'en' ?'Order placed successfully! You will receive a confirmation email shortly.' :'تم تقديم الطلب بنجاح! ستتلقى بريدًا إلكترونيًا للتأكيد قريبًا.'
    );
    
    navigate('/user-dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            currentLanguage={currentLanguage}
          />
        );
      case 2:
        return (
          <PaymentForm
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
            currentLanguage={currentLanguage}
          />
        );
      case 3:
        return (
          <OrderReview
            formData={formData}
            cartItems={cartItems}
            onBack={handlePrevStep}
            onConfirm={handleOrderConfirm}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <Icon name="ShoppingCart" size={64} className="text-text-secondary mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
              {currentLanguage === 'en' ? 'Your cart is empty' : 'سلة التسوق فارغة'}
            </h1>
            <p className="text-text-secondary mb-6">
              {currentLanguage === 'en' ?'Add some items to your cart before proceeding to checkout.' :'أضف بعض العناصر إلى سلة التسوق قبل المتابعة للدفع.'
              }
            </p>
            <Button onClick={() => navigate('/product-catalog')}>
              {currentLanguage === 'en' ? 'Continue Shopping' : 'متابعة التسوق'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-text-secondary mb-2">
              <button 
                onClick={() => navigate('/shopping-cart')}
                className="hover:text-primary transition-smooth"
              >
                {currentLanguage === 'en' ? 'Cart' : 'السلة'}
              </button>
              <Icon name="ChevronRight" size={16} className="rtl:rotate-180" />
              <span className="text-primary">
                {currentLanguage === 'en' ? 'Checkout' : 'الدفع'}
              </span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              {currentLanguage === 'en' ? 'Secure Checkout' : 'الدفع الآمن'}
            </h1>
            <p className="text-text-secondary mt-2">
              {currentLanguage === 'en' ?'Complete your order with our secure payment system' :'أكمل طلبك باستخدام نظام الدفع الآمن لدينا'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          <CheckoutProgress currentStep={currentStep} currentLanguage={currentLanguage} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary cartItems={cartItems} currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-12 bg-muted rounded-lg p-6">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <Icon name="Shield" size={24} className="text-success flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {currentLanguage === 'en' ? 'Secure Payment Guarantee' : 'ضمان الدفع الآمن'}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {currentLanguage === 'en' ?'Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.' :'معلومات الدفع الخاصة بك مشفرة وآمنة. نحن نستخدم تشفير SSL المعياري في الصناعة لحماية بياناتك.'
                  }
                </p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-text-secondary">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="Lock" size={14} />
                    <span>SSL {currentLanguage === 'en' ? 'Encrypted' : 'مشفر'}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="CreditCard" size={14} />
                    <span>PCI {currentLanguage === 'en' ? 'Compliant' : 'متوافق'}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Icon name="Shield" size={14} />
                    <span>{currentLanguage === 'en' ? 'Fraud Protection' : 'حماية من الاحتيال'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;