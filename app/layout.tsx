import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobSpot - Find Freelance Jobs Instantly',
  description: 'Connect directly with clients through WhatsApp. No middleman, no fees, just opportunities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <nav className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-green-600">JobSpot</Link>
              <div className="space-x-4 flex">
                <Link href="/jobs" className="text-gray-600 hover:text-gray-900">Browse Jobs</Link>
                <Link href="/post" className="text-gray-600 hover:text-gray-900">Post a Job</Link>
                <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
              

              </div>
            </div>
          </nav>

          {children}
          <footer className="bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">JobSpot</h3>
                  <p className="text-gray-600">Find the perfect freelance job, instantly.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">For Clients</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link href="/post" className="hover:text-gray-900">Post a Job</Link></li>
                    <li><Link href="/" className="hover:text-gray-900">How it Works</Link></li>
                    <li><Link href="/" className="hover:text-gray-900">Pricing</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">For Freelancers</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link href="/jobs" className="hover:text-gray-900">Find Jobs</Link></li>
                    <li><Link href="/" className="hover:text-gray-900">Categories</Link></li>
                    <li><Link href="/" className="hover:text-gray-900">Create Profile</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Company</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li><Link href="/" className="hover:text-gray-900">About Us</Link></li>
                    <li><Link href="/" className="hover:text-gray-900">Contact</Link></li>
                    <li><Link href="/" className="hover:text-gray-900">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-gray-600">
                © {new Date().getFullYear()} JobSpot. All rights reserved.
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}