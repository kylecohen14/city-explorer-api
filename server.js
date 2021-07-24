'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
// const weatherInfo = require('./data/weather.json');
const axios = require('axios');
const displayMovies = require('./movies.js');


dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3232;
app.get('/movies', displayMovies);
app.get('/weather', getWeather);
app.get('*', badRoute);
// app.use????? So that it takes anything (get put post)



// function weatherHandler(req, res) {
//   const location = req.query.city;

//   getWeather(location)
//   .then(weatherForecast =>)
// }






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
class Forecast {
  constructor(description, datetime, temp) {
    this.datetime = datetime;
    this.temp = temp;
    this.description = description;
  }
}





function badRoute(req, res) {
  res.status(500).send('error: something to fix. 500');
  // 404 err???
}

  


app.listen(PORT, () => {
console.log(`Proof of life ${PORT}`);
});
 
