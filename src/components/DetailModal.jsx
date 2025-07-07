import { FiX } from "react-icons/fi";

export default function DetailModal({ item, onClose }) {
  if (!item) return null;

  const imageBase = "https://image.tmdb.org/t/p/w500";

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="bg-white rounded-md max-w-lg w-full max-h-[80vh] overflow-auto p-6 relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 팝업 닫힘 방지
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black"
          aria-label="닫기"
        >
          <FiX className="w-6 h-6" />
        </button>

        <img
          src={
            item.poster_path
              ? `${imageBase}${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={item.title || item.name}
          className="w-full h-auto mb-4 rounded"
        />

        <h2 className="text-2xl font-bold mb-2">{item.title || item.name}</h2>
        <p className="mb-2 text-gray-600">
          {item.release_date || item.first_air_date || "개봉일 정보 없음"}
        </p>
        <p className="mb-4">{item.overview || "설명 정보 없음"}</p>

        {/* 추가 정보 필요하면 여기 추가 */}
      </div>
    </div>
  );
}
