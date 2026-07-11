import { useEffect, useState } from 'react'
import { Plus, Trash2, X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService, galleryService } from '../../services/services'

export default function AdminGallery() {
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [selectedCat, setSelectedCat] = useState(null)
  const [catModal, setCatModal] = useState(false)
  const [imgModal, setImgModal] = useState(false)
  const [catName, setCatName] = useState('')
  const [catDesc, setCatDesc] = useState('')
  const [imgForm, setImgForm] = useState({ title: '', artistName: '', artworkType: 'STUDENT', categoryId: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadCats = () => adminService.getGalleryCategories().then(r => setCategories(r.data || [])).catch(() => {})
  const loadImages = (catId) => galleryService.getImages(catId).then(r => setImages(r.data || [])).catch(() => {})

  useEffect(() => { loadCats(); loadImages(null) }, [])

  const handleFilter = (id) => { setSelectedCat(id); loadImages(id) }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await adminService.createCategory({ name: catName, description: catDesc })
      toast.success('Category created!')
      setCatModal(false); setCatName(''); setCatDesc('')
      loadCats()
    } catch { toast.error('Failed') } finally { setLoading(false) }
  }

  const handleDeleteCategory = async (id) => {
    if (!confirm('Delete this category and all its images?')) return
    try { await adminService.deleteCategory(id); toast.success('Deleted'); loadCats(); loadImages(null) }
    catch { toast.error('Failed') }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) { toast.error('Please select an image'); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('data', new Blob([JSON.stringify({
        title: imgForm.title,
        artistName: imgForm.artistName,
        artworkType: imgForm.artworkType,
        categoryId: imgForm.categoryId || null
      })], { type: 'application/json' }))
      await adminService.uploadImage(fd)
      toast.success('Image uploaded!')
      setImgModal(false); setFile(null); setImgForm({ title: '', artistName: '', artworkType: 'STUDENT', categoryId: '' })
      loadImages(selectedCat)
    } catch { toast.error('Upload failed') } finally { setLoading(false) }
  }

  const handleDeleteImage = async (id) => {
    if (!confirm('Delete this image?')) return
    try { await adminService.deleteImage(id); toast.success('Deleted'); loadImages(selectedCat) }
    catch { toast.error('Failed') }
  }

  return (
    <AdminLayout title="Manage Gallery">
      {/* Categories */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#2D1B69]">Categories</h3>
          <button onClick={() => setCatModal(true)} className="btn-primary py-2 px-3 text-sm flex items-center gap-1"><Plus size={14} /> Add Category</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleFilter(null)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCat === null ? 'bg-[#6B2D8B] text-white' : 'bg-[#EDE0F8] text-[#6B2D8B] hover:bg-[#D4B8E8]'}`}>All</button>
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-1">
              <button onClick={() => handleFilter(cat.id)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCat === cat.id ? 'bg-[#6B2D8B] text-white' : 'bg-[#EDE0F8] text-[#6B2D8B] hover:bg-[#D4B8E8]'}`}>{cat.name}</button>
              <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload button */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setImgModal(true)} className="btn-primary flex items-center gap-2"><Upload size={16} /> Upload Artwork</button>
      </div>

      {/* Images grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map(img => (
          <div key={img.id} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm group relative">
            <img src={img.imageUrl} alt={img.title || 'artwork'} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => handleDeleteImage(img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                <Trash2 size={16} />
              </button>
            </div>
            {img.title && (
              <div className="bg-white px-3 py-2">
                <p className="text-[#2C1810] text-xs font-medium">{img.title}</p>
                {img.artistName && <p className="text-[#7A5C4A] text-xs">{img.artistName}</p>}
              </div>
            )}
          </div>
        ))}
        {images.length === 0 && <div className="col-span-4 text-center py-16 text-[#7B6B8B]">No images yet. Upload your first artwork!</div>}
      </div>

      {/* Category Modal */}
      {catModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#2D1B69]">Add Category</h3>
              <button onClick={() => setCatModal(false)}><X size={20} className="text-[#7A5C4A]" /></button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Category Name *</label>
                <input className="input-field" required value={catName} onChange={e => setCatName(e.target.value)} placeholder="e.g. Watercolor, Sketching" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Description</label>
                <input className="input-field" value={catDesc} onChange={e => setCatDesc(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setCatModal(false)} className="flex-1 btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-60">{loading ? 'Creating...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {imgModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#2D1B69]">Upload Artwork</h3>
              <button onClick={() => setImgModal(false)}><X size={20} className="text-[#7A5C4A]" /></button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Image File *</label>
                <input type="file" accept="image/*" required onChange={e => setFile(e.target.files[0])}
                  className="w-full border border-purple-200 rounded-lg px-3 py-2 text-sm text-[#2D1B69]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Title</label>
                <input className="input-field" value={imgForm.title} onChange={e => setImgForm({ ...imgForm, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Artist Name</label>
                <input className="input-field" value={imgForm.artistName} onChange={e => setImgForm({ ...imgForm, artistName: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Artwork Type</label>
                  <select className="input-field" value={imgForm.artworkType} onChange={e => setImgForm({ ...imgForm, artworkType: e.target.value })}>
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1B69] mb-1">Category</label>
                  <select className="input-field" value={imgForm.categoryId} onChange={e => setImgForm({ ...imgForm, categoryId: e.target.value })}>
                    <option value="">None</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setImgModal(false)} className="flex-1 btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-60">{loading ? 'Uploading...' : 'Upload'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
