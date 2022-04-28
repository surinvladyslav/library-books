import axios from 'axios';

const token = localStorage.getItem('accessToken');

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=_boundary`,
        Authorization: `Bearer ${token}`
    }
})

instance.interceptors.response.use(function (response) {
    console.log(response);
    return response;
}, async function (error) {
    console.log(error);

    // const res = await instance.get(`/admin/refresh`)
    // localStorage.setItem('accessToken', res.data.accessToken);
    return Promise.reject(error);
});

export default instance;