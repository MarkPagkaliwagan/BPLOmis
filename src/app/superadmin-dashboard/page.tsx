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
  const [token, setToken] = useState<string | null>(null)

  // Check login & fetch token
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (!storedToken || !storedUser || JSON.parse(storedUser).role !== "SUPERADMIN") {
      router.push("/Navsection/login")
      return
    }
    setToken(storedToken)
    fetchUsers(storedToken)
  }, [])

  const fetchUsers = async (jwt: string) => {
    try {
      const res = await fetch("/api/superadmin/pending-users", {
        headers: { Authorization: `Bearer ${jwt}` },
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
    if (!token) return
    await fetch("/api/superadmin/approve-user", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId, role }),
    })
    fetchUsers(token)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/Navsection/login")
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