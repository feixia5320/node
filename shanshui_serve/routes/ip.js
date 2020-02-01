var express = require('express');
var router = express.Router();
var Visits = require('../models/Visit');

function getTime(params) {
    let date = new Date().Format('yyyy/MM/dd');
    let timestamp = new Date(date).getTime();
    let obj = {
        date: date,
        timestamp: timestamp
    }
    return obj;
}

function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

function addVisit(req) {
    let timeObj = getTime();
    let ip = getClientIP(req);
    let condition = {
        date: timeObj.date
    }
    Visits.find(condition, function (err, doc) {
        if (err) {
            resErr(res, err);
        } else if (doc.length > 0) {
            //增加ip
            // if (!doc[0].iplist.includes(ip)) {
            Visits.update(condition, { $inc: { total: 1 }, $push: { iplist: ip } }, function (err1, doc1) {
                if (err1) {
                    resErr(res, err1);
                } else {
                }
            })
            // doc[0].iplist.push(ip);
            // doc.total++;
            // }
        } else {
            //新日期,新增数据
            Visits.update({ "date": timeObj.date }, {
                date: timeObj.date,
                timestamp: timeObj.timestamp,
                iplist: ip,
                total: 1,
            }, { "upsert": true }, function (err2, doc) {
                if (err2) {
                    resErr(res, err2);
                } else {
                }
            })
        }
    })

}

function resErr(res, err) {
    res.json({
        status: "1",
        msg: err.message,
        result: ''
    })
};

router.get("/getVisitNum", function (req, res, next) {
    let limit = 7;
    let skip = 0;
    //查数据，并分页处理
    let model = Visits.find().skip(skip).limit(limit);

    model.exec(function (err, doc) {
        if (err) {
            resErr(res, err);
        } else {
            let dateList = [];
            let countList = [];
            for (let i in doc) {
                dateList.push(doc[i].date);
                countList.push(doc[i].total);
            }
            res.json({
                status: '0',
                msg: '',
                result: {
                    dateList: dateList,
                    countList: countList
                }
            });
        }
    })
});
module.exports.iprouter = router;
module.exports.addVisit = addVisit;