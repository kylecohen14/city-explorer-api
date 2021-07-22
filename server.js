'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const weatherInfo = require('./data/weather.json');
const axios = require('axios');
// what imports are wrong

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


app.get('/weather', getWeather);

async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/current?key=${process.env.REACT_APP_WEATHER_API}&city=${searchQuery}`;

  // `https://api.weatherbit.io/v2.0/current?key=c6d7bd368195479aadc2439994fd0b4d&city=seattle`
  // c6d7bd368195479aadc2439994fd0b4d

  try {
    let weather = await axios.get(url);
    // weather?
    let forecastArray = [];
    weather.data.data.map( (value, idx) => {
      forecastArray.push(new Forecast(value.datetime, `Avg temp of ${value.temp}, with ${value.weather.description}`))
  })
  res.status(200).send(forecastArray)
} 
catch(err) {
  console.log('error:, err', err);
  res.status(500).send('error: something to fix.');
}
}
// function pageError(req, res) {
//   res.status(404).send('route failed, check spelling');
// }

  class Forecast {
    constructor(description, datetime, temp) {
      this.datetime = datetime;
      this.temp = temp;
      this.description = description;
    }
  }

app.listen(PORT, () => {
console.log(`Proof of life ${PORT}`);
});
 
