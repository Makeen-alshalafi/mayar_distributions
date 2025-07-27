import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SavedAddresses = ({ currentLanguage }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      label: { en: 'Home', ar: 'المنزل' },
      name: 'Ahmed Al-Rashid',
      street: { en: '123 Al-Malaz District', ar: '123 حي الملز' },
      city: { en: 'Riyadh', ar: 'الرياض' },
      state: { en: 'Riyadh Province', ar: 'منطقة الرياض' },
      postalCode: '11564',
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      phone: '+966 50 123 4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      label: { en: 'Office', ar: 'المكتب' },
      name: 'Ahmed Al-Rashid',
      street: { en: '456 King Fahd Road', ar: '456 طريق الملك فهد' },
      city: { en: 'Riyadh', ar: 'الرياض' },
      state: { en: 'Riyadh Province', ar: 'منطقة الرياض' },
      postalCode: '11432',
      country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
      phone: '+966 11 456 7890',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    label: '',
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'SA',
    phone: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  const addressTypes = [
    { value: 'home', label: { en: 'Home', ar: 'المنزل' }, icon: 'Home' },
    { value: 'work', label: { en: 'Work', ar: 'العمل' }, icon: 'Building' },
    { value: 'other', label: { en: 'Other', ar: 'أخرى' }, icon: 'MapPin' }
  ];

  const countryOptions = [
    { value: 'SA', label: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' } },
    { value: 'AE', label: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' } },
    { value: 'KW', label: { en: 'Kuwait', ar: 'الكويت' } },
    { value: 'QA', label: { en: 'Qatar', ar: 'قطر' } },
    { value: 'BH', label: { en: 'Bahrain', ar: 'البحرين' } },
    { value: 'OM', label: { en: 'Oman', ar: 'عمان' } }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = currentLanguage === 'en' ? 'Name is required' : 'الاسم مطلوب';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = currentLanguage === 'en' ? 'Street address is required' : 'عنوان الشارع مطلوب';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = currentLanguage === 'en' ? 'City is required' : 'المدينة مطلوبة';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = currentLanguage === 'en' ? 'Postal code is required' : 'الرمز البريدي مطلوب';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = currentLanguage === 'en' ? 'Phone number is required' : 'رقم الهاتف مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = () => {
    if (validateForm()) {
      const addressData = {
        ...formData,
        id: editingAddress ? editingAddress.id : Date.now(),
        label: formData.label || addressTypes.find(t => t.value === formData.type)?.label
      };

      if (editingAddress) {
        setAddresses(prev => prev.map(addr => 
          addr.id === editingAddress.id ? addressData : addr
        ));
      } else {
        setAddresses(prev => [...prev, addressData]);
      }

      // If this is set as default, remove default from others
      if (formData.isDefault) {
        setAddresses(prev => prev.map(addr => ({
          ...addr,
          isDefault: addr.id === addressData.id
        })));
      }

      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      label: '',
      name: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'SA',
      phone: '',
      isDefault: false
    });
    setErrors({});
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address) => {
    setFormData({
      type: address.type,
      label: typeof address.label === 'object' ? address.label[currentLanguage] : address.label,
      name: address.name,
      street: typeof address.street === 'object' ? address.street[currentLanguage] : address.street,
      city: typeof address.city === 'object' ? address.city[currentLanguage] : address.city,
      state: typeof address.state === 'object' ? address.state[currentLanguage] : address.state,
      postalCode: address.postalCode,
      country: address.country === 'Saudi Arabia' ? 'SA' : address.country,
      phone: address.phone,
      isDefault: address.isDefault
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const getAddressTypeIcon = (type) => {
    const addressType = addressTypes.find(t => t.value === type);
    return addressType ? addressType.icon : 'MapPin';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          {currentLanguage === 'en' ? 'Saved Addresses' : 'العناوين المحفوظة'}
        </h1>
        <Button
          variant="default"
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
        >
          <Icon name="Plus" size={16} />
          <span className="ml-1 rtl:mr-1 rtl:ml-0">
            {currentLanguage === 'en' ? 'Add Address' : 'إضافة عنوان'}
          </span>
        </Button>
      </div>

      {/* Add/Edit Address Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-6">
            {editingAddress 
              ? (currentLanguage === 'en' ? 'Edit Address' : 'تعديل العنوان')
              : (currentLanguage === 'en' ? 'Add New Address' : 'إضافة عنوان جديد')
            }
          </h2>
          
          <div className="space-y-6">
            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                {currentLanguage === 'en' ? 'Address Type' : 'نوع العنوان'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {addressTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('type', type.value)}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-smooth ${
                      formData.type === type.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon name={type.icon} size={20} />
                    <span className="text-sm font-medium">
                      {type.label[currentLanguage]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={currentLanguage === 'en' ? 'Full Name' : 'الاسم الكامل'}
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              
              <Input
                label={currentLanguage === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
              />
            </div>

            <Input
              label={currentLanguage === 'en' ? 'Street Address' : 'عنوان الشارع'}
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              error={errors.street}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label={currentLanguage === 'en' ? 'City' : 'المدينة'}
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                error={errors.city}
                required
              />
              
              <Input
                label={currentLanguage === 'en' ? 'State/Province' : 'الولاية/المنطقة'}
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
              
              <Input
                label={currentLanguage === 'en' ? 'Postal Code' : 'الرمز البريدي'}
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                error={errors.postalCode}
                required
              />
            </div>

            <Select
              label={currentLanguage === 'en' ? 'Country' : 'البلد'}
              options={countryOptions.map(option => ({
                value: option.value,
                label: option.label[currentLanguage]
              }))}
              value={formData.country}
              onChange={(value) => handleInputChange('country', value)}
            />

            {/* Default Address Toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleInputChange('isDefault', !formData.isDefault)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.isDefault ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isDefault ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
              <label className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Set as default address' : 'تعيين كعنوان افتراضي'}
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={resetForm}>
                {currentLanguage === 'en' ? 'Cancel' : 'إلغاء'}
              </Button>
              <Button variant="default" onClick={handleSaveAddress}>
                {editingAddress 
                  ? (currentLanguage === 'en' ? 'Update Address' : 'تحديث العنوان')
                  : (currentLanguage === 'en' ? 'Save Address' : 'حفظ العنوان')
                }
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={getAddressTypeIcon(address.type)} size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {typeof address.label === 'object' ? address.label[currentLanguage] : address.label}
                  </h3>
                  {address.isDefault && (
                    <span className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full mt-1">
                      <Icon name="Star" size={12} />
                      {currentLanguage === 'en' ? 'Default' : 'افتراضي'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditAddress(address)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAddress(address.id)}
                  disabled={address.isDefault}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-text-secondary space-y-1">
              <p className="font-medium text-foreground">{address.name}</p>
              <p>{typeof address.street === 'object' ? address.street[currentLanguage] : address.street}</p>
              <p>
                {typeof address.city === 'object' ? address.city[currentLanguage] : address.city}
                {address.state && `, ${typeof address.state === 'object' ? address.state[currentLanguage] : address.state}`}
                {` ${address.postalCode}`}
              </p>
              <p>{typeof address.country === 'object' ? address.country[currentLanguage] : address.country}</p>
              <p>{address.phone}</p>
            </div>
            
            {!address.isDefault && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(address.id)}
                >
                  <Icon name="Star" size={16} />
                  <span className="ml-1 rtl:mr-1 rtl:ml-0">
                    {currentLanguage === 'en' ? 'Set as Default' : 'تعيين كافتراضي'}
                  </span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showAddForm && (
        <div className="text-center py-12">
          <Icon name="MapPin" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'No saved addresses' : 'لا توجد عناوين محفوظة'}
          </h3>
          <p className="text-text-secondary mb-6">
            {currentLanguage === 'en' ?'Add your addresses to make checkout faster and easier.' :'أضف عناوينك لجعل عملية الدفع أسرع وأسهل.'}
          </p>
          <Button variant="default" onClick={() => setShowAddForm(true)}>
            <Icon name="Plus" size={16} />
            <span className="ml-1 rtl:mr-1 rtl:ml-0">
              {currentLanguage === 'en' ? 'Add Your First Address' : 'أضف عنوانك الأول'}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedAddresses;