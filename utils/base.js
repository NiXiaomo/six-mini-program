import { Config } from 'config.js';

class Base {
    constructor() {
        this.baseRequestUrl = Config.restUrl;
    }

    /**
     * 请求
     *
     * 当noRefetch为true，不做未授权重试机制
     */
    request(params, noRefetch) {
        wx.showLoading({
            title: '数据加载中',
            mask: true
        });

        var that = this;
        var url = this.baseRequestUrl + params.url;
        if (!params.type) {
            params.type = 'GET';
        }
        wx.request({
            url: url,
            data: params.data,
            header: {
                'content-type': 'application/json',
                // 'token': wx.getStorageSync('token')
            },
            method: params.type,
            success: function (res) {
                // 获取Http状态码
                var code = res.statusCode.toString();
                var startChar = code.charAt(0);
                // 2开头表示正常
                if (startChar == '2') {
                    params.sCallback && params.sCallback(res.data);
                } else {
                    // 401表示token过期或无效
                    // if (code == '401') {
                    // }
                    params.eCallback && params.eCallback(res.data);
                }
            },
            fail: function (res) {
                // console.log(res);
                params.eCallback && params.eCallback(res);
            },
            complete: function (res) {
                wx.hideLoading();
            }
        })
    }

    /**
     * 获得元素上的绑定的值
     */
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    }
}

export { Base };