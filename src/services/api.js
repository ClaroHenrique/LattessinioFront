import axios from 'axios';

const api = axios.create({
    baseURL: 'https://lattessinio.herokuapp.com/api',
});


export default api;