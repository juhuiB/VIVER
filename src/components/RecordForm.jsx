import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
import { FiSearch } from "react-icons/fi";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

export default function RecordForm({
  initialData = null,
  selected = null,
  onOpenSearch,
  isEdit = false,
  onAdd = () => {},
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [watchDate, setWatchDate] = useState(null); // 변경: 문자열 → Date 객체
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [posterPath, setPosterPath] = useState(null);
  const isValid = title.trim() !== "" && releaseDate !== "";

  const isChanged = () => {
    if (!initialData && !selected) return false; // 새로 추가하는 경우엔 항상 활성화

    const data = selected || initialData;

    return (
      title !== (data.title || data.name || "") ||
      releaseDate !== (data.release_date || data.first_air_date || "") ||
      comment !== (data.comment || data.review || "") ||
      rating !== (data.rating || 0) ||
      (watchDate ? format(watchDate, "yyyy.MM.dd") : "") !==
        (data.watchDate || "") ||
      mediaType !== (data.media_type || (data.title ? "movie" : "tv")) ||
      posterPath !== (data.poster_path || null)
    );
  };

  useEffect(() => {
    const data = selected || initialData;
    if (data) {
      setTitle(data.title || data.name || "");
      setReleaseDate(data.release_date || data.first_air_date || "");
      setMediaType(data.media_type || (data.title ? "movie" : "tv"));
      setPosterPath(data.poster_path || null);
      setComment(data.comment || data.review || "");
      setRating(data.rating || 0);
      // watchDate는 Date 타입이라 format 필요, 데이터가 string이라면 parse 필요
      if (data.watchDate) {
        // 'yyyy.MM.dd' → Date 변환
        const parts = data.watchDate.split(".");
        if (parts.length === 3) {
          const [y, m, d] = parts;
          setWatchDate(new Date(+y, +m - 1, +d));
        } else {
          setWatchDate(null);
        }
      } else {
        setWatchDate(null);
      }
    }
  }, [initialData, selected]);

  // Record ID는 수정 시 기존 ID를 사용하고, 새로 추가할 때는 현재 시간으로 설정
  const recordId = isEdit && initialData ? initialData.id : Date.now();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...initialData, // 기존 값 복사(옵션)
      //   id: Date.now(),
      id: recordId,
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

    const isDuplicate = existingRecords.some(
      (r) =>
        r.title === newRecord.title &&
        r.releaseDate === newRecord.releaseDate &&
        r.id !== newRecord.id // ← **자기 자신은 제외**
    );

    // 4️⃣ 중복이면 차단
    if (isDuplicate) {
      alert("이미 등록된 작품입니다.");
      return;
    }

    //  중복이 아니면 기록 저장
    const updated = isEdit
      ? existingRecords.map((r) => (r.id === newRecord.id ? newRecord : r))
      : [...existingRecords, newRecord];

    localStorage.setItem("viver-records", JSON.stringify(updated));
    onAdd(newRecord);
    alert(isEdit ? "기록이 수정되었습니다!" : "기록되었습니다!");
    // ③ “등록하기”일 때만 /list 로 이동
    if (!isEdit) navigate("/list");
    // //  입력 초기화
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
          placeholderText="YYYY.MM.DD"
          maxDate={new Date()} // 오늘 이전만 선택 가능
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white text-center"
          showPopperArrow={false}
          autoComplete="off"
          onKeyDown={(e) => e.preventDefault()}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-xs">한줄평</label>
        <textarea
          value={comment || ""}
          onChange={(e) => {
            // 150자 초과 입력을 방지
            const { value } = e.target;
            if (value.length <= 150) setComment(value);
            // value.slice(0, 150) 으로 잘라 넣어도 OK
          }}
          rows="2"
          maxLength={150}
          className="w-full h-auto pl-4 pr-10 py-2 border rounded-lg bg-white resize-none"
        />
        <p className="text-right text-[11px] text-gray-500 mt-1">
          {comment.length} / 150
        </p>
      </div>

      <button
        type="submit"
        disabled={!isValid || !isChanged()}
        className={`w-full h-12 py-2 rounded-lg text-white
    ${
      isValid && isChanged()
        ? "bg-[#ff6b6b] hover:bg-[#ff5252]"
        : "bg-gray-300 cursor-not-allowed"
    }`}
      >
        {isEdit ? "수정하기" : "등록하기"}
      </button>
    </form>
  );
}
