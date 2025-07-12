// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { axiosInst } from '../redux/actions/productAction';

// 1) Create the context
export const AuthContext = createContext();

// 2) Provider component
export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [token, setToken]   = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // On mount, validate token and fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      if (token) {
        try {
          const res = await axiosInst.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
        } catch (err) {
          console.error('AuthContext: Failed to fetch user', err);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    }
    fetchProfile();
  }, [token]);

  // 3) Login helper
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    axiosInst.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  // 4) Logout helper
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // While validating existing token, don't render children
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
