// ProCard.js
export default function ProCard({ pro }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-xl">{pro.name}</h2>
      <p className="text-gray-600">{pro.number}</p>
      <p className="mt-2">{pro.description}</p>
    </div>
  );
}
