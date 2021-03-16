import axios from 'axios';

const KEY = '91085a172e1ffb2047d72641d0a91356';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const getPopularMovies = () => {
  let paramUrl = `trending/movie/week?api_key=${KEY}`;

  return axios.get(paramUrl).then(({ data }) => data.results);
};

const getMovieByQuery = query => {
  let paramUrl = `search/movie?api_key=${KEY}&language=en-US&page=1&query=${query}`;

  return axios.get(paramUrl).then(({ data }) => data.results);
};

const getMovieById = movieId => {
  console.log(movieId);
  let paramUrl = `movie/${movieId}?api_key=${KEY}&language=en-US`;

  return axios.get(paramUrl).then(({ data }) => data);
};
const getMovieCast = movieId => {
  let paramUrl = `movie/${movieId}/credits?api_key=${KEY}&language=en-US`;

  return axios.get(paramUrl).then(({ data }) => data);
};

const getMovieReview = movieId => {
  let paramUrl = `movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`;

  return axios.get(paramUrl).then(({ data }) => data);
};

export default {
  getPopularMovies,
  getMovieByQuery,
  getMovieById,
  getMovieCast,
  getMovieReview,
};
