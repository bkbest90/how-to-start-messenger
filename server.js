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

    /*  var location = event.message.text
            var weatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather?q=' +location+ '&units=metric&appid=ea5272e74853f242bc0efa9fef3dd9f3'
            request({url: weatherEndpoint,json: true},
            function(error, response, body) {
              try {
                var condition = body.main;
                var cloud = body.clouds.all;
                var realname = body.name;
                var weathe = body.weather;
                sendTextMessage(sender, realname + "   อุณหภูมิวันนี้คือ " + condition.temp + " องศาเซลเซียส " + " \nอุณหภูมิต่ำสุดคือ " + condition.temp_min +" \nอุณหภูมิสูงสุดคือ " + condition.temp_max +" \nเมฆ "+ cloud + " % "+" \nค่าความชื้น "+ condition.humidity);
              } catch(err) {
                console.error('error caught', err);
                sendTextMessage(sender, "เราหาเมืองนี้ไม่เจอ. กรุณาใส่ชื่อเมืองใหม่อีกครั้ง. Ex. Huahin");
              }
      })

      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
      headers: {  'x-crowdscores-api-key': '128fdd0e78d249bd8d744ff7fd66deea'  }




      var options = {
       };
      request({url: options,json: true},
    function (error, response, body) {
      try {

         var table = body.competition;
        sendTextMessage(sender, table.name);
      } catch(err) {
        console.error('error caught', err);
        sendTextMessage(sender, "Error");
      }

    }


*/


if (text === 'table'){

  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
    headers: {
      'x-crowdscores-api-key': '128fdd0e78d249bd8d744ff7fd66deea'
    }
  };

  request(options, callback);

  function callback(options,error, response, body) {

      sendTextMessage(sender, " เข้าcallbackแล้ว " );
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info.stargazers_count + " Stars");
      console.log(info.forks_count + " Forks");
    }
  }



}


      if (text === 'Generic') {
        sendGenericMessage(sender)
        continue
      }

    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
      sendTextMessage(sender, 'สวัสดี')
      continue
    }
  }
  res.sendStatus(200)
})

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
          'title': 'First card',
          'subtitle': 'Element #1 of an hscroll',
          'image_url': 'http://messengerdemo.parseapp.com/img/rift.png',
          'buttons': [{
            'type': 'web_url',
            'url': 'https://www.messenger.com',
            'title': 'web url'
          }, {
            'type': 'postback',
            'title': 'Postback',
            'payload': 'Payload for first element in a generic bubble'
          }]
        }, {
          'title': 'Second card',
          'subtitle': 'Element #2 of an hscroll',
          'image_url': 'http://messengerdemo.parseapp.com/img/gearvr.png',
          'buttons': [{
            'type': 'postback',
            'title': 'Postback',
            'payload': 'Payload for second element in a generic bubble'
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
