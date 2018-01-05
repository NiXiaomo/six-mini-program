import { Base } from '../../utils/base.js';

class Link extends Base {
    constructor() {
        super();
    }

    // 获取所有友链
    getAllLinks(callback) {
        var params = {
            url: 'category/all',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(params);
    }
}

export { Link };