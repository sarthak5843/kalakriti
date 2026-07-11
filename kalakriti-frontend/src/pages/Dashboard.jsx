import { useEffect, useState } from 'react'
import { BookOpen, Calendar, Download, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { courseService, eventService } from '../services/services'
import { useAuth } from '../context/AuthContext'

function StatusBadge({ status }) {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    APPROVED: 'bg-green-100 text-green-700 border border-green-200',
    REJECTED: 'bg-red-100 text-red-600 border border-red-200',
    CANCELLED: 'bg-gray-100 text-gray-500 border border-gray-200',
    CONFIRMED: 'bg-green-100 text-green-700 border border-green-200',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [bookings, setBookings] = useState([])
  const [tab, setTab] = useState('courses')

  useEffect(() => {
    courseService.myEnrollments().then(r => setEnrollments(r.data || [])).catch(() => {})
    eventService.myBookings().then(r => setBookings(r.data || [])).catch(() => {})
  }, [])

  const downloadReceipt = (item, type) => {
    const content = `
KALAKRITI ART STUDIO
208-B, 54th Cross, Rajajinagar 4th Block, Bangalore
========================================
RECEIPT
========================================
Student: ${user?.name}
Email: ${user?.email}
Type: ${type === 'course' ? 'Course Enrollment' : 'Event Booking'}
${type === 'course' ? `Course: ${item.course?.title}` : `Event: ${item.event?.title}`}
Status: ${item.status}
Date: ${new Date(type === 'course' ? item.enrolledAt : item.bookedAt).toLocaleDateString('en-IN')}
========================================
Thank you for choosing Kalakriti Art Studio!
    `.trim()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kalakriti-receipt-${item.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen" style={{ background: '#F3EEF8' }}>

      {/* Hero header */}
      <div className="relative overflow-hidden py-14"
        style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #6B2D8B 60%, #E91E8C 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-72 h-72 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-[#C9A84C]/60 flex items-center justify-center text-white font-bold text-2xl shrink-0"
              style={{ fontFamily: "'Great Vibes', cursive" }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-0.5">Welcome back</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-purple-300 text-sm">{user?.email}</p>
            </div>
            <img src="/logo.png" alt="" className="w-20 h-20 object-contain opacity-70 ml-auto hidden sm:block" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: BookOpen, label: 'Enrolled Courses', value: enrollments.length },
              { icon: Calendar, label: 'Event Bookings', value: bookings.length },
              { icon: Clock, label: 'Pending Approvals', value: enrollments.filter(e => e.status === 'PENDING').length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-[#C9A84C]" />
                  <div>
                    <p className="text-white font-bold text-xl leading-none">{value}</p>
                    <p className="text-purple-200 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-purple-100 w-fit">
          {[
            { key: 'courses', label: 'My Courses', icon: BookOpen },
            { key: 'events', label: 'My Events', icon: Calendar },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === key
                  ? 'bg-[#6B2D8B] text-white shadow-sm'
                  : 'text-[#7B6B8B] hover:text-[#6B2D8B]'
              }`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === 'courses' && (
          <div className="space-y-3">
            {enrollments.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-purple-100 shadow-sm">
                <BookOpen size={40} className="mx-auto mb-3 text-[#D4B8E8]" />
                <p className="text-[#7B6B8B] mb-4">You haven't enrolled in any courses yet.</p>
                <Link to="/courses" className="btn-primary inline-flex">
                  Browse Courses <ArrowRight size={15} />
                </Link>
              </div>
            ) : enrollments.map(e => (
              <div key={e.id} className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 hover:border-[#C9A84C] transition-all flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EDE0F8] flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-[#6B2D8B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D1B69]">{e.course?.title}</h4>
                    <p className="text-[#7B6B8B] text-xs mt-0.5">
                      Enrolled: {new Date(e.enrolledAt).toLocaleDateString('en-IN')}
                      {e.batch && ` • Batch: ${e.batch.batchName}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={e.status} />
                  <button onClick={() => downloadReceipt(e, 'course')}
                    className="flex items-center gap-1 text-xs text-[#6B2D8B] hover:text-[#E91E8C] font-semibold transition-colors">
                    <Download size={13} /> Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'events' && (
          <div className="space-y-3">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-purple-100 shadow-sm">
                <Calendar size={40} className="mx-auto mb-3 text-[#D4B8E8]" />
                <p className="text-[#7B6B8B] mb-4">You haven't booked any events yet.</p>
                <Link to="/events" className="btn-primary inline-flex">
                  Browse Events <ArrowRight size={15} />
                </Link>
              </div>
            ) : bookings.map(b => (
              <div key={b.id} className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 hover:border-[#C9A84C] transition-all flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD6EC] flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-[#E91E8C]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2D1B69]">{b.event?.title}</h4>
                    <p className="text-[#7B6B8B] text-xs mt-0.5">
                      Booked: {new Date(b.bookedAt).toLocaleDateString('en-IN')}
                      {b.event?.eventDate && ` • Event: ${new Date(b.event.eventDate).toLocaleDateString('en-IN')}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <button onClick={() => downloadReceipt(b, 'event')}
                    className="flex items-center gap-1 text-xs text-[#6B2D8B] hover:text-[#E91E8C] font-semibold transition-colors">
                    <Download size={13} /> Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
