import axios from 'axios';

//const baseUrl = 'http://192.168.1.2:8000/';
const baseUrl = 'https://ocr-api.ipconnex.com/';

export default axios.create({
    baseURL:baseUrl, 
    headers: { 'Content-Type': 'multipart/form-data' }, 
});
