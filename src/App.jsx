// src/App.jsx
import React, { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded page components
const Home             = lazy(() => import('./pages/Home'));
const Products         = lazy(() => import('./pages/Products'));
const Contact          = lazy(() => import('./pages/Contact'));
const RegistrationForm = lazy(() => import('./pages/Registration'));
const LoginForm        = lazy(() => import('./pages/LoginForm'));

// Lazy-loaded Navbar
const MyNavbar = lazy(() => import('./components/Navbar'));

function App() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <BrowserRouter>
          {/* Navbar always visible */}
          <Suspense fallback={<div>Loading navbar...</div>}>
            <MyNavbar />
          </Suspense>

          {/* Route-based code-splitting */}
          <Suspense fallback={<div>Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute redirectTo="/login" />}>  
                <Route path="/products" element={<Products />} />
              </Route>

              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;
