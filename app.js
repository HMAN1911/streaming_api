var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient


var url = 'mongodb://localhost:27017/library';
var db

MongoClient.connect(url, function(err, database) {
  db = database
})

var subs = []

const pushNews = (obj) => {
  return new Promise((res, rej) => {
    db.collection('books').save(obj, (err, result) => {
      subs.forEach(e => e.emit('news', obj))
      return res(obj)
    })
  })
}

app.use(cors({
  origin: true,
  credentials: true,
  maxAge: 3600
}))

app.get('/addBook', (req, res) => {
  pushNews(
    {"name" : "Functional JavaScript: Introducing Functional Programming with Underscore.js", "author" : "Michael Fogus", "isbn" : "978-1449360726", "url" : "http://www.amazon.com/Functional-JavaScript-Introducing-Programming-Underscore-js/dp/1449360726" }
  )
    .then((resolve) => res.send({success: true}))
})

server.listen(3000)

io.on('connection', function (socket) {
  // db.collection('quotes').find().toArray(function(err, results) {
  //   console.log(results)
  // })
  subs.push(socket)
})

