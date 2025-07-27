import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  currentLanguage,
  isMobile = false 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    attributes: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    { id: 'wholesale', name: { en: 'Wholesale Items', ar: 'المنتجات بالجملة' }, count: 45 },
    { id: 'custom-gifts', name: { en: 'Custom Gifts', ar: 'الهدايا المخصصة' }, count: 32 },
    { id: 'printing', name: { en: 'Printing Supplies', ar: 'مستلزمات الطباعة' }, count: 28 },
    { id: 'promotional', name: { en: 'Promotional Items', ar: 'المواد الترويجية' }, count: 19 },
    { id: 'office', name: { en: 'Office Supplies', ar: 'مستلزمات المكتب' }, count: 15 }
  ];

  const priceRanges = [
    { id: 'under-50', label: { en: 'Under 50 SAR', ar: 'أقل من 50 ريال' }, min: 0, max: 50, count: 23 },
    { id: '50-100', label: { en: '50 - 100 SAR', ar: '50 - 100 ريال' }, min: 50, max: 100, count: 34 },
    { id: '100-200', label: { en: '100 - 200 SAR', ar: '100 - 200 ريال' }, min: 100, max: 200, count: 28 },
    { id: '200-500', label: { en: '200 - 500 SAR', ar: '200 - 500 ريال' }, min: 200, max: 500, count: 19 },
    { id: 'over-500', label: { en: 'Over 500 SAR', ar: 'أكثر من 500 ريال' }, min: 500, max: null, count: 12 }
  ];

  const attributes = [
    { id: 'customizable', name: { en: 'Customizable', ar: 'قابل للتخصيص' }, count: 67 },
    { id: 'bulk-discount', name: { en: 'Bulk Discount', ar: 'خصم الكمية' }, count: 45 },
    { id: 'fast-delivery', name: { en: 'Fast Delivery', ar: 'توصيل سريع' }, count: 38 },
    { id: 'eco-friendly', name: { en: 'Eco Friendly', ar: 'صديق للبيئة' }, count: 22 },
    { id: 'premium', name: { en: 'Premium Quality', ar: 'جودة عالية' }, count: 31 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...(filters.categories || []), categoryId]
      : (filters.categories || []).filter(id => id !== categoryId);
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceRangeChange = (rangeId, checked) => {
    const newPriceRanges = checked 
      ? [...(filters.priceRanges || []), rangeId]
      : (filters.priceRanges || []).filter(id => id !== rangeId);
    
    onFilterChange({ ...filters, priceRanges: newPriceRanges });
  };

  const handleAttributeChange = (attributeId, checked) => {
    const newAttributes = checked 
      ? [...(filters.attributes || []), attributeId]
      : (filters.attributes || []).filter(id => id !== attributeId);
    
    onFilterChange({ ...filters, attributes: newAttributes });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      priceRanges: [],
      attributes: []
    });
  };

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="font-medium text-foreground">{title}</h3>
        <Icon 
          name={expandedSections[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground"
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="mt-3 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {currentLanguage === 'en' ? 'Filters' : 'المرشحات'}
        </h2>
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Clear All */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={clearAllFilters}
        className="w-full"
      >
        {currentLanguage === 'en' ? 'Clear All' : 'مسح الكل'}
      </Button>

      {/* Categories */}
      <FilterSection 
        title={currentLanguage === 'en' ? 'Categories' : 'الفئات'} 
        sectionKey="category"
      >
        {categories.map(category => (
          <Checkbox
            key={category.id}
            label={
              <div className="flex items-center justify-between w-full">
                <span>{category.name[currentLanguage]}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </div>
            }
            checked={(filters.categories || []).includes(category.id)}
            onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
          />
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection 
        title={currentLanguage === 'en' ? 'Price Range' : 'نطاق السعر'} 
        sectionKey="price"
      >
        {priceRanges.map(range => (
          <Checkbox
            key={range.id}
            label={
              <div className="flex items-center justify-between w-full">
                <span>{range.label[currentLanguage]}</span>
                <span className="text-xs text-muted-foreground">({range.count})</span>
              </div>
            }
            checked={(filters.priceRanges || []).includes(range.id)}
            onChange={(e) => handlePriceRangeChange(range.id, e.target.checked)}
          />
        ))}
      </FilterSection>

      {/* Attributes */}
      <FilterSection 
        title={currentLanguage === 'en' ? 'Product Features' : 'ميزات المنتج'} 
        sectionKey="attributes"
      >
        {attributes.map(attribute => (
          <Checkbox
            key={attribute.id}
            label={
              <div className="flex items-center justify-between w-full">
                <span>{attribute.name[currentLanguage]}</span>
                <span className="text-xs text-muted-foreground">({attribute.count})</span>
              </div>
            }
            checked={(filters.attributes || []).includes(attribute.id)}
            onChange={(e) => handleAttributeChange(attribute.id, e.target.checked)}
          />
        ))}
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 rtl:left-0 rtl:right-auto w-full max-w-sm bg-background shadow-elevated">
              <div className="h-full overflow-y-auto p-6">
                {content}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-20 bg-background border border-border rounded-lg p-6">
        {content}
      </div>
    </div>
  );
};

export default FilterPanel;