"use client"

import Link from "next/link"
import { FiArrowRight, FiUsers, FiShield, FiTrendingUp } from "react-icons/fi"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  return (

    <>
      <Navbar />

    <main className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-linear-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight text-gray-900">
              Online Appointment System for Government Offices
            </h1>

            <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0">
             Our Online Appointment System for Government Offices allows citizens to conveniently book and manage appointments online, 
             reducing waiting times and streamlining access to essential services. With an easy-to-use interface, you can schedule your visit, 
             receive confirmations, and stay updated, making government transactions faster and more efficient.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/Navsection/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Get Started
                <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Right Content (Visual Box Placeholder) */}
          <div className="relative">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-32 bg-gray-100 rounded-xl mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
    </>
  )
}