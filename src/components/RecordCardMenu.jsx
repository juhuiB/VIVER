import { useEffect, useRef, useState } from "react";

export default function RecordCardMenu({ onEdit = () => {}, onDelete = () => {} }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* 케밥 버튼 */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="text-xl px-2 py-1 hover:bg-gray-100 rounded"
        aria-label="메뉴"
      >
        ⋮
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute right-0 z-10 mt-1 w-24 rounded-md shadow bg-white border text-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
              setOpen(false);
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
              setOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-50"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
