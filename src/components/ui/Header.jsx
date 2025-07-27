import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import Button from './Button';
import LanguageToggle from './LanguageToggle';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

const Header = () => {
  const { t } = useTranslation();
  const { user, userProfile, signOut } = useAuth();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const navItems = [
    { key: 'home', path: '/', label: t('nav.home') },
    { key: 'shop', path: '/product-catalog', label: t('nav.shop') },
    { key: 'services', path: '/services', label: t('nav.services') },
    { key: 'about', path: '/about', label: t('nav.about') },
    { key: 'contact', path: '/contact', label: t('nav.contact') }
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-teal-600">
                {isRTL ? 'توزيعات ميّار' : 'Mayar Distributions'}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageToggle />
              
              {/* Cart */}
              <Link
                to="/shopping-cart"
                className="p-2 text-gray-700 hover:text-teal-600 transition-colors"
                aria-label={t('nav.cart')}
              >
                <ShoppingCart size={20} />
              </Link>

              {/* User Authentication */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-teal-600">
                    <User size={20} />
                    <span className="hidden sm:block text-sm">
                      {userProfile?.full_name || user.email}
                    </span>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/user-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    {t('nav.login')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    {t('nav.register')}
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-teal-600"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Header;