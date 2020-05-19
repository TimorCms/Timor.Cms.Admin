import axios from "axios";
import router from '../../router';
import { notification } from 'ant-design-vue';
import { loginService } from '../services'

export default {
    install(Vue) {
        Vue.prototype.$http = httpClient;
    }
}

var httpClient = (function () {

    let request = function (url, method, params, body, headers, config) {
        return new Promise((resolver, reject) => {
            if (url.startsWith('/api')) {
                url = `https://localhost:5001${url}`;
            }

            var token = loginService.getToken();

            axios.request({
                url: url,
                method: method,
                params: params,
                headers: {
                    Authorization: token,
                    ContentType: "application/json",
                    ...headers,
                },
                data: body,
                ...config
            }).then(result => {
                resolver(result.data);
            })
                .catch(reason => {
                    let errorReason = { errorMessage: "请检查服务器连接是否正常!", errorDetail: "未从服务器获得任何数据，请检查API服务是否正常！" };
                    if (reason.response) {
                        if (reason.response.date) {
                            errorReason = reason.response.data;
                        }

                        if (reason.response.status === 401) {
                            loginService.logout();
                            router.push('/login');
                            reject(errorReason);
                        }
                    }

                    notification.warn({
                        message: errorReason.errorMessage,
                        description: errorReason.errorDetail
                    });
                    reject(errorReason);
                });
        })
    };

    return {
        get(url, params = {}, headers = {}) {
            this.requsetCont + 1;
            return request(url, 'get', params, null, headers, null);
        },

        post(url, requestContent, headers = {}) {
            return request(url, 'post', null, requestContent, headers, null);
        },

        put(url, requestContent, headers = {}) {
            return request(url, 'put', null, requestContent, headers, null);
        },

        delete(url, params, headers = {}) {
            return request(url, 'delete', params, null, headers, null);
        }
    }
}());