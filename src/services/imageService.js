import axios from 'axios';
import { IMAGE_MANAGEMENT_CATALOG } from '../data/images';

const STORAGE_KEY = 'image-management-demo-images';

const sampleImages = (IMAGE_MANAGEMENT_CATALOG || []).map((image, index) => ({
  id: `img-${image.id || index + 1}`,
  title: image.title || `Image ${index + 1}`,
  altText: image.tag || image.category || 'Industrial image',
  category: image.category || 'Gallery',
  description: `Gallery asset for ${image.category || 'industrial products'}.`,
  tags: [image.tag || 'gallery', image.category?.toLowerCase() || 'image'],
  status: index % 2 === 0 ? 'Active' : 'Inactive',
  uploadedAt: '2026-07-20T10:00:00.000Z',
  fileSize: 1200000 + index * 120000,
  fileName: `${(image.title || 'gallery').toLowerCase().replace(/\s+/g, '-')}.webp`,
  mimeType: 'image/webp',
  url: image.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
}));

const readStore = () => {
  if (typeof window === 'undefined') return sampleImages;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleImages));
    return sampleImages;
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : sampleImages;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleImages));
    return sampleImages;
  }
};

const writeStore = (images) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }
  return images;
};

const mockAdapter = async (config) => {
  const method = (config.method || 'get').toLowerCase();
  const url = config.url || '/';

  if (url === '/images') {
    if (method === 'get') {
      return {
        data: readStore(),
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      };
    }

    if (method === 'post') {
      const payload = JSON.parse(config.data || '{}');
      const image = {
        ...payload,
        id: payload.id || `img-${Date.now()}`,
        uploadedAt: payload.uploadedAt || new Date().toISOString(),
        fileSize: payload.fileSize || 0,
        fileName: payload.fileName || 'uploaded-image.webp'
      };
      const next = [image, ...readStore()];
      writeStore(next);
      return {
        data: image,
        status: 201,
        statusText: 'Created',
        headers: {},
        config
      };
    }
  }

  if (url.startsWith('/images/')) {
    const id = url.split('/').pop();
    const list = readStore();
    const current = list.find((item) => item.id === id);

    if (!current) {
      return {
        data: {},
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config
      };
    }

    if (method === 'get') {
      return {
        data: current,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      };
    }

    if (method === 'put') {
      const payload = JSON.parse(config.data || '{}');
      const updated = { ...current, ...payload, id };
      const next = list.map((item) => (item.id === id ? updated : item));
      writeStore(next);
      return {
        data: updated,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      };
    }

    if (method === 'delete') {
      const next = list.filter((item) => item.id !== id);
      writeStore(next);
      return {
        data: { deleted: true, id },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      };
    }
  }

  return {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  };
};

export const imageApiClient = axios.create({
  baseURL: '/api',
  adapter: mockAdapter
});

export const imageService = {
  fetchImages: async () => {
    const response = await imageApiClient.get('/images');
    return response.data;
  },
  getImage: async (id) => {
    const response = await imageApiClient.get(`/images/${id}`);
    return response.data;
  },
  createImage: async (payload) => {
    const response = await imageApiClient.post('/images', JSON.stringify(payload));
    return response.data;
  },
  updateImage: async (id, payload) => {
    const response = await imageApiClient.put(`/images/${id}`, JSON.stringify(payload));
    return response.data;
  },
  deleteImage: async (id) => {
    const response = await imageApiClient.delete(`/images/${id}`);
    return response.data;
  }
};

export const formatBytes = (bytes) => {
  if (!bytes) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / 1024 ** index;
  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

export const formatDate = (value) => {
  if (!value) return 'Unknown';
  try {
    return new Date(value).toLocaleDateString('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return value;
  }
};
