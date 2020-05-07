import axios from "axios";

export default (function () {
    let request = function (url, method, params, body, headers, config) {
        return new Promise((resolver, reject) => {
            axios.request({
                    url: url,
                    method: method,
                    params: params,
                    headers: {
                        Authorization: "xxx",
                        ContentType: "application/json",
                        ...headers,
                    },
                    data: body,
                    ...config
                }).then(result => {
                    resolver(result.data);
                })
                .catch(reason=>{
                    reject(reason.response.data);
                });
        })
    };

    return {
        get(url, params, headers = null) {
            this.requsetCont + 1;
            return request(url, 'get', params, null, headers, null);
        },

        post(url, requestContent, headers = null) {
            return request(url, 'post', null, requestContent, headers, null);
        },

        put(url, requestContent, headers = null) {
            return request(url, 'put', null, requestContent, headers, null);
        },

        delete(url, params, headers = null) {
            return request(url, 'delete', params, null, headers, null);
        }
    }
}());