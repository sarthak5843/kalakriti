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

      {/* HEADER with Art Background */}
      <section className="relative overflow-hidden py-32 text-center bg-[#FAF6F0]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(250,246,240,0.85) 0%, rgba(242,234,224,0.9) 60%, rgba(224,179,183,0.3) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#D4B26F]">Student Stories</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Testimonials</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-semibold">
            Hear what our students have to say about their creative journey with us
          </p>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="relative overflow-hidden py-20 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EBE3D5] border-t-[#704A87] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#8F8082]">Loading testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t.id} className="art-card p-6 bg-white">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className={i < (t.rating || 5) ? 'text-[#D4B26F] fill-[#D4B26F]' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <p className="text-[#5C504E] text-sm leading-relaxed mb-5 italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    "{t.message}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#EBE3D5]">
                    <div className="w-10 h-10 rounded-full bg-[#704A87]/10 flex items-center justify-center text-[#704A87] font-bold text-sm border border-[#704A87]/15">
                      {t.studentName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#3E3431] text-sm">{t.studentName}</p>
                      {t.courseName && <p className="text-[#D4B26F] text-xs mt-0.5 font-semibold">{t.courseName}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Star size={48} className="mx-auto mb-4 text-[#E0B3B7]" />
              <p className="text-[#8F8082] text-lg font-medium">Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>

      {/* SUBMIT TESTIMONIAL */}
      <section className="relative overflow-hidden py-20 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-bl" /><div className="wc-br" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-tag text-[#D4B26F]">Share Your Story</span>
            <h2 className="section-title text-3xl text-[#3E3431]">Write a Testimonial</h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            </div>
          </div>

          {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md border border-[#EBE3D5]">
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#3E3431] mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="cursor-pointer">
                      <Star size={28} className={n <= form.rating ? 'text-[#D4B26F] fill-[#D4B26F]' : 'text-gray-300'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#3E3431] mb-1">Course Name (optional)</label>
                <input className="input-field" placeholder="Which course did you take?"
                  value={form.courseName} onChange={e => setForm({ ...form, courseName: e.target.value })} />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#3E3431] mb-1">Your Experience *</label>
                <textarea required rows={4} className="input-field resize-none" placeholder="Share your experience at Kalakriti Art Studio..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
                {submitting ? 'Submitting...' : <><Send size={15} /> Submit Testimonial</>}
              </button>
              <p className="text-xs text-[#8F8082] text-center mt-3 font-semibold">Your testimonial will be visible after admin approval.</p>
            </form>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#EBE3D5] shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#704A87]/10 flex items-center justify-center mx-auto mb-4 border border-[#704A87]/15">
                <Lock size={22} className="text-[#704A87]" />
              </div>
              <p className="text-[#5C504E] mb-6 font-semibold">Please login to share your testimonial</p>
              <Link to="/login" className="btn-primary inline-block">Login to Continue</Link>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
