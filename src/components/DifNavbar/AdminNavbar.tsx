"use client"

import { JSX, useEffect, useState } from "react"
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaUserShield, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes 
} from "react-icons/fa"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

interface NavItem {
  icon: JSX.Element
  label: string
  href?: string
  action?: () => void
}

export default function AdminNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [admin, setAdmin] = useState<{ firstName: string; lastName: string; username: string } | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const navItems: NavItem[] = [
    { icon: <FaHome />, label: "Dashboard", href: "/admin-dashboard/dashboard" },
     { icon: <FaUserShield />, label: "Profile", href: "/admin-dashboard/profile" },
    {
      icon: <FaSignOutAlt />,
      label: "Logout",
      action: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/Navsection/login")
      },
    },
  ]

  useEffect(() => {
    const storedAdmin = localStorage.getItem("user")
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin))

    const index = navItems.findIndex(item => item.href === pathname)
    if (index !== -1) setActiveIndex(index)
  }, [pathname])

  return (
    <>
      {/* MOBILE TOP NAV */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow flex items-center justify-between px-4 h-16 z-50">
        <div className="flex items-center space-x-2">
          <Image src="/svg/1.svg" alt="Admin Logo" width={36} height={36} />
          <span className="font-semibold text-sm">Admin Panel</span>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-2xl">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow z-40">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveIndex(idx)
                item.href ? router.push(item.href) : item.action?.()
                setMobileOpen(false)
              }}
              className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="text-lg">{item.icon}</div>
              <span className="ml-3 text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <nav
        className={`
          hidden md:flex fixed top-0 left-0 h-screen flex-col pt-6
          bg-white text-gray-900 shadow-lg
          transition-all duration-300 ease-in-out
          overflow-hidden
          ${hovered ? "w-48" : "w-16"}
          z-50
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center flex-col mb-8 px-2">
          <Image src="/svg/2.svg" alt="Admin Logo" width={40} height={40} className="mb-2" />
          {hovered && admin && (
            <div className="text-center">
              <p className="font-semibold text-sm">
                {admin.firstName} {admin.lastName}
              </p>
              <p className="text-xs text-gray-500">{admin.username}</p>
              <p className="text-xs text-red-500 font-semibold">ADMIN</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        {navItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveIndex(idx)
              item.href ? router.push(item.href) : item.action?.()
            }}
            className={`
              flex items-center cursor-pointer px-4 py-3 transition-colors
              ${activeIndex === idx ? "bg-gray-600 text-white" : ""}
              hover:bg-gray-400
            `}
          >
            <div className="text-xl">{item.icon}</div>
            <span
              className={`
                ml-4 font-medium text-sm whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
              `}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </>
  )
}