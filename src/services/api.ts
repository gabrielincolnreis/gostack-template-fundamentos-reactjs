import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // http://192.168.0.110:3333
});

export default api;
