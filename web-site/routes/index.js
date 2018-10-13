var express = require('express');
var router = express.Router();
var fs = require('fs');

const testFolder = './images/';
const ptestFolder = './public/images';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gallery', function(req, res, next) {
	imgs = []
	fs.readdirSync(ptestFolder).forEach(file => {
		imgs.push(testFolder + file)
	})
	console.log(imgs)
  res.render('gallery', {data:imgs});
});

module.exports = router;
