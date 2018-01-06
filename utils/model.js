class Model {
    constructor() {
    }

    /**
     * 不允许弹窗
     */
    notAllowModel() {
        wx.setStorageSync('isShowModel', false);
    }

    /**
     * 允许弹窗
     */
    allowModel() {
        wx.setStorageSync('isShowModel', true);
    }

    /**
    * 显示弹窗
    */
    showModel() {
        var that = this;
        if (wx.getStorageSync('isShowModel')) {
            wx.showModal({
                title: '提示',
                content: '「六画」采用WxParse0.3插件解析文章内容，观看如有不适，请谅解',
                confirmText: "不再提醒",
                cancelText: "知道啦~",
                success: function (res) {
                    if (res.confirm) {
                        // 不再显示
                        that.notAllowModel();
                    }
                }
            });
        }
    }
}
export { Model };