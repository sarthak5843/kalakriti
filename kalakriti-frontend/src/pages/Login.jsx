import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../services/services'
import { useAuth } from '../context/AuthContext'
import { LogIn } from 'lucide-react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(form)
      const userData = { name: res.data.fullName, email: res.data.email, role: res.data.role }
      login(userData, res.data.token)
      toast.success(`Welcome back, ${res.data.fullName}!`)
      window.location.href = res.data.role === 'ADMIN' ? '/admin' : '/dashboard'
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex">

      {/* Left — Indian art illustration panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85"
          alt="Indian art"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(0.8)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(107,45,139,0.70) 0%, rgba(45,27,105,0.80) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
          <img src="/logo.png" alt="Kalakriti" className="w-40 h-40 object-contain drop-shadow-2xl mb-6" />
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Where creativity blooms and every stroke tells a story
          </p>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative overflow-hidden" style={{ background: '#FEFAF4' }}>
        <div className="wc-tl" style={{ width: 300, height: 300 }} />
        <div className="wc-br" style={{ width: 300, height: 300 }} />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#EDE0F8] flex items-center justify-center mx-auto mb-4">
              <LogIn size={24} className="text-[#6B2D8B]" />
            </div>
            <span className="section-tag">Welcome Back</span>
            <h1 className="section-title text-3xl">Sign In</h1>
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <p className="text-[#7B6B8B] text-sm">Sign in to your Kalakriti account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#EDE0F8]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Email Address</label>
                <input type="email" className="input-field" placeholder="your@email.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Password</label>
                <input type="password" className="input-field" placeholder="••••••••" required
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 text-base py-3">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center text-sm text-[#7B6B8B] mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#6B2D8B] font-bold hover:text-[#E91E8C] transition-colors">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
