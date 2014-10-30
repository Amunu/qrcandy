module.exports = function(app){
	app.get('/qrcode', function(req, res) {
		res.render('qrcode', { title: 'qrcode' });
	});
}
