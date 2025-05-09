"use client";

import Link from "next/link";
import Image from "next/image";
import {FaMicrophone, FaBrain, FaComments, FaChartLine} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm" />
            <Image
              src="/interview-image.jpg"
              alt="Interview Practice"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Welcome to TalkFluence
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Practice your simulation skills with our AI-powered assistant. Get
                real-time feedback and improve your responses in a stress-free
                environment.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <FaMicrophone className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Voice Interaction</span>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-full">
                    <FaBrain className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-gray-300">AI-Powered</span>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-pink-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-full">
                    <FaComments className="w-5 h-5 text-pink-400" />
                  </div>
                  <span className="text-gray-300">Real-time Feedback</span>
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <FaChartLine className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Performance Analysis</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link
                href="/interview"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                <FaMicrophone className="w-5 h-5" />
                Start Simulation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
