import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductCustomization from './components/ProductCustomization';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';
import Breadcrumb from './components/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('details');
  const [customization, setCustomization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const productData = {
    id: 'pd-001',
    sku: 'MAY-THP-001',
    name: {
      en: 'Premium Thermal Receipt Printer',
      ar: 'طابعة إيصالات حرارية متميزة'
    },
    category: {
      en: 'Thermal Printing',
      ar: 'الطباعة الحرارية'
    },
    categoryId: 'thermal-printing',
    price: 299.00,
    originalPrice: 399.00,
    currency: 'SAR',
    rating: 4.7,
    reviewCount: 156,
    stock: 25,
    customizable: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=600&fit=crop',
      'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?w=600&h=600&fit=crop',
      'https://images.pixabay.com/photo/2016/11/29/06/15/office-1867715_1280.jpg?w=600&h=600&fit=crop'
    ],
    description: {
      en: `Professional-grade thermal receipt printer designed for high-volume retail and hospitality environments. Features advanced thermal printing technology with crisp, clear output and reliable performance. Perfect for point-of-sale systems, restaurants, and retail stores requiring fast, efficient receipt printing.

This printer supports multiple paper sizes and offers seamless integration with existing POS systems. Built with durability in mind, it can handle thousands of receipts daily while maintaining consistent print quality.`,
      ar: `طابعة إيصالات حرارية احترافية مصممة لبيئات البيع بالتجزئة والضيافة عالية الحجم. تتميز بتقنية الطباعة الحرارية المتقدمة مع إخراج واضح ونقي وأداء موثوق. مثالية لأنظمة نقاط البيع والمطاعم ومتاجر التجزئة التي تتطلب طباعة إيصالات سريعة وفعالة.

تدعم هذه الطابعة أحجام ورق متعددة وتوفر تكاملاً سلساً مع أنظمة نقاط البيع الحالية. مبنية مع وضع المتانة في الاعتبار، يمكنها التعامل مع آلاف الإيصالات يومياً مع الحفاظ على جودة طباعة ثابتة.`
    },
    features: [
      {
        en: 'High-speed thermal printing up to 250mm/sec',
        ar: 'طباعة حرارية عالية السرعة تصل إلى 250 مم/ثانية'
      },
      {
        en: 'Auto-cutter with partial and full cut options',
        ar: 'قاطع تلقائي مع خيارات القطع الجزئي والكامل'
      },
      {
        en: 'Multiple connectivity options (USB, Ethernet, WiFi)',
        ar: 'خيارات اتصال متعددة (USB، إيثرنت، واي فاي)'
      },
      {
        en: 'Compatible with Windows, Mac, and Linux',
        ar: 'متوافق مع ويندوز وماك ولينكس'
      },
      {
        en: 'Energy-efficient design with low power consumption',
        ar: 'تصميم موفر للطاقة مع استهلاك طاقة منخفض'
      }
    ],
    variants: [
      {
        id: 'var-001',
        name: {
          en: 'Standard Model',
          ar: 'الطراز القياسي'
        },
        price: 299.00
      },
      {
        id: 'var-002',
        name: {
          en: 'WiFi Enabled',
          ar: 'مع واي فاي'
        },
        price: 349.00
      },
      {
        id: 'var-003',
        name: {
          en: 'Premium Bundle',
          ar: 'الحزمة المتميزة'
        },
        price: 449.00
      }
    ],
    specifications: [
      {
        label: { en: 'Print Method', ar: 'طريقة الطباعة' },
        value: { en: 'Direct Thermal', ar: 'حرارية مباشرة' }
      },
      {
        label: { en: 'Print Speed', ar: 'سرعة الطباعة' },
        value: { en: 'Up to 250mm/sec', ar: 'تصل إلى 250 مم/ثانية' }
      },
      {
        label: { en: 'Paper Width', ar: 'عرض الورق' },
        value: { en: '80mm (3.15")', ar: '80 مم (3.15 بوصة)' }
      },
      {
        label: { en: 'Resolution', ar: 'الدقة' },
        value: { en: '203 DPI', ar: '203 نقطة في البوصة' }
      },
      {
        label: { en: 'Interface', ar: 'الواجهة' },
        value: { en: 'USB, Ethernet, WiFi', ar: 'USB، إيثرنت، واي فاي' }
      },
      {
        label: { en: 'Dimensions', ar: 'الأبعاد' },
        value: { en: '145 × 195 × 140mm', ar: '145 × 195 × 140 مم' }
      },
      {
        label: { en: 'Weight', ar: 'الوزن' },
        value: { en: '1.2kg', ar: '1.2 كيلوجرام' }
      },
      {
        label: { en: 'Power Supply', ar: 'مصدر الطاقة' },
        value: { en: '24V DC Adapter', ar: 'محول 24 فولت تيار مستمر' }
      }
    ],
    highlights: [
      {
        en: 'Professional-grade thermal printing technology',
        ar: 'تقنية طباعة حرارية احترافية'
      },
      {
        en: 'High-speed printing for busy environments',
        ar: 'طباعة عالية السرعة للبيئات المزدحمة'
      },
      {
        en: 'Multiple connectivity options for flexibility',
        ar: 'خيارات اتصال متعددة للمرونة'
      },
      {
        en: 'Durable construction for long-lasting performance',
        ar: 'بناء متين للأداء طويل المدى'
      }
    ],
    shipping: {
      options: [
        {
          name: { en: 'Standard Delivery', ar: 'التوصيل القياسي' },
          duration: { en: '3-5 business days', ar: '3-5 أيام عمل' },
          price: 0
        },
        {
          name: { en: 'Express Delivery', ar: 'التوصيل السريع' },
          duration: { en: '1-2 business days', ar: '1-2 يوم عمل' },
          price: 25
        },
        {
          name: { en: 'Same Day Delivery', ar: 'التوصيل في نفس اليوم' },
          duration: { en: 'Within 6 hours', ar: 'خلال 6 ساعات' },
          price: 50
        }
      ],
      zones: [
        { en: 'Riyadh Metropolitan Area', ar: 'منطقة الرياض الكبرى' },
        { en: 'Jeddah and Makkah Region', ar: 'جدة ومنطقة مكة' },
        { en: 'Eastern Province (Dammam, Khobar)', ar: 'المنطقة الشرقية (الدمام، الخبر)' },
        { en: 'Other Major Cities', ar: 'المدن الرئيسية الأخرى' }
      ]
    },
    bulkPricing: {
      available: true,
      tiers: [
        { minQuantity: 5, price: 279.00, discount: 7 },
        { minQuantity: 10, price: 259.00, discount: 13 },
        { minQuantity: 25, price: 239.00, discount: 20 },
        { minQuantity: 50, price: 219.00, discount: 27 }
      ]
    }
  };

  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Set document direction
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (productWithOptions) => {
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Create cart item
    const cartItem = {
      id: `${productWithOptions.id}-${Date.now()}`,
      productId: productWithOptions.id,
      name: productWithOptions.name,
      price: productWithOptions.selectedVariant?.price || productWithOptions.price,
      quantity: productWithOptions.quantity,
      variant: productWithOptions.selectedVariant,
      customization: customization,
      image: productWithOptions.images[0],
      addedAt: new Date().toISOString()
    };

    // Add to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Show success message (you can implement a toast notification here)
    alert(currentLanguage === 'en' ?'Product added to cart successfully!' :'تم إضافة المنتج إلى السلة بنجاح!'
    );

    // Navigate to cart
    navigate('/shopping-cart');
  };

  const handleCustomizationChange = (newCustomization) => {
    setCustomization(newCustomization);
  };

  const sectionTabs = [
    {
      id: 'details',
      label: currentLanguage === 'en' ? 'Product Details' : 'تفاصيل المنتج',
      icon: 'Info'
    },
    {
      id: 'reviews',
      label: currentLanguage === 'en' ? 'Customer Reviews' : 'تقييمات العملاء',
      icon: 'Star'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <Breadcrumb product={productData} currentLanguage={currentLanguage} />

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-6">
              <ProductImageGallery 
                images={productData.images}
                productName={productData.name[currentLanguage]}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <ProductInfo 
                product={productData}
                currentLanguage={currentLanguage}
                onAddToCart={handleAddToCart}
              />

              {/* Customization Section */}
              {productData.customizable && (
                <ProductCustomization
                  product={productData}
                  currentLanguage={currentLanguage}
                  onCustomizationChange={handleCustomizationChange}
                />
              )}
            </div>
          </div>

          {/* Section Navigation */}
          <div className="border-b border-border mb-8">
            <div className="flex space-x-8 rtl:space-x-reverse overflow-x-auto">
              {sectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeSection === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Content */}
          <div className="mb-12">
            {activeSection === 'details' && (
              <ProductTabs 
                product={productData}
                currentLanguage={currentLanguage}
              />
            )}
            
            {activeSection === 'reviews' && (
              <CustomerReviews currentLanguage={currentLanguage} />
            )}
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <RelatedProducts 
              currentLanguage={currentLanguage}
              categoryId={productData.categoryId}
            />
          </div>

          {/* Sticky Add to Cart (Mobile) */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-1">
                <p className="text-sm text-text-secondary">
                  {currentLanguage === 'en' ? 'Starting from' : 'يبدأ من'}
                </p>
                <p className="text-lg font-bold text-primary">
                  {new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
                    style: 'currency',
                    currency: 'SAR'
                  }).format(productData.price)}
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => handleAddToCart({
                  ...productData,
                  selectedVariant: productData.variants[0],
                  quantity: 1
                })}
              >
                {currentLanguage === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;