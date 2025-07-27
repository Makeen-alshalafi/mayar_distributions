import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep, currentLanguage }) => {
  const steps = [
    {
      id: 1,
      label: { en: 'Shipping', ar: 'الشحن' },
      icon: 'Truck'
    },
    {
      id: 2,
      label: { en: 'Payment', ar: 'الدفع' },
      icon: 'CreditCard'
    },
    {
      id: 3,
      label: { en: 'Review', ar: 'المراجعة' },
      icon: 'CheckCircle'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-smooth ${
                currentStep >= step.id
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-background border-border text-text-secondary'
              }`}>
                {currentStep > step.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${
                currentStep >= step.id ? 'text-primary' : 'text-text-secondary'
              }`}>
                {step.label[currentLanguage]}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                currentStep > step.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;