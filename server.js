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
        premierleaguetable1(sender)
       
        premierleaguetable2(sender)
      }
      if (payloadt === 'table2') {
        laligatable1(sender)

        laligatable2(sender)
      }
      if (payloadt === 'table3') {
        bundesligatable1(sender)

        bundesligatable2(sender)
      }
      if (payloadt === 'table4') {
        serieatable1(sender)

        serieatable2(sender)
      }
      if (payloadt === 'table5') {
        ligue1table1(sender)

        ligue1table2(sender)
      }
      if (payloadt === 'table6') {
        thaileaguetable1(sender)

        thaileaguetable2(sender)
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
              sendTextMessage(sender, "อันดับที่ "+ rank  +"\n" + JSON.parse(body)[0].leagueTable[i].name +"\n" +JSON.parse(body)[0].leagueTable[i].points +"Pts");
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
          'subtitle':JSON.parse(body)[0].leagueTable[0].points +"Pts   W "+JSON.parse(body)[0].leagueTable[0].wins
                    + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses ,
          'buttons': [{
            'type': 'postback',
            'title': 'table',
            'payload': 'table'
          }]
        }, {
          'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
          'subtitle': JSON.parse(body)[0].leagueTable[1].points+ "Pts   W "+JSON.parse(body)[0].leagueTable[1].wins
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
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" Pts   " + ""+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[0].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[0].wins  + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[1].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[1].wins + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[2].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[2].wins + " D "+JSON.parse(body)[0].leagueTable[2].draws+" L "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[3].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[3].wins + " D "+JSON.parse(body)[0].leagueTable[3].draws+" L "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[4].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[4].wins + " D "+JSON.parse(body)[0].leagueTable[4].draws+" L "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[5].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[5].wins + " D "+JSON.parse(body)[0].leagueTable[5].draws+" L "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[6].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[6].wins+ " D "+JSON.parse(body)[0].leagueTable[6].draws+" L "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " Pts  "+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[7].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[7].wins+ " D "+JSON.parse(body)[0].leagueTable[7].draws+" L "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[8].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[8].wins + " D "+JSON.parse(body)[0].leagueTable[8].draws+" L "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[9].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[9].wins + " D "+JSON.parse(body)[0].leagueTable[9].draws+" L "+ JSON.parse(body)[0].leagueTable[9].losses
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
          'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
          'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[10].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[10].wins+ " D "+JSON.parse(body)[0].leagueTable[10].draws+" L "+ JSON.parse(body)[0].leagueTable[10].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
          'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[11].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[11].wins + " D "+JSON.parse(body)[0].leagueTable[11].draws+" L "+ JSON.parse(body)[0].leagueTable[11].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
          'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[12].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[12].wins+ " D "+JSON.parse(body)[0].leagueTable[12].draws+" L "+ JSON.parse(body)[0].leagueTable[12].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
          'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[13].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[13].wins+ " D "+JSON.parse(body)[0].leagueTable[13].draws+" L "+ JSON.parse(body)[0].leagueTable[13].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
          'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[14].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[14].wins+ " D "+JSON.parse(body)[0].leagueTable[14].draws+" L "+ JSON.parse(body)[0].leagueTable[14].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
          'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[15].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[15].wins+ " D "+JSON.parse(body)[0].leagueTable[15].draws+" L "+ JSON.parse(body)[0].leagueTable[15].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
          'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[16].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[16].wins+ " D "+JSON.parse(body)[0].leagueTable[16].draws+" L "+ JSON.parse(body)[0].leagueTable[16].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
          'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[17].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[17].wins+ " D "+JSON.parse(body)[0].leagueTable[17].draws+" L "+ JSON.parse(body)[0].leagueTable[17].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '19  '+JSON.parse(body)[0].leagueTable[18].name,
          'subtitle': JSON.parse(body)[0].leagueTable[18].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[18].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[18].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[18].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[18].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[18].wins+ " D "+JSON.parse(body)[0].leagueTable[18].draws+" L "+ JSON.parse(body)[0].leagueTable[18].losses
                    ,
            'buttons': [{
            'type': 'postback',
            'title': 'Back',
            'payload': 'back'
          }]
        }, {
          'title': '20  '+JSON.parse(body)[0].leagueTable[19].name,
          'subtitle': JSON.parse(body)[0].leagueTable[19].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[19].gamesPlayed+ " M |"
                    +" GF "+ JSON.parse(body)[0].leagueTable[19].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[19].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[19].goalDiff
                    +"\n| W "+JSON.parse(body)[0].leagueTable[19].wins+ " D "+JSON.parse(body)[0].leagueTable[19].draws+" L "+ JSON.parse(body)[0].leagueTable[19].losses
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

function laligatable1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=46',
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
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" Pts   " + ""+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[0].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[0].wins  + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[1].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[1].wins + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[2].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[2].wins + " D "+JSON.parse(body)[0].leagueTable[2].draws+" L "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[3].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[3].wins + " D "+JSON.parse(body)[0].leagueTable[3].draws+" L "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[4].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[4].wins + " D "+JSON.parse(body)[0].leagueTable[4].draws+" L "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[5].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[5].wins + " D "+JSON.parse(body)[0].leagueTable[5].draws+" L "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[6].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[6].wins+ " D "+JSON.parse(body)[0].leagueTable[6].draws+" L "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " Pts  "+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[7].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[7].wins+ " D "+JSON.parse(body)[0].leagueTable[7].draws+" L "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[8].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[8].wins + " D "+JSON.parse(body)[0].leagueTable[8].draws+" L "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[9].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[9].wins + " D "+JSON.parse(body)[0].leagueTable[9].draws+" L "+ JSON.parse(body)[0].leagueTable[9].losses
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

function laligatable2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=46',
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
                'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
                'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[10].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[10].wins+ " D "+JSON.parse(body)[0].leagueTable[10].draws+" L "+ JSON.parse(body)[0].leagueTable[10].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
                'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[11].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[11].wins + " D "+JSON.parse(body)[0].leagueTable[11].draws+" L "+ JSON.parse(body)[0].leagueTable[11].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
                'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[12].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[12].wins+ " D "+JSON.parse(body)[0].leagueTable[12].draws+" L "+ JSON.parse(body)[0].leagueTable[12].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
                'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[13].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[13].wins+ " D "+JSON.parse(body)[0].leagueTable[13].draws+" L "+ JSON.parse(body)[0].leagueTable[13].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
                'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[14].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[14].wins+ " D "+JSON.parse(body)[0].leagueTable[14].draws+" L "+ JSON.parse(body)[0].leagueTable[14].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
                'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[15].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[15].wins+ " D "+JSON.parse(body)[0].leagueTable[15].draws+" L "+ JSON.parse(body)[0].leagueTable[15].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
                'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[16].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[16].wins+ " D "+JSON.parse(body)[0].leagueTable[16].draws+" L "+ JSON.parse(body)[0].leagueTable[16].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
                'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[17].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[17].wins+ " D "+JSON.parse(body)[0].leagueTable[17].draws+" L "+ JSON.parse(body)[0].leagueTable[17].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[0].leagueTable[18].name,
                'subtitle': JSON.parse(body)[0].leagueTable[18].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[18].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[18].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[18].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[18].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[18].wins+ " D "+JSON.parse(body)[0].leagueTable[18].draws+" L "+ JSON.parse(body)[0].leagueTable[18].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '20  '+JSON.parse(body)[0].leagueTable[19].name,
                'subtitle': JSON.parse(body)[0].leagueTable[19].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[19].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[19].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[19].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[19].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[19].wins+ " D "+JSON.parse(body)[0].leagueTable[19].draws+" L "+ JSON.parse(body)[0].leagueTable[19].losses
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

function bundesligatable1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=48',
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
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" Pts   " + ""+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[0].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[0].wins  + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[1].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[1].wins + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[2].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[2].wins + " D "+JSON.parse(body)[0].leagueTable[2].draws+" L "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[3].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[3].wins + " D "+JSON.parse(body)[0].leagueTable[3].draws+" L "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[4].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[4].wins + " D "+JSON.parse(body)[0].leagueTable[4].draws+" L "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[5].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[5].wins + " D "+JSON.parse(body)[0].leagueTable[5].draws+" L "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[6].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[6].wins+ " D "+JSON.parse(body)[0].leagueTable[6].draws+" L "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " Pts  "+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[7].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[7].wins+ " D "+JSON.parse(body)[0].leagueTable[7].draws+" L "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[8].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[8].wins + " D "+JSON.parse(body)[0].leagueTable[8].draws+" L "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[9].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[9].wins + " D "+JSON.parse(body)[0].leagueTable[9].draws+" L "+ JSON.parse(body)[0].leagueTable[9].losses
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

function bundesligatable2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=48',
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
                'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
                'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[10].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[10].wins+ " D "+JSON.parse(body)[0].leagueTable[10].draws+" L "+ JSON.parse(body)[0].leagueTable[10].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
                'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[11].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[11].wins + " D "+JSON.parse(body)[0].leagueTable[11].draws+" L "+ JSON.parse(body)[0].leagueTable[11].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
                'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[12].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[12].wins+ " D "+JSON.parse(body)[0].leagueTable[12].draws+" L "+ JSON.parse(body)[0].leagueTable[12].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
                'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[13].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[13].wins+ " D "+JSON.parse(body)[0].leagueTable[13].draws+" L "+ JSON.parse(body)[0].leagueTable[13].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
                'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[14].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[14].wins+ " D "+JSON.parse(body)[0].leagueTable[14].draws+" L "+ JSON.parse(body)[0].leagueTable[14].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
                'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[15].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[15].wins+ " D "+JSON.parse(body)[0].leagueTable[15].draws+" L "+ JSON.parse(body)[0].leagueTable[15].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
                'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[16].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[16].wins+ " D "+JSON.parse(body)[0].leagueTable[16].draws+" L "+ JSON.parse(body)[0].leagueTable[16].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
                'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[17].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[17].wins+ " D "+JSON.parse(body)[0].leagueTable[17].draws+" L"+ JSON.parse(body)[0].leagueTable[17].losses
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

function serieatable1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=49',
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
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" Pts   " + ""+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[0].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[0].wins  + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[1].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[1].wins + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[2].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[2].wins + " D "+JSON.parse(body)[0].leagueTable[2].draws+" L "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[3].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[3].wins + " D "+JSON.parse(body)[0].leagueTable[3].draws+" L "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[4].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[4].wins + " D "+JSON.parse(body)[0].leagueTable[4].draws+" L "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[5].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[5].wins + " D "+JSON.parse(body)[0].leagueTable[5].draws+" L "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[6].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[6].wins+ " D "+JSON.parse(body)[0].leagueTable[6].draws+" L "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " Pts  "+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[7].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[7].wins+ " D "+JSON.parse(body)[0].leagueTable[7].draws+" L "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[8].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[8].wins + " D "+JSON.parse(body)[0].leagueTable[8].draws+" L "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[9].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[9].wins + " D "+JSON.parse(body)[0].leagueTable[9].draws+" L "+ JSON.parse(body)[0].leagueTable[9].losses
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

function serieatable2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=49',
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
                'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
                'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[10].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[10].wins+ " D "+JSON.parse(body)[0].leagueTable[10].draws+" L "+ JSON.parse(body)[0].leagueTable[10].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
                'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[11].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[11].wins + " D "+JSON.parse(body)[0].leagueTable[11].draws+" L "+ JSON.parse(body)[0].leagueTable[11].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
                'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[12].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[12].wins+ " D "+JSON.parse(body)[0].leagueTable[12].draws+" L "+ JSON.parse(body)[0].leagueTable[12].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
                'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[13].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[13].wins+ " D "+JSON.parse(body)[0].leagueTable[13].draws+" L "+ JSON.parse(body)[0].leagueTable[13].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
                'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[14].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[14].wins+ " D "+JSON.parse(body)[0].leagueTable[14].draws+" L "+ JSON.parse(body)[0].leagueTable[14].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
                'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[15].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[15].wins+ " D "+JSON.parse(body)[0].leagueTable[15].draws+" L "+ JSON.parse(body)[0].leagueTable[15].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
                'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[16].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[16].wins+ " D "+JSON.parse(body)[0].leagueTable[16].draws+" L "+ JSON.parse(body)[0].leagueTable[16].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
                'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[17].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[17].wins+ " D "+JSON.parse(body)[0].leagueTable[17].draws+" L "+ JSON.parse(body)[0].leagueTable[17].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[0].leagueTable[18].name,
                'subtitle': JSON.parse(body)[0].leagueTable[18].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[18].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[18].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[18].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[18].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[18].wins+ " D "+JSON.parse(body)[0].leagueTable[18].draws+" L "+ JSON.parse(body)[0].leagueTable[18].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '20  '+JSON.parse(body)[0].leagueTable[19].name,
                'subtitle': JSON.parse(body)[0].leagueTable[19].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[19].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[19].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[19].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[19].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[19].wins+ " D "+JSON.parse(body)[0].leagueTable[19].draws+" L "+ JSON.parse(body)[0].leagueTable[19].losses
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

function ligue1table1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=47',
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
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" Pts   " + ""+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[0].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[0].wins  + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[1].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[1].wins + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[2].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[2].wins + " D "+JSON.parse(body)[0].leagueTable[2].draws+" L "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[3].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[3].wins + " D "+JSON.parse(body)[0].leagueTable[3].draws+" L "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[4].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[4].wins + " D "+JSON.parse(body)[0].leagueTable[4].draws+" L "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[5].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[5].wins + " D "+JSON.parse(body)[0].leagueTable[5].draws+" L "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[6].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[6].wins+ " D "+JSON.parse(body)[0].leagueTable[6].draws+" L "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " Pts  "+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[7].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[7].wins+ " D "+JSON.parse(body)[0].leagueTable[7].draws+" L "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[8].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[8].wins + " D "+JSON.parse(body)[0].leagueTable[8].draws+" L "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[9].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[9].wins + " D "+JSON.parse(body)[0].leagueTable[9].draws+" L "+ JSON.parse(body)[0].leagueTable[9].losses
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

function ligue1table2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=47',
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
                'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
                'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[10].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[10].wins+ " D "+JSON.parse(body)[0].leagueTable[10].draws+" L "+ JSON.parse(body)[0].leagueTable[10].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
                'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[11].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[11].wins + " D "+JSON.parse(body)[0].leagueTable[11].draws+" L "+ JSON.parse(body)[0].leagueTable[11].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
                'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[12].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[12].wins+ " D "+JSON.parse(body)[0].leagueTable[12].draws+" L "+ JSON.parse(body)[0].leagueTable[12].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
                'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[13].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[13].wins+ " D "+JSON.parse(body)[0].leagueTable[13].draws+" L "+ JSON.parse(body)[0].leagueTable[13].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
                'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[14].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[14].wins+ " D "+JSON.parse(body)[0].leagueTable[14].draws+" L "+ JSON.parse(body)[0].leagueTable[14].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
                'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[15].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[15].wins+ " D "+JSON.parse(body)[0].leagueTable[15].draws+" L "+ JSON.parse(body)[0].leagueTable[15].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
                'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[16].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[16].wins+ " D "+JSON.parse(body)[0].leagueTable[16].draws+" L "+ JSON.parse(body)[0].leagueTable[16].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
                'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[17].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[17].wins+ " D "+JSON.parse(body)[0].leagueTable[17].draws+" L "+ JSON.parse(body)[0].leagueTable[17].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[0].leagueTable[18].name,
                'subtitle': JSON.parse(body)[0].leagueTable[18].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[18].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[18].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[18].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[18].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[18].wins+ " D "+JSON.parse(body)[0].leagueTable[18].draws+" L "+ JSON.parse(body)[0].leagueTable[18].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '20  '+JSON.parse(body)[0].leagueTable[19].name,
                'subtitle': JSON.parse(body)[0].leagueTable[19].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[19].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[19].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[19].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[19].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[19].wins+ " D "+JSON.parse(body)[0].leagueTable[19].draws+" L "+ JSON.parse(body)[0].leagueTable[19].losses
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

function thaileaguetable1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=151',
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
                'subtitle':JSON.parse(body)[0].leagueTable[0].points +" Pts   " + ""+JSON.parse(body)[0].leagueTable[0].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[0].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[0].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[0].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[0].wins  + " D "+JSON.parse(body)[0].leagueTable[0].draws+" L "+ JSON.parse(body)[0].leagueTable[0].losses
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[0].leagueTable[1].name,
                'subtitle': JSON.parse(body)[0].leagueTable[1].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[1].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[1].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[1].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[1].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[1].wins + " D "+JSON.parse(body)[0].leagueTable[1].draws+" L "+ JSON.parse(body)[0].leagueTable[1].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[0].leagueTable[2].name,
                'subtitle': JSON.parse(body)[0].leagueTable[2].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[2].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[2].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[2].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[2].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[2].wins + " D "+JSON.parse(body)[0].leagueTable[2].draws+" L "+ JSON.parse(body)[0].leagueTable[2].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[0].leagueTable[3].name,
                'subtitle': JSON.parse(body)[0].leagueTable[3].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[3].gamesPlayed +" M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[3].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[3].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[3].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[3].wins + " D "+JSON.parse(body)[0].leagueTable[3].draws+" L "+ JSON.parse(body)[0].leagueTable[3].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[0].leagueTable[4].name,
                'subtitle': JSON.parse(body)[0].leagueTable[4].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[4].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[4].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[4].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[4].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[4].wins + " D "+JSON.parse(body)[0].leagueTable[4].draws+" L "+ JSON.parse(body)[0].leagueTable[4].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[0].leagueTable[5].name,
                'subtitle': JSON.parse(body)[0].leagueTable[5].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[5].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[5].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[5].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[5].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[5].wins + " D "+JSON.parse(body)[0].leagueTable[5].draws+" L "+ JSON.parse(body)[0].leagueTable[5].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[0].leagueTable[6].name,
                'subtitle': JSON.parse(body)[0].leagueTable[6].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[6].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[6].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[6].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[6].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[6].wins+ " D "+JSON.parse(body)[0].leagueTable[6].draws+" L "+ JSON.parse(body)[0].leagueTable[6].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[0].leagueTable[7].name,
                'subtitle': JSON.parse(body)[0].leagueTable[7].points+ " Pts  "+ " แข่งทั\nงหมด "+JSON.parse(body)[0].leagueTable[7].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[7].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[7].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[7].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[7].wins+ " D "+JSON.parse(body)[0].leagueTable[7].draws+" L "+ JSON.parse(body)[0].leagueTable[7].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[0].leagueTable[8].name,
                'subtitle': JSON.parse(body)[0].leagueTable[8].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[8].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[8].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[8].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[8].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[8].wins + " D "+JSON.parse(body)[0].leagueTable[8].draws+" L "+ JSON.parse(body)[0].leagueTable[8].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[0].leagueTable[9].name,
                'subtitle': JSON.parse(body)[0].leagueTable[9].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[9].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[9].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[9].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[9].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[9].wins + " D "+JSON.parse(body)[0].leagueTable[9].draws+" L "+ JSON.parse(body)[0].leagueTable[9].losses
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

function thaileaguetable2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=151',
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
                'title': '11  '+JSON.parse(body)[0].leagueTable[10].name,
                'subtitle': JSON.parse(body)[0].leagueTable[10].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[10].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[10].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[10].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[10].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[10].wins+ " D "+JSON.parse(body)[0].leagueTable[10].draws+" L "+ JSON.parse(body)[0].leagueTable[10].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[0].leagueTable[11].name,
                'subtitle': JSON.parse(body)[0].leagueTable[11].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[11].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[11].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[11].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[11].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[11].wins + " D "+JSON.parse(body)[0].leagueTable[11].draws+" L "+ JSON.parse(body)[0].leagueTable[11].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[0].leagueTable[12].name,
                'subtitle': JSON.parse(body)[0].leagueTable[12].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[12].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[12].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[12].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[12].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[12].wins+ " D "+JSON.parse(body)[0].leagueTable[12].draws+" L "+ JSON.parse(body)[0].leagueTable[12].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[0].leagueTable[13].name,
                'subtitle': JSON.parse(body)[0].leagueTable[13].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[13].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[13].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[13].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[13].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[13].wins+ " D "+JSON.parse(body)[0].leagueTable[13].draws+" L "+ JSON.parse(body)[0].leagueTable[13].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[0].leagueTable[14].name,
                'subtitle': JSON.parse(body)[0].leagueTable[14].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[14].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[14].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[14].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[14].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[14].wins+ " D "+JSON.parse(body)[0].leagueTable[14].draws+" L "+ JSON.parse(body)[0].leagueTable[14].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[0].leagueTable[15].name,
                'subtitle': JSON.parse(body)[0].leagueTable[15].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[15].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[15].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[15].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[15].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[15].wins+ " D "+JSON.parse(body)[0].leagueTable[15].draws+" L "+ JSON.parse(body)[0].leagueTable[15].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[0].leagueTable[16].name,
                'subtitle': JSON.parse(body)[0].leagueTable[16].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[16].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[16].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[16].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[16].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[16].wins+ " D "+JSON.parse(body)[0].leagueTable[16].draws+" L "+ JSON.parse(body)[0].leagueTable[16].losses
                          ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[0].leagueTable[17].name,
                'subtitle': JSON.parse(body)[0].leagueTable[17].points+ " Pts  "+ ""+JSON.parse(body)[0].leagueTable[17].gamesPlayed+ " M |"
                          +" GF "+ JSON.parse(body)[0].leagueTable[17].goalsFor +" GA "+ JSON.parse(body)[0].leagueTable[17].goalsAgainst +" GD "+ JSON.parse(body)[0].leagueTable[17].goalDiff
                          +"\n| W "+JSON.parse(body)[0].leagueTable[17].wins+ " D "+JSON.parse(body)[0].leagueTable[17].draws+" L"+ JSON.parse(body)[0].leagueTable[17].losses
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


function sendGenericMessage (sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'Premier league',
          'subtitle': 'England',
          'image_url': 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/09/09/premier-league.jpg',
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
        'image_url': 'http://files.laliga.es/seccion_logos/laliga-v-600x600.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.laliga.es/en',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'table2'
          }]
        }, {
        'title': 'Bundesliga',
        'subtitle': 'German',
        'image_url': 'http://www.teslabet.com/wp-content/uploads/2014/08/Bundesliga-Logo.jpg',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.bundesliga.com/en/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'table3'
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
          'payload': 'table4'
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
          'payload': 'table5'
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
          'payload': 'table6'
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
