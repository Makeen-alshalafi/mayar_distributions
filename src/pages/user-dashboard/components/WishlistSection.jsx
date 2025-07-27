import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const WishlistSection = ({ currentLanguage }) => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: { en: 'Premium Business Cards', ar: 'بطاقات عمل فاخرة' },
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
      price: 'SAR 180.00',
      originalPrice: 'SAR 220.00',
      discount: 18,
      inStock: true,
      category: { en: 'Printing Services', ar: 'خدمات الطباعة' },
      rating: 4.8,
      reviews: 124,
      priceChanged: true,
      priceChangeType: 'decreased'
    },
    {
      id: 2,
      name: { en: 'Custom Ceramic Mugs', ar: 'أكواب سيراميك مخصصة' },
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
      price: 'SAR 45.00',
      originalPrice: null,
      discount: 0,
      inStock: true,
      category: { en: 'Custom Gifts', ar: 'هدايا مخصصة' },
      rating: 4.6,
      reviews: 89,
      priceChanged: false,
      priceChangeType: null
    },
    {
      id: 3,
      name: { en: 'Corporate Gift Box', ar: 'صندوق هدايا الشركات' },
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      price: 'SAR 320.00',
      originalPrice: 'SAR 280.00',
      discount: 0,
      inStock: false,
      category: { en: 'Corporate Gifts', ar: 'هدايا الشركات' },
      rating: 4.9,
      reviews: 67,
      priceChanged: true,
      priceChangeType: 'increased'
    },
    {
      id: 4,
      name: { en: 'Thermal Barcode Labels', ar: 'ملصقات باركود حرارية' },
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
      price: 'SAR 95.00',
      originalPrice: 'SAR 120.00',
      discount: 21,
      inStock: true,
      category: { en: 'Labels & Stickers', ar: 'الملصقات واللاصقات' },
      rating: 4.7,
      reviews: 156,
      priceChanged: true,
      priceChangeType: 'decreased'
    },
    {
      id: 5,
      name: { en: 'Branded Notebooks', ar: 'دفاتر ذات علامة تجارية' },
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      price: 'SAR 25.00',
      originalPrice: null,
      discount: 0,
      inStock: true,
      category: { en: 'Office Supplies', ar: 'مستلزمات المكتب' },
      rating: 4.4,
      reviews: 92,
      priceChanged: false,
      priceChangeType: null
    },
    {
      id: 6,
      name: { en: 'Custom Keychains', ar: 'سلاسل مفاتيح مخصصة' },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      price: 'SAR 15.00',
      originalPrice: null,
      discount: 0,
      inStock: true,
      category: { en: 'Promotional Items', ar: 'العناصر الترويجية' },
      rating: 4.3,
      reviews: 78,
      priceChanged: false,
      priceChangeType: null
    }
  ]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addToCart = (item) => {
    // Mock add to cart functionality
    console.log('Added to cart:', item);
  };

  const getPriceChangeIcon = (changeType) => {
    if (changeType === 'decreased') {
      return <Icon name="TrendingDown" size={14} className="text-success" />;
    } else if (changeType === 'increased') {
      return <Icon name="TrendingUp" size={14} className="text-error" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          {currentLanguage === 'en' ? 'My Wishlist' : 'قائمة أمنياتي'}
        </h1>
        <div className="text-sm text-text-secondary">
          {wishlistItems.length} {currentLanguage === 'en' ? 'items' : 'عنصر'}
        </div>
      </div>

      {/* Price Change Notifications */}
      {wishlistItems.some(item => item.priceChanged) && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Bell" size={20} className="text-primary" />
            <h3 className="font-medium text-primary">
              {currentLanguage === 'en' ? 'Price Updates' : 'تحديثات الأسعار'}
            </h3>
          </div>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'en' ?'Some items in your wishlist have price changes. Check them out!' :'بعض العناصر في قائمة أمنياتك لديها تغييرات في الأسعار. تحقق منها!'}
          </p>
        </div>
      )}

      {/* Wishlist Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-elevated transition-smooth">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name[currentLanguage]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-col gap-2">
                  {item.discount > 0 && (
                    <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
                      -{item.discount}%
                    </span>
                  )}
                  {!item.inStock && (
                    <span className="bg-text-secondary text-white text-xs font-medium px-2 py-1 rounded">
                      {currentLanguage === 'en' ? 'Out of Stock' : 'نفد المخزون'}
                    </span>
                  )}
                  {item.priceChanged && (
                    <span className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 ${
                      item.priceChangeType === 'decreased' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
                    }`}>
                      {getPriceChangeIcon(item.priceChangeType)}
                      {currentLanguage === 'en' ? 'Price Changed' : 'تغير السعر'}
                    </span>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 rtl:left-3 rtl:right-auto w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-smooth opacity-0 group-hover:opacity-100"
                >
                  <Icon name="X" size={16} className="text-text-secondary" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-text-secondary">
                    {item.category[currentLanguage]}
                  </span>
                </div>
                
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                  {item.name[currentLanguage]}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(item.rating) ? 'text-accent fill-current' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-semibold text-foreground">
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      {item.originalPrice}
                    </span>
                  )}
                  {item.priceChanged && (
                    <div className="flex items-center gap-1">
                      {getPriceChangeIcon(item.priceChangeType)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    disabled={!item.inStock}
                    onClick={() => addToCart(item)}
                  >
                    <Icon name="ShoppingCart" size={16} />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0">
                      {currentLanguage === 'en' ? 'Add to Cart' : 'أضف للسلة'}
                    </span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="Heart" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'Your wishlist is empty' : 'قائمة أمنياتك فارغة'}
          </h3>
          <p className="text-text-secondary mb-6">
            {currentLanguage === 'en' ?'Save products you love to your wishlist and get notified about price changes.' :'احفظ المنتجات التي تحبها في قائمة أمنياتك واحصل على إشعارات حول تغييرات الأسعار.'}
          </p>
          <Button variant="default">
            {currentLanguage === 'en' ? 'Browse Products' : 'تصفح المنتجات'}
          </Button>
        </div>
      )}

      {/* Bulk Actions */}
      {wishlistItems.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
          <Button variant="outline" size="sm">
            <Icon name="ShoppingCart" size={16} />
            <span className="ml-1 rtl:mr-1 rtl:ml-0">
              {currentLanguage === 'en' ? 'Add All to Cart' : 'أضف الكل للسلة'}
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Share2" size={16} />
            <span className="ml-1 rtl:mr-1 rtl:ml-0">
              {currentLanguage === 'en' ? 'Share Wishlist' : 'شارك قائمة الأمنيات'}
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Trash2" size={16} />
            <span className="ml-1 rtl:mr-1 rtl:ml-0">
              {currentLanguage === 'en' ? 'Clear All' : 'مسح الكل'}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;