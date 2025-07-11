import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";

import SearchModal from "./components/SearchModal";
import DockBar from "./components/DockBar";
import Home from "./pages/Home";
import RecordPage from "./pages/RecordPage";
import RecordListPage from "./pages/RecordListPage";
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 min-h-screen pb-16 bg-white"> {/* DockBar 높이만큼 padding 추가 */}
      <Header onSearchClick={() => setSearchOpen(true)} />

      <main className="mx-auto pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/list" element={<RecordListPage />} />
        </Routes>
      </main>

      <DockBar />

      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} onSelect={() => {}} />
      )}
      <ToastContainer
        position="bottom-center" // 원하는 위치: top-right, bottom-right 등
        autoClose={1000}      // 자동 닫힘 시간(ms)
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;