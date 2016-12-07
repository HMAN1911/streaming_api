var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient


var url = 'mongodb://localhost:27017/streaming';
var db

MongoClient.connect(url, function(err, database) {
  db = database
})

var subs = []

const pushNews = (obj) => {
  return new Promise((res, rej) => {
    db.collection('quotes').save(obj, (err, result) => {
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

app.get('/addNews', (req, res) => {
  pushNews({new: 'hype!!'})
    .then((resolve) => res.send({success: true}))
})

server.listen(3000)

io.on('connection', function (socket) {
  // db.collection('quotes').find().toArray(function(err, results) {
  //   console.log(results)
  // })
  subs.push(socket)
})

