import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardSidebar = ({ activeSection, onSectionChange, currentLanguage }) => {
  const sidebarItems = [
    {
      id: 'overview',
      label: { en: 'Overview', ar: 'نظرة عامة' },
      icon: 'LayoutDashboard'
    },
    {
      id: 'orders',
      label: { en: 'Order History', ar: 'تاريخ الطلبات' },
      icon: 'Package'
    },
    {
      id: 'wishlist',
      label: { en: 'Wishlist', ar: 'قائمة الأمنيات' },
      icon: 'Heart'
    },
    {
      id: 'profile',
      label: { en: 'Profile Settings', ar: 'إعدادات الملف الشخصي' },
      icon: 'User'
    },
    {
      id: 'addresses',
      label: { en: 'Saved Addresses', ar: 'العناوين المحفوظة' },
      icon: 'MapPin'
    }
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full">
      <div className="p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-6">
          {currentLanguage === 'en' ? 'Dashboard' : 'لوحة التحكم'}
        </h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label[currentLanguage]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;