import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'
import { Users, Calendar as CalendarIcon, Download } from 'lucide-react'

export default function AdminRegisteredStudents() {
  const [tab, setTab] = useState('COURSES') // COURSES or EVENTS
  const [enrollments, setEnrollments] = useState([])
  const [eventBookings, setEventBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([
      adminService.getEnrollments().catch(() => ({ data: [] })),
      adminService.getEventBookings().catch(() => ({ data: [] }))
    ]).then(([enrollmentsRes, bookingsRes]) => {
      // Only keep approved/confirmed ones
      setEnrollments(enrollmentsRes.data?.filter(e => e.status === 'APPROVED') || [])
      setEventBookings(bookingsRes.data?.filter(b => b.status === 'CONFIRMED') || [])
    }).finally(() => setLoading(false))
  }, [])

  const filteredEnrollments = enrollments.filter(e => 
    e.user?.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    e.course?.title?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredBookings = eventBookings.filter(b => 
    b.user?.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    b.event?.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout title="Registered Students Directory">
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-1 mb-6 inline-flex">
        <button 
          onClick={() => setTab('COURSES')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            tab === 'COURSES' ? 'bg-[#704A87] text-white shadow-sm' : 'text-[#7B6B8B] hover:bg-purple-50 hover:text-[#704A87]'
          }`}
        >
          <Users size={16} />
          Course Students ({enrollments.length})
        </button>
        <button 
          onClick={() => setTab('EVENTS')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            tab === 'EVENTS' ? 'bg-[#704A87] text-white shadow-sm' : 'text-[#7B6B8B] hover:bg-purple-50 hover:text-[#704A87]'
          }`}
        >
          <CalendarIcon size={16} />
          Event & Workshop Attendees ({eventBookings.length})
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="p-4 border-b border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <input 
            type="text" 
            placeholder={`Search ${tab === 'COURSES' ? 'course students' : 'attendees'}...`} 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-purple-200 rounded-lg px-4 py-2 text-sm w-full sm:w-80 focus:outline-none focus:border-[#704A87]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EDE0F8]">
              <tr>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold w-1/4">Student Name</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold w-1/4">Contact (Email / Phone)</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold w-1/3">
                  {tab === 'COURSES' ? 'Enrolled Course' : 'Booked Event/Workshop'}
                </th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E6C8]">
              {loading ? (
                <tr><td colSpan={4} className="text-center py-12 text-[#7B6B8B]">Loading data...</td></tr>
              ) : tab === 'COURSES' ? (
                filteredEnrollments.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-[#7B6B8B]">No approved students found.</td></tr>
                ) : filteredEnrollments.map(e => (
                  <tr key={e.id} className="hover:bg-[#F3EEF8] divide-y divide-purple-50">
                    <td className="px-4 py-3 font-medium text-[#2D1B69]">{e.user?.fullName}</td>
                    <td className="px-4 py-3 text-[#7B6B8B] text-xs">
                      <p>{e.user?.email}</p>
                      <p>{e.user?.phone || '—'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#6B2D8B] bg-purple-50 px-2 py-1 rounded-md">{e.course?.title}</span>
                      {e.batch && <p className="text-xs text-gray-500 mt-1">Batch: {e.batch.batchName}</p>}
                    </td>
                    <td className="px-4 py-3 text-[#7B6B8B] text-xs">{new Date(e.enrolledAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))
              ) : (
                filteredBookings.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-[#7B6B8B]">No confirmed event attendees found.</td></tr>
                ) : filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-[#F3EEF8] divide-y divide-purple-50">
                    <td className="px-4 py-3 font-medium text-[#2D1B69]">{b.user?.fullName}</td>
                    <td className="px-4 py-3 text-[#7B6B8B] text-xs">
                      <p>{b.user?.email}</p>
                      <p>{b.user?.phone || '—'}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-[#6B2D8B] bg-purple-50 px-2 py-1 rounded-md">{b.event?.title}</span>
                      {b.event?.eventDate && <p className="text-xs text-gray-500 mt-1">Date: {new Date(b.event.eventDate).toLocaleDateString('en-IN')}</p>}
                    </td>
                    <td className="px-4 py-3 text-[#7B6B8B] text-xs">{new Date(b.bookedAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
