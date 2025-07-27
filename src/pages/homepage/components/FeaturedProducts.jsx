import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/Button';
import productService from '../../../utils/productService';

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const { currentLanguage, isRTL } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await productService.getFeaturedProducts();
        
        if (result?.success && isMounted) {
          setProducts(result.data || []);
        } else if (isMounted) {
          setError(result?.error || 'Failed to load products');
        }
      } catch (err) {
        if (isMounted) {
          setError('Something went wrong loading products');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const getProductName = (product) => {
    return currentLanguage === 'ar' ? product?.name_ar : product?.name_en;
  };

  const getProductDescription = (product) => {
    return currentLanguage === 'ar' ? product?.description_ar : product?.description_en;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('products.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('products.title')}</h2>
            <p className="text-red-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products across all categories
          </p>
        </div>

        {products?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    {product?.image_url || product?.product_images?.[0]?.image_url ? (
                      <img
                        src={product?.image_url || product?.product_images?.[0]?.image_url}
                        alt={getProductName(product)}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getProductName(product)}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {getProductDescription(product)}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-teal-600">
                        ${product?.price?.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {product?.category?.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <Button
                      asChild
                      className="w-full"
                    >
                      <Link to={`/product-detail?id=${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                variant="outline"
                size="lg"
              >
                <Link to="/product-catalog" className="flex items-center gap-2">
                  {t('products.view_all')}
                  <ArrowIcon size={20} />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-8">No featured products available at the moment.</p>
            <Button asChild>
              <Link to="/product-catalog">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;