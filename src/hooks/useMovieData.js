import { useEffect, useState } from 'react';
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTrendingMovies,
} from '../api/movieApi';

export default function useMovieData(type = 'popular') {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (type === 'popular') res = await getPopularMovies();
        else if (type === 'latest') res = await getNowPlayingMovies();
        else if (type === 'trending') res = await getTrendingMovies();
        setData(res.data.results);
      } catch (e) {
        console.error('영화 데이터 가져오기 실패', e);
      }
    };
    fetchData();
  }, [type]);

  return data;
}