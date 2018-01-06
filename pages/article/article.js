// pages/article/article.js
import { Article } from 'article-model.js';
import { Model } from '../../utils/model.js';
var article = new Article();
var model = new Model();
var WxParse = require('../../wxParse/wxParse.js');

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
        // 弹窗
        model.showModel();

        var id = options.id;
        this._loadData(id);
    },

    _loadData: function (id) {
        var that = this;
        article.getArticleByID(id, (data) => {
            this.setData({
                article: {
                    title: data.title,
                    time: '最近更新于：' + data.update_time
                }
            });
            WxParse.wxParse('article.body', 'md', data.body, that, 5);
        }, (data) => {
            this.setData({
                article: {
                    title: '404 Not Found',
                    body: {
                        nodes: ''
                    },
                    time: '该页面没有找到：id=' + id
                }
            });
        });
    },
})