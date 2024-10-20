"use client"
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router=useRouter()
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data.user); // Assuming the user object is returned
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/register', { email, password });
      setUser(response.data.user); 
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
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
