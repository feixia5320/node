debug服务器
node --inspect ./bin/www

浏览器输入：
chrome://inspect

启动mongodb
mongod --config  C:/soft/mongodb/mongod.conf

mongod --config  C:/soft/mongodb/mongod.conf --install --serviceName "mongodb"

启动node服务器
pm2 start www --watch
pm2 stop all

mongodb配置文件：other目录中备份