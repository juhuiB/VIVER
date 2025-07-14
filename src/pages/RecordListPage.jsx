import { useEffect, useState, useRef } from "react";
import RecordDetailModal from "../components/RecordDetailModal";
import EditRecordModal from "../components/EditRecordModal";
import RecordCardMenu from "../components/RecordCardMenu";
import noPoster from "../assets/img_noposter.png";
import { FiSliders } from "react-icons/fi";

export default function RecordListPage() {
  const [records, setRecords] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [selected, setSelected] = useState(null); // 상세 보기
  const [editing, setEditing] = useState(null); // 수정 모달
  const [checkedIds, setCheckedIds] = useState(new Set());
  /* --- 기록 불러오기 함수 --------------------------------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("viver-records") || "[]");
    setRecords(saved);
  }, []);

  /* --- 기록 업데이트 함수 --------------------------------------- */
  const handleUpdate = (updated) => {
    const newList = records.map((r) => (r.id === updated.id ? updated : r));
    setRecords(newList);
    localStorage.setItem("viver-records", JSON.stringify(newList));
  };

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

  /* --- 기록 삭제 함수 --------------------------------------- */
  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠어요?")) return;
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    localStorage.setItem("viver-records", JSON.stringify(updated));
  };

  if (records.length === 0)
    return <p className="text-center text-gray-500 mt-10">기록이 없습니다.</p>;

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
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* 정렬 & 선택삭제 툴바 */}
      <div
        className="flex justify-between items-center mb-4 relative"
        ref={sortBoxRef}
      >
        {/* 필터*/}
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

        {/* 드롭다운 메뉴 */}
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

      <div className="flex items-center justify-between mb-4">
        {/* 전체 선택 체크박스 */}
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAll}
            className="w-5 h-5 mr-2"
            id="checkAll"
          />
          <label htmlFor="checkAll" className="text-sm">
            전체 선택
          </label>
        </div>

        {/* 선택삭제 버튼*/}
        <button
          onClick={handleBulkDelete}
          className="text-sm text-red-600 border border-red-500 px-3 py-1 rounded disabled:opacity-40"
          disabled={checkedIds.size === 0}
        >
          선택 삭제
        </button>
      </div>

      {/* 그리드: 포스터 + 제목만 */}
      <div className= " grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {sortedRecords.map((record) => (
          <div
            key={record.id}
            className="cursor-pointer group relative"
            onClick={() => setSelected(record)}
          >
            {/* 체크박스 */}
            <input
              type="checkbox"
              checked={checkedIds.has(record.id)}
              onClick={(e) => e.stopPropagation()}
              onChange={() => toggleCheck(record.id)}
              className="check-card shrink-0 absolute top-2 right-2"
            />

            <img
              src={
                record.poster_path
                  ? `https://image.tmdb.org/t/p/w300${record.poster_path}`
                  : noPoster
              }
              alt={record.title}
              className="w-full h-[250px] rounded mb-2"
            />

            <div className="flex items-center justify-between">
              <p className="mt-2 text-sm font-medium truncate">
                {record.title}
              </p>

              <div className="mt-1 ml-auto text-right">
                <RecordCardMenu
                  onEdit={() => setEditing(record)}
                  onDelete={() => handleDelete(record.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 팝업 */}
      {selected && (
        <RecordDetailModal
          record={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {/* 수정 팝업 */}
      {editing && (
        <EditRecordModal
          record={editing}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
