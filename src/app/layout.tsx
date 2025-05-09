import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Image from "next/image";
import "./globals.css";
import {InterviewProvider} from "@/context/InterviewContext";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "TalkFluence",
  description: "TalkFluence",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <InterviewProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <header className="bg-black/60 border-b border-gray-800 shadow-lg backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="flex items-center gap-8 w-full">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg select-none transition-all duration-300 hover:scale-105">
                    TalkFluence
                  </span>
                  <nav className="flex gap-6 text-lg font-medium ml-8">
                    <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Dashboard</span>
                    <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Simulation</span>
                    <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">Reports</span>
                  </nav>
                  <div className="flex-1" />
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full py-2 pl-4 pr-10 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              {children}
            </main>
          </div>
        </InterviewProvider>
      </body>
    </html>
  );
}
