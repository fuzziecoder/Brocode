import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import DashboardHome from "pages/dashboard-home";
import MessagingCenter from "pages/messaging-center";
import UserProfileManagement from "pages/user-profile-management";
import EventManagement from "pages/event-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/messaging-center" element={<MessagingCenter />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;