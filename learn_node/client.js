var http = require('http');
var util = require('util');
 
http.get("http://g.360.cn/index.html", function(res){
   let data = '';
   res.on('data', function (val) {
      console.log(val)
      data += val;
   })
   res.on('end', function () {
      let result = JSON.parse(data);
      console.log('result:'+util.inspect(result));
   })
})