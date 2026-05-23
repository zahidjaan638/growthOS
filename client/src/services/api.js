import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const calendarAPI = {
  getEvents: (params) => api.get('/calendar', { params }),
  createEvent: (data) => api.post('/calendar', data),
  updateEvent: (id, data) => api.put(`/calendar/${id}`, data),
  deleteEvent: (id) => api.delete(`/calendar/${id}`),
};

export const trendingAPI = {
  getTopics: (params) => api.get('/trending', { params }),
  getCategories: () => api.get('/trending/categories'),
};

export const scriptAPI = {
  generate: (data) => api.post('/scripts/generate', data),
};

export const hashtagAPI = {
  getHashtags: (params) => api.get('/hashtags', { params }),
  generateSEO: (data) => api.post('/hashtags/seo', data),
};

export const growthAPI = {
  getMetrics: (params) => api.get('/growth/metrics', { params }),
  getTopContent: (params) => api.get('/growth/top-content', { params }),
  getTrafficSources: () => api.get('/growth/traffic-sources'),
  getSummary: () => api.get('/growth/summary'),
};

export const trafficAPI = {
  getCTASuggestions: (params) => api.get('/traffic/cta', { params }),
  getBioLinkStrategy: () => api.get('/traffic/bio-link'),
  getLeadCaptureStrategy: () => api.get('/traffic/lead-capture'),
};

export default api;
