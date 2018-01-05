import { Base } from '../../utils/base.js';

class Tag extends Base {
    constructor() {
        super();
    }

    // 获取所有标签
    getAllTags(callback) {
        var params = {
            url: 'tag',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(params);
    }
}

export { Tag };