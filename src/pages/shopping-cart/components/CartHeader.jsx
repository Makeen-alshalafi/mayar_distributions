import React from 'react';
import Icon from '../../../components/AppIcon';

const CartHeader = ({ itemCount, currentLanguage }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="ShoppingCart" size={24} className="text-primary" />
        </div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
          {currentLanguage === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
        </h1>
      </div>
      
      {itemCount > 0 && (
        <p className="text-text-secondary">
          {currentLanguage === 'ar' 
            ? `${itemCount} عنصر في السلة`
            : `${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`}
        </p>
      )}
    </div>
  );
};

export default CartHeader;