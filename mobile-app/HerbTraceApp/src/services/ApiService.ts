// Configuration for different environments using Expo environment variables
const API_ENDPOINTS = {
  development: process.env.EXPO_PUBLIC_API_DEV_URL || 'http://192.168.40.183:8001',
  production: process.env.EXPO_PUBLIC_API_PROD_URL || 'https://your-railway-url.railway.app',
};

// Automatically detect environment
const API_BASE_URL = __DEV__ ? API_ENDPOINTS.development : API_ENDPOINTS.production;

// Timeout configurations from environment
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '10000');
const CONNECTION_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_CONNECTION_TIMEOUT || '5000');

export class ApiService {
  static async getPackageDetails(packageId: string) {
    try {
      console.log(`🔗 Attempting to fetch from: ${API_BASE_URL}/get_package/${packageId}`);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), API_TIMEOUT);
      });
      
      // Create the fetch promise
      const fetchPromise = fetch(`${API_BASE_URL}/get_package/${packageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      console.log(`📡 Response status: ${response.status}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Successfully fetched package data');
      return data;
    } catch (error) {
      const err = error as Error;
      console.error('❌ API Error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
        url: `${API_BASE_URL}/get_package/${packageId}`
      });
      
      if (err.message === 'Request timeout') {
        throw new Error('Request timed out. Please check your connection and try again.');
      } else if (err.name === 'TypeError' && err.message.includes('Network request failed')) {
        throw new Error(`Network error: Cannot connect to server at ${API_BASE_URL}. Make sure the backend is running.`);
      }
      
      throw new Error('Failed to fetch package details. Please check your connection and try again.');
    }
  }

  static async testConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT);
      
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}