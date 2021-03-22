import axios from 'axios';
const myaxios = axios.create({
    baseURL: 'http://localhost:8080/user/',
    timeout: 3000
});
myaxios.interceptors.request.use(req => {
    if(req.url.includes('view')) {
        const token =  window.localStorage.getItem('token');
        req.headers.token = token;
    }
    return req;
})
myaxios.interceptors.response.use(res => {
    return res.data;
}, error => {
    console.log('err',error)
    return Promise.reject(error);
})
export default myaxios;