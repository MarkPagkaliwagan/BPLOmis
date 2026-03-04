"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (!storedUser || !token || JSON.parse(storedUser).role !== "ADMIN") {
      router.push("/Navsection/login")
      return
    }
    setUser(JSON.parse(storedUser))
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/Navsection/login")
  }

  if (!user) return <p>Loading...</p>

  return (
    <div style={{ padding: 30 }}>
      <h1>ADMIN Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
      <button onClick={logout} style={{ marginTop: 20, background: "red", color: "white", padding: "5px 10px" }}>
        Logout
      </button>
    </div>
  )
}