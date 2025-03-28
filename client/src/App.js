import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './theme/theme';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Main Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import SubscribersPage from './pages/admin/SubscribersPage';
import SetupPage from './pages/admin/SetupPage';
import OrdersPage from './pages/admin/OrdersPage';
import ReportsPage from './pages/admin/ReportsPage';

// Protected route component
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <Router>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Main Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/order-history" element={<OrderHistoryPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />

                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminHomePage />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route 
                  path="/admin/subscribers" 
                  element={
                    <ProtectedAdminRoute>
                      <SubscribersPage />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route
                  path="/admin/setup"
                  element={
                    <ProtectedAdminRoute>
                      <SetupPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedAdminRoute>
                      <OrdersPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/reports"
                  element={
                    <ProtectedAdminRoute>
                      <ReportsPage />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </Router>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;