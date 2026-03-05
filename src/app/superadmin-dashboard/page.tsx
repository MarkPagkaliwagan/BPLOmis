"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
}

export default function SuperAdminDashboard() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Get user from localStorage (token in cookie)
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
  const user = storedUser ? JSON.parse(storedUser) : null

  useEffect(() => {
    if (!user || user.role.toUpperCase() !== "SUPERADMIN") {
      router.replace("/Navsection/login")
      return
    }

    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/superadmin/pending-users", {
        credentials: "include", // ✅ include cookie
      })
      const data = await res.json()
      setUsers(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const approveUser = async (userId: number, role: string) => {
    try {
      await fetch("/api/superadmin/approve-user", {
        method: "POST",
        credentials: "include", // ✅ cookie included
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      })
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    router.replace("/Navsection/login")
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 30 }}>
      <h1>SUPERADMIN Dashboard</h1>
      <button onClick={logout} style={{ marginBottom: 20, background: "red", color: "white", padding: "5px 10px" }}>
        Logout
      </button>

      {users.length === 0 && <p>No pending users.</p>}

      {users.map((user) => (
        <div key={user.id} style={{ border: "1px solid gray", padding: 15, marginBottom: 10 }}>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <select defaultValue="USER" id={`role-${user.id}`}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            onClick={() => {
              const select = document.getElementById(`role-${user.id}`) as HTMLSelectElement
              approveUser(user.id, select.value)
            }}
            style={{ marginLeft: 10, background: "black", color: "white", padding: "5px 10px" }}
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  )
}