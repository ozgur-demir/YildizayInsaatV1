/**
 * Centralized API Configuration
 * 
 * This file provides a single source of truth for backend API URLs.
 * It automatically handles development vs production environments.
 */

// Get backend URL from environment variable or fallback to localhost in development
const getBackendUrl = () => {
  // Use environment variable if available
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  
  if (envUrl) {
    // Remove trailing slash if present
    return envUrl.replace(/\/$/, '');
  }
  
  // Fallback to localhost only in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8001';
  }
  
  // In production without env var, use relative URL (same domain)
  return '';
};

// Export the backend URL
export const backendUrl = getBackendUrl();

/**
 * Helper function to build full API endpoints
 * @param {string} path - API endpoint path (e.g., '/api/content/blogs')
 * @returns {string} - Full API URL
 * 
 * Usage:
 *   fetch(api('/api/content/blogs'))
 *   fetch(api('/api/contact/send'))
 */
export const api = (path) => {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // If backendUrl is empty (production relative), just return path
  if (!backendUrl) {
    return cleanPath;
  }
  
  // Combine backend URL with path
  return `${backendUrl}${cleanPath}`;
};

// Export default for convenience
export default {
  backendUrl,
  api
};
