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
          <span className="section-tag text-[#D4B26F]">Say Hello</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Contact Us</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-semibold">
            We'd love to hear from you. Reach out and let's create something beautiful together.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="relative overflow-hidden py-20 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <span className="section-tag text-[#D4B26F]">Find Us</span>
              <h2 className="section-title text-3xl mb-8 text-[#3E3431]">Get In Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Visit Us', value: '208-B, 54th Cross, Opp Sri Rama Mandira,\nRajajinagar 4th Block, Bangalore-10', color: '#704A87' },
                  { icon: Phone, label: 'Call Us', value: '+91 81973 44421', color: '#D4B26F' },
                  { icon: Mail, label: 'Email Us', value: 'kalakriti.artstudio@gmail.com', color: '#E0B3B7' },
                  { icon: Clock, label: 'Studio Timings', value: '10:00 AM – 9:00 PM\nMonday to Sunday', color: '#704A87' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-[#EBE3D5] hover:border-[#704A87] transition-all">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#3E3431] text-sm mb-1">{label}</p>
                      <p className="text-[#5C504E] text-sm whitespace-pre-line leading-relaxed font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-2xl p-6 border border-[#EBE3D5]">
                <p className="font-bold text-[#3E3431] mb-4 text-sm uppercase tracking-wider">Follow Us</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/kalakriti.artstudio" target="_blank" rel="noreferrer"
                    className="px-5 py-2 rounded-full text-sm font-semibold text-[#704A87] bg-[#704A87]/10 hover:bg-[#704A87] hover:text-white transition-all">
                    Instagram
                  </a>
                  <a href="https://facebook.com/KalakritiArtStudio" target="_blank" rel="noreferrer"
                    className="px-5 py-2 rounded-full text-sm font-semibold text-[#D4B26F] bg-[#D4B26F]/10 hover:bg-[#D4B26F] hover:text-white transition-all">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-[#EBE3D5]">
              <span className="section-tag text-[#D4B26F]">Send a Message</span>
              <h3 className="font-bold text-[#3E3431] text-xl mb-6">We'll reply within 24 hours</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3E3431] mb-1">Your Name *</label>
                    <input required className="input-field" placeholder="Full name"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3E3431] mb-1">Phone</label>
                    <input className="input-field" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3E3431] mb-1">Email *</label>
                  <input required type="email" className="input-field" placeholder="your@email.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3E3431] mb-1">Subject</label>
                  <input className="input-field" placeholder="How can we help?"
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3E3431] mb-1">Message *</label>
                  <textarea required rows={4} className="input-field resize-none" placeholder="Tell us more..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer">
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
