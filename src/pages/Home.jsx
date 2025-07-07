import { useState } from "react";
import SectionSwiper from "../components/home/SectionSwiper";
import DetailModal from "../components/DetailModal"; // 작품 상세 모달 컴포넌트

export default function HomePage() {
  const [filter, setFilter] = useState("all");

  const [selectedItem, setSelectedItem] = useState(null); // 선택된 작품 상태

  // 필터 버튼 UI
  const renderFilterButtons = () => (
    <div className="flex gap-2 w-fit ml-auto">
      {["all", "movie", "tv"].map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-3 py-1 rounded border ${
            filter === type ? "bg-[#ff6b6b] text-white border-0" : "bg-white text-black"
          }`}
        >
          {type === "all" ? "전체" : type === "movie" ? "영화" : "드라마"}
        </button>
      ))}
    </div>
  );

  // 타이틀 설정
  const sections = [
    { key: "popular", title: "인기작" },
    { key: "latest", title: filter === "tv" ? "방영중" : "최신작" },
    { key: "trending", title: "추천작" },
  ];

  return (
    <div className="px-4 pb-20 max-w-7xl mx-auto">
      {/* 필터 */}
      {renderFilterButtons()}

      {/* 섹션 */}
      {sections.map(({ key, title }) => (
        <div className="mb-8" key={key}>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <SectionSwiper
            section={key}
            filter={filter}
            onSelectItem={(item) => setSelectedItem(item)}
          />
        </div>
      ))}

      {/* 상세 모달 */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
