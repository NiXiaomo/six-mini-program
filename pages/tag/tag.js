// pages/tag/tag.js
import { Tag } from 'tag-model.js';
var tag = new Tag();

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
        this._loadData();
    },

    _loadData: function () {
        var that = this;
        tag.getAllTags((data) => {
            that.setData({
                tagArr: data
            });
        });
    }
})