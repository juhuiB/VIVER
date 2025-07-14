import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function DetailModal({ item, onClose }) {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 팝업 열릴 때 body 스크롤 막기
    document.body.style.overflow = "hidden";

    // 팝업 닫힐 때 스크롤 원복
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!item) return;

    const key = import.meta.env.VITE_TMDB_API_KEY;
    const mediaType = item.media_type || (item.title ? "movie" : "tv");

    const fetchDetails = async () => {
      try {
        const [detailRes, creditRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${item.id}?api_key=${key}&language=ko-KR`
          ),
          axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${item.id}/credits?api_key=${key}&language=ko-KR`
          ),
        ]);
        setDetails(detailRes.data);
        setCredits(creditRes.data);
      } catch (e) {
        console.error("상세 정보 가져오기 실패", e);
      }
    };

    fetchDetails();
  }, [item]);

  if (!details) return null;

  const imageBase = "https://image.tmdb.org/t/p/w500";

  const directors = credits?.crew.filter((c) => c.job === "Director") || [];
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col bg-white w-full h-full relative p-6 pt-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black"
          aria-label="닫기"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-4 overflow-y-auto ">
          <img
            src={
              details.poster_path
                ? `${imageBase}${details.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={details.title || details.name}
            className="w-auto h-[450px]  rounded object-contain"
          />

          <div className="flex-1 text-sm text-black">
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">제목</h4>
              <p className="text-2xl font-bold ">
                {details.title || details.name || "정보 없음"}
              </p>
            </div>

            <div className="mb-4 border-b pb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">
                개봉일
              </h4>
              <p className="text-sm font-bold ">
                {details.release_date || details.first_air_date || "정보 없음"}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="mb-2 mb-2 text-sm font-semibold text-gray-500">
                평점
              </h4>
              <p className="flex items-center text-sm font-bold ">
                <FaStar className="mr-1 text-[#e50101]" />
                {details.vote_average?.toFixed(1) || "-"}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">장르</h4>
              <p className="text-sm font-bold ">
                {details.genres?.map((g) => g.name).join(", ") || "정보 없음"}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">국가</h4>
              <p className="text-sm font-bold ">
                {details.production_countries?.map((c) => c.name).join(", ") ||
                  "정보 없음"}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">
                상영 시간
              </h4>
              <p className="text-sm font-bold ">
                {details.runtime
                  ? `${Math.floor(details.runtime / 60)}시간 ${
                      details.runtime % 60
                    }분`
                  : details.episode_run_time
                  ? `${details.episode_run_time[0]}분`
                  : "정보 없음"}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">
                제작진
              </h4>
              <p className="text-sm font-bold ">
                {directors.map((d) => d.name).join(", ") || "정보 없음"}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">
                출연진
              </h4>
              <p className="text-sm font-bold ">
                {cast.map((c) => c.name).join(", ") || "정보 없음"}
              </p>
            </div>

            {details.overview && (
              <div className="mt-4">
                <p className="font-semibold mb-1">소개</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {details.overview}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigate("/record", { state: item })}
          className="bg-[#ff6b6b] w-full h-12 text-white rounded-md mt-4 sticky bottom-0 left-0 right-0 z-10 flex-shrink-0"
        >
          기록하기
        </button>
      </div>
    </div>
  );
}
