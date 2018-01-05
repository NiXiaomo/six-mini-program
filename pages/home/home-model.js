import { Base } from '../../utils/base.js';

class Home extends Base {
    constructor() {
        super();
        this._storageKeyName = 'articles';
    };

    // 获取文章
    getArticleData(pageIndex, pageSize, sCallback, eCallback) {
        var params = {
            url: 'article',
            data: {
                page: pageIndex,
                size: pageSize
            },
            sCallback: function (res) {
                sCallback && sCallback(res.data);
            },
            eCallback: function (res) {
                eCallback && eCallback(res);
            }
        };
        this.request(params);
    };

    /**
     * 保存/更新本地缓存
     */
    execSetStorageSync(data) {
        wx.setStorageSync(this._storageKeyName, data);
    }
}

export { Home };