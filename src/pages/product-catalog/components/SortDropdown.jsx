import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ value, onChange, currentLanguage }) => {
  const sortOptions = [
    { 
      value: 'relevance', 
      label: currentLanguage === 'en' ? 'Relevance' : 'الصلة' 
    },
    { 
      value: 'price-low-high', 
      label: currentLanguage === 'en' ? 'Price: Low to High' : 'السعر: من الأقل إلى الأعلى' 
    },
    { 
      value: 'price-high-low', 
      label: currentLanguage === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى إلى الأقل' 
    },
    { 
      value: 'popularity', 
      label: currentLanguage === 'en' ? 'Most Popular' : 'الأكثر شعبية' 
    },
    { 
      value: 'newest', 
      label: currentLanguage === 'en' ? 'Newest First' : 'الأحدث أولاً' 
    },
    { 
      value: 'rating', 
      label: currentLanguage === 'en' ? 'Highest Rated' : 'الأعلى تقييماً' 
    }
  ];

  return (
    <Select
      options={sortOptions}
      value={value}
      onChange={onChange}
      placeholder={currentLanguage === 'en' ? 'Sort by' : 'ترتيب حسب'}
      className="w-48"
    />
  );
};

export default SortDropdown;