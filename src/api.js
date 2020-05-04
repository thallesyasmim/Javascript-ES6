// Para configuração do axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com', // Todas as nossas requisições vão partir dessa URL base
})

export default api;