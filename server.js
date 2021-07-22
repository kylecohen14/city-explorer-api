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
app.get('*', badRoute);

async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API}&city=${searchQuery}&lat=${lat}&lon=${lon}`;

  try {
    let weather = await axios.get(url);
    let forecastArray = [];
    weather.data.data.map( (value, idx) => {
      forecastArray.push(new Forecast(value.datetime, `Avg temp of ${value.temp}, with ${value.weather.description}`))
  })
  res.status(200).send(forecastArray)
} 
catch(err) {
  console.log('error:, err', err);
}
}
// function pageError(req, res) {
//   res.status(404).send('route failed, check spelling');
// }
function badRoute(req, res) {
  res.status(500).send('error: something to fix. 500');
}
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
 
