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
    <div className="mx-auto">
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
