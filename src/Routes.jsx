import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import ShoppingCart from "pages/shopping-cart";
import ProductCatalog from "pages/product-catalog";
import Checkout from "pages/checkout";
import ProductDetail from "pages/product-detail";
import UserDashboard from "pages/user-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;