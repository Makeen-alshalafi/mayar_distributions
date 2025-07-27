import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderReview = ({ formData, cartItems, onBack, onConfirm, currentLanguage }) => {
  const [isConfirming, setIsConfirming] = useState(false);

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

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsConfirming(false);
      onConfirm();
    }, 3000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
          {currentLanguage === 'en' ? 'Order Summary' : 'ملخص الطلب'}
        </h2>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 rtl:space-x-reverse pb-4 border-b border-border last:border-b-0 last:pb-0">
              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name[currentLanguage]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {item.name[currentLanguage]}
                </h3>
                <p className="text-sm text-text-secondary">
                  {currentLanguage === 'en' ? 'Quantity' : 'الكمية'}: {item.quantity}
                </p>
                {item.customization && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    <p className="font-medium text-foreground mb-1">
                      {currentLanguage === 'en' ? 'Customization:' : 'التخصيص:'}
                    </p>
                    {item.customization.text && (
                      <p className="text-text-secondary">
                        {currentLanguage === 'en' ? 'Text:' : 'النص:'} {item.customization.text}
                      </p>
                    )}
                    {item.customization.color && (
                      <p className="text-text-secondary">
                        {currentLanguage === 'en' ? 'Color:' : 'اللون:'} {item.customization.color}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right rtl:text-left">
                <p className="font-semibold text-foreground">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          {currentLanguage === 'en' ? 'Shipping Address' : 'عنوان الشحن'}
        </h3>
        <div className="text-text-secondary space-y-1">
          <p className="font-medium text-foreground">{formData.shipping.fullName}</p>
          <p>{formData.shipping.address}</p>
          <p>{formData.shipping.city}, {formData.shipping.state} {formData.shipping.postalCode}</p>
          <p>{formData.shipping.phone}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          {currentLanguage === 'en' ? 'Payment Method' : 'طريقة الدفع'}
        </h3>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Icon name="CreditCard" size={20} className="text-primary" />
          <div>
            <p className="font-medium text-foreground">
              {formData.payment.cardNumber ? 
                `**** **** **** ${formData.payment.cardNumber.slice(-4)}` : 
                (currentLanguage === 'en' ? 'Credit Card' : 'بطاقة ائتمان')
              }
            </p>
            {formData.payment.cardholderName && (
              <p className="text-sm text-text-secondary">{formData.payment.cardholderName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          {currentLanguage === 'en' ? 'Order Total' : 'إجمالي الطلب'}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-text-secondary">
            <span>{currentLanguage === 'en' ? 'Subtotal' : 'المجموع الفرعي'}</span>
            <span>{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>{currentLanguage === 'en' ? 'Shipping' : 'الشحن'}</span>
            <span>
              {calculateShipping() === 0 
                ? (currentLanguage === 'en' ? 'Free' : 'مجاني')
                : formatCurrency(calculateShipping())
              }
            </span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>{currentLanguage === 'en' ? 'VAT (15%)' : 'ضريبة القيمة المضافة (15%)'}</span>
            <span>{formatCurrency(calculateTax())}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between text-lg font-semibold text-foreground">
              <span>{currentLanguage === 'en' ? 'Total' : 'الإجمالي'}</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p className="mb-2">
              {currentLanguage === 'en' ?'By placing this order, you agree to our Terms of Service and Privacy Policy.' :'بوضع هذا الطلب، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.'
              }
            </p>
            <p>
              {currentLanguage === 'en' ?'You will receive an order confirmation email shortly after placing your order.' :'ستتلقى بريدًا إلكترونيًا لتأكيد الطلب بعد وقت قصير من وضع طلبك.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} disabled={isConfirming}>
          <Icon name="ArrowLeft" size={16} className="rtl:rotate-180" />
          <span className="ml-2 rtl:mr-2 rtl:ml-0">
            {currentLanguage === 'en' ? 'Back' : 'رجوع'}
          </span>
        </Button>
        <Button 
          onClick={handleConfirmOrder} 
          loading={isConfirming}
          className="min-w-[160px]"
        >
          {isConfirming 
            ? (currentLanguage === 'en' ? 'Processing...' : 'جاري المعالجة...')
            : (currentLanguage === 'en' ? 'Confirm Order' : 'تأكيد الطلب')
          }
        </Button>
      </div>
    </div>
  );
};

export default OrderReview;