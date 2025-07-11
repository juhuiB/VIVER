import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSliders } from "react-icons/fi";

export default function RecordListPage() {
  /* -------------------------------- state -------------------------------- */
  const [records, setRecords] = useState([]);
  const [sortBy, setSortBy] = useState("latest"); // latest | rating
  const [checkedIds, setCheckedIds] = useState(new Set());

  /* --------------------------- read from storage -------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("viver-records");
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  /* ----------------------------- sort ----------------------------- */
  const [openSort, setOpenSort] = useState(false);
  const sortBoxRef = useRef(null);

  const sortedRecords = [...records].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "latest")
      return new Date(b.watchDate) - new Date(a.watchDate);
    return 0;
  });

  /* ▼ 바깥 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const handler = (e) => {
      if (sortBoxRef.current && !sortBoxRef.current.contains(e.target)) {
        setOpenSort(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ------------------------------ delete one ----------------------------- */
  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠어요?")) return;

    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    localStorage.setItem("viver-records", JSON.stringify(updated));
    toast.success("기록이 삭제되었습니다.");
  };

  /* --------------------------- multi‑select logic ------------------------- */
  const toggleCheck = (id) => {
    const next = new Set(checkedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setCheckedIds(next);
  };

  const allChecked = checkedIds.size === records.length && records.length > 0;
  const handleAll = () =>
    setCheckedIds(allChecked ? new Set() : new Set(records.map((r) => r.id)));

  const handleBulkDelete = () => {
    if (checkedIds.size === 0) return;
    if (!window.confirm("선택한 기록을 모두 삭제하시겠어요?")) return;

    const updated = records.filter((r) => !checkedIds.has(r.id));
    setRecords(updated);
    localStorage.setItem("viver-records", JSON.stringify(updated));
    setCheckedIds(new Set());
    toast.success("선택한 기록이 삭제되었습니다.");
  };

  /* ------------------------------- render -------------------------------- */
  if (records.length === 0)
    return <p className="text-center text-gray-500 mt-10">기록이 없습니다.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* 정렬 & 선택삭제 툴바 */}
      <div
        className="flex justify-between items-center mb-4 relative"
        ref={sortBoxRef}
      >
        {/* ▼ 필터 아이콘 */}
        <button
          type="button"
          onClick={() => setOpenSort(!openSort)}
          className="flex items-center gap-1 text-gray-700"
        >
          <FiSliders className="rotate-90" />
          <span className="text-sm text-[#ff6b6b] font-semibold">
            {sortBy === "latest" ? "최근 관람일순" : "별점 높은순"}
          </span>
        </button>

        {/* ▼ 선택삭제 버튼(그대로 유지) */}
        <button
          onClick={handleBulkDelete}
          className="text-sm text-red-600 border border-red-500 px-3 py-1 rounded disabled:opacity-40"
          disabled={checkedIds.size === 0}
        >
          선택 삭제
        </button>

        {/* ▼ 드롭다운 메뉴 */}
        {openSort && (
          <ul className="absolute left-0 top-9 w-40 bg-white border rounded shadow text-sm z-10">
            <li>
              <button
                onClick={() => {
                  setSortBy("latest");
                  setOpenSort(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                  sortBy === "latest" ? "font-semibold text-[#ff6b6b]" : ""
                }`}
              >
                최근 관람일순
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSortBy("rating");
                  setOpenSort(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                  sortBy === "rating" ? "font-semibold text-[#ff6b6b]" : ""
                }`}
              >
                별점 높은순
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* 전체 선택 체크박스 */}
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={handleAll}
          className="mr-2"
        />
        <span className="text-sm">전체 선택</span>
      </div>

      {/* 기록 리스트 */}
      <ul className="space-y-4">
        {sortedRecords.map((record) => (
          <li
            key={record.id}
            className="flex items-center gap-4 p-4 bg-white rounded shadow"
          >
            {/* 체크박스 */}
            <input
              type="checkbox"
              checked={checkedIds.has(record.id)}
              onChange={() => toggleCheck(record.id)}
              className="mr-2 shrink-0"
            />

            {/* 포스터 */}
            <img
              src={
                record.poster_path
                  ? `https://image.tmdb.org/t/p/w200${record.poster_path}`
                  : "https://via.placeholder.com/100x150?text=No+Image"
              }
              alt={record.title}
              className="w-[80px] h-[120px] object-cover rounded shrink-0"
            />

            {/* 정보 */}
            <div className="flex-1">
              <h2 className="font-semibold">{record.title}</h2>
              <p className="text-sm text-gray-600">{record.releaseDate}</p>
              <p className="text-sm text-gray-600">⭐ {record.rating}점</p>
              <p className="text-sm text-gray-600">{record.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                관람일: {record.watchDate}
              </p>
            </div>

            {/* 개별 삭제 */}
            <button
              onClick={() => handleDelete(record.id)}
              className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
