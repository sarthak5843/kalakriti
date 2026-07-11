import { useEffect, useState } from 'react'
import { Check, X, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [filter, setFilter] = useState('PENDING')

  const load = () => adminService.getTestimonials().then(r => setTestimonials(r.data || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const approve = async (id) => {
    try { await adminService.approveTestimonial(id); toast.success('Approved!'); load() }
    catch { toast.error('Failed') }
  }
  const reject = async (id) => {
    try { await adminService.rejectTestimonial(id); toast.success('Rejected'); load() }
    catch { toast.error('Failed') }
  }

  const filtered = testimonials.filter(t => t.status === filter)

  return (
    <AdminLayout title="Manage Testimonials">
      <div className="flex gap-2 mb-6">
        {['PENDING', 'APPROVED', 'REJECTED'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-[#6B2D8B] text-white' : 'bg-white border border-purple-200 text-[#7B6B8B] hover:border-[#6B2D8B]'}`}>
            {s} ({testimonials.filter(t => t.status === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && <div className="text-center py-16 text-[#7B6B8B]">No {filter.toLowerCase()} testimonials.</div>}
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#6B2D8B] flex items-center justify-center text-white font-bold text-sm">
                    {t.studentName?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D1B69] text-sm">{t.studentName}</p>
                    {t.courseName && <p className="text-[#E91E8C] text-xs">{t.courseName}</p>}
                  </div>
                  <div className="flex gap-0.5 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < (t.rating || 5) ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <p className="text-[#7B6B8B] text-sm italic">"{t.message}"</p>
                <p className="text-[#7B6B8B] text-xs mt-2">{new Date(t.submittedAt).toLocaleDateString('en-IN')}</p>
              </div>
              {filter === 'PENDING' && (
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => approve(t.id)} className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-600">
                    <Check size={14} /> Approve
                  </button>
                  <button onClick={() => reject(t.id)} className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-600">
                    <X size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
