import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import SearchModal from "../components/SearchModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 h-12 px-4 bg-white flex sm:flex-row items-center justify-between gap-2 sm:gap-0 z-50">
      <Link to="/">
        <img
          src={logoImage}
          alt="viver 로고"
          width={48}
          height={22}
          className="object-contain"
        />
      </Link>
      <button
        onClick={() => setOpen(true)} // 모달 열기
        className="w-6 h-6 flex items-center justify-center"
        aria-label="검색"
      >
        <FiSearch className="w-6 h-6 text-black" />
      </button>

      {/* 검색 모달 */}
      {open && (
        <SearchModal
          onClose={() => setOpen(false)} // X, 배경 클릭 → 닫기
          onSelect={(item) => {
            setOpen(false); // ① 모달 닫기
            navigate("/record", {
              // ② 기록 페이지로 이동
              state: item, //    선택 작품 전달
              replace: false, //    (뒤로 가기 시 검색 모달로 안 돌아오게 하려면 true)
            });
          }}
        />
      )}
    </header>
  );
}
