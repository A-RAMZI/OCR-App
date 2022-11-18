import axios from 'axios';
const baseUrl = 'http://192.168.1.2:8000/';

export default axios.create({
    baseURL:baseUrl, 
        headers: { 'Content-Type': 'multipart/form-data' }
});