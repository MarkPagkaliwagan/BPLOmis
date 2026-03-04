"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!storedUser || !token || JSON.parse(storedUser).role !== "USER") {
      router.push("/Navsection/login")
      return
    }

    setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="pt-20 md:pt-6 md:ml-16 p-6 md:p-10 transition-all max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Welcome back, {user.firstName} 👋
        </p>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm text-gray-500">Total Orders</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm text-gray-500">Messages</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-sm text-gray-500">Notifications</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <p className="text-gray-500 text-sm">
            No recent activity yet.
          </p>
        </div>

      </div>
    </div>
  )
}