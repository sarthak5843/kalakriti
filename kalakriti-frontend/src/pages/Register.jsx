import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../services/services'
import { useAuth } from '../context/AuthContext'
import { UserPlus } from 'lucide-react'

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.register(form)
      const userData = { name: res.data.fullName, email: res.data.email, role: res.data.role }
      login(userData, res.data.token)
      toast.success(`Welcome to Kalakriti, ${res.data.fullName}!`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex">

      {/* Left — Indian art illustration panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85"
          alt="Indian art"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.75)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(233,30,140,0.40) 0%, rgba(107,45,139,0.75) 50%, rgba(45,27,105,0.85) 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
          <img src="/logo.png" alt="Kalakriti" className="w-40 h-40 object-contain drop-shadow-2xl mb-6" />
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Begin your creative journey with Bangalore's most beloved art studio
          </p>
        </div>
      </div>

      {/* Right — Register form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative overflow-hidden" style={{ background: '#FEFAF4' }}>
        <div className="wc-tl" style={{ width: 300, height: 300 }} />
        <div className="wc-br" style={{ width: 300, height: 300 }} />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#EDE0F8] flex items-center justify-center mx-auto mb-4">
              <UserPlus size={24} className="text-[#6B2D8B]" />
            </div>
            <span className="section-tag">Join Us</span>
            <h1 className="section-title text-3xl">Create Account</h1>
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <p className="text-[#7B6B8B] text-sm">Start your art journey with Kalakriti</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#EDE0F8]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Full Name *</label>
                <input className="input-field" placeholder="Your full name" required
                  value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Email Address *</label>
                <input type="email" className="input-field" placeholder="your@email.com" required
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Phone Number</label>
                <input className="input-field" placeholder="+91 XXXXX XXXXX"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Password *</label>
                <input type="password" className="input-field" placeholder="Min. 6 characters" required minLength={6}
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 text-base py-3">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p className="text-center text-sm text-[#7B6B8B] mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#6B2D8B] font-bold hover:text-[#E91E8C] transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
