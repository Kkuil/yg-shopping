import getFloor from '../../../../api/Data/Floor'
Component({
    lifetimes: {
        attached() {
            this.getFloorData()
        }
    },

    properties: {

    },

    data: {
        floorList: []
    },

    methods: {
        getFloorData() {
            getFloor.then(data => {
                this.setData({
                    floorList: data
                })
            })
            wx.hideLoading()
        }
    }
})
