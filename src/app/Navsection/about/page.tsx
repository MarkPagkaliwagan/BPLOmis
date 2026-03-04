"use client"

import Navbar from "@/components/Navbar"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 py-16">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-12 space-y-8">
          
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            About Our Online Appointment System
          </h1>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            Our Online Appointment System is designed to make scheduling with government offices simple, fast, and efficient. No more waiting in long lines or making multiple trips—we bring convenience right to your fingertips.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-4">For Citizens</h2>
              <p className="text-gray-700">
                Easily book appointments online, receive automatic reminders, and manage your schedule without having to wait in person.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold mb-4">For Government Offices</h2>
              <p className="text-gray-700">
                Manage appointments in real time, keep records organized, reduce overcrowding, and provide a more efficient service to the public.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We aim to modernize public services by providing a user-friendly, secure, and reliable system that saves time for both citizens and government staff, promoting efficiency and transparency.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}