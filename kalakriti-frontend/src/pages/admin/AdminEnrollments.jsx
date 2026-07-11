import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'

function StatusBadge({ status }) {
  const colors = { PENDING: 'bg-yellow-100 text-yellow-800', APPROVED: 'bg-green-100 text-green-800', REJECTED: 'bg-red-100 text-red-800', CANCELLED: 'bg-gray-100 text-gray-600' }
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[status] || 'bg-gray-100'}`}>{status}</span>
}

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [filter, setFilter] = useState('PENDING')

  const load = () => adminService.getEnrollments().then(r => setEnrollments(r.data || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const approve = async (id) => {
    try { await adminService.approveEnrollment(id); toast.success('Enrollment approved!'); load() }
    catch { toast.error('Failed') }
  }
  const reject = async (id) => {
    try { await adminService.rejectEnrollment(id); toast.success('Enrollment rejected'); load() }
    catch { toast.error('Failed') }
  }

  const filtered = enrollments.filter(e => e.status === filter)

  return (
    <AdminLayout title="Manage Enrollments">
      <div className="flex gap-2 mb-6 flex-wrap">
        {['PENDING', 'APPROVED', 'REJECTED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-[#6B2D8B] text-white' : 'bg-white border border-purple-200 text-[#7B6B8B] hover:border-[#6B2D8B]'}`}>
            {s} ({enrollments.filter(e => e.status === s).length})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#EDE0F8]">
              <tr>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Student</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Course</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Batch</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Payment Ref</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Status</th>
                {filter === 'PENDING' && <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E6C8]">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-[#7B6B8B]">No {filter.toLowerCase()} enrollments.</td></tr>
              ) : filtered.map(e => (
                <tr key={e.id} className="hover:bg-[#F3EEF8] divide-y divide-purple-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#2D1B69]">{e.user?.fullName}</p>
                    <p className="text-[#7B6B8B] text-xs">{e.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[#7B6B8B]">{e.course?.title}</td>
                  <td className="px-4 py-3 text-[#7B6B8B]">{e.batch?.batchName || '—'}</td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-[#6B2D8B]">{e.paymentId || '—'}</td>
                  <td className="px-4 py-3 text-[#7B6B8B]">{new Date(e.enrolledAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  {filter === 'PENDING' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => approve(e.id)} className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">
                          <Check size={12} /> Approve
                        </button>
                        <button onClick={() => reject(e.id)} className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
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
