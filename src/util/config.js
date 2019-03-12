import Qs from 'qs'

// const baseURL='http://129.204.205.30:8080'
const baseURL = '/api'
const objBase = {
    url: '/get',
    method: 'get',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'
    },
    transformRequest: [
        function (data) {
            data = Qs.stringify(data);
            return data;
        }
    ],
    paramsSerializer: function (params) {
        return Qs.stringify(params)
    },
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
}
const downExcel = {
    url: '/get',
    method: 'get',
    baseURL: baseURL,
    timeout: 5000,
    responseType: 'arraybuffer',
}

const objInfo = {
    url: '/get',
    method: 'get',
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    transformRequest: [
        function (data) {
            data = JSON.stringify(data);
            return data;
        }
    ],
    paramsSerializer: function (params) {
        return JSON.stringify(params)
    },
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
}

const config = {
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data;'
    }
};

export {
    baseURL,
    objBase,
    config,
    objInfo,
}