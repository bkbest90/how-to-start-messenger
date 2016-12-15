'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const token = 'EAAYzVx44hnYBAJC5p0A43nJeZACXOyFqSouWNZBUXl1rSWH7Nuu63oM4rdZBWsVr3Nb9WdwCZCf70fR45ZC0WcCJX5rcQOcp0vFw6HOexkRpkW8B6Xmoyb9ITaMZCcq3xzMbYjKci1bXfww9ZB9w2HFc0mC2gfuJ6MQIU8V4AQafgZDZD'
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

/* ห้ามลบ

      if (text === 'table') {
        var options = {
          url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
          headers: {
            'x-crowdscores-api-key': '128fdd0e78d249bd8d744ff7fd66deea'
          }
        }

          function callback (error, response, body) {

            //sendTextMessage(sender, 'เข้าcallbackแล้ว')
             if (!error && response.statusCode === 200) {
            // var info = JSON.parse(body)
               console.log(JSON.parse(body)[0].competition.name)
                  sendTextMessage(sender, JSON.parse(body)[0].competition.name)
          }
        }

        request(options, callback)
      }
*/


      if (text === 'premier league table') {
        premierleaguetable1(sender)

        premierleaguetable2(sender)
        sendTextMessage(sender, 'Premier League table')

      }
      if (text === 'laliga table') {
        laligatable1(sender)

        laligatable2(sender)
        sendTextMessage(sender, 'La liga table')
      }
      if (text === 'bundesliga table') {
        bundesligatable1(sender)

        bundesligatable2(sender)
        sendTextMessage(sender, 'Bundesliga table')
      }
      if (text === 'serie a table') {
        serieatable1(sender)

        serieatable2(sender)
        sendTextMessage(sender, 'Serie A table')
      }
      if (text === 'ligue 1 table') {
        ligue1table1(sender)

        ligue1table2(sender)
        sendTextMessage(sender, 'Ligue 1 table')
      }
      if (text === 'premier league thailand table') {
        thaileaguetable1(sender)

        thaileaguetable2(sender)
        sendTextMessage(sender, 'Premier League Thailand table')
      }
      if (text === 'Generic') {
        sendGenericMessage(sender)
        continue
      }
      if (text === 'matches') {
        laligateam1(sender)
        laligateam2(sender)
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


function matches(sender){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=46',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

         for (var i = 0; i < JSON.parse(body).length; i++) {

            doSetTimeout(i);
  }
            function doSetTimeout(i) {
  setTimeout(function() {
    let time = JSON.stringify(JSON.parse(body)[i].start)
    var str = time;
    var num = parseInt(str.replace(/[^0-9]/g, time));
    var date = new Date(num).toUTCString();


    if (JSON.parse(body)[i].homeTeam.name == "Barcelona" ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +" vs "
      +JSON.parse(body)[i].awayTeam.name +"\nเวลา\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == "Barcelona" ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +" vs "
      +JSON.parse(body)[i].awayTeam.name +"\nเวลา\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}

//tables
function premierleaguetable1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
      headers: {
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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

//teams
function premierleagueteam1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=2',
      headers: {
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
                'title': '1  '+JSON.parse(body)[0].name,
                'image_url':  'http://logos-download.com/wp-content/uploads/2016/05/Burnley_FC_logo_crest_logotype.png',
                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Next match',
                  'payload': 'next1'
                },{
                  'type': 'postback',
                  'title': 'All matches',
                  'payload': 'all1'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Leicester_City.svg/1024px-Leicester_City.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/758px-Manchester_United_FC_crest.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Watford.svg/918px-Watford.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/758px-Liverpool_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/FC_Southampton.svg/898px-FC_Southampton.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/768px-Chelsea_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Stoke_City_FC.svg/885px-Stoke_City_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Middlesbrough_FC_crest.svg/983px-Middlesbrough_FC_crest.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/West_Bromwich_Albion.svg/856px-West_Bromwich_Albion.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
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

function premierleagueteam2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=2',
      headers: {
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
                'title': '11  '+JSON.parse(body)[10].name,
                'image_url': 'http://www.evertonfc.com/content/history/d2qsy1h1438jt3.cloudfront.net///d2qsy1h1438jt3.cloudfront.net/~/media/6e7d10673424491d9439e6cc208f7882.jpg?la=en',
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Next match',
                  'payload': 'next1'
                },{
                  'type': 'postback',
                  'title': 'All matches',
                  'payload': 'all1'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/519px-Tottenham_Hotspur.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/AFC_Bournemouth.svg/908px-AFC_Bournemouth.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Swansea_City_AFC_logo.svg/634px-Swansea_City_AFC_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Crystal_Palace_FC_logo.svg/821px-Crystal_Palace_FC_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'http://logonoid.com/images/arsenal-logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'http://vignette4.wikia.nocookie.net/logopedia/images/3/36/Manchester_City_2016.png/revision/latest?cb=20151229013856',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Hull_City.svg/1128px-Hull_City.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Logo_Sunderland.svg/1229px-Logo_Sunderland.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/West_Ham_United_FC.svg/1063px-West_Ham_United_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
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

function laligateam1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=46',
      headers: {
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
                'title': '1  '+JSON.parse(body)[0].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Club_Athletic_Bilbao_logo.svg/903px-Club_Athletic_Bilbao_logo.svg.png',

                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Next match',
                  'payload': 'next1'
                },{
                  'type': 'postback',
                  'title': 'All matches',
                  'payload': 'all1'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/1247px-Real_betis_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/812px-Valenciacf.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/891px-Real_Sociedad_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Deportivo_Alaves_logo.svg/1280px-Deportivo_Alaves_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/577px-RC_Celta_de_Vigo_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/c/c3/M%C3%A1laga_CF.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Osasuna_logo.svg/766px-Osasuna_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Granada_CF_logotipo.svg/390px-Granada_CF_logotipo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/8/86/Sevilla_cf_200px.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
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

function laligateam2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=46',
      headers: {
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
                'title': '11  '+JSON.parse(body)[10].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Villarreal_CF_logo.svg/822px-Villarreal_CF_logo.svg.png',
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Next match',
                  'payload': 'next1'
                },{
                  'type': 'postback',
                  'title': 'All matches',
                  'payload': 'all1'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Real_Sporting_de_Gijon.svg/599px-Real_Sporting_de_Gijon.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/UD_Las_Palmas_logo.svg/594px-UD_Las_Palmas_logo.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'http://www.joma-sport.com/ka/apps/joma_com_media/assets/sponsor/svg/129.svg',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Rcd_espanyol_logo.svg/708px-Rcd_espanyol_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/SD_Eibar_logo.svg/653px-SD_Eibar_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/732px-Real_Madrid_CF.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/RC_Deportivo_La_Coru%C3%B1a_logo.svg/926px-RC_Deportivo_La_Coru%C3%B1a_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'image_url': 'http://2.bp.blogspot.com/-AjfAudNVzaY/U_aAa1P_7-I/AAAAAAAADtY/dp4aPJOSTBA/s1600/Logo%2BBarcelona%2BFC.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Atletico_Madrid_logo.svg/800px-Atletico_Madrid_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
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
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'team1'
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
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'team2'
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
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'team3'
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
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'team4'
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
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'team5'
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
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'team6'
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
function premierleagueteam2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=2',
      headers: {
        'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
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
                'title': '11  '+JSON.parse(body)[10].name,
                'image_url': JSON.parse(body)[10].flagUrl,
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name
                          ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'Next match',
                  'payload': 'next1'
                },{
                  'type': 'postback',
                  'title': 'All matches',
                  'payload': 'all1'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                  'buttons': [{
                  'type': 'postback',
                  'title': 'Back',
                  'payload': 'back'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
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

*/

app.listen(app.get('port'), function () {
console.log('running on port', app.get('port'))
})
