'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const token = 'EAAYzVx44hnYBAEiaPrinabDZBWmwC1rkal50SOWUpTiIt8ZChgu6BhNLQF3R8W2Qj24bNpCLEh3RbB4OBorD29649XGKQtXbgZCxkBdNpU2uvCFAZAXB2FyyMqW6ucKM3ueg0QttOnsWP5tbfGl2iYvfJrZAUNpd2mr1SPPicLQZDZD'
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('test test')
})
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'keypass') {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})
app.post('/webhook/', function (req, res) {
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      var text = event.message.text

      if (text === 'table') {
        leaguetableshow(sender)
      }

      if (text === 'Generic') {
        sendGenericMessage(sender)
        continue
      }
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
      var payloadt = event.postback.payload;
      if (payloadt === 'USER_DEFINED_PAYLOAD') {
        sendTextMessage(sender, 'Hello')
      }
      if (payloadt === 'table') {
        leaguetableshow(sender)
      }

      continue
    }
  }
  res.sendStatus(200)
})
function leaguetableshow(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
      headers: {
        'x-crowdscores-api-key': '128fdd0e78d249bd8d744ff7fd66deea'
      }
    }

    function callback (error, response, body) {
      // sendTextMessage(sender, 'เข้าcallbackแล้ว')
      if (!error && response.statusCode === 200) {
        // var info = JSON.parse(body)
        console.log(JSON.parse(body)[0].competition.name)
            sendTextMessage(sender, JSON.parse(body)[0].competition.name);
            var rank = 0;

            for (var i = 0; i < 20; i++) {
              var rank = rank + 1;
              sendTextMessage(sender, "อันดับที่"+ rank  +"\n" + JSON.parse(body)[0].leagueTable[i].name +"\n" +JSON.parse(body)[0].leagueTable[i].points +"คะแนน");
            }

            /* for (i = 0; i < 20; i++) {
              "อันดับที่" + i+1 + JSON.parse(body)[0].leagueTable.name +" " +JSON.parse(body)[0].leagueTable.points +"คะแนน" ;
           }

         */
      }
    }

    request(options, callback)
}

function sendTextMessage (sender, text) {
  let messageData = { text: text }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

function sendGenericMessage (sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'Premier league',
          'subtitle': 'England',
          'image_url': 'https://resources-pl.pulselive.com/ver/i/elements/premier-league-logo-header.svg',
          'buttons': [{
            'type': 'web_url',
            'url': 'https://www.premierleague.com/',
            'title': 'web url'
          }, {
            'type': 'postback',
            'title': 'table',
            'payload': 'table'
          }]
        }, {
          'title': 'La liga',
          'subtitle': 'Spain',
          'image_url': 'http://statics.laliga.es/img/logo-laliga-claim.png',
          'buttons': [{
            'type': 'postback',
            'title': 'table',
            'payload': 'table'
          }]
        }]
      }
    }
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'))
})
