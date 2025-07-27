import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import ServicesShowcase from "./components/ServicesShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import TrustSignals from "./components/TrustSignals";

export default function Homepage() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{currentLanguage === 'ar' ? 'توزيعات ميّار - الرئيسية' : 'Mayar Distributions - Home'}</title>
        <meta 
          name="description" 
          content={currentLanguage === 'ar' ?'شريكك الموثوق للتوزيعات والهدايا المخصصة وحلول الطباعة الحرارية' :'Your trusted partner for distributions, custom gifts, and thermal printing solutions'
          } 
        />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <HeroSection />
          <ServicesShowcase />
          <FeaturedProducts />
          <TestimonialsSection />
          <TrustSignals />
          <ContactSection />
        </main>
      </div>
    </>
  );
}