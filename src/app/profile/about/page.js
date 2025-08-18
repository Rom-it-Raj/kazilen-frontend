import BackHeader from '../components/BackHeader'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <BackHeader />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">About</h1>
        <p className="text-gray-500 mt-2">
          This app connects users with local professionals for home services. Version 1.0.0.
        </p>
      </div>
    </div>
  )
}
