import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../services/services'
import { useAuth } from '../context/AuthContext'
import { LogIn } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(form)
      const userData = { name: res.data.fullName, email: res.data.email, role: res.data.role }
      login(userData, res.data.token)
      toast.success(`Welcome back, ${res.data.fullName}!`)
      navigate(res.data.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex bg-[#FCFAF7]">

      {/* Left — Art illustration panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=85"
          alt="Art supplies"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(0.8)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(112,74,135,0.80) 0%, rgba(62,52,49,0.85) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
          <img src="/logo.png" alt="Kalakriti" className="w-40 h-40 object-contain drop-shadow-2xl mb-6 border-4 border-white/20 rounded-full p-2 bg-white/10 backdrop-blur-sm" />
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#D4B26F]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-12 bg-[#D4B26F]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed italic font-medium"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Where creativity blooms and every stroke tells a story
          </p>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative overflow-hidden bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-15 pointer-events-none" />
        <div className="wc-tl" style={{ width: 300, height: 300 }} />
        <div className="wc-br" style={{ width: 300, height: 300 }} />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#704A87]/10 flex items-center justify-center mx-auto mb-4 border border-[#704A87]/15">
              <LogIn size={24} className="text-[#704A87]" />
            </div>
            <span className="section-tag text-[#D4B26F]">Welcome Back</span>
            <h1 className="section-title text-3xl text-[#3E3431]">Sign In</h1>
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            </div>
            <p className="text-[#5C504E] text-sm font-semibold">Sign in to your Kalakriti account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#EBE3D5]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#3E3431] mb-1">Email Address</label>
                <input type="email" className="input-field" placeholder="your@email.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3E3431] mb-1">Password</label>
                <input type="password" className="input-field" placeholder="••••••••" required
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 text-base py-3 cursor-pointer">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center text-sm text-[#5C504E] mt-6 font-semibold">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#704A87] font-bold hover:text-[#D4B26F] transition-colors">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
