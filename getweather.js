'use strict';
const axios = require('axios');
// const cache = require('./cache.js');





// funciton grabWeather(location) {
//   const key = 'getweather-' + location;
//   const url = ``
  
//   if(!cache[key]) {
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     cache[key].data = axios.get(url)
//       .then(data = parseWeatherData(data.data))

//   }
// return cache[key].data;
// }

// function parseWeatherData(data) {
//   try {
//     const weather = data.results.map(weather => {
//       return new weather(weather);
//     })
//     return Promise.resolve(weather);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// }

class Weather {
  constructor(forecast) {
    // this.datetime = datetime;
    //   this.temp = temp;
    //   this.description = description;
  }
}

module.exports = grabWeather;