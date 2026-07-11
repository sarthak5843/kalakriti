import { useEffect, useState } from 'react'
import { Mail, MailOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService } from '../../services/services'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [selected, setSelected] = useState(null)

  const load = () => adminService.getContacts().then(r => setContacts(r.data || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    try { await adminService.markRead(id); load() }
    catch { toast.error('Failed') }
  }

  const open = (c) => { setSelected(c); if (!c.read) markRead(c.id) }

  return (
    <AdminLayout title="Contact Messages">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {contacts.length === 0 && <div className="text-center py-16 text-[#7B6B8B]">No messages yet.</div>}
          {contacts.map(c => (
            <div key={c.id} onClick={() => open(c)}
              className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${selected?.id === c.id ? 'border-[#6B2D8B]' : 'border-purple-100'} ${!c.read ? 'border-l-4 border-l-[#C9A84C]' : ''}`}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  {c.read ? <MailOpen size={14} className="text-[#7B6B8B]" /> : <Mail size={14} className="text-[#C9A84C]" />}
                  <p className={`text-sm font-medium ${c.read ? 'text-[#7B6B8B]' : 'text-[#2D1B69]'}`}>{c.name}</p>
                </div>
                <p className="text-xs text-[#7B6B8B]">{new Date(c.submittedAt).toLocaleDateString('en-IN')}</p>
              </div>
              <p className="text-xs text-[#7B6B8B] ml-5">{c.subject || 'No subject'}</p>
              <p className="text-xs text-[#7B6B8B] ml-5 mt-1 line-clamp-1">{c.message}</p>
            </div>
          ))}
        </div>

        <div>
          {selected ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 sticky top-6">
              <h3 className="font-bold text-[#2D1B69] text-lg mb-1">{selected.subject || 'No subject'}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-[#7B6B8B] mb-4 pb-4 border-b border-purple-100">
                <span><strong className="text-[#2D1B69]">From:</strong> {selected.name}</span>
                <span><strong className="text-[#2D1B69]">Email:</strong> {selected.email}</span>
                {selected.phone && <span><strong className="text-[#2D1B69]">Phone:</strong> {selected.phone}</span>}
              </div>
              <p className="text-[#7B6B8B] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <p className="text-xs text-[#7B6B8B] mt-4">{new Date(selected.submittedAt).toLocaleString('en-IN')}</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 text-center text-[#7B6B8B]">
              <Mail size={40} className="mx-auto mb-3 opacity-30" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
