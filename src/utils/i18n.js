import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.shop": "Shop",
      "nav.services": "Services",
      "nav.about": "About Us",
      "nav.contact": "Contact",
      "nav.cart": "Cart",
      "nav.profile": "Profile",
      "nav.login": "Login",
      "nav.register": "Register",
      "nav.logout": "Logout",
      
      // Hero Section
      "hero.title": "Mayar Distributions",
      "hero.subtitle": "Your trusted partner for distributions, custom gifts, and thermal printing solutions",
      "hero.cta": "Explore Products",
      "hero.secondary_cta": "Contact Us",
      
      // Services
      "services.title": "Our Services",
      "services.distributions.title": "Distributions",
      "services.distributions.desc": "Wholesale and retail of branded items",
      "services.gifts.title": "Custom Gifts",
      "services.gifts.desc": "Personalized mugs, keychains, baskets, and corporate giveaways",
      "services.printing.title": "Thermal Printing",
      "services.printing.desc": "Labels, receipts, and barcode printing services",
      
      // Products
      "products.title": "Featured Products",
      "products.view_all": "View All Products",
      "products.add_to_cart": "Add to Cart",
      "products.customize": "Customize",
      "products.out_of_stock": "Out of Stock",
      "products.price": "Price",
      "products.category": "Category",
      
      // Cart
      "cart.title": "Shopping Cart",
      "cart.empty": "Your cart is empty",
      "cart.item": "Item",
      "cart.quantity": "Quantity", 
      "cart.price": "Price",
      "cart.total": "Total",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Shipping",
      "cart.tax": "Tax",
      "cart.checkout": "Proceed to Checkout",
      "cart.continue_shopping": "Continue Shopping",
      "cart.remove": "Remove",
      "cart.update": "Update",
      
      // Checkout
      "checkout.title": "Checkout",
      "checkout.shipping_info": "Shipping Information",
      "checkout.payment_info": "Payment Information",
      "checkout.order_summary": "Order Summary",
      "checkout.place_order": "Place Order",
      "checkout.processing": "Processing...",
      
      // Forms
      "form.name": "Name",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.address": "Address",
      "form.city": "City",
      "form.country": "Country",
      "form.message": "Message",
      "form.submit": "Submit",
      "form.required": "This field is required",
      
      // Auth
      "auth.login": "Login",
      "auth.register": "Register",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.full_name": "Full Name",
      "auth.forgot_password": "Forgot Password?",
      "auth.remember_me": "Remember me",
      "auth.already_account": "Already have an account?",
      "auth.no_account": "Don\'t have an account?",
      "auth.sign_in": "Sign In",
      "auth.sign_up": "Sign Up",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "Error",
      "common.success": "Success",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "common.edit": "Edit",
      "common.delete": "Delete",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.sort": "Sort",
      "common.language": "Language",
      
      // Footer
      "footer.company": "Mayar Distributions",
      "footer.description": "Your trusted partner for quality products and services",
      "footer.quick_links": "Quick Links",
      "footer.contact_info": "Contact Information",
      "footer.follow_us": "Follow Us",
      "footer.rights": "All rights reserved"
    }
  },
  ar: {
    translation: {
      // Navigation
      "nav.home": "الرئيسية",
      "nav.shop": "المتجر",
      "nav.services": "الخدمات",
      "nav.about": "من نحن",
      "nav.contact": "اتصل بنا",
      "nav.cart": "السلة",
      "nav.profile": "الملف الشخصي",
      "nav.login": "تسجيل الدخول",
      "nav.register": "إنشاء حساب",
      "nav.logout": "تسجيل الخروج",
      
      // Hero Section
      "hero.title": "توزيعات ميّار",
      "hero.subtitle": "شريكك الموثوق للتوزيعات والهدايا المخصصة وحلول الطباعة الحرارية",
      "hero.cta": "استكشف المنتجات",
      "hero.secondary_cta": "اتصل بنا",
      
      // Services
      "services.title": "خدماتنا",
      "services.distributions.title": "التوزيعات",
      "services.distributions.desc": "بيع بالجملة والتجزئة للمنتجات ذات العلامات التجارية",
      "services.gifts.title": "الهدايا المخصصة",
      "services.gifts.desc": "أكواب وسلاسل مفاتيح وسلال مخصصة وهدايا الشركات",
      "services.printing.title": "الطباعة الحرارية",
      "services.printing.desc": "خدمات طباعة الملصقات والإيصالات والباركود",
      
      // Products
      "products.title": "المنتجات المميزة",
      "products.view_all": "عرض جميع المنتجات",
      "products.add_to_cart": "إضافة للسلة",
      "products.customize": "تخصيص",
      "products.out_of_stock": "نفد من المخزون",
      "products.price": "السعر",
      "products.category": "الفئة",
      
      // Cart
      "cart.title": "سلة التسوق",
      "cart.empty": "سلتك فارغة",
      "cart.item": "المنتج",
      "cart.quantity": "الكمية",
      "cart.price": "السعر",
      "cart.total": "المجموع",
      "cart.subtotal": "المجموع الفرعي",
      "cart.shipping": "الشحن",
      "cart.tax": "الضريبة",
      "cart.checkout": "إتمام الشراء",
      "cart.continue_shopping": "متابعة التسوق",
      "cart.remove": "إزالة",
      "cart.update": "تحديث",
      
      // Checkout
      "checkout.title": "إتمام الطلب",
      "checkout.shipping_info": "معلومات الشحن",
      "checkout.payment_info": "معلومات الدفع",
      "checkout.order_summary": "ملخص الطلب",
      "checkout.place_order": "تأكيد الطلب",
      "checkout.processing": "جاري المعالجة...",
      
      // Forms
      "form.name": "الاسم",
      "form.email": "البريد الإلكتروني",
      "form.phone": "الهاتف",
      "form.address": "العنوان",
      "form.city": "المدينة",
      "form.country": "البلد",
      "form.message": "الرسالة",
      "form.submit": "إرسال",
      "form.required": "هذا الحقل مطلوب",
      
      // Auth
      "auth.login": "تسجيل الدخول",
      "auth.register": "إنشاء حساب",
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.full_name": "الاسم الكامل",
      "auth.forgot_password": "نسيت كلمة المرور؟",
      "auth.remember_me": "تذكرني",
      "auth.already_account": "لديك حساب بالفعل؟",
      "auth.no_account": "ليس لديك حساب؟",
      "auth.sign_in": "دخول",
      "auth.sign_up": "إنشاء حساب",
      
      // Common
      "common.loading": "جاري التحميل...",
      "common.error": "خطأ",
      "common.success": "نجح",
      "common.cancel": "إلغاء",
      "common.save": "حفظ",
      "common.edit": "تعديل",
      "common.delete": "حذف",
      "common.search": "بحث",
      "common.filter": "تصفية",
      "common.sort": "ترتيب",
      "common.language": "اللغة",
      
      // Footer
      "footer.company": "توزيعات ميّار",
      "footer.description": "شريكك الموثوق للمنتجات والخدمات عالية الجودة",
      "footer.quick_links": "روابط سريعة",
      "footer.contact_info": "معلومات الاتصال",
      "footer.follow_us": "تابعنا",
      "footer.rights": "جميع الحقوق محفوظة"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;