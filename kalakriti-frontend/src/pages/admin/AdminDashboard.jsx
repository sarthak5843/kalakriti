import { useEffect, useState } from 'react'
import { BookOpen, Calendar, Image, MessageSquare, Users, Mail, Clock, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    adminService.stats().then(r => setStats(r.data)).catch(() => {})
  }, [])

  const cards = [
    { label: 'Total Courses', value: stats?.totalCourses ?? '—', icon: BookOpen, to: '/admin/courses', accent: '#6B2D8B' },
    { label: 'Total Enrollments', value: stats?.totalEnrollments ?? '—', icon: Users, to: '/admin/enrollments', accent: '#E91E8C' },
    { label: 'Pending Approvals', value: stats?.pendingEnrollments ?? '—', icon: Clock, to: '/admin/enrollments', accent: '#C9A84C' },
    { label: 'Upcoming Events', value: stats?.totalEvents ?? '—', icon: Calendar, to: '/admin/events', accent: '#2D1B69' },
    { label: 'Gallery Images', value: stats?.totalImages ?? '—', icon: Image, to: '/admin/gallery', accent: '#6B2D8B' },
    { label: 'Pending Testimonials', value: stats?.pendingTestimonials ?? '—', icon: MessageSquare, to: '/admin/testimonials', accent: '#E91E8C' },
    { label: 'Unread Messages', value: stats?.unreadContacts ?? '—', icon: Mail, to: '/admin/contacts', accent: '#C9A84C' },
    { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: TrendingUp, to: '/admin/enrollments', accent: '#2D1B69' },
  ]

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome banner */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #6B2D8B 60%, #E91E8C 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-purple-200 text-sm mb-1">Welcome back</p>
            <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Kalakriti Admin
            </h2>
            <p className="text-purple-200 text-sm mt-1">Here's what's happening at your studio today.</p>
          </div>
          <img src="/logo.png" alt="" className="w-20 h-20 object-contain opacity-80 hidden sm:block" />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cards.map(({ label, value, icon: Icon, to, accent }) => (
          <Link key={label} to={to}
            className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 hover:shadow-md hover:border-[#C9A84C] transition-all group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: accent + '18' }}>
              <Icon size={18} style={{ color: accent }} />
            </div>
            <p className="text-2xl font-bold text-[#2D1B69]">{value}</p>
            <p className="text-[#7B6B8B] text-xs mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
        <h3 className="font-bold text-[#2D1B69] mb-4 text-sm uppercase tracking-wider">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { to: '/admin/courses', label: '+ Add Course' },
            { to: '/admin/events', label: '+ Add Event' },
            { to: '/admin/gallery', label: '+ Upload Artwork' },
            { to: '/admin/testimonials', label: 'Review Testimonials' },
            { to: '/admin/enrollments', label: 'Approve Enrollments' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="btn-primary py-2 px-4 text-sm">{label}</Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
