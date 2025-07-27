import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import Button from './Button';

const LanguageToggle = ({ className = '' }) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = () => {
    const nextLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(nextLanguage);
  };

  const getCurrentLanguageDisplay = () => {
    const currentLang = availableLanguages?.find(lang => lang.code === currentLanguage);
    return currentLang?.nativeName || 'English';
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLanguageChange}
      className={`flex items-center gap-2 ${className}`}
      aria-label={t('common.language')}
    >
      <Globe size={16} />
      <span className="text-sm font-medium">
        {getCurrentLanguageDisplay()}
      </span>
    </Button>
  );
};

export default LanguageToggle;