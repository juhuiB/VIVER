export default function RecordList({ records, onDelete, filter }) {
  const imageBase = "https://image.tmdb.org/t/p/w300";

  const filtered = filter === "all" ? records : records.filter((r) => r.media_type === filter);

  return (
    <div className="grid gap-4">
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">기록이 없습니다.</p>
      ) : (
        filtered.map((record) => (
          <div
            key={record.id}
            className="flex gap-4 items-start p-4 border rounded shadow-sm"
          >
            {/* 포스터 */}
            {record.poster_path ? (
              <img
                src={`${imageBase}${record.poster_path}`}
                alt={record.title}
                className="w-24 h-36 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-36 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                No Image
              </div>
            )}

            {/* 텍스트 정보 */}
            <div className="flex-1">
              <h3 className="text-lg font-bold">{record.title}</h3>
              <p className="text-sm text-gray-500">
                개봉일: {record.releaseDate || "정보 없음"} / 관람일:{" "}
                {record.watchDate}
              </p>
              <p className="text-yellow-500 text-sm mt-1">
                {"★".repeat(record.rating)}{" "}
                {"☆".repeat(5 - record.rating)}
              </p>
              {record.comment && (
                <p className="mt-1 text-sm text-gray-800">{record.comment}</p>
              )}
              <button
                onClick={() => onDelete(record.id)}
                className="mt-2 text-xs text-red-500 hover:underline"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
