// pages/link/link.js
import { Link } from 'link-model.js';
var link = new Link();

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
        link.getAllLinks((data) => {
            that.setData({
                linkArr: this._formatLinkData(data)
            });
        });
    },

    // 折叠
    kindToggle: function (e) {
        var id = e.currentTarget.id, linkArr = this.data.linkArr;
        for (var i = 0, len = linkArr.length; i < len; ++i) {
            if (linkArr[i].id == id) {
                linkArr[i].open = !linkArr[i].open
            } else {
                linkArr[i].open = false
            }
        }
        this.setData({
            linkArr: linkArr
        });
    },

    // 整理友链数据
    _formatLinkData(data) {
        var linkData = [];
        // id: 1, name: '汪~汪~汪~', open: false, links: [{},{},{}]
        for (let i = 0; i < data.length; i++) {
            // 初始化数据
            var obj = {
                id: data[i].id,
                name: data[i].name,
                open: false,
                links: []
            };
            // name: '瓜田庞下', intro: '理可顿悟,事须渐修', logo_url: ''
            let links = data[i].links;
            for (let j = 0; j < links.length; j++) {
                let logo_url = links[j].logo_url;
                if (!logo_url) {
                    logo_url = '../../imgs/icon/user@default.png';
                }
                // 封装数据
                obj.links.push({
                    name: links[j].name,
                    intro: links[j].intro,
                    logo_url: logo_url
                });
            }
            linkData.push(obj);
        }
        return linkData;
    }
})