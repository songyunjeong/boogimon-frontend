import axios from 'axios';

const boogi = axios.create({
  baseURL: 'http://localhost:8080',
});

export default boogi;
