import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, X, Upload, Image } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService, courseService } from '../../services/services'

const empty = { title: '', description: '', highlights: '', mode: 'OFFLINE', price: '', durationWeeks: '', totalSeats: '', imageUrl: '' }

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [imgUploading, setImgUploading] = useState(false)
  const fileRef = useRef(null)

  const load = () => courseService.getAll().then(r => setCourses(r.data || [])).catch(() => {})
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
  const openEdit = (c) => {
    setEditing(c)
    setForm({ ...c, price: c.price?.toString(), durationWeeks: c.durationWeeks?.toString(), totalSeats: c.totalSeats?.toString() })
    setModal(true)
  }

  const handleImagePick = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImgUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'courses')
      const res = await adminService.uploadFile(fd)
      setForm(prev => ({ ...prev, imageUrl: res.data }))
      toast.success('Image uploaded!')
    } catch { toast.error('Image upload failed') }
    finally { setImgUploading(false); e.target.value = '' }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { ...form, price: parseFloat(form.price), durationWeeks: parseInt(form.durationWeeks) || null, totalSeats: parseInt(form.totalSeats) || null }
      if (editing) await adminService.updateCourse(editing.id, data)
      else await adminService.createCourse(data)
      toast.success(editing ? 'Course updated!' : 'Course created!')
      setModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return
    try { await adminService.deleteCourse(id); toast.success('Course deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <AdminLayout title="Manage Courses">
      <div className="flex justify-end mb-6">
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Course
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-md hover:border-[#C9A84C] transition-all">
            {c.imageUrl
              ? <img src={c.imageUrl} alt={c.title} className="w-full h-40 object-cover" />
              : <div className="w-full h-40 bg-[#F2EAE0] flex items-center justify-center"><Image size={32} className="text-[#C9A84C] opacity-40" /></div>
            }
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#2D1B69]">{c.title}</h3>
                <span className="text-xs bg-[#EDE0F8] text-[#6B2D8B] px-2 py-0.5 rounded-full font-medium">{c.mode}</span>
              </div>
              <p className="text-[#7B6B8B] text-sm mb-3 line-clamp-2">{c.description}</p>
              <p className="text-[#6B2D8B] font-bold mb-3">₹{c.price?.toLocaleString()}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(c)} className="flex-1 flex items-center justify-center gap-1 border border-purple-200 text-[#6B2D8B] py-2 rounded-lg text-sm hover:bg-[#EDE0F8] transition-colors">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(c.id)} className="flex-1 flex items-center justify-center gap-1 border border-red-200 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-3 text-center py-16 text-[#7B6B8B]">No courses yet. Add your first course!</div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-purple-100">
              <h3 className="font-bold text-[#2D1B69] text-lg">{editing ? 'Edit Course' : 'Add New Course'}</h3>
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
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Highlights (one per line)</label>
                <textarea className="input-field" rows={3} placeholder={"Learn watercolor basics\nColor theory\nBrush techniques"} value={form.highlights} onChange={e => setForm({ ...form, highlights: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Mode *</label>
                  <select className="input-field" value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}>
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Price (₹) *</label>
                  <input type="number" className="input-field" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Duration (weeks)</label>
                  <input type="number" className="input-field" value={form.durationWeeks} onChange={e => setForm({ ...form, durationWeeks: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Total Seats</label>
                  <input type="number" className="input-field" value={form.totalSeats} onChange={e => setForm({ ...form, totalSeats: e.target.value })} />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-2">Course Image</label>
                <div className="flex items-center gap-3">
                  {form.imageUrl && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-purple-100 shrink-0">
                      <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-dashed border-[#6B2D8B]/40 text-[#6B2D8B] font-semibold text-sm cursor-pointer hover:bg-[#EDE0F8]/40 transition-colors ${imgUploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    <Upload size={15} />
                    {imgUploading ? 'Uploading...' : form.imageUrl ? 'Change Image' : 'Choose Image from Device'}
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} disabled={imgUploading} />
                  </label>
                </div>
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
