const express = require('express');
const db = require('../database')
const { findScoreAndUpdate, getAllScores } = require('../database/controllers/controllers.js')

const app = express();
app.use(express.static(__dirname + '/../public'));
app.use(express.json());

//post score after game ends
app.post('/score', (req, res) => {
  findScoreAndUpdate(req.body)
    .then(() => {
      res.status(201).send('Success adding in db');
    })
    .catch((err) => {
      console.log('err', err);
      res.sendStatus(400);
    })
})

//get updated score list after game ends. get top 5
app.get('/score', (req, res) => {
  getAllScores()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.log('err in get scores', err);
      res.sendStatus(400);
    })
})

const port = 3200;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})