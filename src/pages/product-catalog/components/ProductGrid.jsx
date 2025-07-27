import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  currentLanguage, 
  onAddToCart, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
              <div className="h-8 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path d="M6 6h.008v.008H6V6z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          {currentLanguage === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {currentLanguage === 'en' ?'Try adjusting your filters or search terms to find what you\'re looking for.'
            : 'حاول تعديل المرشحات أو مصطلحات البحث للعثور على ما تبحث عنه.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          currentLanguage={currentLanguage}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;