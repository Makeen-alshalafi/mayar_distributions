import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OrderHistory = ({ currentLanguage }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: 'ORD-2025-001',
      date: '2025-01-20',
      status: 'delivered',
      statusLabel: { en: 'Delivered', ar: 'تم التسليم' },
      total: 'SAR 450.00',
      items: [
        {
          id: 1,
          name: { en: 'Custom Business Cards', ar: 'بطاقات عمل مخصصة' },
          image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
          quantity: 500,
          price: 'SAR 200.00',
          customization: { en: 'Logo + Contact Info', ar: 'شعار + معلومات الاتصال' }
        },
        {
          id: 2,
          name: { en: 'Branded Mugs', ar: 'أكواب ذات علامة تجارية' },
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
          quantity: 25,
          price: 'SAR 250.00',
          customization: { en: 'Company Logo', ar: 'شعار الشركة' }
        }
      ],
      trackingNumber: 'TRK123456789',
      shippingAddress: {
        en: '123 Business District, Riyadh, Saudi Arabia',
        ar: '123 الحي التجاري، الرياض، المملكة العربية السعودية'
      }
    },
    {
      id: 'ORD-2025-002',
      date: '2025-01-18',
      status: 'shipped',
      statusLabel: { en: 'Shipped', ar: 'تم الشحن' },
      total: 'SAR 125.00',
      items: [
        {
          id: 3,
          name: { en: 'Thermal Labels', ar: 'ملصقات حرارية' },
          image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
          quantity: 1000,
          price: 'SAR 125.00',
          customization: { en: 'Barcode + Product Info', ar: 'باركود + معلومات المنتج' }
        }
      ],
      trackingNumber: 'TRK987654321',
      shippingAddress: {
        en: '456 Industrial Area, Jeddah, Saudi Arabia',
        ar: '456 المنطقة الصناعية، جدة، المملكة العربية السعودية'
      }
    },
    {
      id: 'ORD-2025-003',
      date: '2025-01-15',
      status: 'processing',
      statusLabel: { en: 'Processing', ar: 'قيد المعالجة' },
      total: 'SAR 780.00',
      items: [
        {
          id: 4,
          name: { en: 'Corporate Gift Set', ar: 'مجموعة هدايا الشركات' },
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
          quantity: 50,
          price: 'SAR 780.00',
          customization: { en: 'Engraved Logo + Gift Box', ar: 'شعار محفور + صندوق هدايا' }
        }
      ],
      trackingNumber: null,
      shippingAddress: {
        en: '789 Corporate Tower, Dammam, Saudi Arabia',
        ar: '789 برج الشركات، الدمام، المملكة العربية السعودية'
      }
    }
  ];

  const statusOptions = [
    { value: 'all', label: { en: 'All Orders', ar: 'جميع الطلبات' } },
    { value: 'processing', label: { en: 'Processing', ar: 'قيد المعالجة' } },
    { value: 'shipped', label: { en: 'Shipped', ar: 'تم الشحن' } },
    { value: 'delivered', label: { en: 'Delivered', ar: 'تم التسليم' } }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10 border-success/20';
      case 'shipped':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'processing':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          {currentLanguage === 'en' ? 'Order History' : 'تاريخ الطلبات'}
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={filterStatus === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(option.value)}
            >
              {option.label[currentLanguage]}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-border">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {order.id}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {currentLanguage === 'en' ? 'Ordered on' : 'تم الطلب في'} {order.date}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {order.statusLabel[currentLanguage]}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">
                    {order.total}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  >
                    <Icon name={selectedOrder === order.id ? "ChevronUp" : "ChevronDown"} size={16} />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0">
                      {currentLanguage === 'en' ? 'Details' : 'التفاصيل'}
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Details */}
            {selectedOrder === order.id && (
              <div className="p-6 bg-muted/30">
                {/* Items */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-foreground">
                    {currentLanguage === 'en' ? 'Items Ordered' : 'العناصر المطلوبة'}
                  </h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-lg">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name[currentLanguage]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-foreground truncate">
                          {item.name[currentLanguage]}
                        </h5>
                        <p className="text-sm text-text-secondary">
                          {currentLanguage === 'en' ? 'Quantity:' : 'الكمية:'} {item.quantity}
                        </p>
                        <p className="text-sm text-primary">
                          {currentLanguage === 'en' ? 'Customization:' : 'التخصيص:'} {item.customization[currentLanguage]}
                        </p>
                      </div>
                      <div className="text-right rtl:text-left">
                        <p className="font-semibold text-foreground">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      {currentLanguage === 'en' ? 'Shipping Address' : 'عنوان الشحن'}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {order.shippingAddress[currentLanguage]}
                    </p>
                  </div>
                  
                  {order.trackingNumber && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        {currentLanguage === 'en' ? 'Tracking Number' : 'رقم التتبع'}
                      </h4>
                      <p className="font-mono text-sm text-primary">
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                  {order.trackingNumber && (
                    <Button variant="outline" size="sm">
                      <Icon name="Truck" size={16} />
                      <span className="ml-1 rtl:mr-1 rtl:ml-0">
                        {currentLanguage === 'en' ? 'Track Package' : 'تتبع الطرد'}
                      </span>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <Icon name="Download" size={16} />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0">
                      {currentLanguage === 'en' ? 'Download Invoice' : 'تحميل الفاتورة'}
                    </span>
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Icon name="RotateCcw" size={16} />
                    <span className="ml-1 rtl:mr-1 rtl:ml-0">
                      {currentLanguage === 'en' ? 'Reorder' : 'إعادة الطلب'}
                    </span>
                  </Button>
                  
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      <Icon name="MessageSquare" size={16} />
                      <span className="ml-1 rtl:mr-1 rtl:ml-0">
                        {currentLanguage === 'en' ? 'Leave Review' : 'اترك تقييماً'}
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'No orders found' : 'لم يتم العثور على طلبات'}
          </h3>
          <p className="text-text-secondary mb-6">
            {currentLanguage === 'en' ?'You haven\'t placed any orders yet. Start shopping to see your order history here.' :'لم تقم بوضع أي طلبات بعد. ابدأ التسوق لرؤية تاريخ طلباتك هنا.'}
          </p>
          <Button variant="default">
            {currentLanguage === 'en' ? 'Start Shopping' : 'ابدأ التسوق'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;