'use strict';
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
// const axios = require('axios');

dotenv.config();
app.use(cors());
// app.use(express.json());

const PORT = process.env.PORT || 3232;



const displayMovies = require('./refractor/movies.js');
const getWeather = require('./refractor/getweather.js');

app.get('/movies', displayMovies);
app.get('/weather', getWeather);

app.get('*', badRoute);
function badRoute(req, res) {
  res.status(500).send('error: something to fix. 500');
}

// function badRoute(req, res) {
//   res.status(500).send('error: something to fix. 500');
// }

app.listen(PORT, () => {
console.log(`Proof of life ${PORT}`);
});
 