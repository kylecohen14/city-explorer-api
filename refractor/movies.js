'use strict' ;
const axios = require('axios');
const cache = require('./cache');

async function displayMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  try {
    if(!cache[key]) {
      cache[key] = {};
      cache[key].timestamp = Date.now();
      axios.get(url)
      .then(data => {
        const sortedMovieData = data.data.results.sort((a, b) => b.popularity - a.popularity);
        // const movieData = sortedMovieData.map(movies => new Movies(movies));
        const MoviesArray = [];

        class Movies {
          constructor(title, overview, popularity, poster_path, release_date, vote_average, vote_count) {
            this.tableName = 'movies',
            this.title = title,
            this.overview = overview,
            this.popularity = popularity,
            this.poster = `https://image.tmdb.org/t/p/w500` + `${poster_path}`,
            this.date = release_date,
            this.averageVotes = vote_average,
            this.totalVotes = vote_count,
            this.timestamp = Date.now()
          }
    }
    for(let i=0; i<20; i++) {
      MoviesArray.push(new Movies(sortedMovieData[i].title, sortedMovieData[i].overview, sortedMovieData[i].popularity, sortedMovieData[i].poster_path, sortedMovieData[i].release_date, sortedMovieData[i].votes_average, sortedMovieData[i].vote_count));
    }
    cache[key].data = MoviesArray;
    res.send(MoviesArray);
  });
} else {
  res.send(cache[key].data);}
}catch(error) {
  res.status(500).send('something wrong');
}
}
module.exports = displayMovies;