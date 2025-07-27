import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ currentLanguage, categoryId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const relatedProducts = [
    {
      id: 'rp-001',
      name: {
        en: 'Custom Business Cards',
        ar: 'بطاقات أعمال مخصصة'
      },
      price: 45.00,
      originalPrice: 60.00,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 89,
      isNew: false,
      customizable: true
    },
    {
      id: 'rp-002',
      name: {
        en: 'Thermal Receipt Rolls',
        ar: 'لفائف الإيصالات الحرارية'
      },
      price: 25.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 156,
      isNew: true,
      customizable: false
    },
    {
      id: 'rp-003',
      name: {
        en: 'Custom Branded Mugs',
        ar: 'أكواب مخصصة بالعلامة التجارية'
      },
      price: 35.00,
      originalPrice: 45.00,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 234,
      isNew: false,
      customizable: true
    },
    {
      id: 'rp-004',
      name: {
        en: 'Corporate Gift Sets',
        ar: 'مجموعات هدايا الشركات'
      },
      price: 120.00,
      originalPrice: 150.00,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 67,
      isNew: true,
      customizable: true
    },
    {
      id: 'rp-005',
      name: {
        en: 'Barcode Labels',
        ar: 'ملصقات الباركود'
      },
      price: 18.00,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      rating: 4.4,
      reviewCount: 123,
      isNew: false,
      customizable: false
    },
    {
      id: 'rp-006',
      name: {
        en: 'Custom Keychains',
        ar: 'سلاسل مفاتيح مخصصة'
      },
      price: 15.00,
      originalPrice: 20.00,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 198,
      isNew: false,
      customizable: true
    }
  ];

  const formatPrice = (price, currency = 'SAR') => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    if (originalPrice && currentPrice < originalPrice) {
      return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }
    return 0;
  };

  const itemsPerSlide = 4;
  const maxSlides = Math.ceil(relatedProducts.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return relatedProducts.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Icon name="Package" size={24} className="text-primary" />
          <h2 className="text-2xl font-heading font-bold text-foreground">
            {currentLanguage === 'en' ? 'Related Products' : 'منتجات ذات صلة'}
          </h2>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            iconName="ChevronLeft"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === maxSlides - 1}
            iconName="ChevronRight"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {getCurrentProducts().map((product) => (
          <div
            key={product.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-300 group"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name[currentLanguage]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-col space-y-1">
                {product.isNew && (
                  <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {currentLanguage === 'en' ? 'New' : 'جديد'}
                  </span>
                )}
                {product.originalPrice && getDiscountPercentage(product.originalPrice, product.price) > 0 && (
                  <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
                    -{getDiscountPercentage(product.originalPrice, product.price)}%
                  </span>
                )}
                {product.customizable && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                    <Icon name="Palette" size={10} className="inline mr-1 rtl:ml-1 rtl:mr-0" />
                    {currentLanguage === 'en' ? 'Custom' : 'مخصص'}
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-subtle">
                  <Icon name="Heart" size={14} className="text-text-secondary hover:text-error transition-colors duration-200" />
                </button>
                <button className="w-8 h-8 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-subtle">
                  <Icon name="Eye" size={14} className="text-text-secondary hover:text-primary transition-colors duration-200" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {/* Rating */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-secondary">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Product Name */}
              <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {product.name[currentLanguage]}
              </h3>

              {/* Price */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-text-secondary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Link
                  to={`/product-detail?id=${product.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" fullWidth>
                    {currentLanguage === 'en' ? 'View Details' : 'عرض التفاصيل'}
                  </Button>
                </Link>
                <Button
                  variant="default"
                  size="sm"
                  iconName="ShoppingCart"
                  onClick={() => {
                    // Add to cart logic
                    console.log('Added to cart:', product.id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      {maxSlides > 1 && (
        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
          {[...Array(maxSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentSlide === index ? 'bg-primary' : 'bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Link */}
      <div className="text-center">
        <Link to="/product-catalog">
          <Button variant="outline" iconName="ArrowRight" iconPosition="right">
            {currentLanguage === 'en' ? 'View All Products' : 'عرض جميع المنتجات'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;