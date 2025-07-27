import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const TrustSignals = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const certifications = [
    {
      id: 1,
      name: {
        en: 'ISO 9001:2015',
        ar: 'آيزو 9001:2015'
      },
      description: {
        en: 'Quality Management',
        ar: 'إدارة الجودة'
      },
      icon: 'Award'
    },
    {
      id: 2,
      name: {
        en: 'Saudi Standards',
        ar: 'المعايير السعودية'
      },
      description: {
        en: 'SASO Certified',
        ar: 'معتمد من ساسو'
      },
      icon: 'Shield'
    },
    {
      id: 3,
      name: {
        en: 'Business License',
        ar: 'رخصة تجارية'
      },
      description: {
        en: 'Ministry of Commerce',
        ar: 'وزارة التجارة'
      },
      icon: 'FileText'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      name: 'Visa',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      name: 'Mastercard',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      name: 'mada',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 4,
      name: 'Apple Pay',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 5,
      name: 'STC Pay',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ];

  const statistics = [
    {
      id: 1,
      number: '500+',
      label: {
        en: 'Happy Clients',
        ar: 'عميل سعيد'
      },
      icon: 'Users'
    },
    {
      id: 2,
      number: '10K+',
      label: {
        en: 'Orders Completed',
        ar: 'طلب مكتمل'
      },
      icon: 'Package'
    },
    {
      id: 3,
      number: '5+',
      label: {
        en: 'Years Experience',
        ar: 'سنوات خبرة'
      },
      icon: 'Calendar'
    },
    {
      id: 4,
      number: '99%',
      label: {
        en: 'Customer Satisfaction',
        ar: 'رضا العملاء'
      },
      icon: 'Heart'
    }
  ];

  const guarantees = [
    {
      id: 1,
      title: {
        en: 'Quality Guarantee',
        ar: 'ضمان الجودة'
      },
      description: {
        en: '100% quality assurance on all products',
        ar: 'ضمان جودة 100% على جميع المنتجات'
      },
      icon: 'CheckCircle'
    },
    {
      id: 2,
      title: {
        en: 'Fast Delivery',
        ar: 'تسليم سريع'
      },
      description: {
        en: 'Same-day delivery in Riyadh',
        ar: 'تسليم في نفس اليوم في الرياض'
      },
      icon: 'Truck'
    },
    {
      id: 3,
      title: {
        en: 'Secure Payment',
        ar: 'دفع آمن'
      },
      description: {
        en: 'SSL encrypted secure transactions',
        ar: 'معاملات آمنة مشفرة بـ SSL'
      },
      icon: 'Lock'
    },
    {
      id: 4,
      title: {
        en: '24/7 Support',
        ar: 'دعم 24/7'
      },
      description: {
        en: 'Round-the-clock customer support',
        ar: 'دعم العملاء على مدار الساعة'
      },
      icon: 'Headphones'
    }
  ];

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {statistics.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary font-medium">
                {stat.label[currentLanguage]}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {guarantees.map((guarantee) => (
            <div key={guarantee.id} className="text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={guarantee.icon} size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {guarantee.title[currentLanguage]}
              </h3>
              <p className="text-sm text-text-secondary">
                {guarantee.description[currentLanguage]}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications and Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
              {currentLanguage === 'en' ? 'Certifications & Compliance' : 'الشهادات والامتثال'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-subtle transition-shadow duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name={cert.icon} size={20} className="text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {cert.name[currentLanguage]}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {cert.description[currentLanguage]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
              {currentLanguage === 'en' ? 'Accepted Payment Methods' : 'طرق الدفع المقبولة'}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-card border border-border rounded-lg p-3 hover:shadow-subtle transition-shadow duration-200">
                  <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs font-medium text-text-secondary">
                      {method.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Security Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
                <Icon name="Shield" size={16} />
                <span>
                  {currentLanguage === 'en' ? 'SSL Secured' : 'محمي بـ SSL'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm max-w-2xl mx-auto">
            {currentLanguage === 'en' ?'Mayar Distributions is committed to providing the highest quality products and services. All our operations comply with international standards and local regulations.' :'توزيعات مايار ملتزمة بتقديم أعلى جودة من المنتجات والخدمات. جميع عملياتنا تتوافق مع المعايير الدولية واللوائح المحلية.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;