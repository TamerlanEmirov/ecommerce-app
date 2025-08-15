'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar/Navbar'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ClerkProvider } from '@clerk/nextjs'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import DiscountBanner from '@/components/DiscountBanner'

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Provider store={store}>
        <html lang="en">
          <body>
            <Navbar />
            <DiscountBanner />
            <Toaster position="top-right" reverseOrder={false}/>
            <main className="pt-16 min-h-screen bg-gray-50">{children}</main>
            <Footer />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  )
}
