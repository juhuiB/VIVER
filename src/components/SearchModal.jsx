import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiX, FiSearch } from "react-icons/fi";
import noPoster from "../assets/img_noposter.png";
import FocusLock from "react-focus-lock"; 

export default function SearchModal({ onClose, onSelect }) {
    
  const [query, setQuery] = useState("");
  // 1. 원본 전체 결과
  const [results, setResults] = useState([]);
  // 2. 필터 상태
  const [filter, setFilter] = useState("all");
  // 3. 필터링된 결과
  const filteredResults = results.filter((item) => {
    if (filter === "movie") return item.media_type === "movie";
    if (filter === "tv") return item.media_type === "tv";
    return item.media_type === "movie" || item.media_type === "tv"; // 'all'은 영화+드라마만
  });

  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current?.focus(); // 모달 열릴 때 검색창에 포커스
  }, []);

  const [hasSearched, setHasSearched] = useState(false);
  

  {/* 검색 API 호출 */}
  const search = async () => {
    if (!query) return;

    const baseUrl = "https://api.themoviedb.org/3/search/multi";
    const key = import.meta.env.VITE_TMDB_API_KEY;
    const url = `${baseUrl}?api_key=${key}&query=${query}&language=ko-KR`;

    try {
      const res = await axios.get(url);
      let data = res.data.results || [];
      console.log("TMDB 응답 데이터:", res.data);
      if (filter === "movie")
        data = data.filter((i) => i.media_type === "movie");
      if (filter === "tv") data = data.filter((i) => i.media_type === "tv");

      setResults(data);
      setHasSearched(true);
    } catch (err) {
      console.error("API 호출 실패", err);
    }
  };

  const imageBase = "https://image.tmdb.org/t/p/w300";

  return (
    <FocusLock returnFocus> 
    <div className="fixed inset-0 flex justify-center items-start z-50">
      <div className="bg-white w-full h-full p-6 relative flex flex-col">
        {/* 팝업 헤더 */}
        <div className="h-12">
          <button
            onClick={onClose}
            className="absolute top-6 right-5"
            aria-label="닫기"
          >
            <FiX className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-bold text-center">검색</h2>
        </div>

        {/* 검색창 */}
        <div className="relative mb-4 ">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white"
          />
          <button
            onClick={search}
            className="absolute top-1/2 right-3 -translate-y-1/2"
            aria-label="검색"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-between items-center">
          {/* 필터 */}
          <div className="flex justify-center gap-1 mb-4 text-sm">
            {["all", "movie", "tv"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded border ${
                  filter === type
                    ? "bg-[#ff6b6b] text-white border-0 "
                    : "bg-white"
                }`}
              >
                {type === "all" ? "전체" : type === "movie" ? "영화" : "드라마"}
              </button>
            ))}
          </div>

          {/* 결과 개수 */}
          {hasSearched && (
            <p className="text-sm mb-2">
              검색 결과 <strong>{filteredResults.length}</strong>건
            </p>
          )}
        </div>

        {/* 카드 영역 */}
        <div className="overflow-y-auto mt-2 flex-1">
          {/* 검색 결과 그리드 */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="cursor-pointer rounded-sm border hover:shadow transition p-2"
                >
                  <img
                    src={
                    item.poster_path
                        ? `${imageBase}${item.poster_path}`
                        : noPoster
                    }
                    alt={item.title || item.name || "포스터 없음"}
                    className="w-full h-60 object-cover rounded aspect-[2/3] mb-2"
                    />
                  <p className="text-sm font-medium">
                    {item.title || item.name}
                  </p>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <p className="text-gray-500 text-sm text-center py-10">
              검색 결과가 없습니다.
            </p>
          ) : (
            <p className="text-gray-400 text-sm text-center py-10">
              검색어를 입력해주세요.
            </p>
          )}
        </div>
      </div>
    </div>
    </FocusLock>
  );
}
