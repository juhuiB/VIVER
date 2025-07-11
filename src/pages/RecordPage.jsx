import { useState } from "react";
import { useLocation } from "react-router-dom";
import RecordForm from "../components/RecordForm";
import SearchModal from "../components/SearchModal";

export default function RecordPage() {
  const location = useLocation();
  const initialData = location.state || null;

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selected, setSelected] = useState(initialData);


  return  (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">기록하기</h1>

      <RecordForm
        initialData={initialData}
        selected={selected}
        // onAdd={handleRecord}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {searchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelect={(item) => {
            setSelected(item);
            setSearchModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
