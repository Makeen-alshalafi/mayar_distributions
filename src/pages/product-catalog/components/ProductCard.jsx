import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, currentLanguage, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      await onAddToCart(product);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price, currency = 'SAR') => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <Link 
      to={`/product-detail?id=${product.id}`}
      className="group block bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevated transition-smooth"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name[currentLanguage]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.isNew && (
          <div className="absolute top-2 left-2 rtl:right-2 rtl:left-auto bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
            {currentLanguage === 'en' ? 'New' : 'جديد'}
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name[currentLanguage]}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {product.category[currentLanguage]}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="text-accent fill-current" />
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {product.inStock ? (
              <span className="text-success">
                {currentLanguage === 'en' ? 'In Stock' : 'متوفر'}
              </span>
            ) : (
              <span className="text-error">
                {currentLanguage === 'en' ? 'Out of Stock' : 'غير متوفر'}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            loading={isLoading}
            iconName="ShoppingCart"
            iconSize={16}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {currentLanguage === 'en' ? 'Add' : 'إضافة'}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;