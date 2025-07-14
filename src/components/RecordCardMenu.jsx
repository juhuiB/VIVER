import { useEffect, useRef, useState } from "react";

export default function RecordCardMenu({ onEdit = () => {}, onDelete = () => {} }) {
  const [open, setOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState("down");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!open) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const menuHeight = 100; // 메뉴 예상 높이

      if (spaceBelow < menuHeight) setOpenDirection("up");
      else setOpenDirection("down");
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        className="text-xl px-2 py-1 hover:bg-gray-100 rounded"
        aria-label="메뉴"
      >
        ⋮
      </button>

      {open && (
        <div
          className={`absolute right-0 z-10 w-24 rounded-md shadow bg-white border text-sm z-50
          ${openDirection === "down" ? "top-full mt-1" : "bottom-full mb-1"}`}
          ref={menuRef}
        >
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
