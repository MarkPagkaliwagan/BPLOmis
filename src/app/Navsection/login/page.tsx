"use client"

import { useState, useEffect } from "react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  // --- Auto-redirect if already logged in ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const role = JSON.parse(storedUser).role
      if (role === "SUPERADMIN") router.push("/superadmin-dashboard")
      else if (role === "ADMIN") router.push("/admin-dashboard")
      else router.push("/user-dashboard")
    }
  }, [])

  // --- Handle login ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      // Store JWT and user
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect based on role
      if (data.user.role === "SUPERADMIN") router.push("/superadmin-dashboard")
      else if (data.user.role === "ADMIN") router.push("/admin-dashboard")
      else router.push("/user-dashboard/dashboard")

    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          
          {/* LEFT SIDE */}
          <div className="hidden md:flex flex-col justify-center bg-black text-white p-12">
            <h2 className="text-4xl font-bold mb-6">Online Appointment System for Government Offices</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our Online Appointment System streamlines scheduling for government offices. Citizens can easily book appointments, reduce wait times, and access services efficiently without physically waiting in line.
            </p>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>✔ Easy and convenient appointment booking</li>
              <li>✔ Real-time schedule management for offices</li>
              <li>✔ Automatic notifications and reminders</li>
              <li>✔ Secure and organized record-keeping</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
              <p className="text-gray-500">Enter your credentials below to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute top-4 right-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>
              )}
              <p className="text-right text-sm mt-2">
                <a href="/forgot-password" className="text-black hover:underline">
                  Forgot Password?
                </a>
              </p>
              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login to Dashboard
              </button>
            </form>

            <p className="text-sm text-center mt-8 text-gray-500">
              Don’t have an account?{" "}
              <a href="/Navsection/signup" className="text-black font-semibold hover:underline">
                Create one here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}