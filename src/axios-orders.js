import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-c21fb-default-rtdb.firebaseio.com/'
});

export default instance;