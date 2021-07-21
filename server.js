'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherInfo = require('./data/weather.json');

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let city = (weatherInfo.find (city => city.city_name.toLowerCase() === searchQuery.toLowerCase()));
  
  class Forecast {
    constructor(description, date) {
      this.description = description;
      this.date = date;
    }
  }
  let forcastArray = [];
  city.data.map( (value, idx) => {
    forcastArray.push(new Forecast(value.datetime, `Low of ${value.low_temp}, high of ${value.high_temp}, with ${value.weather.description}`))
  })
  res.send(forcastArray);
});

app.listen(PORT, () => {
console.log(`Proof of life ${PORT}`);
});
 
