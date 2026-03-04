"use client"

import Navbar from "@/components/Navbar"
import { FiClock, FiCheckCircle, FiBell, FiShield } from "react-icons/fi"

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-16">
        <div className="w-full max-w-6xl space-y-12">

          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We provide a modern, user-friendly platform to simplify appointment scheduling for government offices, offering convenience and efficiency for everyone.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <FiClock className="text-4xl text-black mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Easy Scheduling</h2>
              <p className="text-gray-600">
                Book appointments in just a few clicks and manage your schedule efficiently.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <FiBell className="text-4xl text-black mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Automatic Reminders</h2>
              <p className="text-gray-600">
                Receive notifications and reminders so you never miss an appointment.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <FiCheckCircle className="text-4xl text-black mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Real-Time Updates</h2>
              <p className="text-gray-600">
                Offices can update schedules instantly, ensuring citizens see accurate availability.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <FiShield className="text-4xl text-black mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Secure System</h2>
              <p className="text-gray-600">
                All data is handled securely and confidentially, keeping records safe and organized.
              </p>
            </div>

          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the Convenience</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Whether you’re a citizen booking an appointment or an office managing schedules, our system makes it simple and efficient.
            </p>
            <a
              href="/signup"
              className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-900 transition"
            >
              Get Started
            </a>
          </div>

        </div>
      </div>
    </>
  )
}