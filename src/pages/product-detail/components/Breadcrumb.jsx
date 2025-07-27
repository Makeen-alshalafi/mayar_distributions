import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ product, currentLanguage }) => {
  const breadcrumbItems = [
    {
      label: currentLanguage === 'en' ? 'Home' : 'الرئيسية',
      path: '/homepage',
      icon: 'Home'
    },
    {
      label: currentLanguage === 'en' ? 'Products' : 'المنتجات',
      path: '/product-catalog',
      icon: 'Package'
    },
    {
      label: product?.category?.[currentLanguage] || (currentLanguage === 'en' ? 'Category' : 'الفئة'),
      path: `/product-catalog?category=${product?.categoryId}`,
      icon: 'Tag'
    },
    {
      label: product?.name?.[currentLanguage] || (currentLanguage === 'en' ? 'Product' : 'المنتج'),
      path: null,
      icon: null,
      current: true
    }
  ];

  return (
    <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 rtl:space-x-reverse">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-text-secondary rtl:rotate-180" 
              />
            )}
            
            {item.current ? (
              <span className="flex items-center space-x-1 rtl:space-x-reverse text-foreground font-medium">
                {item.icon && <Icon name={item.icon} size={14} />}
                <span className="truncate max-w-[200px]">{item.label}</span>
              </span>
            ) : (
              <Link
                to={item.path}
                className="flex items-center space-x-1 rtl:space-x-reverse text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {item.icon && <Icon name={item.icon} size={14} />}
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;