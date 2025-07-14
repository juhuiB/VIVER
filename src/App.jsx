import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";

import SearchModal from "./components/SearchModal";
import DockBar from "./components/DockBar";
import Home from "./pages/Home";
import RecordPage from "./pages/RecordPage";
import RecordListPage from "./pages/RecordListPage";


function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 min-h-screen pb-16 bg-white">
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
      
    </div>
  );
}

export default App;