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

      if (text === 'mainmenu' || text === 'เมนูหลัก') {
        sendGenericMessage(sender)
        continue
      }
      if (text === 'บอลวันนี้'){
        sendTextMessage(sender,'กรุณารอสักครู่.....')
        setTimeout(function () {  premierleagueToday(sender)  }, 0);
        setTimeout(function () {  laligaToday(sender)  }, 1000);
        setTimeout(function () {  bundesligaToday(sender)  }, 2000);
        setTimeout(function () {  serieaToday(sender)  }, 3000);
        setTimeout(function () {  ligue1Today(sender)  }, 4000);
        setTimeout(function () {  thaileagueToday(sender)  }, 5000);
      }
      if (text === 'บอลพรุ่งนี้'){
        sendTextMessage(sender,'กรุณารอสักครู่.....')
        setTimeout(function () {  premierleagueTomorrow(sender)  }, 0);
        setTimeout(function () {  laligaTomorrow(sender)  }, 1000);
        setTimeout(function () {  bundesligaTomorrow(sender)  }, 2000);
        setTimeout(function () {  serieaTomorrow(sender)  }, 3000);
        setTimeout(function () {  ligue1Tomorrow(sender)  }, 4000);
        setTimeout(function () {  thaileagueTomorrow(sender)  }, 5000);
      }

      if (text === 'คำสั่ง'){
        sendTextMessage(sender, '**คำสั่งทั้งหมดของเรา**\nเมนูหลัก = กลับมาที่เมนูหลัก\nบอลวันนี้ = จะแสดงการแข่งขันของวันนี้\nบอลพรุ่งนี้ = จะแสดงการแข่งขันของวันพรุ่งนี้\nคำสั่ง = แสดงคำสั่งทั้งหมดอีกครั้ง')
      }
      if (text === 'asd') {

        premierleagueTomorrow(sender)
/*
       premierleagueTomorrow(sender)

*/

      }
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
      var payloadtext = event.postback.payload;
      if (payloadtext=== 'futboltoday') {
           sendButtonMessage(recipientId, messageText)
      }
      if (payloadtext === 'USER_DEFINED_PAYLOAD') {

         setTimeout(function () {
        sendGenericMessage (sender)
       }, 10);
        setTimeout(function () {
          sendTextMessage(sender, '**คำสั่งทั้งหมดของเรา**\nเมนูหลัก = กลับมาที่เมนูหลัก\nบอลวันนี้ = จะแสดงการแข่งขันของวันนี้\nบอลพรุ่งนี้ = จะแสดงการแข่งขันของวันพรุ่งนี้\nคำสั่ง = แสดงคำสั่งทั้งหมดอีกครั้ง')

        }, 1000);

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
        premierleaguePrematches(sender, text)

      }
      if (payloadtext === 'matchnextBurnley') {
        let text = "Burnley";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        premierleagueNextmatches(sender, text)

      }
      if (payloadtext === 'matchallBurnley') {
        let text = "Burnley";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLeicester City') {
        let text = "Leicester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        premierleaguePrematches(sender, text)

      }
      if (payloadtext === 'matchnextLeicester City') {
        let text = "Leicester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
         premierleagueNextmatches(sender, text)

      }
      if (payloadtext === 'matchallLeicester City') {
        let text = "Leicester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')

        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousManchester United') {
        let text = "Manchester United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextManchester United') {
        let text = "Manchester United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallManchester United') {
        let text = "Manchester United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousWatford') {
        let text = "Watford";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextWatford') {
        let text = "Watford";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallWatford') {
        let text = "Watford";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLiverpool') {
        let text = "Liverpool";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLiverpool') {
        let text = "Liverpool";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLiverpool') {
        let text = "Liverpool";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSouthampton') {
        let text = "Southampton";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSouthampton') {
        let text = "Southampton";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSouthampton') {
        let text = "Southampton";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousChelsea') {
        let text = "Chelsea";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextChelsea') {
        let text = "Chelsea";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallChelsea') {
        let text = "Chelsea";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousStoke City') {
        let text = "Stoke City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextStoke City') {
        let text = "Stoke City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallStoke City') {
        let text = "Stoke City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMiddlesbrough') {
        let text = "Middlesbrough";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMiddlesbrough') {
        let text = "Middlesbrough";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMiddlesbrough') {
        let text = "Middlesbrough";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousWest Bromwich Albion') {
        let text = "West Bromwich Albion";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextWest Bromwich Albion') {
        let text = "West Bromwich Albion";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallWest Bromwich Albion') {
        let text = "West Bromwich Albion";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousEverton') {
        let text = "Everton";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextEverton') {
        let text = "Everton";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallEverton') {
        let text = "Everton";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousTottenham Hotspur') {
        let text = "Tottenham Hotspur";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextTottenham Hotspur') {
        let text = "Tottenham Hotspur";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallTottenham Hotspur') {
        let text = "Tottenham Hotspur";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBournemouth') {
        let text = "Bournemouth";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBournemouth') {
        let text = "Bournemouth";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBournemouth') {
        let text = "Bournemouth";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSwansea City') {
        let text = "Swansea City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSwansea City') {
        let text = "Swansea City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSwansea City') {
        let text = "Swansea City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousCrystal Palace') {
        let text = "Crystal Palace";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextCrystal Palace') {
        let text = "Crystal Palace";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallCrystal Palace') {
        let text = "Crystal Palace";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousArsenal') {
        let text = "Arsenal";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextArsenal') {
        let text = "Arsenal";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallArsenal') {
        let text = "Arsenal";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousManchester City') {
        let text = "Manchester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextManchester City') {
        let text = "Manchester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallManchester City') {
        let text = "Manchester City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousHull City') {
        let text = "Hull City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextHull City') {
        let text = "Hull City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallHull City') {
        let text = "Hull City";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSunderland') {
        let text = "Sunderland";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSunderland') {
        let text = "Sunderland";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSunderland') {
        let text = "Sunderland";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousWest Ham United') {
        let text = "West Ham United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextWest Ham United') {
        let text = "West Ham United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallWest Ham United') {
        let text = "West Ham United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  premierleaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousAthletic Bilbao') {
        let text = "Athletic Bilbao";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextAthletic Bilbao') {
        let text = "Athletic Bilbao";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallAthletic Bilbao') {
        let text = "Athletic Bilbao";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousReal Betis') {
        let text = "Real Betis";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextReal Betis') {
        let text = "Real Betis";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallReal Betis') {
        let text = "Real Betis";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousValencia') {
        let text = "Valencia";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextValencia') {
        let text = "Valencia";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallValencia') {
        let text = "Valencia";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousReal Sociedad') {
        let text = "Real Sociedad";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextReal Sociedad') {
        let text = "Real Sociedad";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallReal Sociedad') {
        let text = "Real Sociedad";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousDeportivo Alavés') {
        let text = "Deportivo Alavés";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextDeportivo Alavés') {
        let text = "Deportivo Alavés";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallDeportivo Alavés') {
        let text = "Deportivo Alavés";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousCelta de Vigo') {
        let text = "Celta de Vigo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextCelta de Vigo') {
        let text = "Celta de Vigo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallCelta de Vigo') {
        let text = "Celta de Vigo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMálaga') {
        let text = "Málaga";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMálaga') {
        let text = "Málaga";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMálaga') {
        let text = "Málaga";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousOsasuna') {
        let text = "Osasuna";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextOsasuna') {
        let text = "Osasuna";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallOsasuna') {
        let text = "Osasuna";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousGranada') {
        let text = "Granada";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextGranada') {
        let text = "Granada";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallGranada') {
        let text = "Granada";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSevilla') {
        let text = "Sevilla";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSevilla') {
        let text = "Sevilla";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSevilla') {
        let text = "Sevilla";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousVillarreal') {
        let text = "Villarreal";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextVillarreal') {
        let text = "Villarreal";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallVillarreal') {
        let text = "Villarreal";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSporting Gijón') {
        let text = "Sporting Gijón";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSporting Gijón') {
        let text = "Sporting Gijón";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSporting Gijón') {
        let text = "Sporting Gijón";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLas Palmas') {
        let text = "Las Palmas";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLas Palmas') {
        let text = "Las Palmas";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLas Palmas') {
        let text = "Las Palmas";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLeganés') {
        let text = "Leganés";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLeganés') {
        let text = "Leganés";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLeganés') {
        let text = "Leganés";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousEspanyol') {
        let text = "Espanyol";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextEspanyol') {
        let text = "Espanyol";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallEspanyol') {
        let text = "Espanyol";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousEibar') {
        let text = "Eibar";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextEibar') {
        let text = "Eibar";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallEibar') {
        let text = "Eibar";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousReal Madrid') {
        let text = "Real Madrid";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextReal Madrid') {
        let text = "Real Madrid";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallReal Madrid') {
        let text = "Real Madrid";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousDeportivo de La Coruña') {
        let text = "Deportivo de La Coruña";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextDeportivo de La Coruña') {
        let text = "Deportivo de La Coruña";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallDeportivo de La Coruña') {
        let text = "Deportivo de La Coruña";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBarcelona') {
        let text = "Barcelona";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBarcelona') {
        let text = "Barcelona";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBarcelona') {
        let text = "Barcelona";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousAtlético Madrid') {
        let text = "Atlético Madrid";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextAtlético Madrid') {
        let text = "Atlético Madrid";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {laligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallAtlético Madrid') {
        let text = "Atlético Madrid";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  laligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBayern Munich') {
        let text = "Bayern Munich";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBayern Munich') {
        let text = "Bayern Munich";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBayern Munich') {
        let text = "Bayern Munich";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousEintracht Frankfurt') {
        let text = "Eintracht Frankfurt";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextEintracht Frankfurt') {
        let text = "Eintracht Frankfurt";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallEintracht Frankfurt') {
        let text = "Eintracht Frankfurt";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBorussia Dortmund') {
        let text = "Borussia Dortmund";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBorussia Dortmund') {
        let text = "Borussia Dortmund";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBorussia Dortmund') {
        let text = "Borussia Dortmund";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSchalke 04') {
        let text = "Schalke 04";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSchalke 04') {
        let text = "Schalke 04";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSchalke 04') {
        let text = "Schalke 04";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMainz 05') {
        let text = "Mainz 05";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMainz 05') {
        let text = "Mainz 05";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMainz 05') {
        let text = "Mainz 05";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousHamburg') {
        let text = "Hamburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextHamburg') {
        let text = "Hamburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallHamburg') {
        let text = "Hamburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousHoffenheim') {
        let text = "Hoffenheim";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextHoffenheim') {
        let text = "Hoffenheim";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallHoffenheim') {
        let text = "Hoffenheim";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() { bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousWerder Bremen') {
        let text = "Werder Bremen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextWerder Bremen') {
        let text = "Werder Bremen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallWerder Bremen') {
        let text = "Werder Bremen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousAugsburg') {
        let text = "Augsburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextAugsburg') {
        let text = "Augsburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallAugsburg') {
        let text = "Augsburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousDarmstadt 98') {
        let text = "Darmstadt 98";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextDarmstadt 98') {
        let text = "Darmstadt 98";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallDarmstadt 98') {
        let text = "Darmstadt 98";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousHertha Berlin') {
        let text = "Hertha Berlin";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextHertha Berlin') {
        let text = "Hertha Berlin";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {premierleagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallHertha Berlin') {
        let text = "Hertha Berlin";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousWolfsburg') {
        let text = "Wolfsburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextWolfsburg') {
        let text = "Wolfsburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallWolfsburg') {
        let text = "Wolfsburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBorussia Mönchengladbach') {
        let text = "Borussia Mönchengladbach";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBorussia Mönchengladbach') {
        let text = "Borussia Mönchengladbach";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBorussia Mönchengladbach') {
        let text = "Borussia Mönchengladbach";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBayer Leverkusen') {
        let text = "Bayer Leverkusen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBayer Leverkusen') {
        let text = "Bayer Leverkusen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBayer Leverkusen') {
        let text = "Bayer Leverkusen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousIngolstadt 04') {
        let text = "Ingolstadt 04";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextIngolstadt 04') {
        let text = "Ingolstadt 04";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatchesreviousmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallIngolstadt 04') {
        let text = "Ingolstadt 04";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLeipzig') {
        let text = "Leipzig";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLeipzig') {
        let text = "Leipzig";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLeipzig') {
        let text = "Leipzig";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousFreiburg') {
        let text = "Freiburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextFreiburg') {
        let text = "Freiburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallFreiburg') {
        let text = "Freiburg";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousCologne') {
        let text = "Cologne";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextCologne') {
        let text = "Cologne";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {bundesligaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallCologne') {
        let text = "Cologne";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  bundesligamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousTorino') {
        let text = "Torino";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextTorino') {
        let text = "Torino";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallTorino') {
        let text = "Torino";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLazio') {
        let text = "Lazio";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLazio') {
        let text = "Lazio";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLazio') {
        let text = "Lazio";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBologna') {
        let text = "Bologna";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBologna') {
        let text = "Bologna";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBologna') {
        let text = "Bologna";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSassuolo') {
        let text = "Sassuolo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSassuolo') {
        let text = "Sassuolo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSassuolo') {
        let text = "Sassuolo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousNapoli') {
        let text = "Napoli";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextNapoli') {
        let text = "Napoli";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallNapoli') {
        let text = "Napoli";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousPalermo') {
        let text = "Palermo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextPalermo') {
        let text = "Palermo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallPalermo') {
        let text = "Palermo";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousUdinese') {
        let text = "Udinese";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextUdinese') {
        let text = "Udinese";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallUdinese') {
        let text = "Udinese";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousFiorentina') {
        let text = "Fiorentina";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextFiorentina') {
        let text = "Fiorentina";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallFiorentina') {
        let text = "Fiorentina";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousGenoa') {
        let text = "Genoa";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextGenoa') {
        let text = "Genoa";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallGenoa') {
        let text = "Genoa";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousCrotone') {
        let text = "Crotone";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextCrotone') {
        let text = "Crotone";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallCrotone') {
        let text = "Crotone";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMilan') {
        let text = "Milan";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMilan') {
        let text = "Milan";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMilan') {
        let text = "Milan";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousPescara') {
        let text = "Pescara";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextPescara') {
        let text = "Pescara";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallPescara') {
        let text = "Pescara";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSampdoria') {
        let text = "Sampdoria";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSampdoria') {
        let text = "Sampdoria";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSampdoria') {
        let text = "Sampdoria";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousEmpoli') {
        let text = "Empoli";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextEmpoli') {
        let text = "Empoli";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallEmpoli') {
        let text = "Empoli";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousCagliari') {
        let text = "Cagliari";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextCagliari') {
        let text = "Cagliari";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallCagliari') {
        let text = "Cagliari";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousAtalanta') {
        let text = "Atalanta";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextAtalanta') {
        let text = "Atalanta";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallAtalanta') {
        let text = "Atalanta";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousChievoVerona') {
        let text = "ChievoVerona";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextChievoVerona') {
        let text = "ChievoVerona";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallChievoVerona') {
        let text = "ChievoVerona";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousJuventus') {
        let text = "Juventus";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextJuventus') {
        let text = "Juventus";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallJuventus') {
        let text = "Juventus";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousRoma') {
        let text = "Roma";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextRoma') {
        let text = "Roma";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallRoma') {
        let text = "Roma";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousInter Milan') {
        let text = "Inter Milan";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaPrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextInter Milan') {
        let text = "Inter Milan";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {serieaNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallInter Milan') {
        let text = "Inter Milan";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  serieamatchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLyon') {
        let text = "Lyon";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLyon') {
        let text = "Lyon";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLyon') {
        let text = "Lyon";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMontpellier') {
        let text = "Montpellier";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMontpellier') {
        let text = "Montpellier";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMontpellier') {
        let text = "Montpellier";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousDijon') {
        let text = "Dijon";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextDijon') {
        let text = "Dijon";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallDijon') {
        let text = "Dijon";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousParis Saint Germain') {
        let text = "Paris Saint Germain";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextParis Saint Germain') {
        let text = "Paris Saint Germain";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallParis Saint Germain') {
        let text = "Paris Saint Germain";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousNancy') {
        let text = "Nancy";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextNancy') {
        let text = "Nancy";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallNancy') {
        let text = "Nancy";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMarseille') {
        let text = "Marseille";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMarseille') {
        let text = "Marseille";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMarseille') {
        let text = "Marseille";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLille') {
        let text = "Lille";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLille') {
        let text = "Lille";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLille') {
        let text = "Lille";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousStade Rennais') {
        let text = "Stade Rennais";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextStade Rennais') {
        let text = "Stade Rennais";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallStade Rennais') {
        let text = "Stade Rennais";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMonaco') {
        let text = "Monaco";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMonaco') {
        let text = "Monaco";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMonaco') {
        let text = "Monaco";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBordeaux') {
        let text = "Bordeaux";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBordeaux') {
        let text = "Bordeaux";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBordeaux') {
        let text = "Bordeaux";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousStade Malherbe Caen') {
        let text = "Stade Malherbe Caen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextStade Malherbe Caen') {
        let text = "Stade Malherbe Caen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallStade Malherbe Caen') {
        let text = "Stade Malherbe Caen";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMetz') {
        let text = "Metz";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMetz') {
        let text = "Metz";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMetz') {
        let text = "Metz";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousToulouse') {
        let text = "Toulouse";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextToulouse') {
        let text = "Toulouse";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallToulouse') {
        let text = "Toulouse";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousNantes') {
        let text = "Nantes";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextNantes') {
        let text = "Nantes";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallNantes') {
        let text = "Nantes";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSaint Étienne') {
        let text = "Saint Étienne";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSaint Étienne') {
        let text = "Saint Étienne";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSaint Étienne') {
        let text = "Saint Étienne";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousNice') {
        let text = "Nice";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextNice') {
        let text = "Nice";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallNice') {
        let text = "Nice";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousAngers') {
        let text = "Angers";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextAngers') {
        let text = "Angers";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallAngers') {
        let text = "Angers";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBastia') {
        let text = "Bastia";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBastia') {
        let text = "Bastia";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBastia') {
        let text = "Bastia";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousGuingamp') {
        let text = "Guingamp";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextGuingamp') {
        let text = "Guingamp";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallGuingamp') {
        let text = "Guingamp";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousLorient') {
        let text = "Lorient";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Prematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextLorient') {
        let text = "Lorient";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {ligue1Nextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallLorient') {
        let text = "Lorient";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  ligue1matchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousChiangrai United') {
        let text = "Chiangrai United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextChiangrai United') {
        let text = "Chiangrai United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallChiangrai United') {
        let text = "Chiangrai United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousChonburi') {
        let text = "Chonburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextChonburi') {
        let text = "Chonburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallChonburi') {
        let text = "Chonburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousMuangthong United') {
        let text = "Muangthong United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextMuangthong United') {
        let text = "Muangthong United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallMuangthong United') {
        let text = "Muangthong United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousNakhon Ratchasima') {
        let text = "Nakhon Ratchasima";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextNakhon Ratchasima') {
        let text = "Nakhon Ratchasima";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallNakhon Ratchasima') {
        let text = "Nakhon Ratchasima";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousRoyal Thai Navy') {
        let text = "Royal Thai Navy";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextRoyal Thai Navy') {
        let text = "Royal Thai Navy";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallRoyal Thai Navy') {
        let text = "Royal Thai Navy";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousOsotspa Saraburi') {
        let text = "Osotspa Saraburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextOsotspa Saraburi') {
        let text = "Osotspa Saraburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallOsotspa Saraburi') {
        let text = "Osotspa Saraburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousRatchaburi Mitr Phol') {
        let text = "Ratchaburi Mitr Phol";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextRatchaburi Mitr Phol') {
        let text = "Ratchaburi Mitr Phol";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallRatchaburi Mitr Phol') {
        let text = "Ratchaburi Mitr Phol";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSisaket') {
        let text = "Sisaket";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSisaket') {
        let text = "Sisaket";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSisaket') {
        let text = "Sisaket";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSuphanburi') {
        let text = "Suphanburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSuphanburi') {
        let text = "Suphanburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSuphanburi') {
        let text = "Suphanburi";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousPattaya United') {
        let text = "Pattaya United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextPattaya United') {
        let text = "Pattaya United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallPattaya United') {
        let text = "Pattaya United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBBCU') {
        let text = "BBCU";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBBCU') {
        let text = "BBCU";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBBCU') {
        let text = "BBCU";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousArmy United') {
        let text = "Army United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextArmy United') {
        let text = "Army United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallArmy United') {
        let text = "Army United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBangkok Glass') {
        let text = "Bangkok Glass";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBangkok Glass') {
        let text = "Bangkok Glass";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBangkok Glass') {
        let text = "Bangkok Glass";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBangkok United') {
        let text = "Bangkok United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBangkok United') {
        let text = "Bangkok United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBangkok United') {
        let text = "Bangkok United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBEC Tero Sasana') {
        let text = "BEC Tero Sasana";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBEC Tero Sasana') {
        let text = "BEC Tero Sasana";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBEC Tero Sasana') {
        let text = "BEC Tero Sasana";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousSukhothai') {
        let text = "Sukhothai";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextSukhothai') {
        let text = "Sukhothai";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallSukhothai') {
        let text = "Sukhothai";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousBuriram United') {
        let text = "Buriram United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextBuriram United') {
        let text = "Buriram United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallBuriram United') {
        let text = "Buriram United";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

      }

      if (payloadtext === 'matchpreviousChainat Hornbill') {
        let text = "Chainat Hornbill";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileaguePrematches(sender, text)}, 100);

      }
      if (payloadtext === 'matchnextChainat Hornbill') {
        let text = "Chainat Hornbill";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function () {thaileagueNextmatches(sender, text)}, 100);

      }
      if (payloadtext === 'matchallChainat Hornbill') {
        let text = "Chainat Hornbill";
        sendTextMessage(sender, 'กรุณารอสักครู่..')
        setTimeout(function() {  thaileaguematchesAll(sender, text)}, 100);

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

//tomorrow
function premierleagueTomorrow(sender){
  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=2',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }
    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
          todaycheck()
           var newdate = newdate1;
         for (var i = 0; i < JSON.parse(body).length; i++) {

            doSetTimeout(i);
  }
            function doSetTimeout(i) {
             setTimeout(function() {
               let time = JSON.stringify(JSON.parse(body)[i].start)
               var str = time;
               var num = parseInt(str.replace(/[^0-9]/g, time));
               var realdate = new Date(num);
               realdate.setHours(realdate.getHours() +7);
               var date = new Date(realdate).toUTCString();
               var cdate = new Date(realdate);

               var monthapi = cdate.getUTCMonth()+1; //months from 1-12
               var dayapi = cdate.getUTCDate();
               var yearapi = cdate.getUTCFullYear();
               var dateapi = yearapi + "/" + monthapi + "/" + dayapi;


          if (dateapi === newdate) {

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function laligaTomorrow(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;

       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + day;

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function bundesligaTomorrow(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;



       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + (day+1);


             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function serieaTomorrow(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;



       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + (day+1);


             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function ligue1Tomorrow(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;



       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + (day+1);

                 if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function thaileagueTomorrow(sender){
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

     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;

       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + (day+1);

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

//today

function premierleagueToday(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;

       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + day;

             if (JSON.parse(body)[i].outcome !== null) {
                 sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function laligaToday(sender){
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

     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;



       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + day;

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function bundesligaToday(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;

       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + day;

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function serieaToday(sender){
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

     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;



       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + day;

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function ligue1Today(sender){
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
     if (dateapi === newdate) {
       let time = JSON.stringify(JSON.parse(body)[i].start)
       var str = time;
       var num = parseInt(str.replace(/[^0-9]/g, time));
       var realdate = new Date(num);
       realdate.setHours(realdate.getHours() +7);
       var date = new Date(realdate).toUTCString();
       var cdate = new Date(realdate);

       var monthapi = cdate.getUTCMonth()+1; //months from 1-12
       var dayapi = cdate.getUTCDate();
       var yearapi = cdate.getUTCFullYear();
       var dateapi = yearapi + "/" + monthapi + "/" + dayapi;

       var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
       var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
       var newdate = year + "/" + month + "/" + day;

                 if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}

function thaileagueToday(sender){
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
     if (dateapi === newdate) {
        let time = JSON.stringify(JSON.parse(body)[i].start)
        var str = time;
        var num = parseInt(str.replace(/[^0-9]/g, time));
        var realdate = new Date(num);
        realdate.setHours(realdate.getHours() +7);
        var date = new Date(realdate).toUTCString();
        var cdate = new Date(realdate);

        var monthapi = cdate.getUTCMonth()+1; //months from 1-12
        var dayapi = cdate.getUTCDate();
        var yearapi = cdate.getUTCFullYear();
        var dateapi = yearapi + "/" + monthapi + "/" + dayapi;



        var dateObj = new Date();
         var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
         var year = dateObj.getUTCFullYear();
        var newdate = year + "/" + month + "/" + day;

             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }


         }
       }, i*500);
                          }
                 }
            }

  request(options, callback)

}






//previous matches

function premierleaguePrematches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=2',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = (JSON.parse(body).length)-1;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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

function laligaPrematches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=46',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = (JSON.parse(body).length)-1;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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

function bundesligaPrematches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=48',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = (JSON.parse(body).length)-1;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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

function serieaPrematches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=49',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = (JSON.parse(body).length)-1;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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

function ligue1Prematches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=47',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = (JSON.parse(body).length)-1;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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

function thaileaguePrematches(sender, text){


  var options = {
    url: 'https://api.crowdscores.com/v1/matches?competition_id=151',
    headers: {
      'x-crowdscores-api-key': '913c96f103e1455680ea7fa572422835'
    }
  }

    function callback (error, response, body) {


       if (!error && response.statusCode === 200) {
      var b = 0;
      var ai = (JSON.parse(body).length)-1;
         do {
           let time = JSON.stringify(JSON.parse(body)[ai].start)
           var str = time;
           var num = parseInt(str.replace(/[^0-9]/g, time));
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[ai].homeTeam.name == text ||JSON.parse(body)[ai].awayTeam.name == text ) {
                    if (JSON.parse(body)[ai].outcome !== null) {
                      sendTextMessage(sender, JSON.parse(body)[ai].homeTeam.name +"\n" +JSON.parse(body)[ai].homeGoals +" - "
                       +JSON.parse(body)[ai].awayGoals+"\n"+JSON.parse(body)[ai].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
           var realdate = new Date(num);
           realdate.setHours(realdate.getHours() +7);
           var date = new Date(realdate).toUTCString();
                  if (JSON.parse(body)[i].homeTeam.name == text ||JSON.parse(body)[i].awayTeam.name == text ) {
                    if (JSON.parse(body)[i].outcome === null) {
                      sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                    +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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



//matches all
function premierleaguematchesAll(sender, text){
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
              var realdate = new Date(num);
              realdate.setHours(realdate.getHours() +7);
              var date = new Date(realdate).toUTCString();

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
            }



         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function laligamatchesAll(sender, text){
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
              var realdate = new Date(num);
              realdate.setHours(realdate.getHours() +7);
              var date = new Date(realdate).toUTCString();

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
            }



         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function bundesligamatchesAll(sender, text){
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
              var realdate = new Date(num);
              realdate.setHours(realdate.getHours() +7);
              var date = new Date(realdate).toUTCString();

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
            }



         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function serieamatchesAll(sender, text){
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
              var realdate = new Date(num);
              realdate.setHours(realdate.getHours() +7);
              var date = new Date(realdate).toUTCString();

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
            }



         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function ligue1matchesAll(sender, text){
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
              var realdate = new Date(num);
              realdate.setHours(realdate.getHours() +7);
              var date = new Date(realdate).toUTCString();

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
            }



         }
            }, i*110);
                          }
                 }
            }

  request(options, callback)

}

function thaileaguematchesAll(sender, text){
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
              var realdate = new Date(num);
              realdate.setHours(realdate.getHours() +7);
              var date = new Date(realdate).toUTCString();

        if (JSON.parse(body)[i].homeTeam.name == text ) {
             if (JSON.parse(body)[i].outcome !== null) {
               sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                 }
               if (JSON.parse(body)[i].outcome == null) {
              sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                  +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                     }



             }
           if (JSON.parse(body)[i].awayTeam.name == text ) {
                if (JSON.parse(body)[i].outcome !== null) {
                     sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\n" +JSON.parse(body)[i].homeGoals +" - "
                   +JSON.parse(body)[i].awayGoals+"\n"+JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
                  }
               if (JSON.parse(body)[i].outcome == null ) {
                sendTextMessage(sender, JSON.parse(body)[i].homeTeam.name +"\nvs\n"
                 +JSON.parse(body)[i].awayTeam.name +"\nวันเวลาที่แข่ง\n"+ date +" +7"  )
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBurnley'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLeicester City'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallManchester United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallWatford'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLiverpool'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSouthampton'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallChelsea'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallStoke City'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMiddlesbrough'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallWest Bromwich Albion'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallEverton'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallTottenham Hotspur'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBournemouth'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSwansea City'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallCrystal Palace'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallArsenal'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallManchester City'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallHull City'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSunderland'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallWest Ham United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallAthletic Bilbao'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallReal Betis'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallValencia'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallReal Sociedad'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallDeportivo Alavés'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallCelta de Vigo'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMálaga'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallOsasuna'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallGranada'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSevilla'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallVillarreal'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSporting Gijón'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLas Palmas'
                }]
              }, {
                'title': '14  '+JSON.parse(body)[13].name,
                'image_url': 'http://www.footballlogosandkits.com/images_esc3/ESPA/MADRID/escudos_jpg/logo-c.d.%20leganes.jpg',
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallallLeganés'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallEspanyol'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallEibar'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallReal Madrid'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallDeportivo de La Coruña'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBarcelona'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallAtlético Madrid'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBayern Munich'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallEintracht Frankfurt'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBorussia Dortmund'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSchalke 04'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMainz 05'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallHamburg'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallHoffenheim'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallWerder Bremen'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallAugsburg'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallDarmstadt 98'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallHertha Berlin'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallWolfsburg'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBorussia Mönchengladbach'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBayer Leverkusen'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallIngolstadt 04'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLeipzig'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallFreiburg'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallCologne'
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
                'image_url':  'https://serieanewsig.files.wordpress.com/2015/09/img_7944.png',

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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallTorino'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLazio'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBologna'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSassuolo'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallNapoli'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallPalermo'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallUdinese'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallFiorentina'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallGenoa'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallCrotone'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMilan'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallPescara'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSampdoria'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallEmpoli'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallCagliari'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallAtalanta'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallChievoVerona'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallJuventus'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallRoma'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallInter Milan'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLyon'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMontpellier'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallDijon'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallParis Saint Germain'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallNancy'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMarseille'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLille'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallStade Rennais'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMonaco'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBordeaux'
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
                'image_url': 'http://cdn.playbuzz.com/cdn/25498500-8054-410a-82bf-b68a2447ce6e/8a223544-5f0c-40b0-8271-946769e3d514.jpg',
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallStade Malherbe Caen'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMetz'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallToulouse'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallNantes'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSaint Étienne'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallNice'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallAngers'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBastia'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallGuingamp'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallLorient'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallChiangrai United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallChonburi'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallMuangthong United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallNakhon Ratchasima'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallRoyal Thai Navy'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallOsotspa Saraburi'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallRatchaburi Mitr Phol'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSisaket'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSuphanburi'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallPattaya United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBBCU'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallArmy United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBangkok Glass'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBangkok United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBEC Tero Sasana'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallSukhothai'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallBuriram United'
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
                  'title': 'แมตช์ทั้งหมด',
                  'payload': 'matchallChainat Hornbill'
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


function todaycheck() {
  var dateObj = new Date();
   var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
   var year = dateObj.getUTCFullYear();
  var newdate1 = year + "/" + month + "/" + (day+1);
  return newdate1;
}
//menu
function sendGenericMessage(sender) {
  let messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [{
          'title': 'Premier league',
          'subtitle': 'England',
          'image_url': 'https://lh3.googleusercontent.com/-EQPiqGtIjK0/WCdAucVWzLI/AAAAAAAAITg/vIAkCtWB5nQ0DPGrFJTQ_8EmT0TReQWCQCJoC/w800-h800/Premier_League_Rebrands_DesignStudio_02.jpg',
          'buttons': [{
            'type': 'web_url',
            'url': 'https://www.premierleague.com',
            'title': 'เว็บไซต์'
          }, {
            'type': 'postback',
            'title': 'ตารางคะแนน',
            'payload': 'premierleaguetable'
          }, {
            'type': 'postback',
            'title': 'ทีม',
            'payload': 'premierleagueteam'
          }]
        }, {
        'title': 'La liga',
        'subtitle': 'Spain',
        'image_url': 'http://worldsoccertalk.com/wp-content/uploads/2015/06/la-liga.jpg',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.laliga.es/en',
          'title': 'เว็บไซต์'
        }, {
          'type': 'postback',
          'title': 'ตารางคะแนน',
          'payload': 'laligatable'
          }, {
            'type': 'postback',
            'title': 'ทีม',
            'payload': 'laligateam'
            }]
        }, {
        'title': 'Bundesliga',
        'subtitle': 'German',
        'image_url': 'http://4.bp.blogspot.com/-wumnC-FeJN0/U87Ng9BAWEI/AAAAAAAAC6I/07HkbDi3V9c/s1600/Logo+Bundesliga.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.bundesliga.com/en/',
          'title': 'เว็บไซต์'
        }, {
          'type': 'postback',
          'title': 'ตารางคะแนน',
          'payload': 'bundesligatable'
          }, {
            'type': 'postback',
            'title': 'ทีม',
            'payload': 'bundesligateam'
            }]
        }, {
        'title': 'Serie A',
        'subtitle': 'Italy',
        'image_url': 'http://2.bp.blogspot.com/-3En8qZGQ2AE/U_YVLBoL0jI/AAAAAAAADrk/kpSpfnbTOgw/s1600/Logo%2BSerie-A%2BItaly.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.legaseriea.it/en/',
          'title': 'เว็บไซต์'
        }, {
          'type': 'postback',
          'title': 'ตารางคะแนน',
          'payload': 'serieatable'
          }, {
            'type': 'postback',
            'title': 'ทีม',
            'payload': 'serieateam'
            }]
        }, {
        'title': 'Ligue 1',
        'subtitle': 'France',
        'image_url': 'http://www.calcioefinanza.it/wp-content/uploads/2015/04/Ligue-13.jpg',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.ligue1.com/',
          'title': 'เว็บไซต์'
        }, {
          'type': 'postback',
          'title': 'ตารางคะแนน',
          'payload': 'ligue1table'
          }, {
            'type': 'postback',
            'title': 'ทีม',
            'payload': 'ligue1team'
            }]
        }, {
        'title': 'Premier League Thailand',
        'subtitle': 'Thai',
        'image_url': 'http://www.teamthailand.in.th/wp-content/uploads/2016/03/Premier-League-Thailand-1-696x464.png',
        'buttons': [{
          'type': 'web_url',
          'url': 'http://www.thaileague.co.th/official/',
          'title': 'เว็บไซต์'
        }, {
          'type': 'postback',
          'title': 'ตารางคะแนน',
          'payload': 'thaileaguetable'
          }, {
            'type': 'postback',
            'title': 'ทีม',
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

function sendButtonMessage(recipientId, messageText){
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text : "คุณอยากรู้อะไร",
            buttons: [{
              type: "postback",
              title: "บอลวันนี้",
              payload: "futboltoday"
            },
            {
              type: "postback",
              title: "บอลพรุ่งนี้",
              payload: "futboltomorrow"
            }]
        }
      }
    }
  };
  callSendAPI(messageData);
}

function callSendAPI(messageData){
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAYzVx44hnYBAJC5p0A43nJeZACXOyFqSouWNZBUXl1rSWH7Nuu63oM4rdZBWsVr3Nb9WdwCZCf70fR45ZC0WcCJX5rcQOcp0vFw6HOexkRpkW8B6Xmoyb9ITaMZCcq3xzMbYjKci1bXfww9ZB9w2HFc0mC2gfuJ6MQIU8V4AQafgZDZD' },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s",
          messageId, recipientId);
      } else {
      console.log("Successfully called Send API for recipient %s",
        recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}

app.listen(app.get('port'), function () {
console.log('running on port', app.get('port'))
})
