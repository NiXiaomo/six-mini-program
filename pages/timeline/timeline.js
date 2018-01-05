// pages/timeline/timeline.js
import { Timeline } from 'timeline-model.js';
var timeline = new Timeline();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentMenuIndex: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._loadData();
    },

    _loadData: function () {
        var that = this;
        // 获取时间轴
        timeline.getTimeline((timelineData) => {
            that.setData({
                timelineArr: timelineData
            });

            // 默认获取第0个时间点的文章
            var month = timelineData[0].month;
            that.getArticlesByTime(month, (data) => {
                var dataObj = {
                    articles: data,
                    title: that._generateTitle(month)
                };
                // 绑定数据
                that.setData({
                    timelineInfoCurrent: dataObj,
                    timelineInfo0: dataObj,
                });
            });
        });
    },

    // 切换时间点
    changeTimeline: function (event) {
        var index = timeline.getDataSet(event, 'index');
        var time = timeline.getDataSet(event, 'time');

        this.setData({
            currentMenuIndex: index
        });

        // 如果数据是第一次请求
        if (!this.isLoadedData(index)) {
            var that = this;
            this.getArticlesByTime(time, (data) => {
                that.setData(that.getDataObjForBind(index, time, data));
            });
        } else {
            this.setData({
                timelineInfoCurrent: this.data['timelineInfo' + index]
            });
        }
    },

    // 是否已加载过该分类（禁止频繁请求）
    isLoadedData: function (index) {
        if (this.data['timelineInfo' + index]) {
            return true;
        }
        return false;
    },

    // 获取绑定界面的数据
    getDataObjForBind: function (index, time, data) {
        var obj = {},
            baseData = this.data.timelineArr[index];

        // 获取对应分类项的数据
        var dataobj = {
            articles: data,
            title: this._generateTitle(time)
        };
        obj['timelineInfo' + index] = dataobj;
        obj['timelineInfoCurrent'] = dataobj;
        return obj;
    },

    // 根据时间点获取文章
    getArticlesByTime: function (time, callback) {
        timeline.getArticlesByTime(time, (data) => {
            callback && callback(data);
        });
    },

    // 生成标题
    _generateTitle(month) {
        return month.substr(0, 4) + '年' + month.substr(4, 2) + '月';
    },
})