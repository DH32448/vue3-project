import axios from "axios";
import qs from "qs";
import store from "../store/index.js";
import router from "../router/index.js";

const BASE_URL = 'http://localhost:9000';
let token = '';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        'Authorization': token
    }
});

instance.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('token');
        console.log("每次请求前读取 Token=" + token);
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        console.log("成功 拦截1:" + response.status);
        return response;
    },
    error => {
        console.log("error 拦截1:" + error.response.status);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log("error 拦截2:" + error.response.status);
                    store.commit("show", "账号或密码有误....");
                    localStorage.setItem('token', "");
                    router.push('/login'); // 跳转登录
                    break;
                case 403: // 禁止访问, 没有权限
                    store.commit("show", "禁止访问, 没有权限-403....");
                    break;
                default:
                    store.commit("show", "操作失败 ...");
            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);

export const $get = (url, obj) => {
    return instance.get(url, { params: obj });
};

export const $postx = (url, obj) => {
    let kv = qs.stringify(obj);
    console.log("postx=" + kv);
    return instance.post(url, kv, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
        }
    });
};

export const $postj = (url, obj) => {
    console.log("postj=" + obj);
    return instance.post(url, obj, {
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        }
    });
};

export const $postf = (url, formData) => {
    console.log("postf=" + formData);
    return instance.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
