import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../../services/services'
import { useAuth } from '../../context/AuthContext'
import { Lock } from 'lucide-react'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(form)
      if (res.data.role !== 'ADMIN') {
        toast.error('Access denied. Admin only.')
        return
      }
      login({ name: res.data.fullName, email: res.data.email, role: res.data.role }, res.data.token)
      toast.success('Welcome, Admin!')
      window.location.href = '/admin'
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#2D1B69' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #E91E8C 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6B2D8B 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center">
          <img src="/logo.png" alt="Kalakriti" className="w-48 h-48 object-contain mx-auto mb-6 drop-shadow-2xl" />
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <p className="text-purple-200 text-sm tracking-widest uppercase font-semibold">Admin Portal</p>
          <p className="text-white/60 text-sm mt-3 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            Manage your art studio with ease
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16" style={{ background: '#F3EEF8' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#6B2D8B] flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2D1B69]" style={{ fontFamily: "'Playfair Display', serif" }}>Admin Sign In</h1>
            <p className="text-[#7B6B8B] text-sm mt-1">Kalakriti Art Studio — Admin Portal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#EDE0F8]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Email</label>
                <input type="email" required className="input-field"
                  placeholder="admin@kalakriti.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Password</label>
                <input type="password" required className="input-field"
                  placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base disabled:opacity-60">
                {loading ? 'Signing in...' : 'Sign In to Admin'}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-[#7B6B8B] mt-6">
            Not an admin?{' '}
            <a href="/" className="text-[#6B2D8B] font-semibold hover:text-[#E91E8C] transition-colors">Go to website</a>
          </p>
        </div>
      </div>
    </div>
  )
}
