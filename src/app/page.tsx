"use client"

import { FiMail, FiLock, FiEye } from "react-icons/fi"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 via-white to-gray-200 px-4">

      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-between bg-linear-to-br from-black to-gray-900 text-white p-12">
          
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              BPLO
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
              Inspection Management System for streamlined business permit inspections and monitoring.
            </p>
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BPLO System
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute top-3.5 left-3 text-gray-400" />

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute top-3.5 left-3 text-gray-400" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                />

                <div className="absolute top-3.5 right-3 text-gray-400 cursor-pointer">
                  <FiEye />
                </div>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="button"
              className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all"
            >
              Sign In
            </button>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500">
              Secure access for authorized personnel only
            </p>

          </form>

        </div>

      </div>

    </div>
  )
}