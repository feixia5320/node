/**
 * 创建http服务器
 * 
 * querystring.parse("a=1&b=2");
 */
{
   var http = require('http');
   var querystring = require('querystring');
   const urlLib = require('url');

   http.createServer(function (req, res) {
      //GET
      var obj = urlLib.parse(req.url, true);
      var url = obj.pathname;
      const GET = obj.query;

      //POST
      var str = '';
      req.on('data', function (data) {
         str += data;
      });
      // 获取请求体
      req.on('end', function () {
         const POST = querystring.parse(str);

         //文件请求
         var file_name = './www' + url;
         fs.readFile(file_name, function (err, data) {
            if (err) {
               res.write('404');
            } else {
               res.write(data);
            }
            res.end();
         });
      });


      // 发送 HTTP 头部 
      // HTTP 状态值: 200 : OK
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.setHeader('Content-Type', 'text/plain');
      res.removeHeader('Content-Type');
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('hello');

      // HTTP 状态值: 200 : OK
      // 内容类型: text/plain
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      // 发送响应数据 "Hello World"
      res.end('Hello World\n');

      // 发送文件
      let rs = fs.createReadStream('test.mp4');
      rs.pipe(res);
   }).listen(8888, '127.0.0.1');

   // 终端打印如下信息
   console.log('Server running at http://127.0.0.1:8888/');

   /**
    * 创建http服务器
    */
   let http = require('http');
   let server = http.createServer();
   //request事件处理函数
   server.on('request', function (req, res) {
      res.end("saa");
   })
   server.listen(8080, '127.0.0.1');



   /**
    * http服务器
    */
   var http = require('http');
   var fs = require('fs');
   var url = require('url');

   // 创建服务器
   http.createServer(function (request, response) {
      // 解析请求，包括文件名
      var pathname = url.parse(request.url).pathname;

      // 输出请求的文件名
      console.log("Request for " + pathname + " received.");

      // 从文件系统中读取请求的文件内容
      fs.readFile(pathname.substr(1), function (err, data) {
         if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/html
            response.writeHead(404, { 'Content-Type': 'text/html' });
         } else {
            // HTTP 状态码: 200 : OK
            // Content Type: text/html
            response.writeHead(200, { 'Content-Type': 'text/html' });

            // 响应文件内容
            // data为buffer类型，转为为string
            response.write(data.toString());
         }
         //  发送响应数据
         response.end();
      });
   }).listen(8080);

   /**
    * http客户端
    */

   var http = require('http');

   // 用于请求的选项
   var options = {
      host: 'localhost',
      port: '8080',
      path: '/index.html',
      method: 'POST'
   };

   // 处理响应的回调函数
   var callback = function (response) {
      console.log('STATUS', response.statusCode);
      console.log('HEADERS', response.headers);
      response.setEncoding('utf8')
      // 不断更新数据
      var body = '';
      response.on('data', function (data) {
         body += data;
      });
      response.on('end', function () {
         // 数据接收完成
         console.log(body);
      });

      // 使用输出流
      let write = fs.createWriteStream('tset.txt');
      response.pipe(write);
   }
   // 向服务端发送请求
   var request = http.request(options, callback);
   // 发送数据
   request.write('stst');
   request.write('another');
   request.end();

   //方法2：处理响应的回调函数
   request.on('response', function (response) {

   })

   /**
    * http客户端2
    */
   var http = require('http');
   var util = require('util');

   http.get("http://g.360.cn/index.html", function (res) {
      let data = '';
      res.on('data', function (val) {
         console.log(val)
         data += val;
      })
      res.on('end', function () {
         let result = JSON.parse(data);
         console.log('result:' + util.inspect(result));
      })
   })

}

/**
 * 引入 events 模块
 */
{
   var events = require('events');
   // 创建 eventEmitter 对象
   var emitter = new events.EventEmitter();

   emitter.on('someEvent', function (arg1, arg2) {
      console.log('listener1', arg1, arg2);
   });
   emitter.on('someEvent', function (arg1, arg2) {
      console.log('listener2', arg1, arg2);
   });
   emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
   let a = emitter.listenerCount('someEvent');
   console.log("listenerCount", a);

   /**
    * event
    */
   let events = require('events');
   var emitter = new events.EventEmitter();
   // 所有监听函数
   emitter.listeners(event);
   // 取消该事件
   emitter.removeAllListeners(event);
   // 取消所有
   emitter.removeAllListeners();
   // 触发事件
   emitter.emit('event', arg1, arg2);
   // 获取指定对象的某个事件的数量
   EventEmitter.listenerCount(emitter, event);
}

/**
 * buffer
 */
{
   // 创建一个长度为 10、且用 0 填充的 Buffer。
   const buf1 = Buffer.alloc(10);

   // 创建一个长度为 10、且用 0x1 填充的 Buffer。 
   const buf2 = Buffer.alloc(10, 1);

   // 创建一个长度为 10、且未初始化的 Buffer。
   // 这个方法比调用 Buffer.alloc() 更快，
   // 但返回的 Buffer 实例可能包含旧数据，
   // 因此需要使用 fill() 或 write() 重写。
   const buf3 = Buffer.allocUnsafe(10);

   // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
   const buf4 = Buffer.from([1, 2, 3]);

   // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
   const buf5 = Buffer.from('tést');

   // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
   const buf6 = Buffer.from('tést', 'latin1');

}
/**
 * 流操作===读入流
 */
{

   var fs = require("fs");

   // 阻塞代码实例
   var data = fs.readFileSync('input.txt');
   console.log(data.toString());

   // 非阻塞 回调函数
   fs.readFile('input.txt', { flag: 'r+', encoding: 'utf8' }, function (err, data) {
      if (err) return console.error(err);
      // data为buffer对象，使用tostring转为string
      console.log(data.toString());
   });
   console.log("程序执行结束!");

   /**
    * 
    */
   let fs = require("fs");
   let data = '';

   // 创建可读流
   let readerStream = fs.createReadStream('input.txt', { start: 3, end: 9 });

   // 设置编码为 utf8。
   readerStream.setEncoding('UTF8');

   // 处理流事件 --> data, end, and error
   readerStream.on('data', function (chunk) {
      data += chunk;
   });
   readerStream.on('end', function () {
      console.log(data);
   });
   readerStream.on('close', function () {
      console.log('close');
   });
   readerStream.on('error', function (err) {
      console.log(err.stack);
   });
   console.log("程序执行完毕");

   /**
    * 写入流
    */
   let fs = require("fs");
   let data = '菜鸟教程官网地址：www.runoob.com';

   // 创建一个可以写入的流，写入到文件 output.txt 中
   let writerStream = fs.createWriteStream('output.txt');

   // 使用 utf8 编码写入数据
   writerStream.write(data, 'UTF8');

   // 标记文件末尾
   writerStream.end();

   // 处理流事件 --> data, end, and error
   writerStream.on('finish', function () {
      console.log("写入完成。");
   });

   writerStream.on('error', function (err) {
      console.log(err.stack);
   });
   console.log("程序执行完毕");

   /**
    * 读入流+写入流
    */
   let fs = require('fs');
   let file = fs.createReadStream('./test.txt');
   let out = fs.createWriteStream('./new.txt');

   file.on('data', function (val) {
      out.write(val)
   });

   out.on('open', function (params) {
      console.log("open");
   });

   file.on('end', function (params) {
      out.end('end', function () {
         console.log("写入完成");
      })
   });

   /**
    * 管道流
    */
   var fs = require("fs");
   let file = fs.createReadStream('./test.txt');
   let out = fs.createWriteStream('./new.txt');
   file.pipe(out, { end: false });
   file.on('end', function () {
      out.end('111');
   })

   /**
    * 管道流，压缩
    */
   var fs = require("fs");
   var zlib = require('zlib');

   // 压缩 input.txt 文件为 input.txt.gz
   fs.createReadStream('input.txt')
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream('input.txt.gz'));

   console.log("文件压缩完成。");
   /**
    * 解压
    */
   var fs = require("fs");
   var zlib = require('zlib');

   // 解压 input.txt.gz 文件为 input.txt
   fs.createReadStream('input.txt.gz')
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream('input.txt'));

   console.log("文件解压完成。");
}
/**
 * domain
 */
{
   var EventEmitter = require("events").EventEmitter;
   var domain = require("domain");

   var emitter1 = new EventEmitter();

   // 创建域
   var domain1 = domain.create();

   // 显式绑定
   domain1.add(emitter1);

   emitter1.on('error', function (err) {
      console.log("监听器处理此错误 (" + err.message + ")");
   });

   emitter1.emit('error', new Error('通过监听器来处理'));

   var domain2 = domain.create();

   // 隐式绑定
   domain2.run(function () {
      var emitter2 = new EventEmitter();
      emitter2.emit('error', new Error('通过 domain2 处理'));
   });
}

/**
 * express 文件
 */
{
   /**
    * get
    * post
    * static
    */
   var express = require('express');
   // npm install express-static --save
   var expressStatic = require('express-static');
   var app = express();
   // npm install body-parser --save
   var bodyParser = require('body-parser');

   // 创建 application/x-www-form-urlencoded 编码解析
   var urlencodedParser = bodyParser.urlencoded({ extended: false, limit: 2 * 1024 * 1024 })
   app.use(urlencodedParser);

   // 设置静态资源路径
   app.use('/public', express.static('public'));
   // 或
   app.use(expressStatic(__dirname + '/public'));

   //调用前台html
   app.get('/index.html', function (req, res) {
      res.sendFile(__dirname + "/" + "index.html");
   })
   // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
   app.get('/ab*cd', function (req, res) {
      console.log("/ab*cd GET 请求");
      res.send('正则匹配');
   })

   // 解析get参数
   app.get('/process_get', function (req, res) {
      // 输出 JSON 格式
      var response = {
         "first_name": req.query.first_name,
         "last_name": req.query.last_name
      };
      console.log(response);
      res.end(JSON.stringify(response));
   })
   // 解析post参数
   app.post('/process_post', urlencodedParser, function (req, res) {
      // 输出 JSON 格式
      var response = {
         "first_name": req.body.first_name,
         "last_name": req.body.last_name
      };
      console.log(response);
      res.end(JSON.stringify(response));
   })

   var server = app.listen(8081, function () {
      var host = server.address().address
      var port = server.address().port
      console.log("应用实例，访问地址为 http://%s:%s", host, port)
   })

   /**
    * 文件上传
    */
   var express = require('express');
   var app = express();
   var fs = require("fs");

   var bodyParser = require('body-parser');
   var multer = require('multer');

   app.use('/public', express.static('public'));
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(multer({ dest: '/tmp/' }).array('image'));

   // 调用html
   app.get('/index.html', function (req, res) {
      res.sendFile(__dirname + "/" + "index.html");
   })

   app.post('/file_upload', function (req, res) {

      console.log(req.files[0]);  // 上传的文件信息

      var des_file = __dirname + "/" + req.files[0].originalname;
      fs.readFile(req.files[0].path, function (err, data) {

         fs.writeFile(des_file, data, { mode: 0666, flag: "a" }, function (err) {
            if (err) {
               console.log(err);
            } else {
               response = {
                  message: 'File uploaded successfully',
                  filename: req.files[0].originalname
               };
            }
            console.log(response);
            res.end(JSON.stringify(response));
         });
      });
   })

   var server = app.listen(8081, function () {
      var host = server.address().address
      var port = server.address().port
      console.log("应用实例，访问地址为 http://%s:%s", host, port)
   })

   /**
    * cookie
    * session
    */
   {
      // express_cookie.js 文件
      var express = require('express')
      var cookieParser = require('cookie-parser'); //npm i cookie-parser
      var util = require('util');

      var app = express()
      app.use(cookieParser());
      // 解析签名
      app.use(cookieParser('wesdfw4r34tf'));

      app.get('/', function (req, res) {
         // 解析cookie
         console.log("Cookies: " + util.inspect(req.cookies));
         console.log('签名cookie：', req.signedCookies)
         console.log('无签名cookie：', req.cookies);

         // 发送cookies
         res.cookie('user', 'blue', { path: '/aaa', maxAge: 30 * 24 * 3600 * 1000 });
         // 签名cookie
         req.secret = 'wesdfw4r34tf';
         res.cookie('user', 'blue', { signed: true });

         // 删除cookie
         res.clearCookie(名字);

         res.send('Hello GET');
      })
      app.listen(8081)

      /**
       * session
       */
      const express = require('express');
      const cookieParser = require('cookie-parser');    //npm i cookie-parser
      const cookieSession = require('cookie-session'); //npm i cookie-session

      var server = express();
      //cookie
      var arr = [];
      for (var i = 0; i < 1000; i++) {
         arr.push('sig_' + Math.random());
      }

      server.use(cookieParser());
      server.use(cookieSession({
         name: 'sess',
         keys: arr,
         maxAge: 2 * 3600 * 1000
      }));

      server.use('/', function (req, res) {
         // 读取、设置
         if (req.session['count'] == null) {
            req.session['count'] = 1;
         } else {
            req.session['count']++;
         }

         console.log(req.session['count']);
         // 删除
         delete res.session['xxx'];
         res.send('ok');
      });

      server.listen(8080);
   }
   /**
    * 数据解析汇总
    * get、post、cookie、session、file
    */
   {
      const express = require('express');
      const static = require('express-static');
      const cookieParser = require('cookie-parser');
      const cookieSession = require('cookie-session');
      const bodyParser = require('body-parser');
      const multer = require('multer');
      const consolidate = require('consolidate');

      var server = express();

      server.listen(8080);

      //1.解析cookie
      server.use(cookieParser('sdfasl43kjoifguokn4lkhoifo4k3'));

      //2.使用session
      var arr = [];
      for (var i = 0; i < 1000; i++) {
         arr.push('keys_' + Math.random());
      }
      server.use(cookieSession({ name: 'zns_sess_id', keys: arr, maxAge: 20 * 3600 * 1000 }));

      //3.post数据 urlencoded
      server.use(bodyParser.urlencoded({ extended: false }));
      //post文件 enctype="multipart/form-data"
      server.use(multer({ dest: './www/upload' }).any());

      //4.配置模板引擎
      //输出什么东西
      server.set('view engine', 'html');
      //模板文件放在哪儿
      server.set('views', './views');
      //哪种模板引擎
      server.engine('html', consolidate.ejs);

      //接收用户请求
      server.get('/index', function (req, res) {
         res.render('1.ejs', { name: 'blue' });
      });

      //用户请求
      server.use('/', function (req, res, next) {
         console.log(req.query, req.body, req.files, req.cookies, req.session);
      });

      //4.static数据
      server.use(static('./www'));
   }

   /**
    * setTimeout
    */
   let time = setTimeout(() => {

   }, 100);

   time.unref();

}
/**
 * net tcp服务器
 */
{
   let net = require('net');
   let server = net.createServer();
   server.on('connection', function (params) {
      console.log("connection");
      server.getConnections(function (err, count) {
         console.log('当前存在%d个客户端', count)
         server.maxConnections = 2;
      })
      server.close(function () {
         console.log("关闭与新的客户端链接请求");
      })
   });

   server.listen(8431, 'localhost', function (params) {
      console.log("服务器开始监听")
   });
   //与下面方法相同
   server.on('listening', function (params) {
      console.log("listening");
      let address = server.address();
      console.log('被监听的地址为', address);
   })
   server.on('error', function (e) {
      if (e.code == 'EADDERINUSE') {
         console.log("服务器地址及端口已被占用");
      }
   })

   server.on('close', function () {

   })
   //在新的命令窗口访问链接
   // telnet localhost 8431
}

/**
 * mysql
 */
{
   const mysql = require('mysql');
   //createConnection(哪台服务器, 用户名, 密码, 库)
   var db = mysql.createConnection({ host: 'localhost', user: 'root', password: '719527', database: 'test' });
   // 连接池
   const db = mysql.createPool({ host: 'localhost', user: 'root', password: '719527', database: 'blog' });

   //query(干啥, 回调)
   db.query("SELECT * FROM `user_table`;", (err, data) => {
      if (err)
         console.log('出错了', err);
      else
         console.log('成功了');
      console.log(JSON.stringify(data));
   });

}