"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { FiHome, FiLogOut, FiMenu, FiX } from "react-icons/fi"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const indicatorRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // 🔐 Supabase Auth Listener
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 🎯 Sliding Underline
  useEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return

    const activeLink = nav.querySelector(
      `a[href="${pathname}"]`
    ) as HTMLElement

    if (activeLink) {
      indicator.style.left = activeLink.offsetLeft + "px"
      indicator.style.width = activeLink.offsetWidth + "px"
    }
  }, [pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/Navsection/login")
    setMenuOpen(false)
  }

  const navLinkStyle = (path: string) =>
    `relative font-medium tracking-wide transition duration-300 ${
      pathname === path
        ? "text-black"
        : "text-black/70 hover:text-black"
    }`

  return (
    <header className="sticky top-0 z-50 w-full bg-black/4 backdrop-blur-lg border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-black font-semibold text-lg tracking-wide"
        >
          <FiHome />
          Online Appointment System for Government Offices
        </Link>

        {/* Desktop Nav */}
        <nav
          ref={navRef}
          className="relative hidden md:flex items-center gap-10 text-sm"
        >
          <Link href="/" className={navLinkStyle("/")}>
            Home
          </Link>

          <Link href="/Navsection/about" className={navLinkStyle("/Navsection/about")}>
            About
          </Link>

          <Link href="/Navsection/services" className={navLinkStyle("/Navsection/services")}>
            Services
          </Link>

          {!user ? (
            <Link
              href="/Navsection/login"
              className="ml-4 px-5 py-2 rounded-full border border-black text-black font-medium tracking-wide hover:bg-black hover:text-white transition-all duration-300"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={navLinkStyle("/dashboard")}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="ml-4 px-5 py-2 rounded-full bg-black text-white hover:opacity-80 transition duration-300"
              >
                Logout
              </button>
            </>
          )}

          {/* Sliding Indicator */}
          <div
            ref={indicatorRef}
            className="absolute -bottom-1 h-0.5 bg-black transition-all duration-500 ease-in-out"
          />
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 border-t border-black/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-5 bg-black/4 backdrop-blur-lg text-black">

          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link href="/Navsection/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link href="/Navsection/services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>

          {!user ? (
            <Link
              href="/Navsection/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-2 rounded-full border border-black text-center"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}