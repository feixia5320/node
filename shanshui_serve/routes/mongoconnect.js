//1.引入 mongoose
const mongoose = require("mongoose");

//2.定义数据库的链接地址  37代表数据库的名字
const url = 'mongodb://127.0.0.1:27017/shanshui';  //这里是mongodb协议 MongoDB的端口号为27017

//3.mongoose.connect 方法来链接 返回的是promise对象
mongoose
  .connect(url, { useNewUrlParser: true })  //connect参数2是个对象 为可选参数 当出现useNewUrlParser警告时 再来设置
  .then(() => {
    console.log("数据库链接成功");
  })
  .catch(err => {
    console.log("数据库链接失败", err.message);
  });

// 4. 暴露已经链接了数据库的 mongoose 对象
module.exports = mongoose;

/*
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
*/