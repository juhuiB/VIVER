import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RecordDetailModal from "../components/RecordDetailModal";
import EditRecordModal from "../components/EditRecordModal";
import RecordCardMenu from "../components/RecordCardMenu";
import noPoster from "../assets/img_noposter.png";

export default function RecordListPage() {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null); // 상세 보기
  const [editing, setEditing] = useState(null); // 수정 모달

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
    toast.success("기록이 수정되었습니다!");
  };

  /* --- 기록 삭제 함수 --------------------------------------- */
  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠어요?")) return;
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    localStorage.setItem("viver-records", JSON.stringify(updated));
    toast.success("기록이 삭제되었습니다");
  };

  if (records.length === 0)
    return <p className="text-center text-gray-500 mt-10">기록이 없습니다.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* 그리드: 포스터 + 제목만 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="cursor-pointer group "
            onClick={() => setSelected(rec)}
          >
            <img
              src={
                rec.poster_path
                  ? `https://image.tmdb.org/t/p/w300${rec.poster_path}`
                  : noPoster
              }
              alt={rec.title}
              className="w-full h-[250px] rounded mb-2"
            />

            <div className="flex items-center justify-between">
              <p className="mt-2 text-sm font-medium truncate">{rec.title}</p>

              <div className="mt-1 ml-auto text-right">
                <RecordCardMenu
                  onEdit={() => setEditing(rec)}
                  onDelete={() => handleDelete(rec.id)}
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
