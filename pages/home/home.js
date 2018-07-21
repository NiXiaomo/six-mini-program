// home.js
import { Home } from 'home-model.js';
var home = new Home();

Page({
    data: {
        pageIndex: 1,   // 分页获取文章
        pageSize: 5,    // 每页获取数量
        isLoadedAll: false, // 是否已经全部加载完毕
        articleArr: []  // 文章信息
    },

    onLoad: function () {
        this._getArticles();
    },

    // 获取文章
    _getArticles: function () {
        home.getArticleData(this.data.pageIndex, this.data.pageSize,
            (res) => {
                var data = res.data;
                // 加载完毕
                if (data && data.length > 0) {
                    // 因为data本身就是一个二维数组，所以不能直接push
                    this.data.articleArr.push.apply(this.data.articleArr, data);
                    this.setData({
                        articleArr: this.data.articleArr
                    });
                    // 小于每页数量表示已加载完毕
                    if (data.length < this.data.pageSize) {
                        this.data.isLoadedAll = true;
                    }
                } else {
                    this.data.isLoadedAll = true;
                }

				// 更新状态
				this.setData({
					isLoadedAll: this.data.isLoadedAll
				});
            },
            (res) => {
                // 如果加载失败，则页数回滚
                this.data.pageIndex--;
            });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.isLoadedAll) {
            this.data.pageIndex++;
            this._getArticles();
        }
    },
})
