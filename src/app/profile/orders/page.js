import BackHeader from '../components/BackHeader'

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <BackHeader />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Your Orders</h1>
        <p className="text-gray-500 mt-2">All your past and current orders will appear here.</p>
      </div>
    </div>
  )
}
