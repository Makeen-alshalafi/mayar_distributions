import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import DashboardSidebar from './components/DashboardSidebar';
import MobileDashboardNav from './components/MobileDashboardNav';
import DashboardOverview from './components/DashboardOverview';
import OrderHistory from './components/OrderHistory';
import WishlistSection from './components/WishlistSection';
import ProfileSettings from './components/ProfileSettings';
import SavedAddresses from './components/SavedAddresses';

const UserDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Set document direction based on language
    document.documentElement.setAttribute('dir', savedLanguage === 'ar' ? 'rtl' : 'ltr');
    
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    }
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview currentLanguage={currentLanguage} />;
      case 'orders':
        return <OrderHistory currentLanguage={currentLanguage} />;
      case 'wishlist':
        return <WishlistSection currentLanguage={currentLanguage} />;
      case 'profile':
        return <ProfileSettings currentLanguage={currentLanguage} />;
      case 'addresses':
        return <SavedAddresses currentLanguage={currentLanguage} />;
      default:
        return <DashboardOverview currentLanguage={currentLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Mobile Navigation */}
        <MobileDashboardNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          currentLanguage={currentLanguage}
        />

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <DashboardSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              currentLanguage={currentLanguage}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;