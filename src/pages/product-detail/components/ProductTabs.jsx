import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product, currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    {
      id: 'description',
      label: currentLanguage === 'en' ? 'Description' : 'الوصف',
      icon: 'FileText'
    },
    {
      id: 'specifications',
      label: currentLanguage === 'en' ? 'Specifications' : 'المواصفات',
      icon: 'Settings'
    },
    {
      id: 'shipping',
      label: currentLanguage === 'en' ? 'Shipping' : 'الشحن',
      icon: 'Truck'
    },
    {
      id: 'bulk-pricing',
      label: currentLanguage === 'en' ? 'Bulk Pricing' : 'أسعار الجملة',
      icon: 'Calculator'
    }
  ];

  const formatPrice = (price, currency = 'SAR') => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-text-secondary leading-relaxed">
                {product.description[currentLanguage]}
              </p>
            </div>
            
            {product.highlights && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  {currentLanguage === 'en' ? 'Key Highlights:' : 'النقاط الرئيسية:'}
                </h4>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{highlight[currentLanguage]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="font-medium text-foreground">{spec.label[currentLanguage]}:</span>
                  <span className="text-text-secondary">{spec.value[currentLanguage]}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Truck" size={16} className="text-primary" />
                  <span>{currentLanguage === 'en' ? 'Delivery Options' : 'خيارات التوصيل'}</span>
                </h4>
                <div className="space-y-2">
                  {product.shipping.options.map((option, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-surface rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{option.name[currentLanguage]}</p>
                        <p className="text-sm text-text-secondary">{option.duration[currentLanguage]}</p>
                      </div>
                      <span className="font-medium text-primary">
                        {option.price === 0 
                          ? (currentLanguage === 'en' ? 'Free' : 'مجاني')
                          : formatPrice(option.price)
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span>{currentLanguage === 'en' ? 'Shipping Zones' : 'مناطق الشحن'}</span>
                </h4>
                <div className="space-y-2">
                  {product.shipping.zones.map((zone, index) => (
                    <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-sm text-text-secondary">{zone[currentLanguage]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'bulk-pricing':
        return (
          <div className="space-y-4">
            <div className="bg-surface rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Calculator" size={16} className="text-primary" />
                <span>{currentLanguage === 'en' ? 'Volume Discounts' : 'خصومات الكمية'}</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left rtl:text-right py-2 font-medium text-foreground">
                        {currentLanguage === 'en' ? 'Quantity' : 'الكمية'}
                      </th>
                      <th className="text-left rtl:text-right py-2 font-medium text-foreground">
                        {currentLanguage === 'en' ? 'Unit Price' : 'سعر الوحدة'}
                      </th>
                      <th className="text-left rtl:text-right py-2 font-medium text-foreground">
                        {currentLanguage === 'en' ? 'Savings' : 'التوفير'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.bulkPricing.tiers.map((tier, index) => (
                      <tr key={index} className="border-b border-border last:border-b-0">
                        <td className="py-2 text-text-secondary">
                          {tier.minQuantity}+ {currentLanguage === 'en' ? 'units' : 'قطعة'}
                        </td>
                        <td className="py-2 text-foreground font-medium">
                          {formatPrice(tier.price)}
                        </td>
                        <td className="py-2 text-success font-medium">
                          {tier.discount}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {currentLanguage === 'en' ? 'Bulk Order Benefits:' : 'مزايا طلبات الجملة:'}
                  </p>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• {currentLanguage === 'en' ? 'Free shipping on orders over 100 units' : 'شحن مجاني للطلبات أكثر من 100 قطعة'}</li>
                    <li>• {currentLanguage === 'en' ? 'Dedicated account manager' : 'مدير حساب مخصص'}</li>
                    <li>• {currentLanguage === 'en' ? 'Priority customer support' : 'دعم عملاء ذو أولوية'}</li>
                    <li>• {currentLanguage === 'en' ? 'Custom packaging options' : 'خيارات تغليف مخصصة'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-text-secondary hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;