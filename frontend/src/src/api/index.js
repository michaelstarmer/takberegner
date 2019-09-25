import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'local' ? 'http://api.tak.local' : 'http://api.takberegner.mstarmer.no',
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;