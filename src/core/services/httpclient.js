import axios from "axios";

export default (function () {
    let request = function (url, method, params, body, headers, config) {
        return new Promise((resolver, reject) => {
            if (url.startsWith('/api')) {
                url = `https://localhost:5001${url}`;
            }

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
                .catch(reason => {
                    let errorReason = { errorMessage: "请检查服务器连接是否正常!", errorDetail: "未从服务器获得任何数据，请检查API服务是否正常！" };
                    if (reason.response && reason.response.data) {
                        errorReason = reason.response.data;
                    }

                    reject(errorReason);
                });
        })
    };

    return {
        get(url, params = null, headers = null) {
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