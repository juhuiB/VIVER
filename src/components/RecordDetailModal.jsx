import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function RecordDetailModal({ record, onClose }) {
  if (!record) return null;

  /* ⭐ 별 아이콘 배열 생성 */
  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={
            i <= value ? "text-[#e50101] w-5 h-5" : "text-gray-300 w-5 h-5"
          }
        />
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col bg-white w-full h-full p-6 pt-12 relative space-y-3">
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
              record.poster_path
                ? `https://image.tmdb.org/t/p/w300${record.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={record.title}
            className="w-auto h-[450px]  rounded object-contain"
          />

          <div className="flex-1 text-sm text-black">
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-500">제목</h4>
              <p className="text-2xl font-bold ">{record.title || "-"}</p>
            </div>
          </div>

          <div className="mb-4 border-b pb-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-500">개봉일</h4>
            <p className="text-sm font-bold ">{record.releaseDate || "-"}</p>
          </div>

          <div className="mb-4 border-b pb-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-500">관람일</h4>
            <p className="text-sm font-bold ">{record.watchDate || "-"}</p>
          </div>

          <div className="mb-4 border-b pb-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-500">평점</h4>
            <div className="flex items-center gap-1">
              {renderStars(record.rating)}
            </div>
          </div>

          <div className="mb-4 pb-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-500">한줄평</h4>
            <p className="text-sm">{record.comment ? record.comment : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
