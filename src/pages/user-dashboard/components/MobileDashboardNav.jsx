import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileDashboardNav = ({ activeSection, onSectionChange, currentLanguage }) => {
  const navItems = [
    {
      id: 'overview',
      label: { en: 'Overview', ar: 'نظرة عامة' },
      icon: 'LayoutDashboard'
    },
    {
      id: 'orders',
      label: { en: 'Orders', ar: 'الطلبات' },
      icon: 'Package'
    },
    {
      id: 'wishlist',
      label: { en: 'Wishlist', ar: 'الأمنيات' },
      icon: 'Heart'
    },
    {
      id: 'profile',
      label: { en: 'Profile', ar: 'الملف الشخصي' },
      icon: 'User'
    },
    {
      id: 'addresses',
      label: { en: 'Addresses', ar: 'العناوين' },
      icon: 'MapPin'
    }
  ];

  return (
    <div className="lg:hidden bg-card border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 min-w-[80px] transition-smooth ${
              activeSection === item.id
                ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-xs font-medium">
              {item.label[currentLanguage]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileDashboardNav;