export default function RecordItem({ record }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition mb-4 bg-white">
      <h2 className="text-xl font-semibold">{record.title}</h2>
      <p>장르: {record.genre}</p>
      <p>감상일: {record.date}</p>
      <p>별점: {"⭐".repeat(record.rating)}</p>
    </div>
  );
}
