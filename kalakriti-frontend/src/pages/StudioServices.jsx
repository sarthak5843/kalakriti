import { Link } from 'react-router-dom'
import { ArrowRight, Home, Calendar, BookOpen, Image, Award, Palette, Star, Phone, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Studio Space Rental',
    desc: 'Rent our fully-equipped, beautifully designed studio space for your personal art sessions, photoshoots, creative projects, or private events. The space includes easels, lighting, and art supplies.',
    features: ['Fully equipped with easels & lighting', 'Spacious & inspiring environment', 'Flexible hourly/half-day/full-day bookings', 'Ideal for photoshoots, art sessions & events'],
    color: '#704A87',
    bg: 'from-[#EAE2F3] to-[#F5EFFA]',
    cta: 'Enquire About Rental',
    ctaMsg: 'I am interested in renting the studio space at Kalakriti Art Studio. Please share details about availability and pricing.',
  },
  {
    icon: Calendar,
    title: 'Register & Pay for Events',
    desc: 'Browse and register for all our upcoming workshops, art exhibitions, seasonal events and special programs. Secure your spot easily through our online booking system.',
    features: ['Canvas Painting Workshops', 'Texture & Bottle Art Workshops', 'Oil Pastel & Mixed Media Workshops', 'Seasonal & Festival Art Events'],
    color: '#D4B26F',
    bg: 'from-[#FDF3E0] to-[#FFFBF0]',
    cta: 'Browse Events',
    ctaLink: '/events',
  },
  {
    icon: BookOpen,
    title: 'Art Blog & Resources',
    desc: 'Explore our art blog for tips, tutorials, inspiration, and behind-the-scenes stories from Kalakriti Art Studio. A resource hub for every art lover.',
    features: ['Step-by-step painting tutorials', 'Art technique tips & guides', 'Artist spotlights & interviews', 'Behind-the-scenes studio stories'],
    color: '#E0B3B7',
    bg: 'from-[#FCEAEB] to-[#FFF4F5]',
    cta: 'Coming Soon',
    comingSoon: true,
  },
  {
    icon: Image,
    title: 'Student Gallery',
    desc: 'A showcase of beautiful artwork created by our talented students. Every piece tells a unique story. We celebrate every student\'s creative journey by displaying their work here.',
    features: ['Student artwork showcase', 'Category-wise art display', 'Regular gallery updates', 'Celebrate your creative journey'],
    color: '#704A87',
    bg: 'from-[#EAE2F3] to-[#F5EFFA]',
    cta: 'Visit Gallery',
    ctaLink: '/gallery',
  },
  {
    icon: Award,
    title: 'Certificates',
    desc: 'Upon successful completion of our courses and programs, students receive official Kalakriti Art Studio certificates. These are recognized credentials for your art education.',
    features: ['Course completion certificates', 'Bootcamp & program certificates', 'Digitally signed by Head Instructor', 'Great for portfolios & resumes'],
    color: '#D4B26F',
    bg: 'from-[#FDF3E0] to-[#FFFBF0]',
    cta: 'Enquire About Courses',
    ctaMsg: 'I would like to know more about the certificates provided after completing courses at Kalakriti Art Studio.',
  },
  {
    icon: Palette,
    title: 'Art Exhibitions',
    desc: 'We regularly organize and participate in art exhibitions to celebrate student and instructor artwork. These events are a great platform for emerging artists to showcase their talent.',
    features: ['Student art exhibitions', 'Instructor showcase events', 'Open to the public', 'A platform for emerging artists'],
    color: '#E0B3B7',
    bg: 'from-[#FCEAEB] to-[#FFF4F5]',
    cta: 'Enquire About Exhibitions',
    ctaMsg: 'I am interested in learning more about art exhibitions at Kalakriti Art Studio.',
  },
]

export default function StudioServices() {
  const handleEnquire = (msg) => {
    const params = new URLSearchParams({ subject: 'Studio Services Enquiry', message: msg })
    window.location.href = `/contact?${params.toString()}`
  }

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER */}
      <section className="relative overflow-hidden py-32 text-center bg-[#FAF6F0]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(250,246,240,0.88) 0%, rgba(242,234,224,0.92) 60%, rgba(224,179,183,0.3) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="section-tag text-[#D4B26F]">What We Offer</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Studio Services</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-medium max-w-xl mx-auto">
            Beyond just classes — Kalakriti Art Studio offers a range of services to support every artist's journey, 
            from studio rentals to exhibitions and more.
          </p>
        </div>
      </section>

      {/* STUDIO SPACE RENTAL — HERO CARD */}
      <section className="relative overflow-hidden py-16 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-15 z-0" />
        <div className="wc-tl absolute" /><div className="wc-br absolute" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#EBE3D5] shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                  alt="Studio Space Rental"
                  className="w-full h-full object-cover min-h-[320px]"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(112,74,135,0.6) 0%, rgba(62,52,49,0.4) 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="inline-flex items-center gap-2 bg-[#D4B26F] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider w-fit mb-3">
                    <Star size={12} className="fill-white" /> Featured Service
                  </span>
                  <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Studio Space Rental
                  </h3>
                  <p className="text-white/80 text-sm mt-2 font-medium">
                    Rent our beautiful, fully-equipped studio for your creative projects
                  </p>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="section-tag text-[#D4B26F]">Available Now</span>
                <h2 className="text-2xl font-bold text-[#3E3431] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your Creative Space Awaits
                </h2>
                <p className="text-[#5C504E] leading-relaxed text-sm mb-6">
                  Looking for a professional, inspiring space to create art, shoot photos, hold a private class,
                  or run a creative event? Our studio is available for rent with all the tools you need.
                  Contact us to check availability and discuss your requirements.
                </p>
                <div className="space-y-2.5 mb-8">
                  {['Fully equipped — easels, lighting, art supplies', 'Spacious, well-lit & air-conditioned', 'Flexible booking — hourly, half-day, full-day', 'Ideal for photoshoots, art sessions & private events', 'Located in Rajajinagar 4th Block, Bangalore'].map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-[#D4B26F] shrink-0" />
                      <span className="text-[#5C504E] text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    state={{ subject: 'Studio Space Rental Enquiry', message: 'I am interested in renting the studio space at Kalakriti Art Studio. Please share details about availability and pricing.' }}
                    className="btn-primary flex items-center gap-2">
                    <Phone size={15} /> Enquire Now
                  </Link>
                  <a href="tel:+918197344421" className="btn-secondary flex items-center gap-2">
                    +91 81973 44421
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL SERVICES GRID */}
      <section className="relative overflow-hidden py-20 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tr absolute" /><div className="wc-bl absolute" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-tag text-[#D4B26F]">Everything We Offer</span>
            <h2 className="section-title text-[#3E3431]">All Studio Services</h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, features, color, bg, cta, ctaLink, ctaMsg, comingSoon }) => (
              <div key={title} className="bg-white rounded-2xl border border-[#EBE3D5] shadow-sm hover:shadow-lg transition-all hover:border-[#D4B26F] group overflow-hidden">
                {/* Card header */}
                <div className={`bg-gradient-to-br ${bg} p-6 border-b border-[#EBE3D5]`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ background: color + '20', border: `1px solid ${color}30` }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <h3 className="font-bold text-[#3E3431] text-base leading-tight">{title}</h3>
                  </div>
                </div>
                {/* Card body */}
                <div className="p-6">
                  <p className="text-[#5C504E] text-sm leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2 mb-6">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-xs text-[#5C504E] font-medium">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {comingSoon ? (
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-[#8F8082] border border-[#EBE3D5] px-4 py-2 rounded-full">
                      🚀 Coming Soon
                    </span>
                  ) : ctaLink ? (
                    <Link to={ctaLink}
                      className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
                      style={{ background: color }}>
                      {cta} <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      state={{ subject: 'Studio Services Enquiry', message: ctaMsg }}
                      className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
                      style={{ background: color }}>
                      {cta} <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BATCH OPTIONS INFO */}
      <section className="relative overflow-hidden py-20 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-15 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-tag text-[#D4B26F]">Flexible Scheduling</span>
            <h2 className="section-title text-[#3E3431]">Batch Options</h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            </div>
            <p className="text-[#5C504E] text-sm font-medium max-w-md mx-auto">
              We offer flexible batch timings to fit your busy schedule. Choose what works best for you.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '📅', label: 'Weekday Batches', sub: 'Monday to Friday' },
              { emoji: '🗓️', label: 'Weekend Batches', sub: 'Saturday & Sunday' },
              { emoji: '☀️', label: 'Morning Batch', sub: '10:00 AM – 1:00 PM' },
              { emoji: '🌙', label: 'Evening Batch', sub: '5:00 PM – 8:00 PM' },
            ].map(({ emoji, label, sub }) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center border border-[#EBE3D5] shadow-sm hover:border-[#D4B26F] transition-all hover:shadow-md">
                <div className="text-3xl mb-3">{emoji}</div>
                <h4 className="font-bold text-[#3E3431] text-sm mb-1">{label}</h4>
                <p className="text-[#8F8082] text-xs font-medium">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ART MEDIUMS SECTION */}
      <section className="relative overflow-hidden py-16 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-10 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-tag text-[#D4B26F]">Mediums We Teach</span>
          <h2 className="section-title text-[#3E3431]">Art Mediums</h2>
          <div className="flex items-center justify-center gap-3 my-4 mb-10">
            <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Pencil', 'Colour Pencil', 'Charcoal', 'Watercolour', 'Poster Colours', 'Acrylic Colours', 'Oil Colours', 'Pastels (Oil & Soft)'].map(m => (
              <span key={m}
                className="px-5 py-2.5 bg-white border border-[#EBE3D5] rounded-full text-sm font-semibold text-[#704A87] hover:bg-[#704A87] hover:text-white hover:border-[#704A87] transition-all shadow-sm cursor-default">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 bg-[#3E3431]">
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(112,74,135,0.85) 0%, rgba(62,52,49,0.90) 100%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
          <span className="section-tag text-[#E8D5B5]">Get In Touch</span>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Have a Question About Our Services?
          </h2>
          <p className="text-gray-200 mb-8 font-medium">
            Whether it's studio rental, a custom workshop, or any other inquiry — we'd love to hear from you!
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
