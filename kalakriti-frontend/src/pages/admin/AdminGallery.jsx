import { useEffect, useRef, useState } from 'react'
import { Plus, Trash2, X, Upload, FolderOpen, Images, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService, galleryService } from '../../services/services'

export default function AdminGallery() {
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [selectedCat, setSelectedCat] = useState(null) // null = All
  const [catModal, setCatModal] = useState(false)
  const [catName, setCatName] = useState('')
  const [catDesc, setCatDesc] = useState('')
  const [catLoading, setCatLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0 })
  const fileRef = useRef(null)

  const loadCats = () => adminService.getGalleryCategories().then(r => setCategories(r.data || [])).catch(() => {})
  const loadImages = (catId) => galleryService.getImages(catId).then(r => setImages(r.data || [])).catch(() => {})

  useEffect(() => { loadCats(); loadImages(null) }, [])

  const handleSelectCat = (id) => { setSelectedCat(id); loadImages(id) }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    setCatLoading(true)
    try {
      await adminService.createCategory({ name: catName, description: catDesc })
      toast.success(`Category "${catName}" created!`)
      setCatModal(false); setCatName(''); setCatDesc('')
      loadCats()
    } catch { toast.error('Failed to create category') } finally { setCatLoading(false) }
  }

  const handleDeleteCategory = async (id, name) => {
    if (!confirm(`Delete category "${name}" and ALL its photos? This cannot be undone.`)) return
    try { await adminService.deleteCategory(id); toast.success('Category deleted'); loadCats(); loadImages(null); setSelectedCat(null) }
    catch { toast.error('Failed to delete') }
  }

  const handleDeleteImage = async (id) => {
    if (!confirm('Delete this photo?')) return
    try { await adminService.deleteImage(id); toast.success('Photo deleted'); loadImages(selectedCat) }
    catch { toast.error('Failed to delete') }
  }

  // Bulk upload — upload multiple files to selected category
  const handleBulkUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    if (!selectedCat) { toast.error('Please select a category first'); e.target.value = ''; return }

    setUploading(true)
    setUploadProgress({ done: 0, total: files.length })

    let succeeded = 0
    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('data', new Blob([JSON.stringify({
          title: '',
          artistName: '',
          artworkType: 'STUDENT',
          categoryId: selectedCat,
          imageUrl: null
        })], { type: 'application/json' }))
        await adminService.uploadImage(fd)
        succeeded++
        setUploadProgress(p => ({ ...p, done: p.done + 1 }))
      } catch {
        setUploadProgress(p => ({ ...p, done: p.done + 1 }))
      }
    }

    if (succeeded > 0) {
      toast.success(`${succeeded} photo${succeeded > 1 ? 's' : ''} uploaded successfully!`)
      loadImages(selectedCat)
    } else {
      toast.error('All uploads failed. Please try again.')
    }
    setUploading(false)
    setUploadProgress({ done: 0, total: 0 })
    e.target.value = ''
  }

  const activeCatName = selectedCat ? categories.find(c => c.id === selectedCat)?.name : 'All Photos'

  return (
    <AdminLayout title="Manage Gallery">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── LEFT: Categories Panel ─────────────────────── */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-purple-50 bg-[#F8F4FF]">
              <span className="font-bold text-[#2D1B69] text-sm flex items-center gap-1.5"><FolderOpen size={15} /> Categories</span>
              <button onClick={() => setCatModal(true)} className="w-7 h-7 bg-[#6B2D8B] text-white rounded-full flex items-center justify-center hover:bg-[#5a2476] transition-colors" title="Add category">
                <Plus size={14} />
              </button>
            </div>

            {/* All Photos */}
            <button
              onClick={() => handleSelectCat(null)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium border-b border-purple-50 transition-colors ${selectedCat === null ? 'bg-[#6B2D8B] text-white' : 'text-[#2D1B69] hover:bg-[#F2EAE0]'}`}
            >
              <span>All Photos</span>
              <ChevronRight size={14} className="opacity-60" />
            </button>

            {/* Category list */}
            {categories.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-[#9B8BA0]">No categories yet.<br />Click + to add one.</div>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className={`flex items-center border-b border-purple-50 transition-colors ${selectedCat === cat.id ? 'bg-[#6B2D8B]' : 'hover:bg-[#F8F4FF]'}`}>
                  <button
                    onClick={() => handleSelectCat(cat.id)}
                    className={`flex-1 text-left px-4 py-3 text-sm font-medium ${selectedCat === cat.id ? 'text-white' : 'text-[#2D1B69]'}`}
                  >
                    {cat.name}
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className={`px-3 py-3 transition-colors ${selectedCat === cat.id ? 'text-white/70 hover:text-white' : 'text-red-400 hover:text-red-600'}`}
                    title="Delete category"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Upload hint */}
          {selectedCat && (
            <div className="mt-3 px-3 py-2.5 bg-[#EDE0F8] rounded-xl text-xs text-[#6B2D8B] font-medium text-center">
              Selected: <strong>{activeCatName}</strong>
            </div>
          )}
        </div>

        {/* ── RIGHT: Photos Panel ────────────────────────── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#2D1B69] text-base flex items-center gap-2">
                <Images size={16} /> {activeCatName}
                <span className="text-xs font-normal text-[#7B6B8B]">({images.length} photos)</span>
              </h2>
              {!selectedCat && <p className="text-xs text-[#9B8BA0] mt-0.5">Select a category to upload photos to it</p>}
            </div>

            {/* Upload button — only shown when category selected */}
            {selectedCat && (
              <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6B2D8B] text-white font-semibold text-sm cursor-pointer hover:bg-[#5a2476] transition-colors shadow-sm ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                <Upload size={15} />
                {uploading
                  ? `Uploading ${uploadProgress.done}/${uploadProgress.total}...`
                  : 'Upload Photos'}
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleBulkUpload} disabled={uploading} />
              </label>
            )}
          </div>

          {/* Upload progress bar */}
          {uploading && uploadProgress.total > 0 && (
            <div className="mb-4 bg-white rounded-xl border border-purple-100 p-3 shadow-sm">
              <div className="flex justify-between text-xs text-[#6B2D8B] font-medium mb-1.5">
                <span>Uploading photos to "{activeCatName}"...</span>
                <span>{uploadProgress.done}/{uploadProgress.total}</span>
              </div>
              <div className="h-2 bg-[#EDE0F8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6B2D8B] rounded-full transition-all duration-300"
                  style={{ width: `${(uploadProgress.done / uploadProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Photo grid */}
          {images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-purple-100 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#EDE0F8] flex items-center justify-center mb-4">
                <Images size={28} className="text-[#6B2D8B] opacity-60" />
              </div>
              <p className="text-[#2D1B69] font-semibold mb-1">{selectedCat ? 'No photos in this category yet' : 'No photos yet'}</p>
              <p className="text-[#9B8BA0] text-sm">{selectedCat ? 'Click "Upload Photos" to add some!' : 'Select a category then upload photos'}</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {images.map(img => (
                <div key={img.id} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm group relative border border-purple-50 bg-white p-1.5">
                  <img
                    src={img.imageUrl}
                    alt={img.title || 'artwork'}
                    className="w-full object-cover rounded-lg"
                    onError={e => { e.target.style.opacity = '0.3' }}
                  />
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-3 right-3 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                  >
                    <X size={13} />
                  </button>
                  {img.category?.name && (
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">{img.category.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Add Category Modal ─────────────────────────── */}
      {catModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[#2D1B69] text-lg">New Category</h3>
              <button onClick={() => setCatModal(false)}><X size={20} className="text-[#7A5C4A]" /></button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Category Name *</label>
                <input
                  className="input-field"
                  required
                  autoFocus
                  value={catName}
                  onChange={e => setCatName(e.target.value)}
                  placeholder="e.g. Watercolor, Oil Painting, Sketching..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Description <span className="text-[#9B8BA0] font-normal">(optional)</span></label>
                <input className="input-field" value={catDesc} onChange={e => setCatDesc(e.target.value)} placeholder="Brief description of this category" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setCatModal(false)} className="flex-1 btn-secondary">Cancel</button>
                <button type="submit" disabled={catLoading} className="flex-1 btn-primary disabled:opacity-60">{catLoading ? 'Creating...' : 'Create Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
