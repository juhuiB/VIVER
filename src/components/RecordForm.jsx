import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";

export default function RecordForm({ onAdd, selected }) {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState("");
  const [comment, setComment] = useState("");

    // media_type과 포스터는 hidden 필드
  const [mediaType, setMediaType] = useState("movie");
  const [posterPath, setPosterPath] = useState(null);

  //선택된 항목 자동 채워넣기
  useEffect(() => {
    if (selected) {
      setTitle(selected.title || "");
      setReleaseDate(selected.releaseDate || "");
      setMediaType(selected.media_type || "movie");
      setPosterPath(selected.poster_path || null);
    }
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: Date.now(), // 간단한 고유 ID
      title,
      releaseDate,
      rating,
      watchDate,
      comment,
      media_type: mediaType,
      poster_path: posterPath,
    };

    onAdd(newRecord); // App.jsx의 addRecord 호출

    // 폼 초기화
    setTitle("");
    setReleaseDate("");
    setRating(0);
    setWatchDate("");
    setComment("");
     setMediaType("movie");
    setPosterPath(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-md shadow-md space-y-4 mt-6"
    >
      <div>
        <label className="block font-semibold mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">개봉일</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">별점</label>
        <RatingStars value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block font-semibold mb-1">관람일</label>
        <input
          type="date"
          value={watchDate}
          onChange={(e) => setWatchDate(e.target.value)}
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">한줄평</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="2"
          className="w-full h-12 pl-4 pr-10 py-2 border rounded-lg bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        기록하기
      </button>
    </form>
  );
}
