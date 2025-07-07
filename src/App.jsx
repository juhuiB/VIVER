import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";
import SearchModal from "./components/SearchModal";

import DockBar from "./components/DockBar";
import Home from "./pages/Home";
import RecordPage from "./pages/RecordPage";
import RecordListPage from "./pages/RecordListPage";

// function App() {
//   const [records, setRecords] = useState([]);
//   const [showSearch, setShowSearch] = useState(false);
//   const [selectedData, setSelectedData] = useState(null);
//   const [filter, setFilter] = useState("all"); // 필터 상태 추가

//   // 1. localStorage 불러오기
//   useEffect(() => {
//     const saved = localStorage.getItem("viver-records");
//     if (saved) {
//       setRecords(JSON.parse(saved));
//     }
//   }, []);

//   // 2. localStorage 저장하기
//   useEffect(() => {
//     localStorage.setItem("viver-records", JSON.stringify(records));
//   }, [records]);

//   //기록 추가
//   const addRecord = (newRecord) => {
//     setRecords((prev) => [newRecord, ...prev]);
//     setSelectedData(null); // 저장 후 초기화
//   };

//   //기록 삭제
// const deleteRecord = (id) => {
//     setRecords((prev) => prev.filter((rec) => rec.id !== id));
//   };


//    // 🔍 영화/드라마 선택 시 폼에 자동 채우기
//   const handleSelectFromSearch = (item) => {
//     setSelectedData({
//       title: item.title || item.name || "",
//       releaseDate: item.release_date || item.first_air_date || "",
//       media_type: item.media_type || "movie",
//       poster_path: item.poster_path || null,
//     });
//     setShowSearch(false);
//   };


//   return (
//     <div className="w-full min-h-screen bg-white">
//       <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
//         <Header onSearchClick={() => setShowSearch(true)} />
//         <RecordForm onAdd={addRecord} selected={selectedData} />
//         <RecordList
//           records={records}
//           onDelete={deleteRecord}
//           filter={filter}
//           setFilter={setFilter}
//         />
//       </div>

//       {showSearch && (
//           <SearchModal
//             onClose={() => setShowSearch(false)}
//             onSelect={handleSelectFromSearch}
//           />
//         )}
//     </div>
//   );
// }

// export default App;
function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 min-h-screen pb-16 bg-white"> {/* DockBar 높이만큼 padding 추가 */}
      <Header onSearchClick={() => setSearchOpen(true)} />

      <main className="max-w-3xl mx-auto px-4 py-6">
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