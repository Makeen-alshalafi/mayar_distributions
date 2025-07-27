import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ currentLanguage }) => {
  const suggestedProducts = [
    {
      id: 1,
      name: {
        en: "Custom Business Cards",
        ar: "بطاقات عمل مخصصة"
      },
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      price: 45.99,
      category: {
        en: "Printing Services",
        ar: "خدمات الطباعة"
      }
    },
    {
      id: 2,
      name: {
        en: "Promotional Mugs",
        ar: "أكواب ترويجية"
      },
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop",
      price: 12.50,
      category: {
        en: "Custom Gifts",
        ar: "هدايا مخصصة"
      }
    },
    {
      id: 3,
      name: {
        en: "Corporate Keychains",
        ar: "سلاسل مفاتيح للشركات"
      },
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      price: 8.75,
      category: {
        en: "Wholesale Items",
        ar: "عناصر الجملة"
      }
    }
  ];

  const formatPrice = (price) => {
    return currentLanguage === 'ar' ? `${price} ر.س` : `$${price}`;
  };

  return (
    <div className="text-center py-12 lg:py-16">
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-muted rounded-full mb-6">
          <Icon name="ShoppingCart" size={64} className="text-text-secondary" />
        </div>
        
        <h2 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-4">
          {currentLanguage === 'ar' ? 'سلة التسوق فارغة' : 'Your cart is empty'}
        </h2>
        
        <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
          {currentLanguage === 'ar' ?'ابدأ بإضافة بعض المنتجات الرائعة إلى سلة التسوق الخاصة بك' :'Start by adding some amazing products to your shopping cart'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/product-catalog">
            <Button variant="default" iconName="Package" iconPosition="left">
              {currentLanguage === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </Button>
          </Link>
          
          <Link to="/homepage">
            <Button variant="outline" iconName="Home" iconPosition="left">
              {currentLanguage === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-12 lg:mt-16">
        <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
          {currentLanguage === 'ar' ? 'منتجات مقترحة' : 'Suggested Products'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {suggestedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail?id=${product.id}`}
              className="group bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name[currentLanguage]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <p className="text-sm text-text-secondary mb-1">
                  {product.category[currentLanguage]}
                </p>
                
                <h4 className="font-heading font-medium text-foreground mb-2 line-clamp-2">
                  {product.name[currentLanguage]}
                </h4>
                
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  
                  <div className="flex items-center gap-1 text-sm text-primary group-hover:text-primary/80 transition-smooth">
                    <span>{currentLanguage === 'ar' ? 'عرض' : 'View'}</span>
                    <Icon name="ArrowRight" size={16} className="rtl:rotate-180" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
            <Icon name="Truck" size={24} className="text-primary" />
          </div>
          <h4 className="font-heading font-medium text-foreground mb-2">
            {currentLanguage === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
          </h4>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'ar' ?'شحن مجاني للطلبات فوق 500 ر.س' :'Free shipping on orders over $500'}
          </p>
        </div>

        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
            <Icon name="Shield" size={24} className="text-primary" />
          </div>
          <h4 className="font-heading font-medium text-foreground mb-2">
            {currentLanguage === 'ar' ? 'دفع آمن' : 'Secure Payment'}
          </h4>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'ar' ?'معاملات آمنة ومشفرة' :'Safe & encrypted transactions'}
          </p>
        </div>

        <div className="text-center p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
            <Icon name="Headphones" size={24} className="text-primary" />
          </div>
          <h4 className="font-heading font-medium text-foreground mb-2">
            {currentLanguage === 'ar' ? 'دعم 24/7' : '24/7 Support'}
          </h4>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'ar' ?'دعم عملاء متاح على مدار الساعة' :'Round-the-clock customer support'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;