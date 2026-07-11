import { useEffect, useState } from 'react'
import { Star, Send, Lock } from 'lucide-react'
import { testimonialService } from '../services/services'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ message: '', rating: 5, courseName: '' })
  const [submitting, setSubmitting] = useState(false)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    testimonialService.getApproved()
      .then(r => setTestimonials(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await testimonialService.submit(form)
      toast.success('Thank you! Your testimonial is pending approval.')
      setForm({ message: '', rating: 5, courseName: '' })
    } catch {
      toast.error('Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER with Indian art background */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.22) saturate(0.65)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(107,45,139,0.82) 0%, rgba(45,27,105,0.88) 60%, rgba(233,30,140,0.25) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#FFD6EC]">Student Stories</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Testimonials</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            Hear what our students have to say about their creative journey with us
          </p>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="relative overflow-hidden py-20" style={{ background: '#FFF8FF' }}>
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EDE0F8] border-t-[#6B2D8B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#7B6B8B]">Loading testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t.id} className="art-card p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className={i < (t.rating || 5) ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <p className="text-[#7B6B8B] text-sm leading-relaxed mb-5 italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    "{t.message}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#EDE0F8]">
                    <div className="w-10 h-10 rounded-full bg-[#EDE0F8] flex items-center justify-center text-[#6B2D8B] font-bold text-sm">
                      {t.studentName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D1B69] text-sm">{t.studentName}</p>
                      {t.courseName && <p className="text-[#E91E8C] text-xs mt-0.5">{t.courseName}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Star size={48} className="mx-auto mb-4 text-[#D4B8E8]" />
              <p className="text-[#7B6B8B] text-lg">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>

      {/* SUBMIT TESTIMONIAL */}
      <section className="relative overflow-hidden py-20" style={{ background: '#FEFAF4' }}>
        <div className="wc-bl" /><div className="wc-br" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-tag">Share Your Story</span>
            <h2 className="section-title text-3xl">Write a Testimonial</h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
          </div>

          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md border border-[#EDE0F8]">
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#2D1B69] mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                      <Star size={28} className={n <= form.rating ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Course Name (optional)</label>
                <input className="input-field" placeholder="Which course did you take?"
                  value={form.courseName} onChange={e => setForm({ ...form, courseName: e.target.value })} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Your Experience *</label>
                <textarea required rows={4} className="input-field resize-none" placeholder="Share your experience at Kalakriti Art Studio..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                {submitting ? 'Submitting...' : <><Send size={15} /> Submit Testimonial</>}
              </button>
              <p className="text-xs text-[#9B8AAB] text-center mt-3">Your testimonial will be visible after admin approval.</p>
            </form>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#EDE0F8] shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#EDE0F8] flex items-center justify-center mx-auto mb-4">
                <Lock size={22} className="text-[#6B2D8B]" />
              </div>
              <p className="text-[#7B6B8B] mb-6">Please login to share your testimonial</p>
              <Link to="/login" className="btn-primary">Login to Continue</Link>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
