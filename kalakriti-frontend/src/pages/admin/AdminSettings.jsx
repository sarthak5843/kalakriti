import { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import { adminService, siteService } from '../../services/services'

export default function AdminSettings() {
  const [settings, setSettings] = useState({ siteName: '', tagline: '', phone: '', email: '', address: '', instagramUrl: '', facebookUrl: '', youtubeUrl: '', aboutText: '' })
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
        setSettings({ siteName: r.data.siteName || '', tagline: r.data.tagline || '', phone: r.data.phone || '', email: r.data.email || '', address: r.data.address || '', instagramUrl: r.data.instagramUrl || '', facebookUrl: r.data.facebookUrl || '', youtubeUrl: r.data.youtubeUrl || '', aboutText: r.data.aboutText || '' })
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
    e.preventDefault()
    setLoading(true)
    try {
      await adminService.updateSettings(settings)
      toast.success('Settings saved!')
    } catch { toast.error('Failed to save') } finally { setLoading(false) }
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-2xl space-y-6">
        {/* Logo */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <h3 className="font-bold text-[#2D1B69] mb-4">Studio Logo</h3>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-purple-200 overflow-hidden bg-[#EDE0F8] flex items-center justify-center">
              {logoPreview ? <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <span className="text-[#6B2D8B] text-2xl font-bold">K</span>}
            </div>
            <div className="flex-1">
              <input type="file" accept="image/*" onChange={handleLogoChange} className="block w-full text-sm text-[#7B6B8B] mb-3 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#EDE0F8] file:text-[#6B2D8B] file:font-medium hover:file:bg-[#D4B8E8]" />
              {logoFile && (
                <button onClick={handleLogoUpload} disabled={logoLoading} className="btn-primary py-2 px-4 text-sm flex items-center gap-2 disabled:opacity-60">
                  <Upload size={14} /> {logoLoading ? 'Uploading...' : 'Upload Logo'}
                </button>
              )}
              <p className="text-xs text-[#7B6B8B] mt-2">This logo will appear in the Navbar and Footer across the entire website.</p>
            </div>
          </div>
        </div>

        {/* Payment QR Code */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <h3 className="font-bold text-[#2D1B69] mb-4">Payment QR Code (Razorpay / UPI)</h3>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 border-2 border-purple-200 overflow-hidden bg-[#EDE0F8] flex items-center justify-center rounded-lg">
              {qrPreview ? <img src={qrPreview} alt="QR Code" className="w-full h-full object-contain" /> : <span className="text-[#6B2D8B] text-2xl font-bold">QR</span>}
            </div>
            <div className="flex-1">
              <input type="file" accept="image/*" onChange={handleQrChange} className="block w-full text-sm text-[#7B6B8B] mb-3 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#EDE0F8] file:text-[#6B2D8B] file:font-medium hover:file:bg-[#D4B8E8]" />
              {qrFile && (
                <button onClick={handleQrUpload} disabled={qrLoading} className="btn-primary py-2 px-4 text-sm flex items-center gap-2 disabled:opacity-60">
                  <Upload size={14} /> {qrLoading ? 'Uploading...' : 'Upload QR Code'}
                </button>
              )}
              <p className="text-xs text-[#7B6B8B] mt-2">This UPI QR Code will be displayed to users when they enroll/book courses online.</p>
            </div>
          </div>
        </div>

        {/* Site Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <h3 className="font-bold text-[#2D1B69] mb-4">Studio Information</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Studio Name</label>
                <input className="input-field" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Tagline</label>
                <input className="input-field" placeholder="Where Art Comes Alive" value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Phone</label>
                <input className="input-field" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Email</label>
                <input type="email" className="input-field" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D1B69] mb-1">Address</label>
              <input className="input-field" value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D1B69] mb-1">About Text</label>
              <textarea className="input-field" rows={3} value={settings.aboutText} onChange={e => setSettings({ ...settings, aboutText: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Instagram URL</label>
                <input className="input-field" placeholder="https://instagram.com/..." value={settings.instagramUrl} onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">Facebook URL</label>
                <input className="input-field" placeholder="https://facebook.com/..." value={settings.facebookUrl} onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D1B69] mb-1">YouTube URL</label>
                <input className="input-field" placeholder="https://youtube.com/..." value={settings.youtubeUrl} onChange={e => setSettings({ ...settings, youtubeUrl: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
