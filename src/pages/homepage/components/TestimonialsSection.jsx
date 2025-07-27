import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: {
        en: "Ahmed Al-Rashid",
        ar: "أحمد الراشد"
      },
      company: {
        en: "Al-Rashid Trading Co.",
        ar: "شركة الراشد للتجارة"
      },
      position: {
        en: "CEO",
        ar: "الرئيس التنفيذي"
      },
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      testimonial: {
        en: "Mayar Distributions has been our trusted partner for over 2 years. Their thermal printing services are exceptional, and the quality of custom gifts we order for our corporate events is always outstanding. Highly recommended!",
        ar: "توزيعات مايار كانت شريكنا الموثوق لأكثر من عامين. خدمات الطباعة الحرارية لديهم استثنائية، وجودة الهدايا المخصصة التي نطلبها لفعالياتنا الشركاتية دائماً متميزة. أنصح بهم بشدة!"
      },
      date: "2024-01-15"
    },
    {
      id: 2,
      name: {
        en: "Sarah Johnson",
        ar: "سارة جونسون"
      },
      company: {
        en: "Tech Solutions Ltd.",
        ar: "شركة الحلول التقنية المحدودة"
      },
      position: {
        en: "Operations Manager",
        ar: "مدير العمليات"
      },
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      testimonial: {
        en: "The wholesale pricing and product quality from Mayar Distributions is unmatched. We've been able to reduce our costs significantly while maintaining the high standards our customers expect. Excellent service!",
        ar: "أسعار الجملة وجودة المنتجات من توزيعات مايار لا مثيل لها. تمكنا من تقليل تكاليفنا بشكل كبير مع الحفاظ على المعايير العالية التي يتوقعها عملاؤنا. خدمة ممتازة!"
      },
      date: "2024-02-08"
    },
    {
      id: 3,
      name: {
        en: "Mohammed Al-Zahra",
        ar: "محمد الزهراء"
      },
      company: {
        en: "Golden Events",
        ar: "الأحداث الذهبية"
      },
      position: {
        en: "Event Coordinator",
        ar: "منسق الفعاليات"
      },
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      testimonial: {
        en: "For our corporate events, we always rely on Mayar Distributions for custom gifts and promotional materials. Their attention to detail and quick turnaround time makes them our go-to supplier. Professional and reliable!",
        ar: "لفعالياتنا الشركاتية، نعتمد دائماً على توزيعات مايار للهدايا المخصصة والمواد الترويجية. اهتمامهم بالتفاصيل ووقت التسليم السريع يجعلهم مورّدنا المفضل. مهنيون وموثوقون!"
      },
      date: "2024-03-12"
    },
    {
      id: 4,
      name: {
        en: "Lisa Chen",
        ar: "ليزا تشين"
      },
      company: {
        en: "Retail Plus",
        ar: "ريتيل بلس"
      },
      position: {
        en: "Store Manager",
        ar: "مدير المتجر"
      },
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      testimonial: {
        en: "The barcode labels and thermal printing supplies we get from Mayar are always top quality. Their customer service team is responsive and helpful. We\'ve been working together for 18 months now.",
        ar: "ملصقات الباركود ومستلزمات الطباعة الحرارية التي نحصل عليها من مايار دائماً عالية الجودة. فريق خدمة العملاء لديهم متجاوب ومفيد. نعمل معاً منذ 18 شهراً الآن."
      },
      date: "2024-01-28"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (currentLanguage === 'ar') {
      return date.toLocaleDateString('ar-SA');
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {currentLanguage === 'en' ? 'What Our Clients Say' : 'ماذا يقول عملاؤنا'}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {currentLanguage === 'en' ?'Trusted by businesses across the region for quality products and exceptional service' :'موثوق من قبل الشركات في جميع أنحاء المنطقة للمنتجات عالية الجودة والخدمة الاستثنائية'
            }
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-subtle">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Quote" size={24} className="text-primary" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={`${
                      i < testimonials[currentTestimonial].rating 
                        ? 'text-accent fill-current' :'text-border'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
                "{testimonials[currentTestimonial].testimonial[currentLanguage]}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name[currentLanguage]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left rtl:text-right">
                  <div className="font-semibold text-foreground">
                    {testimonials[currentTestimonial].name[currentLanguage]}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonials[currentTestimonial].position[currentLanguage]}
                  </div>
                  <div className="text-sm text-primary font-medium">
                    {testimonials[currentTestimonial].company[currentLanguage]}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {formatDate(testimonials[currentTestimonial].date)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-200 shadow-subtle"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-200 shadow-subtle"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial 
                  ? 'bg-primary scale-110' :'bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-sm font-medium">
                {currentLanguage === 'en' ? '500+ Happy Clients' : '500+ عميل سعيد'}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Award" size={20} className="text-primary" />
              <span className="text-sm font-medium">
                {currentLanguage === 'en' ? '5 Years Experience' : '5 سنوات خبرة'}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Truck" size={20} className="text-primary" />
              <span className="text-sm font-medium">
                {currentLanguage === 'en' ? 'Fast Delivery' : 'تسليم سريع'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;