import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2NiZTIyNWU1MjM5ZWE2ZTZmNTEwZTJmMzY3MjYyNSIsIm5iZiI6MTc0ODA4MDkzMy43MDgsInN1YiI6IjY4MzE5OTI1OTQyODJlZTJlNDgzNzU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7KCbz4uuGJqeXjeuO-y9s3pGl1xhGe3K_hHZJBz3I04';

const options = {
  headers: {
    Authorization: TOKEN,
  },
};

// axios
//   .get(BASE_URL, options)
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));


export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async query => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return res.data.results;
};

export const getMovieDetails = async id => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return res.data;
};

export const getMovieCredits = async id => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return res.data.cast;
};

export const getMovieReviews = async id => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return res.data.results;
};