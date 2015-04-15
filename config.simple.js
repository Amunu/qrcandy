module.exports = {
   listen: 3000,
   cluster_sock: 'run/cluster.sock',
   mongo : {
    host : 'localhost',
    user : 'admin',
    password : 'password',
    database : 'qrcandy'
   },
   upyun : {
   	space : 'space_name',
   	operator : 'operator',
   	password : 'password'
   },
   url :'http://qrcandy.f10.moe/qrcode/'
}
