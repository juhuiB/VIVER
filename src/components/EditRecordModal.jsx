import RecordForm from "./RecordForm";
import { FiX } from "react-icons/fi";

export default function EditRecordModal({ record, onSave, onClose }) {
  if (!record) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full p-6 pt-10 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">기록 수정</h2>

        {/* RecordForm을 재사용, onAdd 대신 onSave 호출 */}
        <RecordForm
          initialData={record}
          selected={record}
          isEdit            
          onAdd={(updated) => {
            onSave(updated);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
