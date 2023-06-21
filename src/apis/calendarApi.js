import axios from 'axios';
import { getEnvVariables } from '../helpers';

const {VITE_API_URL} = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: Configurar interceptors

export default calendarApi;