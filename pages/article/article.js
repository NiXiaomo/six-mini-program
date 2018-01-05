// pages/article/article.js
var parser = require('../../utils/Parser.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        this._loadData(id);
    },

    _loadData: function (id) {
        var articles = wx.getStorageSync('articles');
        // var body = parser.makeHtml(articles[0].body);
        // console.log(body);
        var index = this._search(articles, id);
        // 封装数据
        if (index < 0) {
            var article = {
                title: '404 Not Found',
                body: '',
                time: '该页面没有找到：id=' + id
            };
        } else {
            var article = {
                title: articles[index].title,
                body: articles[index].body,
                time: '最近更新于：' + articles[index].update_time
            };
        }
        this.setData({
            article: article
        });
    },

    /**
     * 查找文章的index
     */
    _search: function (articles, id) {
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id == id) {
                return i;
            }
        }

        // 查找失败
        return -1;
    }
})