import { NavLink } from "react-router-dom";
import { FiHome, FiEdit, FiBook } from "react-icons/fi";

export default function DockBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
      <div className="max-w-md mx-auto flex justify-around py-2">
        
        <NavLink
          to="/record"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-black" : "text-gray-400"
            }`
          }
        >
          <FiEdit className="w-5 h-5 mb-1" />
          기록하기
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-black" : "text-gray-400"
            }`
          }
        >
          <FiHome className="w-5 h-5 mb-1" />
          홈
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? "text-black" : "text-gray-400"
            }`
          }
        >
          <FiBook className="w-5 h-5 mb-1" />
          내 기록
        </NavLink>
      </div>
    </nav>
  );
}
