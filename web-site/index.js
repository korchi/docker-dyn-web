console.log("Oh yeah!")
const express = require('express')
const database = require('./database')
const stylus = require('stylus')
const nib = require('nib')
const logger = require('morgan')

const app = express()

database.initializeMongo();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.get('/', function (req, res) {
  res.render('index',
	  { title: 'Indeeeeex'}
  )
})

app.listen(3000)

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(logger('dev'))

app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))



app.get('/testFind', function(req, res) {
	database.Kitten.find(function(err, kittens){
		if(err) return res.error(err);
		console.log(kittens);
		res.json(kittens);
	})
})

