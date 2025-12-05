// lib/axios.ts
import axios from 'axios';
import keycloak from '@/lib/keycloak';

const apiKeycloak = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiKeycloak.interceptors.request.use(
  (config) => {
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh on 401
apiKeycloak.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && keycloak.authenticated) {
      try {
        await keycloak.updateToken(30);
        error.config.headers.Authorization = `Bearer ${keycloak.token}`;
        return apiKeycloak.request(error.config);
      } catch {
        keycloak.login();
      }
    }
    return Promise.reject(error);
  }
);

export default apiKeycloak;