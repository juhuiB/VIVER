import axios from 'axios';

const tvKey = import.meta.env.VITE_TMDB_API_KEY;
const tvLang = 'ko-KR';
const tvBase = 'https://api.themoviedb.org/3';

export const getPopularTV = () => // 인기작
  axios.get(`${tvBase}/tv/popular?api_key=${tvKey}&language=${tvLang}`);

export const getAiringTV = () => //최신작 (방영중)
  axios.get(`${tvBase}/tv/airing_today?api_key=${tvKey}&language=${tvLang}`);

export const getTopRatedTV = () =>
  axios.get(`${tvBase}/tv/top_rated?api_key=${tvKey}&language=${tvLang}`);
 