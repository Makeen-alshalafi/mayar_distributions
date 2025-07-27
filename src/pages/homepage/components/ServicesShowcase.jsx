import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesShowcase = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const services = [
    {
      id: 1,
      icon: 'Printer',
      title: {
        en: 'Thermal Printing Services',
        ar: 'خدمات الطباعة الحرارية'
      },
      description: {
        en: 'Professional thermal printing for labels, barcodes, receipts, and shipping labels with high-quality results and fast turnaround times.',
        ar: 'طباعة حرارية احترافية للملصقات والباركود والإيصالات وملصقات الشحن بنتائج عالية الجودة وأوقات تسليم سريعة.'
      },
      features: {
        en: ['High-resolution printing', 'Multiple label sizes', 'Fast delivery', 'Bulk orders'],
        ar: ['طباعة عالية الدقة', 'أحجام ملصقات متعددة', 'تسليم سريع', 'طلبات بالجملة']
      },
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 2,
      icon: 'Gift',
      title: {
        en: 'Custom Corporate Gifts',
        ar: 'هدايا الشركات المخصصة'
      },
      description: {
        en: 'Personalized corporate gifts and promotional items to strengthen your brand identity and build lasting relationships with clients.',
        ar: 'هدايا شركات مخصصة ومواد ترويجية لتعزيز هوية علامتك التجارية وبناء علاقات دائمة مع العملاء.'
      },
      features: {
        en: ['Logo customization', 'Premium materials', 'Gift packaging', 'Bulk discounts'],
        ar: ['تخصيص الشعار', 'مواد متميزة', 'تغليف الهدايا', 'خصومات الجملة']
      },
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 3,
      icon: 'Package',
      title: {
        en: 'Wholesale Distributions',
        ar: 'توزيعات الجملة'
      },
      description: {
        en: 'Comprehensive wholesale distribution services with competitive pricing, quality products, and reliable supply chain management.',
        ar: 'خدمات توزيع جملة شاملة بأسعار تنافسية ومنتجات عالية الجودة وإدارة سلسلة توريد موثوقة.'
      },
      features: {
        en: ['Competitive pricing', 'Quality assurance', 'Flexible orders', 'Reliable delivery'],
        ar: ['أسعار تنافسية', 'ضمان الجودة', 'طلبات مرنة', 'تسليم موثوق']
      },
      color: 'bg-green-50 text-green-600 border-green-200'
    }
  ];

  const ServiceCard = ({ service }) => (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-all duration-300 group">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon name={service.icon} size={32} />
      </div>
      
      <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
        {service.title[currentLanguage]}
      </h3>
      
      <p className="text-text-secondary mb-6 leading-relaxed">
        {service.description[currentLanguage]}
      </p>
      
      <ul className="space-y-2 mb-6">
        {service.features[currentLanguage].map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-text-secondary">
            <Icon name="Check" size={16} className="text-success mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <Link to="/product-catalog">
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
          {currentLanguage === 'en' ? 'Learn More' : 'اعرف المزيد'}
          <Icon 
            name={currentLanguage === 'ar' ? 'ArrowLeft' : 'ArrowRight'} 
            size={16} 
            className="ml-2 rtl:mr-2 rtl:ml-0" 
          />
        </Button>
      </Link>
    </div>
  );

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {currentLanguage === 'en' ? 'Our Services' : 'خدماتنا'}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {currentLanguage === 'en' ?'We provide comprehensive solutions for your business needs, from thermal printing to custom gifts and wholesale distributions' :'نقدم حلولاً شاملة لاحتياجات عملك، من الطباعة الحرارية إلى الهدايا المخصصة وتوزيعات الجملة'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              {currentLanguage === 'en' ? 'Need a Custom Solution?' : 'تحتاج حلاً مخصصاً؟'}
            </h3>
            <p className="text-text-secondary mb-6">
              {currentLanguage === 'en' ?'Contact our team to discuss your specific requirements and get a personalized quote for your business needs.' :'تواصل مع فريقنا لمناقشة متطلباتك المحددة والحصول على عرض أسعار مخصص لاحتياجات عملك.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg">
                <Icon name="MessageCircle" size={20} />
                <span className="ml-2 rtl:mr-2 rtl:ml-0">
                  {currentLanguage === 'en' ? 'Get Quote' : 'احصل على عرض'}
                </span>
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Phone" size={20} />
                <span className="ml-2 rtl:mr-2 rtl:ml-0">
                  {currentLanguage === 'en' ? 'Call Us' : 'اتصل بنا'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;