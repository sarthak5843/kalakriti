import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Calendar, Image, MessageSquare, Users, Mail, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/enrollments', icon: Users, label: 'Enrollments' },
  { to: '/admin/events', icon: Calendar, label: 'Events' },
  { to: '/admin/event-bookings', icon: Users, label: 'Event Bookings' },
  { to: '/admin/students', icon: Users, label: 'Approved Students' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  { to: '/admin/contacts', icon: Mail, label: 'Contacts' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout({ children, title }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-[#3E3431]">
      {/* Brand */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Kalakriti" className="w-12 h-12 object-contain border border-white/10 rounded-full p-0.5 bg-white/5" />
          <div>
            <p className="text-[#E8D5B5] font-bold text-lg leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>Kalakriti</p>
            <p className="text-[#D4B26F] text-[10px] tracking-widest uppercase font-bold">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                active
                  ? 'bg-[#704A87] text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}>
              <Icon size={17} /> {label}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#E0B3B7] flex items-center justify-center text-[#3E3431] font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-white text-xs font-semibold">{user?.name || 'Admin'}</p>
            <p className="text-gray-400 text-[10px]">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white w-full transition-all cursor-pointer">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#FCFAF7]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-[#3E3431]">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-[#3E3431]">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[#EBE3D5] px-6 py-4 flex items-center gap-4 shrink-0 shadow-sm relative z-10">
          <button className="md:hidden text-[#704A87]" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="h-1.5 w-1.5 rounded-full bg-[#D4B26F] hidden md:block" />
          <h1 className="text-lg font-bold text-[#3E3431]" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" target="_blank" className="text-xs text-[#704A87] hover:text-[#D4B26F] font-bold transition-colors">
              ← View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[#FCFAF7] relative">
          <div className="absolute inset-0 bg-mandala opacity-10 pointer-events-none z-0" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
