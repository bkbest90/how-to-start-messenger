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
        sendTextMessage(sender, 'สวัสดีครับ')
        sendGenericMessage (sender)
      }
      if (payloadt === 'table1') {
        setTimeout(premierleaguetable1(sender), 50);
        setTimeout(premierleaguetable2(sender), 100);
      }
      if (payloadt === 'back') {
        sendGenericMessage (sender)
      }


      continue
    }
  }
  res.sendStatus(200)
})


/*

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
              sendTextMessage(sender, "อันดับที่ "+ rank  +"\n" + JSON.parse(body)[0].leagueTable[i].name +"\n" +JSON.parse(body)[0].leagueTable[i].points +"คะแนน");
            }
      }
    }

    request(options, callback)
}
*/
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

/*
function premierleaguetable(sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': '1  '+JSON.parse(body)[0].leagueTable[0].name,
          'subtitle':JSON.parse(body)[0].leagueTable[0].points +"คะแนน  W "+JSON.parse(body)[0].leagueTable[0].wins
                    + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses ,
          'buttons': [{
            'type': 'postback',
            'title': 'table',
            'payload': 'table'
          }]
        }, {
          'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
          'subtitle': JSON.parse(body)[0].leagueTable[1].points+ "คะแนน  W "+JSON.parse(body)[0].leagueTable[1].wins
                    + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses ,
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
*/
function premierleaguetable1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
      headers: {
        'x-crowdscores-api-key': '128fdd0e78d249bd8d744ff7fd66deea'
      }
    }

    function callback (error, response, body) {
      if (!error && response.statusCode === 200) {
        let messageData = {
          'attachment': {
            'type': 'template',
            'payload': {
              'template_type': 'generic',
              'elements': [{
                'title': '1  '+JSON.parse(body)[0].leagueTable[0].name,
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" คะแนน\n " + "แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[0].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[0].wins  + " เสมอ "+JSON.parse(body)[0].leagueTable[0].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[1].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[1].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[1].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[2].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[2].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[2].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[3].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[3].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[3].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[4].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[4].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[4].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[5].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[5].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[5].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[6].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[6].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[6].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " คะแนน\n"+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[7].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[7].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[7].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[8].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[8].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[8].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " นัด"
                          +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[9].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\nชนะ "+JSON.parse(body)[0].leagueTable[9].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[9].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[9].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
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
    }

    request(options, callback)
}

function premierleaguetable2(sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
          'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[10].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[10].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[10].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[10].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
          'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[11].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[11].wins + " เสมอ "+JSON.parse(body)[0].leagueTable[11].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[11].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
          'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[12].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[12].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[12].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[12].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
          'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[13].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[13].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[13].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[13].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
          'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[14].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[14].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[14].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[14].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
          'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[15].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[15].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[15].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[15].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
          'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[16].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[16].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[16].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[16].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
          'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[17].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[17].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[17].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[17].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '19  '+JSON.parse(body)[0].leagueTable[18].name,
          'subtitle': JSON.parse(body)[0].leagueTable[18].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[18].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[18].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[18].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[18].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[18].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[18].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[18].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '20  '+JSON.parse(body)[0].leagueTable[19].name,
          'subtitle': JSON.parse(body)[0].leagueTable[19].points+ " คะแนน\n"+ " แข่งทั้งหมด "+JSON.parse(body)[0].leagueTable[19].gamesPlayed+ " นัด"
                    +"\nทำประตู "+ JSON.parse(body)[0].leagueTable[19].goalsFor +"เสียประตู "+ JSON.parse(body)[0].leagueTable[19].goalsAgainst +"ผลต่างประตู "+ JSON.parse(body)[0].leagueTable[19].goalDiff
                    +"\nชนะ "+JSON.parse(body)[0].leagueTable[19].wins+ " เสมอ "+JSON.parse(body)[0].leagueTable[19].draws+" แพ้ "+ JSON.parse(body)[0].leagueTable[19].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
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
            'url': 'https://www.premierleague.com',
            'title': 'Web'
          }, {
            'type': 'postback',
            'title': 'Table',
            'payload': 'table1'
          }]
        }, {
        'title': 'La liga',
        'subtitle': 'Spain',
        'image_url': 'http://statics.laliga.es/img/logo-laliga-claim.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.laliga.es/en',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'table'
          }]
        }, {
        'title': 'Bundesliga',
        'subtitle': 'German',
        'image_url': 'http://s.bundesliga.com/2016/img/logo.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.bundesliga.com/en/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'table'
          }]
        }, {
        'title': 'Serie A',
        'subtitle': 'Italy',
        'image_url': 'http://www.legaseriea.it/assets/legaseriea/images/logo.png?v=2016',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.legaseriea.it/en/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'table'
          }]
        }, {
        'title': 'ligue 1',
        'subtitle': 'France',
        'image_url': 'http://vignette1.wikia.nocookie.net/fifa/images/f/f6/Ligue_1_Logo.png/revision/latest?cb=20161117184717',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.ligue1.com/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'table'
          }]
        }, {
        'title': 'Premier League Thailand',
        'subtitle': 'Thailand',
        'image_url': 'http://www.thaileague.co.th/official/plt_html/images/plt_logo.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.thaileague.co.th/official/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
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
/*
function sendGenericMessage (sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'Premier league',
          'subtitle': 'Rank 1',
          'image_url': 'https://resources-pl.pulselive.com/ver/i/elements/premier-league-logo-header.svg',
          'buttons': [{
            'type': 'web_url',
            'url': 'https://www.messenger.com',
            'title': 'web url'
          }, {
            'type': 'postback',
            'title': 'table',
            'payload': 'table'
          }]
        }, {
          'title': 'Second card',
          'subtitle': 'Element #2 of an hscroll',

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
*/
app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'))
})
