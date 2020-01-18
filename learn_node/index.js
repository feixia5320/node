let http = require('http');
let server = http.createServer();
//request事件处理函数
server.on('request', function(req, res){
   res.end("saa");
})
server.listen(8080, '127.0.0.1');
