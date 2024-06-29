import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'applicayion/json',
  },
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
};
