var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var News = require('../models/news');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/shanshui');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});
function resErr(res, err) {
  res.json({
    status: "1",
    msg: err.message,
    result: ''
  })
};
//获取新闻列表
router.get("/getnews", function (req, res, next) {
  var userId = '1001';
  News.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      resErr(res, err);
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.news
        });
      }
    }
  });
});

//新增新闻
router.post("/addNews", function (req, res, next) {
  var userId = '1001';
  let title = req.body.title;
  let url = req.body.url;
  let date = req.body.date;

  News.findOne({ userId: userId }, function (err, userDoc) {
    if (err) {
      resErr(res, err);
    } else {
      if (userDoc) {
        let exit = false;
        for (let i = 0; i < userDoc.news.length; i++) {
          if (userDoc.news[i].title == title) {
            exit = true;
            break;
          }
        }
        if (exit) {
          res.json({
            status: "1",
            msg: "已存在"
          })
        } else {
          let obj = {
            title: title,
            url: url,
            date: date
          }
          userDoc.news.push(obj);
          userDoc.save(function (err2, doc2) {
            if (err2) {
              resErr(res, err2);
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        }
      }
    }
  })
});

// 删除新闻
router.get("/deleteNews", function (req, res, next) {
  var userId = '1001';
  let title = req.param("title");
  News.findOne({ userId: userId }, function (err, userDoc) {
    if (err) {
      resErr(res, err);
    } else {
      if (userDoc) {
        for (let i = 0; i < userDoc.news.length; i++) {
          if (userDoc.news[i].title == title) {
            userDoc.news.splice(i, 1);
            break;
          }
        }
        userDoc.save(function (err2, doc2) {
          if (err2) {
            resErr(res, err2);
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    }
  })
});

module.exports = router;
