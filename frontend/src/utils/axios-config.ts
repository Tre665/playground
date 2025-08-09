import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI || 'http://localhost:5000',
});

export default http;
