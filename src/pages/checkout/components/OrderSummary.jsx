import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ cartItems, currentLanguage }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 500 ? 0 : 50; // Free shipping over 500 SAR
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.15; // 15% VAT
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
        {currentLanguage === 'en' ? 'Order Summary' : 'ملخص الطلب'}
      </h3>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name[currentLanguage]}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">
                {item.name[currentLanguage]}
              </h4>
              <p className="text-xs text-text-secondary">
                {currentLanguage === 'en' ? 'Qty' : 'الكمية'}: {item.quantity}
              </p>
              {item.customization && (
                <div className="mt-1">
                  <Icon name="Palette" size={12} className="text-accent inline mr-1 rtl:ml-1 rtl:mr-0" />
                  <span className="text-xs text-accent">
                    {currentLanguage === 'en' ? 'Customized' : 'مخصص'}
                  </span>
                </div>
              )}
            </div>
            <div className="text-right rtl:text-left">
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>{currentLanguage === 'en' ? 'Subtotal' : 'المجموع الفرعي'}</span>
          <span>{formatCurrency(calculateSubtotal())}</span>
        </div>
        
        <div className="flex justify-between text-sm text-text-secondary">
          <span>{currentLanguage === 'en' ? 'Shipping' : 'الشحن'}</span>
          <span>
            {calculateShipping() === 0 ? (
              <span className="text-success font-medium">
                {currentLanguage === 'en' ? 'Free' : 'مجاني'}
              </span>
            ) : (
              formatCurrency(calculateShipping())
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm text-text-secondary">
          <span>{currentLanguage === 'en' ? 'VAT (15%)' : 'ضريبة القيمة المضافة (15%)'}</span>
          <span>{formatCurrency(calculateTax())}</span>
        </div>
        
        {calculateShipping() === 0 && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-success bg-success/10 p-2 rounded">
            <Icon name="Truck" size={14} />
            <span>
              {currentLanguage === 'en' ?'Free shipping on orders over 500 SAR' :'شحن مجاني للطلبات أكثر من 500 ريال'
              }
            </span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>{currentLanguage === 'en' ? 'Total' : 'الإجمالي'}</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-xs text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span>{currentLanguage === 'en' ? 'Secure checkout' : 'دفع آمن'}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;