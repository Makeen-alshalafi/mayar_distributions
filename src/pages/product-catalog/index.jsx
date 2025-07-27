import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterChip from './components/FilterChip';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    attributes: []
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: { en: 'Custom Coffee Mugs', ar: 'أكواب قهوة مخصصة' },
      category: { en: 'Custom Gifts', ar: 'الهدايا المخصصة' },
      price: 45,
      originalPrice: 60,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      isNew: true,
      discount: 25,
      attributes: ['customizable', 'bulk-discount']
    },
    {
      id: 2,
      name: { en: 'Thermal Printer Labels', ar: 'ملصقات طابعة حرارية' },
      category: { en: 'Printing Supplies', ar: 'مستلزمات الطباعة' },
      price: 85,
      image: 'https://images.pixabay.com/photo/2016/03/27/19/32/label-1283670_640.jpg',
      rating: 4.8,
      reviewCount: 95,
      inStock: true,
      isNew: false,
      attributes: ['fast-delivery', 'premium']
    },
    {
      id: 3,
      name: { en: 'Promotional Keychains', ar: 'سلاسل مفاتيح ترويجية' },
      category: { en: 'Promotional Items', ar: 'المواد الترويجية' },
      price: 25,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
      rating: 4.2,
      reviewCount: 67,
      inStock: true,
      isNew: false,
      attributes: ['customizable', 'eco-friendly']
    },
    {
      id: 4,
      name: { en: 'Office Stationery Set', ar: 'مجموعة قرطاسية مكتبية' },
      category: { en: 'Office Supplies', ar: 'مستلزمات المكتب' },
      price: 120,
      image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviewCount: 89,
      inStock: false,
      isNew: false,
      attributes: ['premium', 'bulk-discount']
    },
    {
      id: 5,
      name: { en: 'Custom T-Shirts Bulk', ar: 'تيشيرتات مخصصة بالجملة' },
      category: { en: 'Wholesale Items', ar: 'المنتجات بالجملة' },
      price: 180,
      originalPrice: 220,
      image: 'https://images.pixabay.com/photo/2016/12/06/09/31/blank-1886008_640.png',
      rating: 4.4,
      reviewCount: 156,
      inStock: true,
      isNew: true,
      discount: 18,
      attributes: ['customizable', 'bulk-discount', 'eco-friendly']
    },
    {
      id: 6,
      name: { en: 'Barcode Printer Ribbons', ar: 'أشرطة طابعة الباركود' },
      category: { en: 'Printing Supplies', ar: 'مستلزمات الطباعة' },
      price: 95,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      reviewCount: 73,
      inStock: true,
      isNew: false,
      attributes: ['premium', 'fast-delivery']
    },
    {
      id: 7,
      name: { en: 'Corporate Gift Boxes', ar: 'صناديق هدايا الشركات' },
      category: { en: 'Custom Gifts', ar: 'الهدايا المخصصة' },
      price: 350,
      image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviewCount: 42,
      inStock: true,
      isNew: true,
      attributes: ['customizable', 'premium']
    },
    {
      id: 8,
      name: { en: 'Promotional Pens Set', ar: 'مجموعة أقلام ترويجية' },
      category: { en: 'Promotional Items', ar: 'المواد الترويجية' },
      price: 65,
      image: 'https://images.pixabay.com/photo/2016/03/26/22/13/pen-1281570_640.jpg',
      rating: 4.3,
      reviewCount: 91,
      inStock: true,
      isNew: false,
      attributes: ['bulk-discount', 'customizable']
    }
  ];

  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');

    // Initialize filters from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }

    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...products];

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => {
        const categoryId = getCategoryId(product.category.en);
        return filters.categories.includes(categoryId);
      });
    }

    // Apply price range filters
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return filters.priceRanges.some(rangeId => {
          switch (rangeId) {
            case 'under-50': return product.price < 50;
            case '50-100': return product.price >= 50 && product.price <= 100;
            case '100-200': return product.price >= 100 && product.price <= 200;
            case '200-500': return product.price >= 200 && product.price <= 500;
            case 'over-500': return product.price > 500;
            default: return true;
          }
        });
      });
    }

    // Apply attribute filters
    if (filters.attributes.length > 0) {
      filtered = filtered.filter(product => {
        return filters.attributes.some(attr => 
          product.attributes && product.attributes.includes(attr)
        );
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const getCategoryId = (categoryName) => {
    const categoryMap = {
      'Custom Gifts': 'custom-gifts',
      'Printing Supplies': 'printing',
      'Promotional Items': 'promotional',
      'Office Supplies': 'office',
      'Wholesale Items': 'wholesale'
    };
    return categoryMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
  };

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      'custom-gifts': { en: 'Custom Gifts', ar: 'الهدايا المخصصة' },
      'printing': { en: 'Printing Supplies', ar: 'مستلزمات الطباعة' },
      'promotional': { en: 'Promotional Items', ar: 'المواد الترويجية' },
      'office': { en: 'Office Supplies', ar: 'مستلزمات المكتب' },
      'wholesale': { en: 'Wholesale Items', ar: 'المنتجات بالجملة' }
    };
    return categoryMap[categoryId] || { en: categoryId, ar: categoryId };
  };

  const getPriceRangeName = (rangeId) => {
    const rangeMap = {
      'under-50': { en: 'Under 50 SAR', ar: 'أقل من 50 ريال' },
      '50-100': { en: '50-100 SAR', ar: '50-100 ريال' },
      '100-200': { en: '100-200 SAR', ar: '100-200 ريال' },
      '200-500': { en: '200-500 SAR', ar: '200-500 ريال' },
      'over-500': { en: 'Over 500 SAR', ar: 'أكثر من 500 ريال' }
    };
    return rangeMap[rangeId] || { en: rangeId, ar: rangeId };
  };

  const getAttributeName = (attributeId) => {
    const attributeMap = {
      'customizable': { en: 'Customizable', ar: 'قابل للتخصيص' },
      'bulk-discount': { en: 'Bulk Discount', ar: 'خصم الكمية' },
      'fast-delivery': { en: 'Fast Delivery', ar: 'توصيل سريع' },
      'eco-friendly': { en: 'Eco Friendly', ar: 'صديق للبيئة' },
      'premium': { en: 'Premium Quality', ar: 'جودة عالية' }
    };
    return attributeMap[attributeId] || { en: attributeId, ar: attributeId };
  };

  const handleAddToCart = useCallback(async (product) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if product already exists
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      existingCart.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Show success message (you could use a toast library here)
    console.log(`Added ${product.name[currentLanguage]} to cart`);
  }, [currentLanguage]);

  const removeFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + filters.priceRanges.length + filters.attributes.length;
  };

  const activeFilters = [
    ...filters.categories.map(cat => ({
      type: 'categories',
      value: cat,
      label: getCategoryName(cat)[currentLanguage]
    })),
    ...filters.priceRanges.map(range => ({
      type: 'priceRanges',
      value: range,
      label: getPriceRangeName(range)[currentLanguage]
    })),
    ...filters.attributes.map(attr => ({
      type: 'attributes',
      value: attr,
      label: getAttributeName(attr)[currentLanguage]
    }))
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
              {currentLanguage === 'en' ? 'Product Catalog' : 'كتالوج المنتجات'}
            </h1>
            <p className="text-muted-foreground">
              {currentLanguage === 'en' ?'Discover our wide range of wholesale items, custom gifts, and printing supplies' :'اكتشف مجموعتنا الواسعة من المنتجات بالجملة والهدايا المخصصة ومستلزمات الطباعة'
              }
            </p>
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <FilterPanel
              isOpen={false}
              onClose={() => {}}
              filters={filters}
              onFilterChange={setFilters}
              currentLanguage={currentLanguage}
              isMobile={false}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Filter Chips & Controls */}
              <div className="mb-6">
                {/* Mobile Filter Button & Sort */}
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterPanelOpen(true)}
                    className="lg:hidden"
                    iconName="Filter"
                    iconPosition="left"
                  >
                    {currentLanguage === 'en' ? 'Filter' : 'تصفية'}
                    {getActiveFiltersCount() > 0 && (
                      <span className="ml-2 rtl:mr-2 rtl:ml-0 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </Button>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden sm:block">
                      {currentLanguage === 'en' 
                        ? `${filteredProducts.length} products found`
                        : `تم العثور على ${filteredProducts.length} منتج`
                      }
                    </span>
                    <SortDropdown
                      value={sortBy}
                      onChange={setSortBy}
                      currentLanguage={currentLanguage}
                    />
                  </div>
                </div>

                {/* Active Filter Chips */}
                {activeFilters.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {currentLanguage === 'en' ? 'Active filters:' : 'المرشحات النشطة:'}
                    </span>
                    {activeFilters.map((filter, index) => (
                      <FilterChip
                        key={`${filter.type}-${filter.value}-${index}`}
                        label={filter.label}
                        onRemove={() => removeFilter(filter.type, filter.value)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                currentLanguage={currentLanguage}
                onAddToCart={handleAddToCart}
                isLoading={isLoading}
              />

              {/* Load More Button (for infinite scroll simulation) */}
              {!isLoading && filteredProducts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button variant="outline" size="lg">
                    <Icon name="RotateCcw" size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
                    {currentLanguage === 'en' ? 'Load More Products' : 'تحميل المزيد من المنتجات'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        currentLanguage={currentLanguage}
        isMobile={true}
      />
    </div>
  );
};

export default ProductCatalog;