import { Base } from '../../utils/base.js';

class Article extends Base {
    constructor() {
        super();
        this._storageKeyName = 'article';
    }

    // 根据ID获取文章
    getArticleByID(id, sCallback, eCallback) {
        var params = {
            url: 'article/' + id,
            sCallback: function (data) {
                sCallback && sCallback(data);
            },
            eCallback: function (data) {
                eCallback && eCallback(data);
            }
        };
        this.request(params);
    }

    /**
     * 保存/更新本地缓存
     */
    execSetStorageSync(data) {
        wx.setStorageSync(this._storageKeyName + data.id, data);
    }
}

export { Article };