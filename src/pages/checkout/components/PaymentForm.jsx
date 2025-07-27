import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentForm = ({ formData, setFormData, onNext, onBack, currentLanguage }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value
      }
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors = {};
    const payment = formData.payment;

    if (paymentMethod === 'card') {
      if (!payment.cardNumber?.replace(/\s/g, '')) {
        newErrors.cardNumber = currentLanguage === 'en' ? 'Card number is required' : 'رقم البطاقة مطلوب';
      } else if (payment.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = currentLanguage === 'en' ? 'Invalid card number' : 'رقم بطاقة غير صحيح';
      }

      if (!payment.expiryDate) {
        newErrors.expiryDate = currentLanguage === 'en' ? 'Expiry date is required' : 'تاريخ الانتهاء مطلوب';
      }

      if (!payment.cvv) {
        newErrors.cvv = currentLanguage === 'en' ? 'CVV is required' : 'رمز الأمان مطلوب';
      } else if (payment.cvv.length < 3) {
        newErrors.cvv = currentLanguage === 'en' ? 'Invalid CVV' : 'رمز أمان غير صحيح';
      }

      if (!payment.cardholderName?.trim()) {
        newErrors.cardholderName = currentLanguage === 'en' ? 'Cardholder name is required' : 'اسم حامل البطاقة مطلوب';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onNext();
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'card',
      label: { en: 'Credit/Debit Card', ar: 'بطاقة ائتمان/خصم' },
      icon: 'CreditCard',
      description: { en: 'Visa, Mastercard, American Express', ar: 'فيزا، ماستركارد، أمريكان إكسبريس' }
    },
    {
      id: 'apple_pay',
      label: { en: 'Apple Pay', ar: 'آبل باي' },
      icon: 'Smartphone',
      description: { en: 'Pay with Touch ID or Face ID', ar: 'ادفع باستخدام Touch ID أو Face ID' }
    },
    {
      id: 'google_pay',
      label: { en: 'Google Pay', ar: 'جوجل باي' },
      icon: 'Smartphone',
      description: { en: 'Pay with your Google account', ar: 'ادفع باستخدام حساب جوجل' }
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
        {currentLanguage === 'en' ? 'Payment Method' : 'طريقة الدفع'}
      </h2>

      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-smooth ${
              paymentMethod === method.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setPaymentMethod(method.id)}
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === method.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {paymentMethod === method.id && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <Icon name={method.icon} size={20} className="text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{method.label[currentLanguage]}</p>
                <p className="text-sm text-text-secondary">{method.description[currentLanguage]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-6 p-4 bg-muted rounded-lg">
        <Icon name="Shield" size={20} className="text-success" />
        <span className="text-sm text-text-secondary">
          {currentLanguage === 'en' ? 'Secured by SSL encryption' : 'محمي بتشفير SSL'}
        </span>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
        </div>
      </div>

      {/* Card Form */}
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={currentLanguage === 'en' ? 'Card Number' : 'رقم البطاقة'}
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.payment.cardNumber || ''}
            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
            error={errors.cardNumber}
            maxLength={19}
            required
          />

          <Input
            label={currentLanguage === 'en' ? 'Cardholder Name' : 'اسم حامل البطاقة'}
            type="text"
            placeholder={currentLanguage === 'en' ? 'John Doe' : 'أحمد محمد'}
            value={formData.payment.cardholderName || ''}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            error={errors.cardholderName}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={currentLanguage === 'en' ? 'Expiry Date' : 'تاريخ الانتهاء'}
              type="text"
              placeholder="MM/YY"
              value={formData.payment.expiryDate || ''}
              onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
              error={errors.expiryDate}
              maxLength={5}
              required
            />
            <Input
              label={currentLanguage === 'en' ? 'CVV' : 'رمز الأمان'}
              type="text"
              placeholder="123"
              value={formData.payment.cvv || ''}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              error={errors.cvv}
              maxLength={4}
              required
            />
          </div>

          <div className="pt-4">
            <Checkbox
              label={currentLanguage === 'en' ?'Save this payment method for future orders' :'احفظ طريقة الدفع هذه للطلبات المستقبلية'
              }
              checked={formData.payment.saveCard || false}
              onChange={(e) => handleInputChange('saveCard', e.target.checked)}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              <Icon name="ArrowLeft" size={16} className="rtl:rotate-180" />
              <span className="ml-2 rtl:mr-2 rtl:ml-0">
                {currentLanguage === 'en' ? 'Back' : 'رجوع'}
              </span>
            </Button>
            <Button type="submit" loading={isProcessing}>
              {isProcessing 
                ? (currentLanguage === 'en' ? 'Processing...' : 'جاري المعالجة...')
                : (currentLanguage === 'en' ? 'Review Order' : 'مراجعة الطلب')
              }
            </Button>
          </div>
        </form>
      )}

      {/* Alternative Payment Methods */}
      {(paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') && (
        <div className="text-center py-8">
          <div className="mb-4">
            <Icon name="Smartphone" size={48} className="text-primary mx-auto" />
          </div>
          <p className="text-text-secondary mb-6">
            {currentLanguage === 'en' ?'You will be redirected to complete your payment securely' :'سيتم توجيهك لإكمال الدفع بشكل آمن'
            }
          </p>
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              <Icon name="ArrowLeft" size={16} className="rtl:rotate-180" />
              <span className="ml-2 rtl:mr-2 rtl:ml-0">
                {currentLanguage === 'en' ? 'Back' : 'رجوع'}
              </span>
            </Button>
            <Button onClick={onNext}>
              {currentLanguage === 'en' ? 'Continue' : 'متابعة'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;