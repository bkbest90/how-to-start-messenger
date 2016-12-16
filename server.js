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
      if (text === 'mainmenu' || text === 'เมนูหลัก') {
        sendGenericMessage(sender)
        continue
      }
      if (text === 'matches') {
       let text = "Liverpool";
        premierleaguematchesPlayed(sender, text)
      }
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
      var payloadtext = event.postback.payload;
      if (payloadtext === 'USER_DEFINED_PAYLOAD') {
        sendTextMessage(sender, 'สวัสดีครับ')
        sendGenericMessage (sender)

      }
      if (payloadtext === 'premierleaguetable') {
        premierleaguetable(sender)
      }
      if (payloadtext === 'laligatable') {
        laligatable(sender)
      }
      if (payloadtext === 'bundesligatable') {
        bundesligatable(sender)
      }
      if (payloadtext === 'serieatable') {
        serieatable(sender)
      }
      if (payloadtext === 'ligue1table') {
        ligue1table(sender)
      }
      if (payloadtext === 'thaileaguetable') {
        thaileaguetable(sender)
      }
      if (payloadtext === 'premierleagueteam') {
       setTimeout(function() {  premierleagueteam1(sender)}, 100);
       setTimeout(function() {  premierleagueteam2(sender)}, 500);
      }
      if (payloadtext === 'laligateam') {
       setTimeout(function() {  laligateam1(sender)}, 100);
       setTimeout(function() {  laligateam2(sender)}, 500);
      }
      if (payloadtext === 'bundesligateam') {
       setTimeout(function() {  bundesligateam1(sender)}, 100);
       setTimeout(function() {  bundesligateam2(sender)}, 500);
      }
      if (payloadtext === 'serieateam') {
       setTimeout(function() {  serieateam1(sender)}, 100);
       setTimeout(function() {  serieateam2(sender)}, 500);
      }
      if (payloadtext === 'ligue1team') {
       setTimeout(function() {  ligue1team1(sender)}, 100);
       setTimeout(function() {  ligue1team2(sender)}, 500);
      }
      if (payloadtext === 'thaileagueteam') {
       setTimeout(function() {    thaileagueteam1(sender)}, 100);
       setTimeout(function() {    thaileagueteam2(sender)}, 500);
      }

      if (payloadtext === 'matchpreviousBurnley') {
        let text = "Burnley";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        premierleaguePreviousmatches(sender, text)
        setTimeout(function() {  sendTextMessage(sender, 'หมายเหตุ** วันเวลานี้ GMT+0 ต้องบวกอีก 7 ชม.จึงจะเป็นเวลาไทย ')}, 2000);
      }
      if (payloadtext === 'matchnextBurnley') {
        let text = "Burnley";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        premierleagueNextmatches(sender, text)
        setTimeout(function() {  sendTextMessage(sender, 'หมายเหตุ** วันเวลานี้ GMT+0 ต้องบวกอีก 7 ชม.จึงจะเป็นเวลาไทย ')}, 2000);
      }
      if (payloadtext === 'matchyetBurnley') {
        let text = "Burnley";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesYet(sender, text)}, 100);
        setTimeout(function() {  sendTextMessage(sender, 'หมายเหตุ** วันเวลานี้ GMT+0 ต้องบวกอีก 7 ชม.จึงจะเป็นเวลาไทย ')}, 2000);
      }

      if (payloadtext === 'matchpreviousLeicester City') {
        let text = "Leicester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        premierleaguePreviousmatches(sender, text)
        setTimeout(function() {  sendTextMessage(sender, 'หมายเหตุ** วันเวลานี้ GMT+0 ต้องบวกอีก 7 ชม.จึงจะเป็นเวลาไทย ')}, 2000);
      }
      if (payloadtext === 'matchnextLeicester City') {
        let text = "Leicester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        premierleagueNextmatches(sender, text)
        setTimeout(function() {  sendTextMessage(sender, 'หมายเหตุ** วันเวลานี้ GMT+0 ต้องบวกอีก 7 ชม.จึงจะเป็นเวลาไทย ')}, 2000);
      }
      if (payloadtext === 'matchyetLeicester City') {
        let text = "Leicester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')

        setTimeout(function() {  premierleaguematchesYet(sender, text)}, 100);
        setTimeout(function() {  sendTextMessage(sender, 'หมายเหตุ** วันเวลานี้ GMT+0 ต้องบวกอีก 7 ชม.จึงจะเป็นเวลาไทย ')}, 2000);
      }


      if (payloadtext === 'back') {
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

//previous matches

function premierleaguePreviousmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=2',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = 379 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    ai--;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function laligaPreviousmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=46',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = 379 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    ai--;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function bundesligaPreviousmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=48',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = 305 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    ai--;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function serieaPreviousmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=49',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = 379 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    ai--;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function ligue1Previousmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=47',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = 379 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    ai--;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function thaileaguePreviousmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=151',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = 305 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    ai--;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}


//next matches
function premierleagueNextmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=2',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var i = 0 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[i].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    i++;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function laligaNextmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=46',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var i = 0 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[i].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    i++;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function bundesligaNextmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=48',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var i = 0 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[i].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    i++;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function serieaNextmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=49',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var i = 0 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[i].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    i++;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function ligue1Nextmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=47',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var i = 0 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[i].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    i++;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}

function thaileagueNextmatches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=151',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var i = 0 ;
         do {
           let time = JSON.stringify(JSON.parse(body)[i].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var date = new Date(num).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                    b = 5;

                  }

                }
                    i++;
                     }
                   while (b != 5);

    }
  }

  request(options, callback)

}



//matches played
function premierleaguematchesPlayed(sender, text){
  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=2',
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

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
            }



         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function laligamatchesPlayed(sender, text){
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

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome.winner == "home") {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                  +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                     }
                   if (JSON.parse(body)[i].outcome.winner == "away") {
                  sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                     +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
              }
              if (JSON.parse(body)[i].outcome === null) {
                i = JSON.parse(body).length;
              }

             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome.winner == "home") {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                  }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                 +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
            }
                if (JSON.parse(body)[i].outcome.winner == "away") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
               +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
                 if (JSON.parse(body)[i].outcome === null) {
                   i = JSON.parse(body).length;
                 }

         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function bundesligamatchesPlayed(sender, text){
  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=48',
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

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome.winner == "home") {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                  +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                     }
                   if (JSON.parse(body)[i].outcome.winner == "away") {
                  sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                     +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
              }
              if (JSON.parse(body)[i].outcome === null) {
                i = JSON.parse(body).length;
              }

             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome.winner == "home") {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                  }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                 +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
            }
                if (JSON.parse(body)[i].outcome.winner == "away") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
               +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
                 if (JSON.parse(body)[i].outcome === null) {
                   i = JSON.parse(body).length;
                 }

         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function serieamatchesPlayed(sender, text){
  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=49',
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

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome.winner == "home") {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                  +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                     }
                   if (JSON.parse(body)[i].outcome.winner == "away") {
                  sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                     +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
              }
              if (JSON.parse(body)[i].outcome === null) {
                i = JSON.parse(body).length;
              }

             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome.winner == "home") {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                  }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                 +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
            }
                if (JSON.parse(body)[i].outcome.winner == "away") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
               +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
                 if (JSON.parse(body)[i].outcome === null) {
                   i = JSON.parse(body).length;
                 }

         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function ligue1matchesPlayed(sender, text){
  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=47',
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

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome.winner == "home") {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                  +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                     }
                   if (JSON.parse(body)[i].outcome.winner == "away") {
                  sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                     +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
              }
              if (JSON.parse(body)[i].outcome === null) {
                i = JSON.parse(body).length;
              }

             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome.winner == "home") {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                  }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                 +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
            }
                if (JSON.parse(body)[i].outcome.winner == "away") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
               +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
                 if (JSON.parse(body)[i].outcome === null) {
                   i = JSON.parse(body).length;
                 }

         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function thaileaguematchesPlayed(sender, text){
  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=151',
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

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome.winner == "home") {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                  +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                     }
                   if (JSON.parse(body)[i].outcome.winner == "away") {
                  sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                     +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
              }
              if (JSON.parse(body)[i].outcome === null) {
                i = JSON.parse(body).length;
              }

             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome.winner == "home") {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                  }
               if (JSON.parse(body)[i].outcome.winner == "draw") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                 +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
            }
                if (JSON.parse(body)[i].outcome.winner == "away") {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
               +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
                 }
                 if (JSON.parse(body)[i].outcome === null) {
                   i = JSON.parse(body).length;
                 }

         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}


//matches not start yet
function premierleaguematchesYet(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=2',
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


    if (JSON.parse(body)[i].homeTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}

function laligamatchesYet(sender, text){


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


    if (JSON.parse(body)[i].homeTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}

function bundesligamatchesYet(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=48',
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


    if (JSON.parse(body)[i].homeTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}

function serieamatchesYet(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=49',
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


    if (JSON.parse(body)[i].homeTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}

function ligue1matchesYet(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=47',
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


    if (JSON.parse(body)[i].homeTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}

function thaileaguematchesYet(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=151',
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


    if (JSON.parse(body)[i].homeTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +0"  )
    }

  }
  if (JSON.parse(body)[i].awayTeam.name == text ) {
      if (JSON.parse(body)[i].outcome === null) {
        sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
      +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+  date +" +0"  )
    }

    }
 }, i*110);
                        }
    }
  }

  request(options, callback)

}


//tables

function premierleaguetable(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=2',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

              setTimeout(function() {  sendTextMessage(sender, JSON.parse(body)[0].competition.name)}, 0);
         for (var i = 0; i < JSON.parse(body)[0].leagueTable.length; i++) {

            doSetTimeout(i);
           }
            function doSetTimeout(i) {
           setTimeout(function() {

               sendTextMessage(sender,' _' +(i+1) +"_  "+ JSON.parse(body)[0].leagueTable[i].name+'\n'
               +JSON.parse(body)[0].leagueTable[i].points +" คะแนน  แข่ง "+JSON.parse(body)[0].leagueTable[i].gamesPlayed +" แมตช์"
               +"\nชนะ "+JSON.parse(body)[0].leagueTable[i].wins+" เสมอ "+JSON.parse(body)[0].leagueTable[i].draws+" แพ้ "+JSON.parse(body)[0].leagueTable[i].losses
               +"\nทำประตู "+JSON.parse(body)[0].leagueTable[i].goalsFor+" เสียประตู "+JSON.parse(body)[0].leagueTable[i].goalsAgainst+" ผลต่างประตู "+JSON.parse(body)[0].leagueTable[i].goalDiff
              )


            }, i*110+40);
                        }
                }
             }

             request(options, callback)

}

function laligatable(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=46',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

            setTimeout(function() {  sendTextMessage(sender, JSON.parse(body)[0].competition.name)}, 0);
         for (var i = 0; i < JSON.parse(body)[0].leagueTable.length; i++) {

            doSetTimeout(i);
           }
            function doSetTimeout(i) {
           setTimeout(function() {

               sendTextMessage(sender,' _' +(i+1) +"_  "+ JSON.parse(body)[0].leagueTable[i].name+'\n'
               +JSON.parse(body)[0].leagueTable[i].points +" คะแนน  แข่ง "+JSON.parse(body)[0].leagueTable[i].gamesPlayed +" แมตช์"
               +"\nชนะ "+JSON.parse(body)[0].leagueTable[i].wins+" เสมอ "+JSON.parse(body)[0].leagueTable[i].draws+" แพ้ "+JSON.parse(body)[0].leagueTable[i].losses
               +"\nทำประตู "+JSON.parse(body)[0].leagueTable[i].goalsFor+" เสียประตู "+JSON.parse(body)[0].leagueTable[i].goalsAgainst+" ผลต่างประตู "+JSON.parse(body)[0].leagueTable[i].goalDiff
              )


            }, i*110+40);
                        }
                }
             }

             request(options, callback)

}

function bundesligatable(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=48',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

              setTimeout(function() {  sendTextMessage(sender, JSON.parse(body)[0].competition.name)}, 0);
         for (var i = 0; i < JSON.parse(body)[0].leagueTable.length; i++) {

            doSetTimeout(i);
           }
            function doSetTimeout(i) {
           setTimeout(function() {

               sendTextMessage(sender,' _' +(i+1) +"_  "+ JSON.parse(body)[0].leagueTable[i].name+'\n'
               +JSON.parse(body)[0].leagueTable[i].points +" คะแนน  แข่ง "+JSON.parse(body)[0].leagueTable[i].gamesPlayed +" แมตช์"
               +"\nชนะ "+JSON.parse(body)[0].leagueTable[i].wins+" เสมอ "+JSON.parse(body)[0].leagueTable[i].draws+" แพ้ "+JSON.parse(body)[0].leagueTable[i].losses
               +"\nทำประตู "+JSON.parse(body)[0].leagueTable[i].goalsFor+" เสียประตู "+JSON.parse(body)[0].leagueTable[i].goalsAgainst+" ผลต่างประตู "+JSON.parse(body)[0].leagueTable[i].goalDiff
              )


            }, i*110+40);
                        }
                }
             }

             request(options, callback)

}

function serieatable(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=49',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

              setTimeout(function() {  sendTextMessage(sender, JSON.parse(body)[0].competition.name)}, 0);
         for (var i = 0; i < JSON.parse(body)[0].leagueTable.length; i++) {

            doSetTimeout(i);
           }
            function doSetTimeout(i) {
           setTimeout(function() {

               sendTextMessage(sender,' _' +(i+1) +"_  "+ JSON.parse(body)[0].leagueTable[i].name+'\n'
               +JSON.parse(body)[0].leagueTable[i].points +" คะแนน  แข่ง "+JSON.parse(body)[0].leagueTable[i].gamesPlayed +" แมตช์"
               +"\nชนะ "+JSON.parse(body)[0].leagueTable[i].wins+" เสมอ "+JSON.parse(body)[0].leagueTable[i].draws+" แพ้ "+JSON.parse(body)[0].leagueTable[i].losses
               +"\nทำประตู "+JSON.parse(body)[0].leagueTable[i].goalsFor+" เสียประตู "+JSON.parse(body)[0].leagueTable[i].goalsAgainst+" ผลต่างประตู "+JSON.parse(body)[0].leagueTable[i].goalDiff
              )


            }, i*110+40);
                        }
                }
             }

             request(options, callback)

}

function ligue1table(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=47',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

            setTimeout(function() {  sendTextMessage(sender, JSON.parse(body)[0].competition.name)}, 0);
         for (var i = 0; i < JSON.parse(body)[0].leagueTable.length; i++) {

            doSetTimeout(i);
           }
            function doSetTimeout(i) {
           setTimeout(function() {

               sendTextMessage(sender,' _' +(i+1) +"_  "+ JSON.parse(body)[0].leagueTable[i].name+'\n'
               +JSON.parse(body)[0].leagueTable[i].points +" คะแนน  แข่ง "+JSON.parse(body)[0].leagueTable[i].gamesPlayed +" แมตช์"
               +"\nชนะ "+JSON.parse(body)[0].leagueTable[i].wins+" เสมอ "+JSON.parse(body)[0].leagueTable[i].draws+" แพ้ "+JSON.parse(body)[0].leagueTable[i].losses
               +"\nทำประตู "+JSON.parse(body)[0].leagueTable[i].goalsFor+" เสียประตู "+JSON.parse(body)[0].leagueTable[i].goalsAgainst+" ผลต่างประตู "+JSON.parse(body)[0].leagueTable[i].goalDiff
              )


            }, i*110+40);
                        }
                }
             }

             request(options, callback)

}

function thaileaguetable(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/league-tables?competition_id=151',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {

            setTimeout(function() {  sendTextMessage(sender, JSON.parse(body)[0].competition.name)}, 0);
         for (var i = 0; i < JSON.parse(body)[0].leagueTable.length; i++) {

            doSetTimeout(i);
           }
            function doSetTimeout(i) {
           setTimeout(function() {

               sendTextMessage(sender,' _' +(i+1) +"_  "+ JSON.parse(body)[0].leagueTable[i].name+'\n'
               +JSON.parse(body)[0].leagueTable[i].points +" คะแนน  แข่ง "+JSON.parse(body)[0].leagueTable[i].gamesPlayed +" แมตช์"
               +"\nชนะ "+JSON.parse(body)[0].leagueTable[i].wins+" เสมอ "+JSON.parse(body)[0].leagueTable[i].draws+" แพ้ "+JSON.parse(body)[0].leagueTable[i].losses
               +"\nทำประตู "+JSON.parse(body)[0].leagueTable[i].goalsFor+" เสียประตู "+JSON.parse(body)[0].leagueTable[i].goalsAgainst+" ผลต่างประตู "+JSON.parse(body)[0].leagueTable[i].goalDiff
              )


            }, i*110+40);
                        }
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
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBurnley'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBurnley'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBurnley'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Leicester_City.svg/1024px-Leicester_City.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLeicester City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLeicester City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLeicester City'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/758px-Manchester_United_FC_crest.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousManchester United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextManchester United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetManchester United'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Watford.svg/918px-Watford.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousWatford'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextWatford'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetWatford'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/758px-Liverpool_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLiverpool'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLiverpool'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLiverpool'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/FC_Southampton.svg/898px-FC_Southampton.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSouthampton'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSouthampton'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSouthampton'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/768px-Chelsea_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousChelsea'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextChelsea'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetChelsea'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Stoke_City_FC.svg/885px-Stoke_City_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousStoke City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextStoke City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetStoke City'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Middlesbrough_FC_crest.svg/983px-Middlesbrough_FC_crest.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMiddlesbrough'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMiddlesbrough'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMiddlesbrough'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/West_Bromwich_Albion.svg/856px-West_Bromwich_Albion.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousWest Bromwich Albion'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextWest Bromwich Albion'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetWest Bromwich Albion'
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
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousEverton'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextEverton'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetEverton'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/519px-Tottenham_Hotspur.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousTottenham Hotspur'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextTottenham Hotspur'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetTottenham Hotspur'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/AFC_Bournemouth.svg/908px-AFC_Bournemouth.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBournemouth'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBournemouth'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBournemouth'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Swansea_City_AFC_logo.svg/634px-Swansea_City_AFC_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSwansea City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSwansea City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSwansea City'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Crystal_Palace_FC_logo.svg/821px-Crystal_Palace_FC_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousCrystal Palace'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextCrystal Palace'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetCrystal Palace'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'http://logonoid.com/images/arsenal-logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousArsenal'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextArsenal'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetArsenal'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'http://vignette4.wikia.nocookie.net/logopedia/images/3/36/Manchester_City_2016.png/revision/latest?cb=20151229013856',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousManchester City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextManchester City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetManchester City'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Hull_City.svg/1128px-Hull_City.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousHull City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextHull City'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetHull City'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Logo_Sunderland.svg/1229px-Logo_Sunderland.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSunderland'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSunderland'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSunderland'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/West_Ham_United_FC.svg/1063px-West_Ham_United_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousWest Ham United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextWest Ham United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetWest Ham United'
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

                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousAthletic Bilbao'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextAthletic Bilbao'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetAthletic Bilbao'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_betis_logo.svg/1247px-Real_betis_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousReal Betis'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextReal Betis'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetReal Betis'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/812px-Valenciacf.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousValencia'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextValencia'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetValencia'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/891px-Real_Sociedad_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousReal Sociedad'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextReal Sociedad'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetReal Sociedad'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Deportivo_Alaves_logo.svg/1280px-Deportivo_Alaves_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousDeportivo Alavés'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextDeportivo Alavés'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetDeportivo Alavés'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/RC_Celta_de_Vigo_logo.svg/577px-RC_Celta_de_Vigo_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousCelta de Vigo'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextCelta de Vigo'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetCelta de Vigo'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/c/c3/M%C3%A1laga_CF.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMálaga'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMálaga'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMálaga'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Osasuna_logo.svg/766px-Osasuna_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousOsasuna'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextOsasuna'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetOsasuna'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Granada_CF_logotipo.svg/390px-Granada_CF_logotipo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousGranada'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextGranada'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetGranada'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/8/86/Sevilla_cf_200px.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSevilla'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSevilla'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSevilla'
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
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousVillarreal'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextVillarreal'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetVillarreal'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Real_Sporting_de_Gijon.svg/599px-Real_Sporting_de_Gijon.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSporting Gijón'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSporting Gijón'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSporting Gijón'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/UD_Las_Palmas_logo.svg/594px-UD_Las_Palmas_logo.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLas Palmas'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLas Palmas'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLas Palmas'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'http://www.joma-sport.com/ka/apps/joma_com_media/assets/sponsor/svg/129.svg',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLeganés'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLeganés'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetallLeganés'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Rcd_espanyol_logo.svg/708px-Rcd_espanyol_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousEspanyol'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextEspanyol'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetEspanyol'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/SD_Eibar_logo.svg/653px-SD_Eibar_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousEibar'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextEibar'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetEibar'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/732px-Real_Madrid_CF.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousReal Madrid'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextReal Madrid'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetReal Madrid'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/RC_Deportivo_La_Coru%C3%B1a_logo.svg/926px-RC_Deportivo_La_Coru%C3%B1a_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousDeportivo de La Coruña'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextDeportivo de La Coruña'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetDeportivo de La Coruña'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'image_url': 'http://2.bp.blogspot.com/-AjfAudNVzaY/U_aAa1P_7-I/AAAAAAAADtY/dp4aPJOSTBA/s1600/Logo%2BBarcelona%2BFC.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBarcelona'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBarcelona'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBarcelona'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Atletico_Madrid_logo.svg/800px-Atletico_Madrid_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousAtlético Madrid'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextAtlético Madrid'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetAtlético Madrid'
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

function bundesligateam1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=48',
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
                'image_url':  'http://vignette1.wikia.nocookie.net/logopedia/images/c/cc/Bayern-M%C3%BCnchen-old-logo.png/revision/latest?cb=20120212092217',

                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBayern Munich'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBayern Munich'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBayern Munich'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/2000px-Eintracht_Frankfurt_Logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousEintracht Frankfurt'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextEintracht Frankfurt'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetEintracht Frankfurt'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'https://i.ytimg.com/vi/yQvva7WXCLo/maxresdefault.jpg',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBorussia Dortmund'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBorussia Dortmund'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBorussia Dortmund'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'http://logodatabases.com/wp-content/uploads/2012/05/fc-schalke-04-logo.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSchalke 04'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSchalke 04'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSchalke 04'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'http://www.logotypes101.com/free_vector_logo_png/112709/935B37CEF3DE6948D90803DD28997E6E/Mainz_05',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMainz 05'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMainz 05'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMainz 05'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'http://logosvector.net/wp-content/uploads/2013/03/hamburg-vector-logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousHamburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextHamburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetHamburg'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_Hoffenheim.svg/929px-Logo_TSG_Hoffenheim.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousHoffenheim'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextHoffenheim'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetHoffenheim'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/2000px-SV-Werder-Bremen-Logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousWerder Bremen'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextWerder Bremen'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetWerder Bremen'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/FC_Augsburg_logo.svg/785px-FC_Augsburg_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousAugsburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextAugsburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetAugsburg'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'http://www.footballticketnet.com/files/images/logos/SV-Darmstadt-98-Logo-FootballTicketNet.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousDarmstadt 98'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextDarmstadt 98'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetDarmstadt 98'
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

function bundesligateam2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=48',
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
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Hertha_BSC_Logo_2012.svg/1107px-Hertha_BSC_Logo_2012.svg.png',
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousHertha Berlin'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextHertha Berlin'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetHertha Berlin'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'https://s-media-cache-ak0.pinimg.com/originals/3c/e0/92/3ce092cb1e0c3f777bae25c9d65b0911.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousWolfsburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextWolfsburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetWolfsburg'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/2000px-Borussia_M%C3%B6nchengladbach_logo.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBorussia Mönchengladbach'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBorussia Mönchengladbach'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBorussia Mönchengladbach'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBayer Leverkusen'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBayer Leverkusen'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBayer Leverkusen'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/FC_Ingolstadt_04_logo.svg/926px-FC_Ingolstadt_04_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousIngolstadt 04'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextIngolstadt 04'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetIngolstadt 04'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/de/d/d4/RB_Leipzig_2010_logo.svg',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLeipzig'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLeipzig'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLeipzig'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'http://www.vectorportal.com/img_novi/scfreiburg_4316.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousFreiburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextFreiburg'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetFreiburg'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/7/71/Fc_cologne.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousCologne'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextCologne'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetCologne'
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

function serieateam1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=49',
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
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg',

                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousTorino'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextTorino'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetTorino'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/SS_Lazio.svg/1280px-SS_Lazio.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLazio'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLazio'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLazio'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'http://3.bp.blogspot.com/-SZySxCLKp1c/U-7zEB6mHGI/AAAAAAAADZk/PccHLgTsRi8/s1600/Logo%2BBologna%2BFC.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBologna'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBologna'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBologna'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/US_Sassuolo_Calcio_logo.svg/941px-US_Sassuolo_Calcio_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSassuolo'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSassuolo'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSassuolo'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'http://logodatabases.com/wp-content/uploads/2012/05/SSC-Napoli-Logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousNapoli'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextNapoli'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetNapoli'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/US_Citt%C3%A0_di_Palermo_Logo.svg/742px-US_Citt%C3%A0_di_Palermo_Logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousPalermo'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextPalermo'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetPalermo'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'http://vignette4.wikia.nocookie.net/logopedia/images/e/eb/Udinese@2.-other-logo.png/revision/latest?cb=20120308193929',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousUdinese'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextUdinese'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetUdinese'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/ACF_Fiorentina_2.svg/700px-ACF_Fiorentina_2.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousFiorentina'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextFiorentina'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetFiorentina'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/4/4e/Genoa_cfc.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousGenoa'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextGenoa'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetGenoa'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/2/27/FC_Crotone_Logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousCrotone'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextCrotone'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetCrotone'
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

function serieateam2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=49',
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
                'image_url': 'https://qph.ec.quoracdn.net/main-qimg-f7ddae6b6eb4c37793e4c85152a31b99?convert_to_webp=true',
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMilan'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMilan'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMilan'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'http://upload.wikimedia.org/wikipedia/it/7/72/Pescarastemma.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousPescara'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextPescara'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetPescara'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/f/f7/Sampdoria_badge.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSampdoria'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSampdoria'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSampdoria'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'http://vignette3.wikia.nocookie.net/fifa/images/c/c3/Empoli_FC_logo.png/revision/latest?cb=20140709074233',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousEmpoli'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextEmpoli'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetEmpoli'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/a/a8/Cagliari_Calcio_1920.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousCagliari'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextCagliari'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetCagliari'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/AtalantaBC.svg/657px-AtalantaBC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousAtalanta'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextAtalanta'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetAtalanta'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'http://logodatabases.com/wp-content/uploads/2012/05/chievoverona-logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousChievoVerona'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextChievoVerona'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetChievoVerona'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://s-media-cache-ak0.pinimg.com/originals/75/97/51/759751cb23d9067091237d3f3762b158.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousJuventus'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextJuventus'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetJuventus'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'image_url': 'http://2.bp.blogspot.com/-2ZUsQFs0LBo/U3OyCWeIkWI/AAAAAAAAIC4/cgC3UhSJimk/s1600/Logo+AS_Roma.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousRoma'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextRoma'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetRoma'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'image_url': 'http://www.99sportslogos.com/wp-content/uploads/2013/07/Inter-Milan-Logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousInter Milan'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextInter Milan'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetInter Milan'
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

function ligue1team1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=47',
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
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Olympique_Lyonnais.svg/883px-Olympique_Lyonnais.svg.png',

                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLyon'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLyon'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLyon'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'https://www.fotbollsresoronline.se/content/uploads/2015/11/Fotbollsresa_Montpellier.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMontpellier'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMontpellier'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMontpellier'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Dijon_FCO_logo.svg/949px-Dijon_FCO_logo.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousDijon'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextDijon'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetDijon'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/e/e4/Paris_Saint-Germain_F.C..png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousParis Saint Germain'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextParis Saint Germain'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetParis Saint Germain'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'https://yt3.ggpht.com/-T9KPAvHqpv0/AAAAAAAAAAI/AAAAAAAAAAA/v-bKQJvMc2w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousNancy'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextNancy'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetNancy'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Olympique_de_Marseille_logo.svg/791px-Olympique_de_Marseille_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMarseille'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMarseille'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMarseille'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Lille_OSC_logo.svg/590px-Lille_OSC_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLille'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLille'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLille'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Stade_Rennais_FC.svg/927px-Stade_Rennais_FC.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousStade Rennais'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextStade Rennais'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetStade Rennais'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'https://hdlogo.files.wordpress.com/2014/01/as-monaco-fc-hd-logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMonaco'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMonaco'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMonaco'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/1/11/FC_Girondins_de_Bordeaux_logo.svg',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBordeaux'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBordeaux'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBordeaux'
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

function ligue1team2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=47',
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
                'image_url': 'http://www.logo-world.net/wp-content/uploads/France/Ligue%201/SM-Caen-2016-877.png',
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousStade Malherbe Caen'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextStade Malherbe Caen'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetStade Malherbe Caen'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'http://www.hotscoreth.com/2016/wp-content/uploads/2016/09/FC_Metz_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMetz'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMetz'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMetz'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Toulouse_FC_logo.svg/1024px-Toulouse_FC_logo.svg.png',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousToulouse'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextToulouse'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetToulouse'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/FC_Nantes_logo.svg/415px-FC_Nantes_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousNantes'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextNantes'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetNantes'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_AS_Saint-%C3%89tienne.svg/749px-Logo_AS_Saint-%C3%89tienne.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSaint Étienne'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSaint Étienne'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSaint Étienne'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'https://hdlogo.files.wordpress.com/2014/01/ogc-nice-hd-logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousNice'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextNice'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetNice'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'http://www.99sportslogos.com/wp-content/uploads/2013/04/Angers-SCO-Logo.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousAngers'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextAngers'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetAngers'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://pbs.twimg.com/media/COzc_tdWsAAmv7U.png:large',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBastia'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBastia'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBastia'
                }]
              }, {
                'title': '19  '+JSON.parse(body)[18].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/commons/2/24/En-Avant-Guingamp-840.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[18].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousGuingamp'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextGuingamp'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetGuingamp'
                }]
              }  , {
                'title': '20  '+JSON.parse(body)[19].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/FC_Lorient_logo.svg/717px-FC_Lorient_logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[19].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousLorient'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextLorient'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetLorient'
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

function thaileagueteam1(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=151',
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
                'image_url':  'http://3.bp.blogspot.com/-YNcFtCZ4dvc/VmF1O52uviI/AAAAAAAAAFo/RRxRHhcS0zI/s1600/Chiangrai-Utd.png',

                'subtitle':"Stadium: "+JSON.parse(body)[0].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousChiangrai United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextChiangrai United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetChiangrai United'
                }]
              }, {
                'title': '2  '+JSON.parse(body)[1].name,
                'image_url':  'http://www.chonburifootballclub.com/images/CHONBURI/logo%20team/chonburi.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[1].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousChonburi'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextChonburi'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetChonburi'
                }]
              }, {
                'title': '3  '+JSON.parse(body)[2].name,
                'image_url':  'http://3.bp.blogspot.com/-b1sfQ0J-tzI/VmFwTNzuBJI/AAAAAAAAAEg/-tglxK35dy4/s1600/MTUTD.png',
                'subtitle': "Stadium: "+JSON.parse(body)[2].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousMuangthong United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextMuangthong United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetMuangthong United'
                }]
              }, {
                'title': '4  '+JSON.parse(body)[3].name,
                'image_url':  'http://1.bp.blogspot.com/-k7ifdlZ7Y80/VmF17IO5dhI/AAAAAAAAAFw/4aJFU85-BiI/s1600/Nakhonratchasima-FC.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[3].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousNakhon Ratchasima'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextNakhon Ratchasima'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetNakhon Ratchasima'
                }]
              }, {
                'title': '5  '+JSON.parse(body)[4].name,
                'image_url':  'http://www.mediafire.com/convkey/b985/526udjyxj8k6f34zg.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[4].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousRoyal Thai Navy'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextRoyal Thai Navy'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetRoyal Thai Navy'
                }]
              }, {
                'title': '6  '+JSON.parse(body)[5].name,
                'image_url':  'http://1.bp.blogspot.com/-Q7aYFXfnv7M/VmF3XX9fOlI/AAAAAAAAAGA/jzNlaRXknY4/s1600/Osotspa.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[5].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousOsotspa Saraburi'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextOsotspa Saraburi'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetOsotspa Saraburi'
                }]
              }, {
                'title': '7  '+JSON.parse(body)[6].name,
                'image_url':  'http://www.ratchaburifc.com/images/logo_ratchaburi2012.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[6].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousRatchaburi Mitr Phol'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextRatchaburi Mitr Phol'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetRatchaburi Mitr Phol'
                }]
              }, {
                'title': '8  '+JSON.parse(body)[7].name,
                'image_url':  'https://koyababymand.files.wordpress.com/2010/08/1250950353.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[7].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSisaket'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSisaket'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSisaket'
                }]
              }, {
                'title': '9  '+JSON.parse(body)[8].name,
                'image_url':  'http://www.bahiscipro.com/takimlogo/8/8064.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[8].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSuphanburi'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSuphanburi'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSuphanburi'
                }]
              }  , {
                'title': '10  '+JSON.parse(body)[9].name,
                'image_url':  'https://upload.wikimedia.org/wikipedia/en/4/4f/Pattaya_United_F.C..png',
                'subtitle':"Stadium: "+ JSON.parse(body)[9].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousPattaya United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextPattaya United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetPattaya United'
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

function thaileagueteam2(sender){

    var options = {
      url: 'https://api.crowdscores.com/v1/teams?competition_ids=151',
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
                'image_url': 'http://football.kapook.com/uploads/logo/BBCU.png',
                'subtitle':"Stadium: "+JSON.parse(body)[10].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBBCU'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBBCU'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBBCU'
                }]
              }, {
                'title': '12  '+JSON.parse(body)[11].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Army_United_F.C._logo.svg/1093px-Army_United_F.C._logo.svg.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[11].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousArmy United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextArmy United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetArmy United'
                }]
              }, {
                'title': '13  '+JSON.parse(body)[12].name,
                'image_url': 'http://img.tarad.com/shop/l/logothailand/img-lib/spd_20120722221657_b.jpg',
                'subtitle': "Stadium: "+JSON.parse(body)[12].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBangkok Glass'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBangkok Glass'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBangkok Glass'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'http://3.bp.blogspot.com/-OkNAy9T4Jgo/VgqOiTI35sI/AAAAAAAAYJw/nOr1SQ_YLOI/s1600/Bangkok-United-FC-Logo-eps-vector-image.jpg',
                'subtitle':"Stadium: "+ JSON.parse(body)[13].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBangkok United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBangkok United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBangkok United'
                }]
              }, {
                'title': '15  '+JSON.parse(body)[14].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/8/87/BEC-Tero_Sasana.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[14].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBEC Tero Sasana'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBEC Tero Sasana'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBEC Tero Sasana'
                }]
              }, {
                'title': '16  '+JSON.parse(body)[15].name,
                'image_url': 'http://www.thaisportslive.net/Thailogo/SukhothaiFC.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[15].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousSukhothai'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextSukhothai'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetSukhothai'
                }]
              }, {
                'title': '17  '+JSON.parse(body)[16].name,
                'image_url': 'http://upic.me/i/1m/buriramunited.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[16].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousBuriram United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextBuriram United'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetBuriram United'
                }]
              }, {
                'title': '18  '+JSON.parse(body)[17].name,
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/d/de/ChainatFC-logo2013.png',
                'subtitle':"Stadium: "+ JSON.parse(body)[17].defaultHomeVenue.name ,
                'buttons': [{
                  'type': 'postback',
                  'title': 'แมตช์ล่าสุด',
                  'payload': 'matchpreviousChainat Hornbill'
                },{
                  'type': 'postback',
                  'title': 'แมตช์หน้า',
                  'payload': 'matchnextChainat Hornbill'
                },{
                  'type': 'postback',
                  'title': 'แมตช์ที่ยังไม่แข่ง',
                  'payload': 'matchyetChainat Hornbill'
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
            'payload': 'premierleaguetable'
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'premierleagueteam'
          }]
        }, {
        'title': 'La liga',
        'subtitle': 'Spain',
        'image_url': 'https://www.bbva.com/en/data/8663082015/logo-liga-bbva-azul.jpg',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.laliga.es/en',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'laligatable'
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'laligateam'
            }]
        }, {
        'title': 'Bundesliga',
        'subtitle': 'German',
        'image_url': 'http://4.bp.blogspot.com/-wumnC-FeJN0/U87Ng9BAWEI/AAAAAAAAC6I/07HkbDi3V9c/s1600/Logo+Bundesliga.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.bundesliga.com/en/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'bundesligatable'
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'bundesligateam'
            }]
        }, {
        'title': 'Serie A',
        'subtitle': 'Italy',
        'image_url': 'http://2.bp.blogspot.com/-3En8qZGQ2AE/U_YVLBoL0jI/AAAAAAAADrk/kpSpfnbTOgw/s1600/Logo%2BSerie-A%2BItaly.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.legaseriea.it/en/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'serieatable'
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'serieateam'
            }]
        }, {
        'title': 'Ligue 1',
        'subtitle': 'France',
        'image_url': 'http://www.calcioefinanza.it/wp-content/uploads/2015/04/Ligue-13.jpg',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.ligue1.com/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'ligue1table'
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'ligue1team'
            }]
        }, {
        'title': 'Premier League Thailand',
        'subtitle': 'Thai',
        'image_url': 'http://www.teamthailand.in.th/wp-content/uploads/2016/03/Premier-League-Thailand-1-696x464.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.thaileague.co.th/official/',
          'title': 'Web'
        }, {
          'type': 'postback',
          'title': 'Table',
          'payload': 'thaileaguetable'
          }, {
            'type': 'postback',
            'title': 'Team',
            'payload': 'thaileagueteam'
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
