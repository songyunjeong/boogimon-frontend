import axios from 'axios';

const boogi = axios.create({
  baseURL: 'http://118.67.128.218:8080',
});

export default boogi;
