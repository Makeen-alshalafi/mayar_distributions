import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ formData, setFormData, onNext, currentLanguage }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load saved addresses for authenticated users
    const token = localStorage.getItem('authToken');
    if (token) {
      const addresses = [
        {
          id: 1,
          label: currentLanguage === 'en' ? 'Home' : 'المنزل',
          fullName: currentLanguage === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
          phone: '+966501234567',
          address: currentLanguage === 'en' ? '123 King Fahd Road' : '123 طريق الملك فهد',
          city: currentLanguage === 'en' ? 'Riyadh' : 'الرياض',
          state: currentLanguage === 'en' ? 'Riyadh Province' : 'منطقة الرياض',
          postalCode: '12345',
          country: 'SA'
        },
        {
          id: 2,
          label: currentLanguage === 'en' ? 'Office' : 'المكتب',
          fullName: currentLanguage === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
          phone: '+966501234567',
          address: currentLanguage === 'en' ? '456 Business District' : '456 الحي التجاري',
          city: currentLanguage === 'en' ? 'Jeddah' : 'جدة',
          state: currentLanguage === 'en' ? 'Makkah Province' : 'منطقة مكة المكرمة',
          postalCode: '54321',
          country: 'SA'
        }
      ];
      setSavedAddresses(addresses);
    }
  }, [currentLanguage]);

  const countryOptions = [
    { value: 'SA', label: currentLanguage === 'en' ? 'Saudi Arabia' : 'المملكة العربية السعودية' },
    { value: 'AE', label: currentLanguage === 'en' ? 'United Arab Emirates' : 'الإمارات العربية المتحدة' },
    { value: 'KW', label: currentLanguage === 'en' ? 'Kuwait' : 'الكويت' },
    { value: 'QA', label: currentLanguage === 'en' ? 'Qatar' : 'قطر' },
    { value: 'BH', label: currentLanguage === 'en' ? 'Bahrain' : 'البحرين' },
    { value: 'OM', label: currentLanguage === 'en' ? 'Oman' : 'عمان' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddressSelect = (addressId) => {
    const selectedAddress = savedAddresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      setFormData(prev => ({
        ...prev,
        shipping: {
          fullName: selectedAddress.fullName,
          phone: selectedAddress.phone,
          address: selectedAddress.address,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country
        }
      }));
      setShowAddressForm(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const shipping = formData.shipping;

    if (!shipping.fullName?.trim()) {
      newErrors.fullName = currentLanguage === 'en' ? 'Full name is required' : 'الاسم الكامل مطلوب';
    }
    if (!shipping.phone?.trim()) {
      newErrors.phone = currentLanguage === 'en' ? 'Phone number is required' : 'رقم الهاتف مطلوب';
    }
    if (!shipping.address?.trim()) {
      newErrors.address = currentLanguage === 'en' ? 'Address is required' : 'العنوان مطلوب';
    }
    if (!shipping.city?.trim()) {
      newErrors.city = currentLanguage === 'en' ? 'City is required' : 'المدينة مطلوبة';
    }
    if (!shipping.postalCode?.trim()) {
      newErrors.postalCode = currentLanguage === 'en' ? 'Postal code is required' : 'الرمز البريدي مطلوب';
    }
    if (!shipping.country) {
      newErrors.country = currentLanguage === 'en' ? 'Country is required' : 'البلد مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
        {currentLanguage === 'en' ? 'Shipping Information' : 'معلومات الشحن'}
      </h2>

      {savedAddresses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">
            {currentLanguage === 'en' ? 'Saved Addresses' : 'العناوين المحفوظة'}
          </h3>
          <div className="grid gap-3">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-smooth"
                onClick={() => handleAddressSelect(address.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{address.label}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{address.fullName}</p>
                    <p className="text-sm text-text-secondary">{address.address}, {address.city}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronRight" size={16} className="rtl:rotate-180" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowAddressForm(true)}
            className="mt-3"
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2 rtl:mr-2 rtl:ml-0">
              {currentLanguage === 'en' ? 'Add New Address' : 'إضافة عنوان جديد'}
            </span>
          </Button>
        </div>
      )}

      {showAddressForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={currentLanguage === 'en' ? 'Full Name' : 'الاسم الكامل'}
              type="text"
              placeholder={currentLanguage === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
              value={formData.shipping.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              required
            />
            <Input
              label={currentLanguage === 'en' ? 'Phone Number' : 'رقم الهاتف'}
              type="tel"
              placeholder={currentLanguage === 'en' ? '+966 50 123 4567' : '+966 50 123 4567'}
              value={formData.shipping.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
            />
          </div>

          <Input
            label={currentLanguage === 'en' ? 'Street Address' : 'عنوان الشارع'}
            type="text"
            placeholder={currentLanguage === 'en' ? 'Enter your street address' : 'أدخل عنوان الشارع'}
            value={formData.shipping.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={errors.address}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label={currentLanguage === 'en' ? 'City' : 'المدينة'}
              type="text"
              placeholder={currentLanguage === 'en' ? 'Enter city' : 'أدخل المدينة'}
              value={formData.shipping.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              error={errors.city}
              required
            />
            <Input
              label={currentLanguage === 'en' ? 'State/Province' : 'المنطقة/المحافظة'}
              type="text"
              placeholder={currentLanguage === 'en' ? 'Enter state' : 'أدخل المنطقة'}
              value={formData.shipping.state || ''}
              onChange={(e) => handleInputChange('state', e.target.value)}
              error={errors.state}
            />
            <Input
              label={currentLanguage === 'en' ? 'Postal Code' : 'الرمز البريدي'}
              type="text"
              placeholder={currentLanguage === 'en' ? '12345' : '12345'}
              value={formData.shipping.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              error={errors.postalCode}
              required
            />
          </div>

          <Select
            label={currentLanguage === 'en' ? 'Country' : 'البلد'}
            options={countryOptions}
            value={formData.shipping.country || ''}
            onChange={(value) => handleInputChange('country', value)}
            error={errors.country}
            required
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" iconName="ArrowRight" iconPosition="right">
              {currentLanguage === 'en' ? 'Continue to Payment' : 'المتابعة للدفع'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingForm;