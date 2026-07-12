import { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService, siteService } from '../../services/services'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    phone: '',
    email: '',
    address: '',
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    aboutText: '',
    instructorName: '',
    instructorBio: '',
    aboutImageUrl: '',
    instructorImageUrl: '',
    instructorImages: ''
  })
  const [newArtUrl, setNewArtUrl] = useState('')
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [qrFile, setQrFile] = useState(null)
  const [qrPreview, setQrPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logoLoading, setLogoLoading] = useState(false)
  const [qrLoading, setQrLoading] = useState(false)

  useEffect(() => {
    siteService.get().then(r => {
      if (r.data) {
        setSettings({
          siteName: r.data.siteName || '',
          tagline: r.data.tagline || '',
          phone: r.data.phone || '',
          email: r.data.email || '',
          address: r.data.address || '',
          instagramUrl: r.data.instagramUrl || '',
          facebookUrl: r.data.facebookUrl || '',
          youtubeUrl: r.data.youtubeUrl || '',
          aboutText: r.data.aboutText || '',
          instructorName: r.data.instructorName || '',
          instructorBio: r.data.instructorBio || '',
          aboutImageUrl: r.data.aboutImageUrl || '',
          instructorImageUrl: r.data.instructorImageUrl || '',
          instructorImages: r.data.instructorImages || ''
        })
        if (r.data.logoUrl) setLogoPreview(r.data.logoUrl)
        if (r.data.qrCodeUrl) setQrPreview(r.data.qrCodeUrl)
      }
    }).catch(() => {})
  }, [])

  const handleLogoChange = (e) => {
    const f = e.target.files[0]
    if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)) }
  }

  const handleLogoUpload = async () => {
    if (!logoFile) return
    setLogoLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', logoFile)
      await adminService.uploadLogo(fd)
      toast.success('Logo updated! It will now appear on the website.')
      setLogoFile(null)
    } catch { toast.error('Logo upload failed') } finally { setLogoLoading(false) }
  }

  const handleQrChange = (e) => {
    const f = e.target.files[0]
    if (f) { setQrFile(f); setQrPreview(URL.createObjectURL(f)) }
  }

  const handleQrUpload = async () => {
    if (!qrFile) return
    setQrLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', qrFile)
      await adminService.uploadQrCode(fd)
      toast.success('UPI QR Code updated!')
      setQrFile(null)
    } catch { toast.error('QR Code upload failed') } finally { setQrLoading(false) }
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    try {
      await adminService.updateSettings(settings)
      toast.success('Settings saved successfully!')
    } catch { toast.error('Failed to save settings') } finally { setLoading(false) }
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-4xl grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Logo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE3D5]">
            <h3 className="font-bold text-[#3E3431] mb-4 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Studio Logo</h3>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full border border-[#EBE3D5] overflow-hidden bg-[#FCFAF7] flex items-center justify-center">
                {logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <span className="text-[#3E3431] text-2xl font-bold">K</span>}
              </div>
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handleLogoChange} className="block w-full text-xs text-[#8F8082] mb-3 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#EBE3D5] file:bg-[#FCFAF7] file:text-[#3E3431] file:font-semibold hover:file:bg-[#F2EAE0] cursor-pointer" />
                {logoFile && (
                  <button onClick={handleLogoUpload} disabled={logoLoading} className="btn-primary py-2 px-4 text-xs flex items-center gap-2 disabled:opacity-60 cursor-pointer">
                    <Upload size={14} /> {logoLoading ? 'Uploading...' : 'Upload Logo'}
                  </button>
                )}
                <p className="text-[11px] text-[#8F8082] mt-2">This logo will appear in the Navbar and Footer across the website.</p>
              </div>
            </div>
          </div>

          {/* Payment QR Code */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE3D5]">
            <h3 className="font-bold text-[#3E3431] mb-4 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Payment QR Code (Razorpay / UPI)</h3>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 border border-[#EBE3D5] overflow-hidden bg-[#FCFAF7] flex items-center justify-center rounded-xl">
                {qrPreview ? <img src={qrPreview} alt="QR Code" className="w-full h-full object-contain" /> : <span className="text-[#3E3431] text-2xl font-bold">QR</span>}
              </div>
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handleQrChange} className="block w-full text-xs text-[#8F8082] mb-3 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#EBE3D5] file:bg-[#FCFAF7] file:text-[#3E3431] file:font-semibold hover:file:bg-[#F2EAE0] cursor-pointer" />
                {qrFile && (
                  <button onClick={handleQrUpload} disabled={qrLoading} className="btn-primary py-2 px-4 text-xs flex items-center gap-2 disabled:opacity-60 cursor-pointer">
                    <Upload size={14} /> {qrLoading ? 'Uploading...' : 'Upload QR Code'}
                  </button>
                )}
                <p className="text-[11px] text-[#8F8082] mt-2">This UPI QR Code will be displayed to users when they enroll/book courses online.</p>
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE3D5]">
            <h3 className="font-bold text-[#3E3431] mb-4 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Studio Information</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Studio Name</label>
                  <input className="input-field" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Tagline</label>
                  <input className="input-field" placeholder="Where Art Comes Alive" value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Phone</label>
                  <input className="input-field" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Email</label>
                  <input type="email" className="input-field" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Address</label>
                <input className="input-field" value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Instagram URL</label>
                  <input className="input-field" placeholder="https://instagram.com/..." value={settings.instagramUrl} onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Facebook URL</label>
                  <input className="input-field" placeholder="https://facebook.com/..." value={settings.facebookUrl} onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">YouTube URL</label>
                  <input className="input-field" placeholder="https://youtube.com/..." value={settings.youtubeUrl} onChange={e => setSettings({ ...settings, youtubeUrl: e.target.value })} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary py-2.5 px-6 text-sm disabled:opacity-60 cursor-pointer">
                {loading ? 'Saving...' : 'Save Studio Details'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel: About Us & Instructor Configuration */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EBE3D5]">
            <h3 className="font-bold text-[#3E3431] mb-4 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>About Us & Instructor Details</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Studio History / Story (About Text)</label>
                <textarea className="input-field" rows={4} value={settings.aboutText} onChange={e => setSettings({ ...settings, aboutText: e.target.value })} placeholder="Tell the story of how Kalakriti Art Studio was founded..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Studio Main Image URL (About Section)</label>
                <input className="input-field" value={settings.aboutImageUrl} onChange={e => setSettings({ ...settings, aboutImageUrl: e.target.value })} placeholder="e.g. https://images.unsplash.com/..." />
                {settings.aboutImageUrl && (
                  <div className="mt-2 h-24 rounded-lg overflow-hidden border border-[#EBE3D5] bg-[#FCFAF7] p-1">
                    <img src={settings.aboutImageUrl} alt="Studio Preview" className="w-full h-full object-cover rounded-md" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                )}
              </div>
              <div className="border-t border-[#EBE3D5]/40 pt-4">
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Instructor Name</label>
                <input className="input-field" value={settings.instructorName} onChange={e => setSettings({ ...settings, instructorName: e.target.value })} placeholder="e.g. Ms. Priya Sharma" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Instructor Biography / Credentials</label>
                <textarea className="input-field" rows={4} value={settings.instructorBio} onChange={e => setSettings({ ...settings, instructorBio: e.target.value })} placeholder="Write about the instructor's background, art specialty, teaching style..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-1">Instructor Profile Image URL</label>
                <input className="input-field" value={settings.instructorImageUrl} onChange={e => setSettings({ ...settings, instructorImageUrl: e.target.value })} placeholder="e.g. https://images.unsplash.com/..." />
                {settings.instructorImageUrl && (
                  <div className="mt-2 h-24 w-24 rounded-full overflow-hidden border border-[#EBE3D5] bg-[#FCFAF7] p-1">
                    <img src={settings.instructorImageUrl} alt="Instructor Preview" className="w-full h-full object-cover rounded-full" onError={e => { e.target.style.display = 'none' }} />
                  </div>
                )}
              </div>

              {/* Multiple Instructor Artwork/Portfolio Photos */}
              <div className="border-t border-[#EBE3D5]/40 pt-4">
                <label className="block text-xs font-bold text-[#3E3431] uppercase tracking-wider mb-2">Instructor Selected Artworks / Portfolio Photos</label>
                <div className="flex gap-2 mb-3">
                  <input
                    className="input-field py-2"
                    placeholder="Paste artwork image URL..."
                    value={newArtUrl}
                    onChange={e => setNewArtUrl(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newArtUrl.trim()) return;
                      const current = settings.instructorImages ? settings.instructorImages.split(',').filter(Boolean) : [];
                      if (current.includes(newArtUrl.trim())) {
                        toast.error('Image already added');
                        return;
                      }
                      const updatedImages = [...current, newArtUrl.trim()].join(',');
                      setSettings({ ...settings, instructorImages: updatedImages });
                      setNewArtUrl('');
                      toast.success('Artwork added to list!');
                    }}
                    className="btn-pink py-2 px-4 text-xs font-bold shrink-0 cursor-pointer rounded-xl"
                  >
                    Add Photo
                  </button>
                </div>
                
                {/* Thumbnails grid */}
                <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto p-1 border border-[#EBE3D5] rounded-xl bg-[#FCFAF7]">
                  {settings.instructorImages ? settings.instructorImages.split(',').filter(Boolean).map((url, index) => (
                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-[#EBE3D5] bg-white">
                      <img src={url} alt={`Artwork ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          const current = settings.instructorImages.split(',').filter(Boolean);
                          const updated = current.filter(u => u !== url).join(',');
                          setSettings({ ...settings, instructorImages: updated });
                          toast.success('Artwork removed');
                        }}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )) : (
                    <div className="col-span-4 py-8 text-center text-xs text-[#8F8082] font-semibold">
                      No portfolio images added yet.
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary py-2.5 px-6 text-sm disabled:opacity-60 cursor-pointer w-full mt-4">
                {loading ? 'Saving...' : 'Save About & Instructor Details'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
