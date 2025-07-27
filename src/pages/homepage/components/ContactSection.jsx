import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ email: '', phone: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+966501234567'; // Mock WhatsApp number
    const message = currentLanguage === 'en' ?'Hello! I would like to know more about your services.' :'مرحباً! أود معرفة المزيد عن خدماتكم.';
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              {currentLanguage === 'en' ? 'Get In Touch' : 'تواصل معنا'}
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              {currentLanguage === 'en' ?'Ready to start your next project? Contact us today for a personalized quote and expert consultation.' :'مستعد لبدء مشروعك القادم؟ تواصل معنا اليوم للحصول على عرض أسعار مخصص واستشارة خبراء.'
              }
            </p>

            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {currentLanguage === 'en' ? 'Phone' : 'الهاتف'}
                  </div>
                  <div className="text-text-secondary">+966 50 123 4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Mail" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {currentLanguage === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </div>
                  <div className="text-text-secondary">info@mayardistributions.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {currentLanguage === 'en' ? 'Address' : 'العنوان'}
                  </div>
                  <div className="text-text-secondary">
                    {currentLanguage === 'en' ?'King Fahd Road, Riyadh, Saudi Arabia' :'طريق الملك فهد، الرياض، المملكة العربية السعودية'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              variant="default"
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white mb-8"
            >
              <Icon name="MessageCircle" size={20} />
              <span className="ml-2 rtl:mr-2 rtl:ml-0">
                {currentLanguage === 'en' ? 'Chat on WhatsApp' : 'تحدث عبر واتساب'}
              </span>
            </Button>

            {/* Map */}
            <div className="bg-card border border-border rounded-lg overflow-hidden h-64">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Mayar Distributions Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=24.7136,46.6753&z=14&output=embed"
                className="border-0"
              />
            </div>
          </div>

          {/* Newsletter & Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-6">
              {currentLanguage === 'en' ? 'Stay Updated' : 'ابق على اطلاع'}
            </h3>
            <p className="text-text-secondary mb-6">
              {currentLanguage === 'en' ?'Subscribe to our newsletter for the latest products, offers, and business insights.' :'اشترك في نشرتنا الإخبارية للحصول على أحدث المنتجات والعروض ورؤى الأعمال.'
              }
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-6">
              <Input
                type="email"
                name="email"
                label={currentLanguage === 'en' ? 'Email Address' : 'عنوان البريد الإلكتروني'}
                placeholder={currentLanguage === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <Input
                type="tel"
                name="phone"
                label={currentLanguage === 'en' ? 'Phone Number (Optional)' : 'رقم الهاتف (اختياري)'}
                placeholder={currentLanguage === 'en' ? 'Enter your phone' : 'أدخل رقم هاتفك'}
                value={formData.phone}
                onChange={handleInputChange}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentLanguage === 'en' ? 'Message (Optional)' : 'الرسالة (اختياري)'}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={currentLanguage === 'en' ?'Tell us about your business needs...' :'أخبرنا عن احتياجات عملك...'
                  }
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                className="w-full"
              >
                {isSubmitting 
                  ? (currentLanguage === 'en' ? 'Subscribing...' : 'جاري الاشتراك...')
                  : (currentLanguage === 'en' ? 'Subscribe Now' : 'اشترك الآن')
                }
              </Button>

              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-success bg-success/10 p-3 rounded-md">
                  <Icon name="CheckCircle" size={20} />
                  <span className="text-sm">
                    {currentLanguage === 'en' ?'Thank you for subscribing! We\'ll be in touch soon.' :'شكراً لك على الاشتراك! سنتواصل معك قريباً.'
                    }
                  </span>
                </div>
              )}
            </form>

            {/* Business Hours */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground mb-4">
                {currentLanguage === 'en' ? 'Business Hours' : 'ساعات العمل'}
              </h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>{currentLanguage === 'en' ? 'Sunday - Thursday' : 'الأحد - الخميس'}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage === 'en' ? 'Friday' : 'الجمعة'}</span>
                  <span>2:00 PM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{currentLanguage === 'en' ? 'Saturday' : 'السبت'}</span>
                  <span>{currentLanguage === 'en' ? 'Closed' : 'مغلق'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;