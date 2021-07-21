'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherInfo = require('./data/weather.json');

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

// app.get('/test', (req, res) => {
//   res.send('test here');
app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const city = new Forecast(weatherInfo.find (city => city_name.toLowerCase() === searchQuery.toLowerCase()));
  // const city = weatherInfo.find

  // res.json
  class Forecast {
    constructor(description, date) {
      this.description = description;
      this.date = date;
      forcastArray = [];
    }
  }
  res(200).send(city.forcastArray);
});

app.listen(PORT, () => {

})
 
