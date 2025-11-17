import './globals.css'
import ConditionalHeader from './components/ConditionalHeader'
import ConditionalBottomNav from './components/ConditionalBottomNav'

export const metadata = {
  title: 'Your App',
  description: 'Restaurant app with bottom nav',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen relative pb-16">
        <ConditionalHeader />
        {children}
        <ConditionalBottomNav />
      </body>
    </html>
  )
}
