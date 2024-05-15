import axios from 'axios';
import {store} from '../store/store.ts';


const Api = axios.create({
    baseURL: 'https://ap-react.azurewebsites.net',
    headers: {
        "Content-Type": 'application/json'
    }
})

//Add token to all requests

Api.interceptors.request.use(config => {
    if (store.getState().app.user?.token) {
        config.headers.Authorization = store.getState().app.user?.token;
    }

    return config;
})


export default Api;
