import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";

export default function Header({ onSearchClick = () => {} }) {
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
        onClick={onSearchClick}
        className="w-6 h-6 flex items-center justify-center"
        aria-label="검색"
      >
        <FiSearch className="w-6 h-6 text-black" />
      </button>
    </header>
  );
}
