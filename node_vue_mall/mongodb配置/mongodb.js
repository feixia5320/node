{
    // 查询
    var Goods = require('../models/goods');
    //模型，mongoose.model('Good',produtSchema, 'goods');
    params = {
        salePrice: {
            $gt: priceGt,
            $lte: priceLte
        }
    }
    skip = 10;
    pageSize = 20;
    sort = -1; //1
    //查找价格区间内的数据，并分页处理
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({ 'salePrice': sort });
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })

    // 修改
    User.update({ "userId": userId, "cartList.productId": productId }, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked,
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            });
        }
    })
}