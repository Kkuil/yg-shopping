// pages/feedback/index.js
Page({

    data: {
        currentIndex: 0,
        problem_images: []
    },

    onLoad() {
        wx.hideLoading()
    },

    // 修改currentIndex
    handleIndex(e) {
        const { index } = e.currentTarget.dataset
        this.setData({
            currentIndex: index
        })
    },

    // 上传图片
    uploadImage() {
        wx.chooseMedia({
            camera: 'back',
            count: 3,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const { tempFiles } = res
                const problem_images = tempFiles.map(file => file.tempFilePath)
                this.setData({
                    problem_images
                })
            }
        })
    }
})