"use client"

import { useState } from "react"
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi"

import  prisma  from "@/lib/prisma"
import bcrypt from "bcrypt"
export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        phone: phone.trim(),
        email: email.trim(),
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    alert("Signup successful! Your account is pending SUPERADMIN approval.");

    // Clear form
    setFirstName("");
    setLastName("");
    setUsername("");
    setPhone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } catch (err) {
    setError("Something went wrong");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-black text-white p-12">
          <h2 className="text-4xl font-bold mb-6">
            Online Appointment System for Government Offices
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Sign up to access a fast, secure, and modern appointment system. Manage your bookings, stay informed, and enjoy a seamless experience.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li>✔ Easy and convenient appointment booking</li>
            <li>✔ Real-time schedule management for offices</li>
            <li>✔ Automatic notifications and reminders</li>
            <li>✔ Secure and organized record-keeping</li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-500">
              Fill out the information below to get started.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">

            {/* NAME GRID */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <FiUser className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Juan"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <FiUser className="absolute top-4 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Dela Cruz"
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* USERNAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <FiUser className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="yourusername"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+63 912 345 6789"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
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

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="pl-10 pr-10 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute top-4 right-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-3 rounded-xl bg-black hover:opacity-90 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <a href="/Navsection/login" className="text-black font-semibold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}