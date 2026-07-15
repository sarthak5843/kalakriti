import { useEffect, useState } from 'react'
import { Check, X, Bell } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'

function StatusBadge({ status }) {
  const normStatus = status === 'CONFIRMED' ? 'APPROVED' : status
  const colors = { 
    PENDING: 'bg-yellow-100 text-yellow-800', 
    APPROVED: 'bg-green-100 text-green-800', 
    REJECTED: 'bg-red-100 text-red-800', 
    CANCELLED: 'bg-gray-100 text-gray-600' 
  }
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[normStatus] || 'bg-gray-100'}`}>{normStatus}</span>
}

export default function AdminEnrollments() {
  const [allItems, setAllItems] = useState([])
  const [activeTab, setActiveTab] = useState('COURSES') // COURSES, WORKSHOPS, EVENTS
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [filter, setFilter] = useState('PENDING') // PENDING, APPROVED, REJECTED

  const load = async () => {
    try {
      const [enrollRes, eventRes] = await Promise.all([
        adminService.getEnrollments().catch(() => ({ data: [] })),
        adminService.getEventBookings().catch(() => ({ data: [] }))
      ])

      const rawEnrollments = enrollRes.data || []
      const rawEvents = eventRes.data || []

      const normalized = [
        ...rawEnrollments.map(e => ({
          id: `course-${e.id}`,
          rawId: e.id,
          type: 'course',
          user: e.user,
          title: e.course?.title,
          batch: e.batch?.batchName,
          paymentId: e.paymentId,
          date: e.enrolledAt,
          status: e.status, // PENDING, APPROVED, REJECTED
        })),
        ...rawEvents.map(e => ({
          id: `event-${e.id}`,
          rawId: e.id,
          type: 'event',
          user: e.user,
          title: e.event?.title,
          batch: null,
          paymentId: e.paymentId,
          date: e.bookedAt,
          status: e.status === 'CONFIRMED' ? 'APPROVED' : e.status, 
        }))
      ]
      setAllItems(normalized)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { load() }, [])

  const approve = async (item) => {
    try { 
      if (item.type === 'course') {
        await adminService.approveEnrollment(item.rawId); 
      } else {
        await adminService.approveEventBooking(item.rawId);
      }
      toast.success('Approved successfully!'); 
      load() 
    }
    catch { toast.error('Failed to approve') }
  }

  const reject = async (item) => {
    try { 
      if (item.type === 'course') {
        await adminService.rejectEnrollment(item.rawId); 
      } else {
        await adminService.rejectEventBooking(item.rawId);
      }
      toast.success('Rejected successfully'); 
      load() 
    }
    catch { toast.error('Failed to reject') }
  }

  const categorizeTab = (item) => {
    const t = (item.title || '').toLowerCase()
    const isWorkshop = t.includes('workshop') || t.includes('bootcamp')
    if (isWorkshop) return 'WORKSHOPS'
    if (item.type === 'course') return 'COURSES'
    if (item.type === 'event') return 'EVENTS'
    return 'COURSES'
  }

  const itemsInTab = allItems.filter(item => categorizeTab(item) === activeTab)
  const uniqueTitles = [...new Set(itemsInTab.map(i => i.title))].filter(Boolean)

  // Reset selected title when tab changes
  useEffect(() => {
    setSelectedTitle(null)
  }, [activeTab])

  const filteredData = itemsInTab.filter(item => {
    if (selectedTitle && item.title !== selectedTitle) return false
    if (item.status !== filter) return false
    return true
  })

  return (
    <AdminLayout title="Manage Registrations">
      
      {/* Top Level Categories */}
      <div className="flex gap-4 mb-6 border-b border-purple-100 pb-2 overflow-x-auto">
        {['COURSES', 'WORKSHOPS', 'EVENTS'].map(tab => {
          const tabItems = allItems.filter(i => categorizeTab(i) === tab)
          const pendingCount = tabItems.filter(i => i.status === 'PENDING').length
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 rounded-t-lg font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-[#6B2D8B] text-white' 
                  : 'bg-white text-[#7B6B8B] hover:bg-purple-50'
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()} Registrations
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                  <Bell size={10} /> {pendingCount}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar: List of specific courses/events */}
        <div className="lg:w-1/3 space-y-3">
          <h2 className="font-bold text-[#2D1B69] mb-4 text-lg border-b pb-2">
            Select a {activeTab === 'COURSES' ? 'Course' : activeTab === 'WORKSHOPS' ? 'Workshop' : 'Event'}
          </h2>
          
          <button
            onClick={() => setSelectedTitle(null)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
              selectedTitle === null 
                ? 'border-[#6B2D8B] bg-purple-50 shadow-sm' 
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <div className="font-bold text-[#2D1B69]">View All in {activeTab}</div>
            <div className="text-xs text-[#7B6B8B] mt-1">{itemsInTab.length} total registrations</div>
          </button>

          {uniqueTitles.map(title => {
            const pendingForTitle = itemsInTab.filter(i => i.title === title && i.status === 'PENDING').length
            const isSelected = selectedTitle === title
            return (
              <button
                key={title}
                onClick={() => setSelectedTitle(title)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex justify-between items-center ${
                  isSelected 
                    ? 'border-[#6B2D8B] bg-purple-50 shadow-sm' 
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="font-semibold text-sm text-[#2D1B69] pr-2 line-clamp-2">{title}</div>
                {pendingForTitle > 0 && (
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shrink-0">
                    {pendingForTitle} New
                  </div>
                )}
              </button>
            )
          })}
          
          {uniqueTitles.length === 0 && (
            <div className="text-[#7B6B8B] text-sm italic p-4 text-center bg-gray-50 rounded-xl">
              No items available in this category.
            </div>
          )}
        </div>

        {/* Right side: Table */}
        <div className="lg:w-2/3">
          <div className="flex gap-2 flex-wrap mb-4 bg-white p-2 rounded-xl shadow-sm border border-purple-100">
            {['PENDING', 'APPROVED', 'REJECTED'].map(s => {
              const count = itemsInTab.filter(i => (selectedTitle ? i.title === selectedTitle : true) && i.status === s).length
              return (
                <button key={s} onClick={() => setFilter(s)}
                  className={`flex-1 min-w-[100px] px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    filter === s 
                      ? 'bg-[#6B2D8B] text-white shadow-md' 
                      : 'bg-transparent text-[#7B6B8B] hover:bg-purple-50'
                  }`}>
                  {s} ({count})
                </button>
              )
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="p-4 bg-purple-50 border-b border-purple-100 font-bold text-[#2D1B69]">
              {selectedTitle ? selectedTitle : `All ${activeTab} Registrations`} - {filter}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#EDE0F8]">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Student</th>
                    {!selectedTitle && <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Program</th>}
                    <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Payment Ref</th>
                    <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Date</th>
                    <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold">Status</th>
                    {filter === 'PENDING' && <th className="text-left px-4 py-3 text-[#2D1B69] font-semibold text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5E6C8]">
                  {filteredData.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12 text-[#7B6B8B]">No {filter.toLowerCase()} registrations found.</td></tr>
                  ) : filteredData.map(e => (
                    <tr key={e.id} className="hover:bg-[#F3EEF8] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-[#2D1B69]">{e.user?.fullName}</p>
                        <p className="text-[#7B6B8B] text-xs">{e.user?.email}</p>
                      </td>
                      {!selectedTitle && (
                        <td className="px-4 py-3 text-xs font-semibold text-[#6B2D8B] max-w-[150px] truncate" title={e.title}>
                          {e.title}
                        </td>
                      )}
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-600">{e.paymentId || '—'}</td>
                      <td className="px-4 py-3 text-[#7B6B8B] text-xs">{new Date(e.date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                      {filter === 'PENDING' && (
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => approve(e)} className="bg-green-500 text-white p-1.5 rounded hover:bg-green-600 shadow-sm" title="Approve">
                              <Check size={16} />
                            </button>
                            <button onClick={() => reject(e)} className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600 shadow-sm" title="Reject">
                              <X size={16} />
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
        </div>
      </div>
    </AdminLayout>
  )
}
