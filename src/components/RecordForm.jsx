import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { FiSearch } from "react-icons/fi";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

export default function RecordForm({
  initialData = null,
  selected = null,
  onOpenSearch,
}) {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [watchDate, setWatchDate] = useState(null); // 변경: 문자열 → Date 객체
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [posterPath, setPosterPath] = useState(null);

  useEffect(() => {
    const data = selected || initialData;
    if (data) {
      setTitle(data.title || data.name);
      setReleaseDate(data.release_date || data.first_air_date);
      setMediaType(data.media_type || (data.title ? "movie" : "tv"));
      setPosterPath(data.poster_path || null);
    }
  }, [initialData, selected]);

  const handleSubmit = (e) => {
  e.preventDefault();

  const newRecord = {
    id: Date.now(),
    title,
    releaseDate,
    rating,
    watchDate: watchDate ? format(watchDate, "yyyy.MM.dd") : "",
    comment,
    media_type: mediaType,
    poster_path: posterPath,
  };

  //  기존 기록 불러오기
  const existingRecords =
    JSON.parse(localStorage.getItem("viver-records")) || [];

  //  중복 확인 (title과 releaseDate가 같은 경우)
  const isDuplicate = existingRecords.some(
    (r) => r.title === newRecord.title && r.releaseDate === newRecord.releaseDate
  );

  if (isDuplicate) {
    alert("이미 등록된 작품입니다.");
    return;
  }

  //  중복이 아니면 기록 저장
  const updatedRecords = [...existingRecords, newRecord];
  localStorage.setItem("viver-records", JSON.stringify(updatedRecords));

  //  알림
  alert("기록되었습니다!");

  //  입력 초기화
  setTitle("");
  setReleaseDate("");
  setRating(0);
  setWatchDate(null);
  setComment("");
  setMediaType("movie");
  setPosterPath(null);
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <label className="block font-semibold mb-1 text-xs">제목</label>
        <input
          type="text"
          value={title}
          readOnly
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-[#f9f9f9] cursor-default"
          required
        />
        {!initialData && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="absolute right-4 top-1/2 w-6 h-6 flex items-center justify-center"
            aria-label="검색"
          >
            <FiSearch className="w-6 h-6 text-black" />
          </button>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1 text-xs">개봉일</label>
        <input
          type="text"
          value={releaseDate}
          readOnly
          placeholder="YYYY.MM.DD"
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-[#f9f9f9] cursor-default"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-xs">별점</label>
        <RatingStars value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-xs">관람일</label>
        <DatePicker
          selected={watchDate}
          onChange={(date, e) => {
            setWatchDate(date);
            e.target.blur(); // 선택 후 포커스 제거
          }}
          dateFormat="yyyy.MM.dd"
          locale={ko}
          placeholderText="yyyy.MM.dd"
          maxDate={new Date()} // 오늘 이전만 선택 가능
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white text-center"
          showPopperArrow={false}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-xs">한줄평</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="2"
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        className="bg-[#ff6b6b] w-full h-12 text-white rounded-md"
      >
        등록하기
      </button>
    </form>
  );
}
