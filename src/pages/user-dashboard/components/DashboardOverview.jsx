import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardOverview = ({ currentLanguage }) => {
  const summaryCards = [
    {
      id: 'total-orders',
      title: { en: 'Total Orders', ar: 'إجمالي الطلبات' },
      value: '24',
      icon: 'Package',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'pending-orders',
      title: { en: 'Pending Orders', ar: 'الطلبات المعلقة' },
      value: '3',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'wishlist-items',
      title: { en: 'Wishlist Items', ar: 'عناصر قائمة الأمنيات' },
      value: '12',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'saved-addresses',
      title: { en: 'Saved Addresses', ar: 'العناوين المحفوظة' },
      value: '2',
      icon: 'MapPin',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-2025-001',
      date: '2025-01-20',
      items: 3,
      total: 'SAR 450.00',
      status: 'delivered',
      statusLabel: { en: 'Delivered', ar: 'تم التسليم' }
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-18',
      items: 1,
      total: 'SAR 125.00',
      status: 'shipped',
      statusLabel: { en: 'Shipped', ar: 'تم الشحن' }
    },
    {
      id: 'ORD-2025-003',
      date: '2025-01-15',
      items: 5,
      total: 'SAR 780.00',
      status: 'processing',
      statusLabel: { en: 'Processing', ar: 'قيد المعالجة' }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'shipped':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-heading font-bold mb-2">
          {currentLanguage === 'en' ? 'Welcome back, Ahmed!' : 'مرحباً بعودتك، أحمد!'}
        </h1>
        <p className="text-primary-foreground/80">
          {currentLanguage === 'en' ?'Manage your orders, track shipments, and explore new products.' :'إدارة طلباتك، تتبع الشحنات، واستكشاف منتجات جديدة.'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card) => (
          <div key={card.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon name={card.icon} size={24} className={card.color} />
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">
                {card.value}
              </span>
            </div>
            <h3 className="text-sm font-medium text-text-secondary">
              {card.title[currentLanguage]}
            </h3>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Recent Orders' : 'الطلبات الأخيرة'}
            </h2>
            <Button variant="outline" size="sm">
              {currentLanguage === 'en' ? 'View All' : 'عرض الكل'}
            </Button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-muted/50 transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {order.id}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.statusLabel[currentLanguage]}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-text-secondary">
                    <span>{order.date}</span>
                    <span>
                      {order.items} {currentLanguage === 'en' ? 'items' : 'عناصر'}
                    </span>
                    <span className="font-medium text-foreground">{order.total}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0">
                      {currentLanguage === 'en' ? 'View' : 'عرض'}
                    </span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="RotateCcw" size={16} />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0">
                      {currentLanguage === 'en' ? 'Reorder' : 'إعادة الطلب'}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="Package" size={32} className="text-primary mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">
            {currentLanguage === 'en' ? 'Track Orders' : 'تتبع الطلبات'}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {currentLanguage === 'en' ?'Monitor your order status and delivery updates' :'راقب حالة طلبك وتحديثات التسليم'}
          </p>
          <Button variant="outline" size="sm" fullWidth>
            {currentLanguage === 'en' ? 'Track Now' : 'تتبع الآن'}
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="Heart" size={32} className="text-error mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">
            {currentLanguage === 'en' ? 'Wishlist' : 'قائمة الأمنيات'}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {currentLanguage === 'en' ?'Save products for later and get price alerts' :'احفظ المنتجات لوقت لاحق واحصل على تنبيهات الأسعار'}
          </p>
          <Button variant="outline" size="sm" fullWidth>
            {currentLanguage === 'en' ? 'View Wishlist' : 'عرض قائمة الأمنيات'}
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="Headphones" size={32} className="text-success mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">
            {currentLanguage === 'en' ? 'Support' : 'الدعم'}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {currentLanguage === 'en' ?'Get help with orders, returns, and customizations' :'احصل على المساعدة في الطلبات والإرجاع والتخصيص'}
          </p>
          <Button variant="outline" size="sm" fullWidth>
            {currentLanguage === 'en' ? 'Contact Support' : 'اتصل بالدعم'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;