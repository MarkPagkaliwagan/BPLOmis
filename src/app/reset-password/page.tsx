"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()

  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })

    if (res.ok) {
      alert("Password updated!")
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-black text-white p-2 rounded">
          Update Password!
        </button>
      </form>
    </div>
  )
}