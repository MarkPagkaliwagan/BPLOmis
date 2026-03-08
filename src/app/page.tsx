"use client"

import { FiMail, FiLock, FiEye } from "react-icons/fi"

export default function LoginPage() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          
          {/* LEFT SIDE */}
          <div className="hidden md:flex flex-col justify-center bg-black text-white p-12">
            <h2 className="text-4xl font-bold mb-6">
              BPLO
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Inspection Management System
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign in
            </h1>

            <form className="space-y-6">
              
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
                  />
                  <div className="absolute top-4 right-3 text-gray-500">
                    <FiEye />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition"
              >
                Login
              </button>

            </form>
          </div>

        </div>
      </div>
    
  )
}