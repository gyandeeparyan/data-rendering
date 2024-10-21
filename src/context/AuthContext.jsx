"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift()); 
    }
    return null;
  };
  

  
  useEffect(() => {
    const emailFromCookie = getCookie('email'); 
    if (emailFromCookie) {
      setUser(emailFromCookie); 
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data.email); 
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/register', { email, password });
      setUser(response.data.email);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
      document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
