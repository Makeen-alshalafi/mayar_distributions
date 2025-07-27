import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  total, 
  itemCount, 
  currentLanguage,
  onProceedToCheckout 
}) => {
  const formatPrice = (price) => {
    return currentLanguage === 'ar' ? `${price.toFixed(2)} ر.س` : `$${price.toFixed(2)}`;
  };

  const summaryItems = [
    {
      label: currentLanguage === 'ar' ? 'المجموع الفرعي' : 'Subtotal',
      value: formatPrice(subtotal),
      description: currentLanguage === 'ar' 
        ? `${itemCount} عنصر` 
        : `${itemCount} item${itemCount !== 1 ? 's' : ''}`
    },
    {
      label: currentLanguage === 'ar' ? 'الضريبة' : 'Tax',
      value: formatPrice(tax),
      description: currentLanguage === 'ar' ? '15% ضريبة القيمة المضافة' : '15% VAT'
    },
    {
      label: currentLanguage === 'ar' ? 'الشحن' : 'Shipping',
      value: shipping === 0 
        ? (currentLanguage === 'ar' ? 'مجاني' : 'Free') 
        : formatPrice(shipping),
      description: shipping === 0 
        ? (currentLanguage === 'ar' ? 'شحن مجاني للطلبات فوق 500 ر.س' : 'Free shipping on orders over $500')
        : (currentLanguage === 'ar' ? 'شحن قياسي' : 'Standard shipping')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle sticky top-24">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        {currentLanguage === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
      </h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {summaryItems.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.label}</p>
              {item.description && (
                <p className="text-sm text-text-secondary mt-0.5">{item.description}</p>
              )}
            </div>
            <p className="font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="font-heading font-semibold text-lg text-foreground">
            {currentLanguage === 'ar' ? 'المجموع الكلي' : 'Total'}
          </p>
          <p className="font-heading font-bold text-xl text-primary">
            {formatPrice(total)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={onProceedToCheckout}
          iconName="CreditCard"
          iconPosition="left"
          className="h-12"
        >
          {currentLanguage === 'ar' ? 'متابعة إلى الدفع' : 'Proceed to Checkout'}
        </Button>

        <Link to="/product-catalog" className="block">
          <Button variant="outline" fullWidth className="h-10">
            <Icon name="ArrowLeft" size={18} className="rtl:rotate-180" />
            <span className="ml-2 rtl:mr-2 rtl:ml-0">
              {currentLanguage === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </span>
          </Button>
        </Link>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span>
            {currentLanguage === 'ar' ?'دفع آمن ومشفر' :'Secure & encrypted payment'}
          </span>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="mt-4">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors">
            <span>
              {currentLanguage === 'ar' ? 'رمز الخصم' : 'Promo Code'}
            </span>
            <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
          </summary>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={currentLanguage === 'ar' ? 'أدخل رمز الخصم' : 'Enter promo code'}
                className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button variant="outline" size="sm">
                {currentLanguage === 'ar' ? 'تطبيق' : 'Apply'}
              </Button>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default OrderSummary;