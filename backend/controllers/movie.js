const axios = require('axios');

exports.getUpcomingMovies = (req, res, next) => {
  if (req.query.hasOwnProperty('page') && req.query.page) {
    var page = req.query.page;
  } else {
    var page = 1;
  }
  var tmdbUrl = "https://api.themoviedb.org/3";
  var apiKey = "1f54bd990f1cdfb230adb312546d765d";
  var path = "/movie/upcoming"
  var queryParams = [
    "api_key=" + apiKey,
		"language=en-US",
		"page=" + page
  ];
  var url = tmdbUrl + path + "?" + queryParams.join("&");

  axios.get(url)
    .then(function (response) {
      let result = response.data;
      getGenres().then(function (response) {
        let genres = response.data.genres;
        result.results = result.results.map( movie => {
          return {
            genres: movie.genre_ids.map( genre => genres.find( ({ id }) => id === genre )['name'] ),
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            id: movie.id
          }
        });
        res.status(200).json(result);
      })
      .catch(function (error) {
        console.log(error.message)
      });
    })
    .catch(function (error) {
      console.log(error.message)
    });
};

exports.getMoviesByName = (req, res, next) => {
  if (req.query.hasOwnProperty('page') && req.query.page) {
    var page = req.query.page;
  } else {
    var page = 1;
  }

  var name = req.query.name;
  var tmdbUrl = "https://api.themoviedb.org/3";
  var apiKey = "1f54bd990f1cdfb230adb312546d765d";
  var path = "/search/movie"
  var queryParams = [
    "api_key=" + apiKey,
		"language=en-US",
		"include_adult=false",
		"page=" + page,
		"query=" + name
  ];
  var url = tmdbUrl + path + "?" + queryParams.join("&");
  axios.get(url)
    .then(function (response) {
      let result = response.data;
      getGenres().then(function (response) {
        let genres = response.data.genres;
        result.results = result.results.map( movie => {
          return {
            genres: movie.genre_ids.map( genre => genres.find( ({ id }) => id === genre )['name'] ),
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            overview: movie.overview,
            id: movie.id
          }
        });
        res.status(200).json(result);
      })
      .catch(function (error) {
        console.log(error.message)
      });
    })
    .catch(function (error) {
      console.log(error.message)
    });
};

function getGenres() {
  var tmdbUrl = "https://api.themoviedb.org/3";
  var apiKey = "1f54bd990f1cdfb230adb312546d765d";
  var path = "/genre/movie/list"
  var queryParams = [
    "api_key=" + apiKey,
		"language=en-US"
  ];
  var url = tmdbUrl + path + "?" + queryParams.join("&");
  return axios.get(url)
}
