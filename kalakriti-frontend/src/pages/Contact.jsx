import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { contactService } from '../services/services'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await contactService.submit(form)
      toast.success('Message sent! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER with Indian art background */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.22) saturate(0.65)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, rgba(201,168,76,0.30) 0%, rgba(107,45,139,0.82) 50%, rgba(45,27,105,0.88) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#FFD6EC]">Say Hello</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Contact Us</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            We'd love to hear from you. Reach out and let's create something beautiful together.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="relative overflow-hidden py-20" style={{ background: '#FFF8FF' }}>
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <span className="section-tag">Find Us</span>
              <h2 className="section-title text-3xl mb-8">Get In Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Visit Us', value: '208-B, 54th Cross, Opp Sri Rama Mandira,\nRajajinagar 4th Block, Bangalore-10', color: '#E91E8C' },
                  { icon: Phone, label: 'Call Us', value: '+91 81973 44421', color: '#6B2D8B' },
                  { icon: Mail, label: 'Email Us', value: 'kalakriti.artstudio@gmail.com', color: '#C9A84C' },
                  { icon: Clock, label: 'Studio Timings', value: '10:00 AM – 9:00 PM\nMonday to Sunday', color: '#E91E8C' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-[#EDE0F8] hover:border-[#6B2D8B] transition-all">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1B69] text-sm mb-1">{label}</p>
                      <p className="text-[#7B6B8B] text-sm whitespace-pre-line leading-relaxed">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-2xl p-6 border border-[#EDE0F8]">
                <p className="font-bold text-[#2D1B69] mb-4 text-sm uppercase tracking-wider">Follow Us</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/kalakriti.artstudio" target="_blank" rel="noreferrer"
                    className="px-5 py-2 rounded-full text-sm font-semibold text-[#6B2D8B] bg-[#FFD6EC] hover:bg-[#E91E8C] hover:text-white transition-all">
                    Instagram
                  </a>
                  <a href="https://facebook.com/KalakritiArtStudio" target="_blank" rel="noreferrer"
                    className="px-5 py-2 rounded-full text-sm font-semibold text-[#6B2D8B] bg-[#EDE0F8] hover:bg-[#6B2D8B] hover:text-white transition-all">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-[#EDE0F8]">
              <span className="section-tag">Send a Message</span>
              <h3 className="font-bold text-[#2D1B69] text-xl mb-6">We'll reply within 24 hours</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Your Name *</label>
                    <input required className="input-field" placeholder="Full name"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Phone</label>
                    <input className="input-field" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Email *</label>
                  <input required type="email" className="input-field" placeholder="your@email.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Subject</label>
                  <input className="input-field" placeholder="How can we help?"
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2D1B69] mb-1">Message *</label>
                  <textarea required rows={4} className="input-field resize-none" placeholder="Tell us more..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? 'Sending...' : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
