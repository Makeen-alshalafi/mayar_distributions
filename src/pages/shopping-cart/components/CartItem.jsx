import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, currentLanguage }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    await onUpdateQuantity(item.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await onRemoveItem(item.id);
    setIsUpdating(false);
  };

  const formatPrice = (price) => {
    return currentLanguage === 'ar' ? `${price} ر.س` : `$${price}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-subtle">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item.image}
              alt={item.name[currentLanguage]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground text-base lg:text-lg line-clamp-2">
                {item.name[currentLanguage]}
              </h3>
              
              {item.category && (
                <p className="text-sm text-text-secondary mt-1">
                  {currentLanguage === 'ar' ? 'الفئة:' : 'Category:'} {item.category[currentLanguage]}
                </p>
              )}

              {/* Customization Details */}
              {item.customization && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {currentLanguage === 'ar' ? 'التخصيص:' : 'Customization:'}
                  </p>
                  {item.customization.text && (
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'ar' ? 'النص:' : 'Text:'} "{item.customization.text}"
                    </p>
                  )}
                  {item.customization.image && (
                    <div className="flex items-center gap-2 mt-1">
                      <Icon name="Image" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">
                        {currentLanguage === 'ar' ? 'صورة مخصصة' : 'Custom image uploaded'}
                      </span>
                    </div>
                  )}
                  <Link
                    to={`/product-detail?id=${item.productId}`}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-smooth mt-1"
                  >
                    <Icon name="Edit" size={14} />
                    {currentLanguage === 'ar' ? 'تعديل التخصيص' : 'Edit Customization'}
                  </Link>
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 lg:gap-2">
              <div className="text-right">
                <p className="font-heading font-semibold text-lg text-foreground">
                  {formatPrice(item.price)}
                </p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="text-sm text-text-secondary line-through">
                    {formatPrice(item.originalPrice)}
                  </p>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                  className="h-8 w-8"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                
                <span className="font-medium text-foreground px-3 py-1 min-w-[40px] text-center">
                  {item.quantity}
                </span>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={isUpdating}
                  className="h-8 w-8"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                disabled={isUpdating}
                className="text-error hover:text-error hover:bg-error/10 h-8 w-8"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
            <span className="text-sm text-text-secondary">
              {currentLanguage === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}
            </span>
            <span className="font-heading font-semibold text-foreground">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;