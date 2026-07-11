import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService, eventService } from '../../services/services'

const empty = { title: '', description: '', eventDate: '', venue: '', paid: false, price: '', totalSeats: '', availableSeats: '', imageUrl: '' }

export default function AdminEvents() {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)

  const load = () => eventService.getAll().then(r => setEvents(r.data || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = (ev) => {
    setEditing(ev)
    setForm({ ...ev, eventDate: ev.eventDate ? ev.eventDate.slice(0, 16) : '', price: ev.price?.toString() || '', totalSeats: ev.totalSeats?.toString() || '', availableSeats: ev.availableSeats?.toString() || '' })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { ...form, price: form.paid ? parseFloat(form.price) : 0, totalSeats: parseInt(form.totalSeats) || null, availableSeats: parseInt(form.availableSeats) || null }
      if (editing) await adminService.updateEvent(editing.id, data)
      else await adminService.createEvent(data)
      toast.success(editing ? 'Event updated!' : 'Event created!')
      setModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    try { await adminService.deleteEvent(id); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <AdminLayout title="Manage Events">
      <div className="flex justify-end mb-6">
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={16} /> Add Event</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(ev => (
          <div key={ev.id} className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-md hover:border-[#C9A84C] transition-all">
            {ev.imageUrl && <img src={ev.imageUrl} alt={ev.title} className="w-full h-36 object-cover" />}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#2D1B69]">{ev.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ev.paid ? 'bg-[#EDE0F8] text-[#6B2D8B]' : 'bg-green-100 text-green-700'}`}>
                  {ev.paid ? `₹${ev.price}` : 'Free'}
                </span>
              </div>
              {ev.eventDate && <p className="text-[#7B6B8B] text-xs mb-2">{new Date(ev.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
              <p className="text-[#7B6B8B] text-sm mb-3 line-clamp-2">{ev.description}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(ev)} className="flex-1 flex items-center justify-center gap-1 border border-purple-200 text-[#6B2D8B] py-2 rounded-lg text-sm hover:bg-[#EDE0F8] transition-colors">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(ev.id)} className="flex-1 flex items-center justify-center gap-1 border border-red-200 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && <div className="col-span-3 text-center py-16 text-[#7B6B8B]">No events yet.</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-purple-100">
              <h3 className="font-bold text-[#2D1B69] text-lg">{editing ? 'Edit Event' : 'Add New Event'}</h3>
              <button onClick={() => setModal(false)}><X size={20} className="text-[#7A5C4A]" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Title *</label>
                <input className="input-field" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Description</label>
                <textarea className="input-field" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Event Date & Time</label>
                  <input type="datetime-local" className="input-field" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Venue</label>
                  <input className="input-field" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="paid" checked={form.paid} onChange={e => setForm({ ...form, paid: e.target.checked })} className="accent-[#6B2D8B] w-4 h-4" />
                <label htmlFor="paid" className="text-sm font-medium text-[#2D1B69]">This is a paid event</label>
              </div>
              {form.paid && (
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Price (₹)</label>
                  <input type="number" className="input-field" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Total Seats</label>
                  <input type="number" className="input-field" value={form.totalSeats} onChange={e => setForm({ ...form, totalSeats: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Available Seats</label>
                  <input type="number" className="input-field" value={form.availableSeats} onChange={e => setForm({ ...form, availableSeats: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Image URL</label>
                <input className="input-field" placeholder="https://..." value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-60">
                  {loading ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
