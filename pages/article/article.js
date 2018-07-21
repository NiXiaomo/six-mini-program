// pages/article/article.js
import { Article } from 'article-model.js';
// import { Model } from '../../utils/model.js';
var article = new Article();
// var model = new Model();
// 引入towxml库
var Towxml = require('../../towxml/main');     
var towxml = new Towxml();

Page({

    /**
     * 页面的初始数据
     */
    data: {
		title: '',
		time: '',
		article: {}	// article将用来存储towxml数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 弹窗
        // model.showModel();

        var id = options.id;
        this._loadData(id);
    },

    _loadData: function (id) {
        var that = this;
		article.getArticleByID(id, (data) => {
			// 将markdown内容转换为towxml数据
			let articleData = towxml.toJson(data.body, 'markdown');
			// 设置文档显示主题，默认'light'
			// articleData.theme = 'dark';
			// 设置数据
			this.setData({
				title: data.title,
				time: '最近更新于：' + data.update_time,
				article: articleData
            });
        }, (data) => {
            this.setData({
				title: '404 Not Found',
				body: {
					nodes: ''
				},
				time: '该页面没有找到：id=' + id
            });
        });
    },
})