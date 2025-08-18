import BackHeader from '../components/BackHeader'

export default function PaymentSettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <BackHeader />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Payment Settings</h1>
        <p className="text-gray-500 mt-2">Manage your saved cards and payment methods here.</p>
      </div>
    </div>
  )
}
