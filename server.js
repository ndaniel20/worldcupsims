const express = require('express')
const path = require('path')
const fs = require('fs')
const mongoDB = require('./src/mongoFind.js')
const updateTeams = require('./src/update.js')

function sort(list){
  list.sort( function( a, b ) {
      return a < b ? -1 : a > b ? 1 : 0;
  }); 
  return list;
}

const httpPort = 80
const app = express()

app.use(express.static('public'))
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/public/view`);

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/public/view/menu.html`)
})

app.get('/select', function (req, res) {
  res.sendFile(`${__dirname}/public/view/selectTeam.html`)
})

app.get('/settings', function (req, res) {
  res.sendFile(`${__dirname}/public/view/settings.html`)
})

app.get('/update', function (req, res) {
  updateTeams.set(res)
});

app.post('/simulate', async function(req, res){ 
  var teamList = await mongoDB.teamList
  var teamSort = sort(Object.keys(teamList[0]))

  var homeTeam = req.body.homeTeam
  var awayTeam = req.body.awayTeam
  var homeLineup = teamList[0][teamSort[homeTeam]]
  var awayLineup = teamList[0][teamSort[awayTeam]]

  res.send({homeXI: homeLineup, awayXI: awayLineup})
});

app.get('/simulate', async function(req, res){ 
  var teamList = await mongoDB.teamList
  var teamSort = sort(Object.keys(teamList[0]))

  var url = req.url
  var matched = url.match(/\d+/g)
  if (!matched) return res.send({Error: "Invalid team parameters"})
  var homeTeam = matched[0]
  var awayTeam = matched[1]
  if (!homeTeam || !awayTeam) return res.send({Error: "Invalid team parameters"})

  res.render('startMatch', {
      home: teamList[0][teamSort[homeTeam]],
      away: teamList[0][teamSort[awayTeam]],
  }, function(err, html) {
    if (err) res.send({Error: "Invalid team parameters"})
    res.send(html)
  })
}); 

app.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})
