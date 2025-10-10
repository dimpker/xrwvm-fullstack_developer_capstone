// API Configuration for Production and Development
// This file handles the backend URL for different environments

// In production (Vercel), use the Railway Django URL from environment variable
// In development, use localhost
const getBackendURL = () => {
  // Check if we're in production (Vercel deployment)
  if (process.env.NODE_ENV === 'production') {
    // Use the environment variable set in .env.production
    return process.env.REACT_APP_BACKEND_URL || window.location.origin;
  }
  // In development, use localhost
  return window.location.origin;
};

export const BACKEND_URL = getBackendURL();

// Helper function to build API URLs
export const buildAPIURL = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BACKEND_URL}${cleanPath}`;
};

export default BACKEND_URL;
