'use strict';
const axios = require('axios');
const cache = require('./cache');
// const cache = require('./cache.js');



async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  const key = 'weather-' + searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API}&city=${searchQuery}&lat=${lat}&lon=${lon}`;

  try {
    if(!cache[key]) {
      cache[key] = {};
      cache[key].timestamp = Date.now();
      axios.get(url)
        .then(data => {
          class Forecast {
            constructor(datetime, temp, description) {
              this.datetime = datetime;
              this.temp = temp;
              this.description = description;
            }
          }
          let weather = data;
          let forcastArray = weather.data.data.map( (value, idx) => {
            return new Forecast(`Date:${value.datetime}`, `Avg temp of ${value.temp}`, `with ${value.weather.description}`);
          });
  cache[key].data = forcastArray;
  console.log(cache[key].data);
  res.send(forcastArray);
});
    }
    else{
      res.send(cache[key].data);
    }
  }
catch(err) {
  // console.log('error:, err', err);
  res.status(500).send('error: somethings wrong', err);
}
}

// function badRoute(req, res) {
  // res.status(500).send('error: something to fix. 500');
 
module.exports = getWeather;