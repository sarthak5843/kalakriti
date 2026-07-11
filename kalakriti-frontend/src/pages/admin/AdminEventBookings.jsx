import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'

function StatusBadge({ status }) {
  const colors = { 
    PENDING: 'bg-yellow-100 text-yellow-800', 
    CONFIRMED: 'bg-green-100 text-green-800', 
    REJECTED: 'bg-red-100 text-red-800', 
    CANCELLED: 'bg-gray-100 text-gray-600' 
  }
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status] || 'bg-gray-100'}`}>{status}</span>
}

export default function AdminEventBookings() {
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('PENDING')

  const load = () => adminService.getEventBookings().then(r => setBookings(r.data || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const approve = async (id) => {
    try { 
      await adminService.approveEventBooking(id)
      toast.success('Event registration confirmed!')
      load() 
    } catch (err) { 
      toast.error(err.response?.data?.message || 'Failed to approve registration') 
    }
  }

  const reject = async (id) => {
    try { 
      await adminService.rejectEventBooking(id)
      toast.success('Event registration rejected')
      load() 
    } catch (err) { 
      toast.error('Failed to reject registration') 
    }
  }

  const filtered = bookings.filter(b => b.status === filter)

  return (
    <AdminLayout title="Manage Event Bookings">
      <div className="flex gap-2 mb-6 flex-wrap">
        {['PENDING', 'CONFIRMED', 'REJECTED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-[#6B2D8B] text-white' : 'bg-white border border-purple-200 text-[#7B6B8B] hover:border-[#6B2D8B]'}`}>
            {s} ({bookings.filter(b => b.status === s).length})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EDE0F8]">
              <tr>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Student</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Event</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Date & Venue</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Payment Ref</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Booked Date</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Status</th>
                {filter === 'PENDING' && <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E6C8]">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-[#7B6B8B]">No {filter.toLowerCase()} registrations.</td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="hover:bg-[#F3EEF8] divide-y divide-purple-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#2D1B69]">{b.user?.fullName}</p>
                    <p className="text-[#7B6B8B] text-xs">{b.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[#7B6B8B] font-medium">{b.event?.title}</td>
                  <td className="px-4 py-3 text-[#7B6B8B]">
                    <p className="text-xs">{b.event?.eventDate ? new Date(b.event.eventDate).toLocaleDateString('en-IN') : '—'}</p>
                    <p className="text-xs text-gray-500 font-medium">{b.event?.venue || '—'}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-[#6B2D8B]">{b.paymentId || '—'}</td>
                  <td className="px-4 py-3 text-[#7B6B8B]">{new Date(b.bookedAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  {filter === 'PENDING' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => approve(b.id)} className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">
                          <Check size={12} /> Confirm
                        </button>
                        <button onClick={() => reject(b.id)} className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                          <X size={12} /> Reject
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
