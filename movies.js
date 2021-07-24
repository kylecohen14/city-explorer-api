'use strict' ;
const axios = require('axios');

function displayMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  console.log(searchQuery);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  // &include_adult=false

  axios.get(url)
  .then(data => {
    const sortedMovieData = data.data.results.sort((a, b) => b.popularity - a.popularity);
    const movieData = sortedMovieData.map(movies => new Movies(movies));
    // console.log(movieData);
    res.status(200).send(movieData);
    console.log(movieData);
  })
  .catch(err => {
    res.status(500).send(err)
  })
}
class Movies {
  constructor(object) {
    this.title = object.title,
    this.overView = object.overView,
    this.popularity = object.popularity,
    this.poster = `https://image.tmdb.org/t/p/w500` + `${object.poster_path}`,
    this.date = object.release_date,
    this.averageVotes = object.vote_average,
    this.totalVotes = object.vote_count

  }
}
module.exports = displayMovies;