import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 font-semibold"
            >
              <Link to="/product-catalog" className="flex items-center gap-2">
                {t('hero.cta')}
                <ArrowIcon size={20} />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-teal-600"
            >
              <Link to="/contact">
                {t('hero.secondary_cta')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-yellow-400 bg-opacity-20 rounded-full"></div>
    </section>
  );
};

export default HeroSection;