import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const imageApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

export const imageService = {
  fetchImages: async (params = {}) => {
    try {
      const response = await imageApiClient.get('/images', { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      console.warn('Backend server on port 4000 is unreachable:', err.message);
      return [];
    }
  },

  getImage: async (id) => {
    try {
      const response = await imageApiClient.get(`/images/${id}`);
      return response.data;
    } catch (err) {
      console.warn(`Failed to fetch image ${id}:`, err.message);
      return null;
    }
  },

  createImage: async (formData) => {
    try {
      const response = await imageApiClient.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        throw new Error('Backend server on port 4000 is not running. Please run "npm run server" or restart dev server.');
      }
      throw err;
    }
  },

  createMultipleImages: async (formData) => {
    try {
      const response = await imageApiClient.post('/images/upload-multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        throw new Error('Backend server on port 4000 is not running. Please run "npm run server" or restart dev server.');
      }
      throw err;
    }
  },

  updateImage: async (id, payload) => {
    try {
      const response = await imageApiClient.put(`/images/${id}`, payload);
      return response.data;
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        throw new Error('Backend server on port 4000 is not running.');
      }
      throw err;
    }
  },

  deleteImage: async (id) => {
    try {
      const response = await imageApiClient.delete(`/images/${id}`);
      return response.data;
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        throw new Error('Backend server on port 4000 is not running.');
      }
      throw err;
    }
  },

  deleteBulkImages: async (ids = []) => {
    try {
      const response = await imageApiClient.post('/images/delete-bulk', { ids });
      return response.data;
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || !err.response) {
        throw new Error('Backend server on port 4000 is not running.');
      }
      throw err;
    }
  }
};

export const formatBytes = (bytes) => {
  if (!bytes || isNaN(bytes)) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / 1024 ** index;
  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

export const formatDate = (value) => {
  if (!value) return 'Unknown';
  try {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return value;
  }
};
