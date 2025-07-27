import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CustomerReviews = ({ currentLanguage }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 'rev-001',
      customerName: 'Ahmed Al-Rashid',
      rating: 5,
      date: new Date('2025-01-20'),
      language: 'ar',
      verified: true,
      title: {
        en: 'Excellent Quality and Service',
        ar: 'جودة وخدمة ممتازة'
      },
      content: {
        en: 'Outstanding product quality and fast delivery. The customization options exceeded my expectations. Highly recommended for business needs.',
        ar: 'جودة منتج ممتازة وتسليم سريع. خيارات التخصيص فاقت توقعاتي. أنصح به بشدة لاحتياجات الأعمال.'
      },
      helpful: 23,
      images: [
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop'
      ]
    },
    {
      id: 'rev-002',
      customerName: 'Sarah Johnson',
      rating: 4,
      date: new Date('2025-01-18'),
      language: 'en',
      verified: true,
      title: {
        en: 'Great Product, Minor Delivery Delay',
        ar: 'منتج رائع، تأخير طفيف في التسليم'
      },
      content: {
        en: 'The product quality is excellent and exactly what I ordered. There was a slight delay in delivery, but customer service kept me informed throughout.',
        ar: 'جودة المنتج ممتازة وبالضبط ما طلبته. كان هناك تأخير طفيف في التسليم، لكن خدمة العملاء أبقتني على اطلاع طوال الوقت.'
      },
      helpful: 18,
      images: []
    },
    {
      id: 'rev-003',
      customerName: 'Mohammed Hassan',
      rating: 5,
      date: new Date('2025-01-15'),
      language: 'ar',
      verified: true,
      title: {
        en: 'Perfect for Corporate Gifts',
        ar: 'مثالي لهدايا الشركات'
      },
      content: {
        en: 'Used this for our company\'s annual gifts. The customization was perfect and the quality impressed all our clients. Will definitely order again.',
        ar: 'استخدمت هذا لهدايا شركتنا السنوية. التخصيص كان مثالياً والجودة أعجبت جميع عملائنا. سأطلب مرة أخرى بالتأكيد.'
      },
      helpful: 31,
      images: [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop'
      ]
    },
    {
      id: 'rev-004',
      customerName: 'Lisa Chen',
      rating: 4,
      date: new Date('2025-01-12'),
      language: 'en',
      verified: false,
      title: {
        en: 'Good Value for Money',
        ar: 'قيمة جيدة مقابل المال'
      },
      content: {
        en: 'Decent quality product at a reasonable price. The customization process was straightforward. Would recommend for small businesses.',
        ar: 'منتج بجودة لائقة بسعر معقول. عملية التخصيص كانت مباشرة. أنصح به للشركات الصغيرة.'
      },
      helpful: 12,
      images: []
    },
    {
      id: 'rev-005',
      customerName: 'Omar Al-Zahra',
      rating: 3,
      date: new Date('2025-01-10'),
      language: 'ar',
      verified: true,
      title: {
        en: 'Average Experience',
        ar: 'تجربة متوسطة'
      },
      content: {
        en: 'The product is okay but not exceptional. Delivery was on time but packaging could be improved. Customer service was responsive.',
        ar: 'المنتج جيد لكن ليس استثنائياً. التسليم كان في الوقت المحدد لكن التغليف يمكن تحسينه. خدمة العملاء كانت متجاوبة.'
      },
      helpful: 8,
      images: []
    }
  ];

  const ratingOptions = [
    { value: 'all', label: currentLanguage === 'en' ? 'All Ratings' : 'جميع التقييمات' },
    { value: '5', label: currentLanguage === 'en' ? '5 Stars' : '5 نجوم' },
    { value: '4', label: currentLanguage === 'en' ? '4 Stars' : '4 نجوم' },
    { value: '3', label: currentLanguage === 'en' ? '3 Stars' : '3 نجوم' },
    { value: '2', label: currentLanguage === 'en' ? '2 Stars' : 'نجمتان' },
    { value: '1', label: currentLanguage === 'en' ? '1 Star' : 'نجمة واحدة' }
  ];

  const languageOptions = [
    { value: 'all', label: currentLanguage === 'en' ? 'All Languages' : 'جميع اللغات' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' }
  ];

  const sortOptions = [
    { value: 'newest', label: currentLanguage === 'en' ? 'Newest First' : 'الأحدث أولاً' },
    { value: 'oldest', label: currentLanguage === 'en' ? 'Oldest First' : 'الأقدم أولاً' },
    { value: 'highest', label: currentLanguage === 'en' ? 'Highest Rating' : 'أعلى تقييم' },
    { value: 'lowest', label: currentLanguage === 'en' ? 'Lowest Rating' : 'أقل تقييم' },
    { value: 'helpful', label: currentLanguage === 'en' ? 'Most Helpful' : 'الأكثر فائدة' }
  ];

  const filteredReviews = reviews.filter(review => {
    const ratingMatch = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const languageMatch = selectedLanguage === 'all' || review.language === selectedLanguage;
    return ratingMatch && languageMatch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-surface rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-4xl font-bold text-foreground">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={i < Math.floor(averageRating) ? 'text-accent fill-current' : 'text-border'}
                  />
                ))}
              </div>
            </div>
            <p className="text-text-secondary">
              {currentLanguage === 'en' 
                ? `Based on ${reviews.length} reviews`
                : `بناءً على ${reviews.length} تقييم`
              }
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="text-sm text-text-secondary w-8">
                  {rating} <Icon name="Star" size={12} className="inline text-accent" />
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-text-secondary w-8 text-right rtl:text-left">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          options={ratingOptions}
          value={selectedRating}
          onChange={setSelectedRating}
          placeholder={currentLanguage === 'en' ? 'Filter by rating' : 'تصفية حسب التقييم'}
        />
        <Select
          options={languageOptions}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          placeholder={currentLanguage === 'en' ? 'Filter by language' : 'تصفية حسب اللغة'}
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder={currentLanguage === 'en' ? 'Sort by' : 'ترتيب حسب'}
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    {review.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <h4 className="font-medium text-foreground">{review.customerName}</h4>
                    {review.verified && (
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span className="text-xs text-success">
                          {currentLanguage === 'en' ? 'Verified' : 'موثق'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < review.rating ? 'text-accent fill-current' : 'text-border'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  review.language === 'ar' ?'bg-primary/10 text-primary' :'bg-secondary/10 text-secondary'
                }`}>
                  {review.language === 'ar' ? 'العربية' : 'English'}
                </span>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <h5 className="font-medium text-foreground">
                {review.title[currentLanguage]}
              </h5>
              <p className="text-text-secondary leading-relaxed">
                {review.content[currentLanguage]}
              </p>

              {/* Review Images */}
              {review.images.length > 0 && (
                <div className="flex space-x-2 rtl:space-x-reverse">
                  {review.images.map((image, index) => (
                    <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <button className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    <Icon name="ThumbsUp" size={14} />
                    <span>
                      {currentLanguage === 'en' ? 'Helpful' : 'مفيد'} ({review.helpful})
                    </span>
                  </button>
                  <button className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    <Icon name="MessageCircle" size={14} />
                    <span>{currentLanguage === 'en' ? 'Reply' : 'رد'}</span>
                  </button>
                </div>
                <button className="text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                  <Icon name="Flag" size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {sortedReviews.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            {currentLanguage === 'en' ? 'Load More Reviews' : 'تحميل المزيد من التقييمات'}
          </Button>
        </div>
      )}

      {/* No Reviews */}
      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'No Reviews Found' : 'لم يتم العثور على تقييمات'}
          </h3>
          <p className="text-text-secondary">
            {currentLanguage === 'en' ?'Try adjusting your filters to see more reviews.' :'جرب تعديل المرشحات لرؤية المزيد من التقييمات.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;