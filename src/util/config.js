import Qs from 'qs'

// const baseURL='http://localhost:8080'
const baseURL='/api'
const objBase = {
    url: '/get',
    method: 'get', 
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'
    },
    transformRequest: [
        function(data) {
            data = Qs.stringify(data);
            return data;
        }
    ],
    paramsSerializer: function(params) {
        return Qs.stringify(params)
    },
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
}
 const config = {
        // baseURL: '/api',
        baseURL: 'http://127.0.0.1:8080',
        headers: {
          "Content-Type": "multipart/form-data" 
        },
        withCredentials: true,
      };

export {
    baseURL,
    objBase,
    config,
}