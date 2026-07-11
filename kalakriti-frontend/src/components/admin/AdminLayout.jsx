import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, BookOpen, Calendar, Image, MessageSquare, Users, Mail, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/enrollments', icon: Users, label: 'Enrollments' },
  { to: '/admin/events', icon: Calendar, label: 'Events' },
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
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Kalakriti" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>Kalakriti</p>
            <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#6B2D8B] text-white shadow-md'
                  : 'text-purple-200 hover:bg-white/10 hover:text-white'
              }`}>
              <Icon size={17} /> {label}
            </Link>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#E91E8C] flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-white text-xs font-semibold">{user?.name || 'Admin'}</p>
            <p className="text-purple-300 text-[10px]">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-purple-200 hover:bg-white/10 hover:text-white w-full transition-all">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F3EEF8' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0" style={{ background: '#2D1B69' }}>
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60" style={{ background: '#2D1B69' }}>
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-purple-100 px-6 py-4 flex items-center gap-4 shrink-0 shadow-sm">
          <button className="md:hidden text-[#6B2D8B]" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="h-1 w-1 rounded-full bg-[#C9A84C] hidden md:block" />
          <h1 className="text-lg font-bold text-[#2D1B69]" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" target="_blank" className="text-xs text-[#6B2D8B] hover:text-[#E91E8C] font-medium transition-colors">
              ← View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
