'use client'

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // Get CSRF token if available
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken
        }
        config.headers['X-Requested-With'] = 'XMLHttpRequest'

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // Reload page to redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)


const AuthProvider = () => { }

export { AuthProvider }