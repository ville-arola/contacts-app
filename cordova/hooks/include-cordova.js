module.exports = function(context) {
	var fs = require('fs'),
		fPath = './platforms/android/assets/www/index.html',
		indexHtml = fs.readFileSync(fPath, 'utf8');
	fs.writeFileSync(
		fPath, 
		indexHtml.replace(/<!-- include cordova.js -->/g, '<script src="cordova.js"></script>',
		'utf8'
	));
}
