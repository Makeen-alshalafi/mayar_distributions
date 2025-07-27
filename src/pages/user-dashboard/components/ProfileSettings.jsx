import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileSettings = ({ currentLanguage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    email: 'ahmed.alrashid@email.com',
    phone: '+966 50 123 4567',
    company: 'Al-Rashid Trading Co.',
    businessType: 'wholesale',
    language: 'ar',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    notifications: {
      email: true,
      sms: false,
      orderUpdates: true,
      promotions: true,
      priceAlerts: true
    }
  });

  const [errors, setErrors] = useState({});

  const businessTypeOptions = [
    { value: 'wholesale', label: { en: 'Wholesale Business', ar: 'تجارة الجملة' } },
    { value: 'retail', label: { en: 'Retail Business', ar: 'تجارة التجزئة' } },
    { value: 'corporate', label: { en: 'Corporate', ar: 'شركة' } },
    { value: 'individual', label: { en: 'Individual', ar: 'فرد' } }
  ];

  const languageOptions = [
    { value: 'ar', label: { en: 'Arabic', ar: 'العربية' } },
    { value: 'en', label: { en: 'English', ar: 'الإنجليزية' } }
  ];

  const currencyOptions = [
    { value: 'SAR', label: { en: 'Saudi Riyal (SAR)', ar: 'الريال السعودي (ريال)' } },
    { value: 'AED', label: { en: 'UAE Dirham (AED)', ar: 'الدرهم الإماراتي (درهم)' } },
    { value: 'USD', label: { en: 'US Dollar (USD)', ar: 'الدولار الأمريكي (دولار)' } }
  ];

  const timezoneOptions = [
    { value: 'Asia/Riyadh', label: { en: 'Riyadh (GMT+3)', ar: 'الرياض (GMT+3)' } },
    { value: 'Asia/Dubai', label: { en: 'Dubai (GMT+4)', ar: 'دبي (GMT+4)' } },
    { value: 'Asia/Kuwait', label: { en: 'Kuwait (GMT+3)', ar: 'الكويت (GMT+3)' } }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNotificationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = currentLanguage === 'en' ? 'First name is required' : 'الاسم الأول مطلوب';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = currentLanguage === 'en' ? 'Last name is required' : 'اسم العائلة مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = currentLanguage === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'en' ? 'Email is invalid' : 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = currentLanguage === 'en' ? 'Phone number is required' : 'رقم الهاتف مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Mock save functionality
      console.log('Saving profile data:', formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          {currentLanguage === 'en' ? 'Profile Settings' : 'إعدادات الملف الشخصي'}
        </h1>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Icon name="Edit" size={16} />
            <span className="ml-1 rtl:mr-1 rtl:ml-0">
              {currentLanguage === 'en' ? 'Edit Profile' : 'تعديل الملف الشخصي'}
            </span>
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              {currentLanguage === 'en' ? 'Cancel' : 'إلغاء'}
            </Button>
            <Button variant="default" onClick={handleSave}>
              {currentLanguage === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
            </Button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-6">
          {currentLanguage === 'en' ? 'Personal Information' : 'المعلومات الشخصية'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={currentLanguage === 'en' ? 'First Name' : 'الاسم الأول'}
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            error={errors.firstName}
            required
          />
          
          <Input
            label={currentLanguage === 'en' ? 'Last Name' : 'اسم العائلة'}
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            error={errors.lastName}
            required
          />
          
          <Input
            label={currentLanguage === 'en' ? 'Email Address' : 'عنوان البريد الإلكتروني'}
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            error={errors.email}
            required
          />
          
          <Input
            label={currentLanguage === 'en' ? 'Phone Number' : 'رقم الهاتف'}
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            error={errors.phone}
            required
          />
          
          <Input
            label={currentLanguage === 'en' ? 'Company Name' : 'اسم الشركة'}
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            disabled={!isEditing}
            description={currentLanguage === 'en' ? 'Optional - for business accounts' : 'اختياري - للحسابات التجارية'}
          />
          
          <Select
            label={currentLanguage === 'en' ? 'Business Type' : 'نوع العمل'}
            options={businessTypeOptions.map(option => ({
              value: option.value,
              label: option.label[currentLanguage]
            }))}
            value={formData.businessType}
            onChange={(value) => handleInputChange('businessType', value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-6">
          {currentLanguage === 'en' ? 'Preferences' : 'التفضيلات'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label={currentLanguage === 'en' ? 'Language' : 'اللغة'}
            options={languageOptions.map(option => ({
              value: option.value,
              label: option.label[currentLanguage]
            }))}
            value={formData.language}
            onChange={(value) => handleInputChange('language', value)}
            disabled={!isEditing}
          />
          
          <Select
            label={currentLanguage === 'en' ? 'Currency' : 'العملة'}
            options={currencyOptions.map(option => ({
              value: option.value,
              label: option.label[currentLanguage]
            }))}
            value={formData.currency}
            onChange={(value) => handleInputChange('currency', value)}
            disabled={!isEditing}
          />
          
          <Select
            label={currentLanguage === 'en' ? 'Timezone' : 'المنطقة الزمنية'}
            options={timezoneOptions.map(option => ({
              value: option.value,
              label: option.label[currentLanguage]
            }))}
            value={formData.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-6">
          {currentLanguage === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">
                {currentLanguage === 'en' ? 'Email Notifications' : 'إشعارات البريد الإلكتروني'}
              </h3>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'en' ?'Receive notifications via email' :'تلقي الإشعارات عبر البريد الإلكتروني'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('email', !formData.notifications.email)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notifications.email ? 'bg-primary' : 'bg-border'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.notifications.email ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">
                {currentLanguage === 'en' ? 'SMS Notifications' : 'إشعارات الرسائل النصية'}
              </h3>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'en' ?'Receive notifications via SMS' :'تلقي الإشعارات عبر الرسائل النصية'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('sms', !formData.notifications.sms)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notifications.sms ? 'bg-primary' : 'bg-border'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.notifications.sms ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">
                {currentLanguage === 'en' ? 'Order Updates' : 'تحديثات الطلبات'}
              </h3>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'en' ?'Get notified about order status changes' :'احصل على إشعارات حول تغييرات حالة الطلب'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('orderUpdates', !formData.notifications.orderUpdates)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notifications.orderUpdates ? 'bg-primary' : 'bg-border'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.notifications.orderUpdates ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">
                {currentLanguage === 'en' ? 'Promotions & Offers' : 'العروض الترويجية والخصومات'}
              </h3>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'en' ?'Receive updates about special offers and discounts' :'تلقي تحديثات حول العروض الخاصة والخصومات'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('promotions', !formData.notifications.promotions)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notifications.promotions ? 'bg-primary' : 'bg-border'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.notifications.promotions ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h3 className="font-medium text-foreground">
                {currentLanguage === 'en' ? 'Price Alerts' : 'تنبيهات الأسعار'}
              </h3>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'en' ?'Get notified when wishlist item prices change' :'احصل على إشعارات عند تغيير أسعار عناصر قائمة الأمنيات'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationChange('priceAlerts', !formData.notifications.priceAlerts)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.notifications.priceAlerts ? 'bg-primary' : 'bg-border'
              } ${!isEditing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.notifications.priceAlerts ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-6">
          {currentLanguage === 'en' ? 'Account Actions' : 'إجراءات الحساب'}
        </h2>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <Icon name="Key" size={16} />
            <span className="ml-2 rtl:mr-2 rtl:ml-0">
              {currentLanguage === 'en' ? 'Change Password' : 'تغيير كلمة المرور'}
            </span>
          </Button>
          
          <Button variant="outline" className="w-full sm:w-auto">
            <Icon name="Download" size={16} />
            <span className="ml-2 rtl:mr-2 rtl:ml-0">
              {currentLanguage === 'en' ? 'Download My Data' : 'تحميل بياناتي'}
            </span>
          </Button>
          
          <Button variant="destructive" className="w-full sm:w-auto">
            <Icon name="Trash2" size={16} />
            <span className="ml-2 rtl:mr-2 rtl:ml-0">
              {currentLanguage === 'en' ? 'Delete Account' : 'حذف الحساب'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;