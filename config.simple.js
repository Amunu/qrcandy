module.exports = {
   listen: 3000,
   cluster_sock: 'run/cluster.sock',
   mongo : {
    host : 'localhost',
    database : 'qrcandy'
   },
   upyun : {
   	space : 'space_name',
   	operator : 'operator',
   	password : 'password'
   }
}
