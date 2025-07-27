import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, currentLanguage, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedVariant,
      quantity
    });
  };

  const formatPrice = (price, currency = 'SAR') => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.price < product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          {product.name[currentLanguage]}
        </h1>
        <p className="text-text-secondary text-sm">
          {currentLanguage === 'en' ? 'SKU:' : 'رمز المنتج:'} {product.sku}
        </p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={16}
              className={i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-border'}
            />
          ))}
          <span className="text-sm font-medium text-foreground ml-1 rtl:mr-1 rtl:ml-0">
            {product.rating}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          ({product.reviewCount} {currentLanguage === 'en' ? 'reviews' : 'تقييم'})
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(selectedVariant?.price || product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-lg text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="bg-error text-error-foreground text-sm px-2 py-1 rounded-full">
                -{getDiscountPercentage()}%
              </span>
            </>
          )}
        </div>
        {product.bulkPricing && (
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'en' ?'Bulk pricing available for orders over 50 units' :'أسعار الجملة متاحة للطلبات أكثر من 50 قطعة'
            }
          </p>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Icon 
          name={product.stock > 0 ? "CheckCircle" : "XCircle"} 
          size={16} 
          className={product.stock > 0 ? 'text-success' : 'text-error'} 
        />
        <span className={`text-sm font-medium ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
          {product.stock > 0 
            ? (currentLanguage === 'en' ? `In Stock (${product.stock} available)` : `متوفر (${product.stock} قطعة)`)
            : (currentLanguage === 'en' ? 'Out of Stock' : 'غير متوفر')
          }
        </span>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Options:' : 'الخيارات:'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selectedVariant?.id === variant.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary'
                }`}
              >
                {variant.name[currentLanguage]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">
          {currentLanguage === 'en' ? 'Quantity:' : 'الكمية:'}
        </h3>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-12 text-center font-medium text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'en' ? 'Max:' : 'الحد الأقصى:'} {product.stock}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          {currentLanguage === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="default" iconName="Heart" iconPosition="left">
            {currentLanguage === 'en' ? 'Wishlist' : 'المفضلة'}
          </Button>
          <Button variant="outline" size="default" iconName="Share2" iconPosition="left">
            {currentLanguage === 'en' ? 'Share' : 'مشاركة'}
          </Button>
        </div>
      </div>

      {/* Product Features */}
      <div className="border-t border-border pt-6">
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-text-secondary">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span>{feature[currentLanguage]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;