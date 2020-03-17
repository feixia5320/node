var express = require('express');
var router = express.Router();
var News = require('../models/news');

function resErr(res, err) {
  res.json({
    status: "1",
    msg: err.message,
    result: ''
  })
};
/*
  //elemMatch
  News.find(
    // 对 `'news'` 的过滤条件不需要写在查询条件中
    {
      "userId": "1002",
    }, {
    'news': {
      '$elemMatch': {
        'title': 'icon'
        }
      }
    }, {},
    function (error, doc) {
      res.json({
        status: '0',
        msg: doc[0].news
      });
    }
  )
  */
//获取新闻列表
router.get("/getnews", function (req, res, next) {
  let curentPage = parseInt(req.param("curentPage"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = parseInt(req.param("sort"));
  let sortFeild = req.param("sortFeild");
  let skip = (curentPage - 1) * pageSize;
  let obj = {};
  obj[sortFeild] = sort;
  //查数据，并分页处理
  let goodsModel = News.find().sort(obj).skip(skip).limit(pageSize);

  goodsModel.exec(function (err, doc) {
    if (err) {
      resErr(res, err);
    } else {
      let list = doc;
      News.find().count().exec(function (err1, doc1) {
        if (err1) {
          resErr(res, err1);
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              count: doc1,
              list: list
            }
          });
        }
      })
    }
  })
});
/*
//方法2
let newDat = new News({
  title: title,
  date: date,
  url: url
})
newDat.save(function (err2) {
  if (err2) {
    resErr(res, err2);
  } else {
    res.json({
      status: "0",
      msg: "suc"
    })
  }
})
*/
router.post("/addNews", function (req, res, next) {
  let title = req.body.title;
  let url = req.body.url;
  let date = req.body.date;
  News.find({ "title": title, }, function (err, doc) {
    if (err) {
      resErr(res, err);
    } else if (doc.length > 0) {
      res.json({
        status: "1",
        msg: "已存在"
      })
    } else {
      //新增数据
      News.update({ "title": title }, {
        title: title,
        date: date,
        url: url
      }, { "upsert": true }, function (err2, doc) {
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
  })
})

// 删除新闻
router.get("/deleteNews", function (req, res, next) {
  let title = req.param("title");
  News.deleteOne({ title: title }, function (err, doc) {
    if (err) {
      resErr(res, err);
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
});

module.exports = router;
