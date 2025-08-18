import BackHeader from '../components/BackHeader'

export default function RatingPage() {
  return (
    <div className="min-h-screen bg-white">
      <BackHeader />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Your Ratings</h1>
        <p className="text-gray-500 mt-2">Ratings and feedback you have given will appear here.</p>
      </div>
    </div>
  )
}
