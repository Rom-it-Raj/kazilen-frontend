import BackHeader from '../components/BackHeader'

export default function HiddenProfessionalsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BackHeader />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Hidden Professionals</h1>
        <p className="text-gray-500 mt-2">Professionals you've hidden will appear here.</p>
      </div>
    </div>
  )
}
