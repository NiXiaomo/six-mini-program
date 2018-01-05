import { Base } from '../../utils/base.js';

class Timeline extends Base {
    constructor() {
        super();
    }

    // 获取时间轴
    getTimeline(callback) {
        var params = {
            url: 'article/months',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(params);
    }

    // 根据时间点获取文章
    getArticlesByTime(time, callback) {
        var params = {
            url: 'article/by_month?month=' + time,
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(params);
    }
}

export { Timeline };