import CategoryTabs from "./components/CategoryTabs";
import SubCategoryTabs from "./components/SubCategoryTabs";
import ProfessionalCard from "./components/PC";


async function getPros() {
  try {
    // We use 'no-store' to ensure we get fresh data on every request
    const res = await fetch('http://127.0.0.1:8000/api/workers', {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array to prevent crash
  }
}

export default async function Page() {
  const pros = await getPros();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pro Records</h1>
      
      {/* Container for the cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pros.length > 0 ? (
          pros.map((record, index) => (
            // We pass the whole record object as the 'pro' prop
            // Use a unique ID for the key if available, otherwise fallback to index
            <ProfessionalCard key={record.id || index} pro={record} />
          ))
        ) : (
          <p>No records found or API is unavailable.</p>
        )}
      </div>
    </main>
  );
}
