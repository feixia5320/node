var express = require('express');
var fs = require('fs');
var router = express.Router();
var multer = require('multer');//引入multer

var Visits = require('../models/Visit');
var Uploadfiles = require('../models/Uploadfile');
// var upload = multer({dest: '../uploads/'});//设置上传文件存储地址

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

/**
 * 文件上传
 */
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = '../uploads/';
createFolder(uploadFolder);
// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        let fileId = new Date().getTime() + '.' + file.originalname.split(".")[1];
        file.fileId = fileId;
        cb(null, fileId);
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
    var file = req.file;
    addFile(file.fileId, file.originalname, res)
    // res.setHeader('Access-Control-Allow-Origin', '*');
})
function addFile(fileId, fileName, res) {
    let date = new Date().Format('yyyy-MM-dd');
    Uploadfiles.update(
        { "fileId": fileId },
        {
            date: date,
            fileId: fileId,
            fileName: fileName
        }, { "upsert": true },
        function (err2, doc) {
            if (err2) {
                resErr(res, err2);
            } else {
                res.json({
                    status: "0",
                    msg: "suc"
                })
            }
        }
    )
}
/**
 * 文件下载
 */
router.get('/download', function (req, res, next) {
    let fileId = req.param("fileId");
    Uploadfiles.find(
        { "fileId": fileId },
        function (err, doc) {
            if (err) {
                resErr(res, err);
            } else {
                var path = '../uploads/' + fileId;
                try {
                    var size = fs.statSync(path).size;
                    let filename = encodeURIComponent(doc[0].fileName);
                    res.writeHead(200, {
                        'Content-Type': 'application/force-download',
                        'Content-Disposition': 'attachment; filename=' + filename,
                        'Content-Length': size
                    });
                    var f = fs.createReadStream(path);
                    f.pipe(res);
                } catch (error) {
                    res.json({
                        status: 1,
                        msg: error
                    })
                }
            }
        }
    )
});

router.get('/deleteFile', function (req, res, next) {
    let fileId = req.param("fileId");
    let path = "../uploads/" + fileId;
    fs.unlink(path, function (err) {
        if (err) {
            resErr(res, err);
        } else {
            Uploadfiles.remove({ fileId: fileId }, function (err2, doc) {
                if (err2) {
                    resErr(res, err2);
                } else {
                    res.json({
                        status: "0",
                        msg: "suc"
                    })
                }
            })
        }
    });
})

router.get("/getFilelist", function (req, res, next) {
    let curentPage = parseInt(req.param("curentPage"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = parseInt(req.param("sort"));
    let sortFeild = req.param("sortFeild");
    let skip = (curentPage - 1) * pageSize;
    let obj = {};
    obj[sortFeild] = sort;
    //查数据，并分页处理
    let model = Uploadfiles.find().sort(obj).skip(skip).limit(pageSize);

    model.exec(function (err, doc) {
        if (err) {
            resErr(res, err);
        } else {
            let list = doc;
            Uploadfiles.find().count().exec(function (err1, doc1) {
                if (err1) {
                    resErr(res, err1);
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        count: doc1,
                        list: list
                    });
                }
            })
        }
    })
});

module.exports.iprouter = router;
module.exports.addVisit = addVisit;