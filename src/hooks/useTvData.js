import { useEffect, useState } from 'react';
import {
  getPopularTV,
  getAiringTV,
  getTopRatedTV,
} from '../api/tvApi';

export default function useTVData(type = 'popular') {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (type === 'popular') res = await getPopularTV();
        else if (type === 'latest') res = await getAiringTV();
        else if (type === 'trending') res = await getTopRatedTV();
        setData(res.data.results);
      } catch (e) {
        console.error('TV 데이터 가져오기 실패', e);
      }
    };
    fetchData();
  }, [type]);

  return data;
}