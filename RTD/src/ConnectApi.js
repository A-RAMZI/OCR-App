import axios from 'axios';
const baseUrl = 'http://api-ocr-mobile.ipconnex.com/';

export default axios.create({
    baseURL:baseUrl, 
        headers: { 'Content-Type': 'multipart/form-data' }
});