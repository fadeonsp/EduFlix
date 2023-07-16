// Base URL https://api.themoviedb.org/3/

// URL API movie/now_playing?api_key=12bf3d6b84310de06271df895025beed&linguage=pt-BR

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api