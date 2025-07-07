import axios from 'axios';

const key = import.meta.env.VITE_TMDB_API_KEY;
const lang = 'ko-KR';
const base = 'https://api.themoviedb.org/3';

export const getPopularMovies = () => //인기작
  axios.get(`${base}/movie/popular?api_key=${key}&language=${lang}`);

export const getNowPlayingMovies = () => //최신작
  axios.get(`${base}/movie/now_playing?api_key=${key}&language=${lang}`);

export const getTrendingMovies = () => //트렌드 영화
  axios.get(`${base}/trending/movie/day?api_key=${key}&language=${lang}`);
