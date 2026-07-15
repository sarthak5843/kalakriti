import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Award, Palette, Brush, Star, CheckCircle, Clock, MapPin } from 'lucide-react'
import { courseService, galleryService, eventService, testimonialService, siteService } from '../services/services'

function SectionHeader({ tag, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 relative z-10 ${center ? 'text-center' : ''}`}>
      <span className={`section-tag ${light ? 'text-[#E8D5B5]' : 'text-[#D4B26F]'}`}>{tag}</span>
      <h2 className={`section-title ${light ? 'text-white' : 'text-[#3E3431]'}`}>{title}</h2>
      <div className={`flex items-center gap-3 my-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-[#D4B26F] opacity-55" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
        <div className="h-px w-12 bg-[#D4B26F] opacity-55" />
      </div>
      {subtitle && <p className={`text-base max-w-xl mx-auto leading-relaxed ${light ? 'text-gray-200' : 'text-[#5C504E]'}`}>{subtitle}</p>}
    </div>
  )
}

export default function Home() {
  const [courses, setCourses] = useState([])
  const [images, setImages] = useState([])
  const [events, setEvents] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [siteSettings, setSiteSettings] = useState(null)

  useEffect(() => {
    courseService.getAll().then(r => setCourses(r.data?.slice(0, 3) || [])).catch(() => {})
    galleryService.getImages().then(r => setImages(r.data?.slice(0, 6) || [])).catch(() => {})
    eventService.getAll().then(r => setEvents(r.data?.slice(0, 3) || [])).catch(() => {})
    testimonialService.getApproved().then(r => setTestimonials(r.data?.slice(0, 3) || [])).catch(() => {})
    siteService.get().then(r => setSiteSettings(r.data)).catch(() => {})
  }, [])

  const stats = [
    { icon: Users, value: siteSettings?.happyStudents || '500+', label: 'Happy Students' },
    { icon: BookOpen, value: siteSettings?.artCourses || '20+', label: 'Art Courses' },
    { icon: Award, value: siteSettings?.yearsExperience || '10+', label: 'Years of Excellence' },
    { icon: Star, value: siteSettings?.workshopsConducted || '50+', label: 'Workshops' },
  ]

  return (
    <div className="pt-16 md:pt-20">

      {/* ── HERO with Soft Palace Pastels ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FAF6F0]">
        {/* Faint mandala pattern */}
        <div className="absolute inset-0 bg-mandala opacity-25 z-0" />

        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
        </div>
        
        {/* Soft pastels overlay gradient */}
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(250,246,240,0.85) 0%, rgba(242,234,224,0.9) 60%, rgba(224,179,183,0.3) 100%)' }} />

        {/* Watercolor blobs on top */}
        <div className="wc-tl absolute" /><div className="wc-tr absolute" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-[#D4B26F] text-xs font-bold tracking-[0.3em] uppercase mb-6 border border-[#D4B26F]/50 px-5 py-2 rounded-full backdrop-blur-sm bg-white/45 shadow-sm">
              Bangalore's Premier Art Studio
            </span>

            {/* Logo image in hero */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo.png"
                alt="Kalakriti Art Studio"
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-xl border-4 border-[#D4B26F]/20 rounded-full p-2.5 bg-white/35 backdrop-blur-sm"
              />
            </div>

            <p className="text-[#D4B26F] font-bold text-sm md:text-base tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              — Bangalore's Premier Art Studio —
            </p>

            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
              <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            </div>

            <p className="text-[#3E3431] text-lg md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto font-medium"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Where creativity blooms and every stroke tells a story.<br/>
              Discover the joy of art in a warm, inspiring space.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses" className="btn-primary px-8 py-4 font-bold text-base flex items-center gap-2">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-secondary px-8 py-4 font-bold text-base">
                Our Story
              </Link>
            </div>

            {/* Dynamic Stats */}
            <div className="flex flex-wrap justify-center gap-10 mt-16 pt-10 border-t border-[#EBE3D5]">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3 bg-white/40 border border-[#EBE3D5]/50 px-5 py-2.5 rounded-2xl shadow-sm backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-[#704A87]/10 flex items-center justify-center border border-[#704A87]/20">
                    <Icon size={18} className="text-[#704A87]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[#3E3431] font-bold text-lg leading-none">{value}</p>
                    <p className="text-[#8F8082] text-[11px] font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP (Birthday Parties removed) ── */}
      <section className="py-4 bg-[#704A87]/15 border-y border-[#EBE3D5]/60 relative z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {['Art Classes', 'Workshops', 'Hobby Classes', 'Custom Art', 'Art Events'].map(s => (
              <span key={s} className="flex items-center gap-2 text-[#3E3431] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B26F] inline-block animate-pulse" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET with Pastel Mandala background ── */}
      <section className="relative overflow-hidden py-24 bg-[#FCFAF7]">
        {/* Soft tileable mandala pattern */}
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl absolute" /><div className="wc-br absolute" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader tag="Our Story" title="A Legacy of Art & Creativity" center={false} />
              <p className="text-[#5C504E] leading-relaxed mb-4 text-base">
                Nestled in the heart of Rajajinagar, Bangalore, Kalakriti Art Studio has been a sanctuary
                for art lovers for over a decade. We believe art is not just a skill — it's a language of the soul.
              </p>
              <p className="text-[#5C504E] leading-relaxed mb-8 text-base">
                Our expert instructors guide students of all ages through a rich curriculum blending
                traditional Indian art forms with contemporary techniques.
              </p>
              <div className="space-y-3.5 mb-8">
                {['Personalized attention in small batches', 'Some art materials provided', 'Flexible morning & evening batches', 'Classes for all age groups — 5 to 65+'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#D4B26F] shrink-0" />
                    <span className="text-[#5C504E] text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Our Story <ArrowRight size={16} />
              </Link>
            </div>

            {/* Indian art illustration panel */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#D4B26F]/25 bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=700&q=80"
                  alt="Indian art illustration"
                  className="w-full h-80 object-cover rounded-2xl"
                  onError={e => { e.target.parentElement.style.display = 'none' }}
                />
              </div>
              {/* Floating cards */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { icon: Palette, title: 'Expert Instructors', desc: 'Seasoned artists with years of teaching experience' },
                  { icon: Brush, title: 'Traditional & Modern', desc: 'From Madhubani to watercolors — every medium' },
                  { icon: Users, title: 'All Age Groups', desc: 'Programs for kids, teens and adults' },
                  { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in art education' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="art-card p-4">
                    <div className="w-9 h-9 rounded-xl bg-[#704A87]/10 flex items-center justify-center mb-2 border border-[#704A87]/15">
                      <Icon size={16} className="text-[#704A87]" />
                    </div>
                    <h4 className="font-bold text-[#3E3431] text-xs mb-1">{title}</h4>
                    <p className="text-[#8F8082] text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="relative overflow-hidden py-24 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-10 z-0" />
        <div className="wc-tr" /><div className="wc-bl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Learn & Grow" title="Our Courses" subtitle="Explore our carefully crafted courses for every skill level and age group" />

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="art-card group">
                  <div className="h-52 bg-gradient-to-br from-[#EAE2F3] to-[#FCEAEB] overflow-hidden relative border-b border-[#EBE3D5]/50">
                    {course.imageUrl
                      ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Palette size={48} className="text-[#704A87] opacity-30" /></div>
                    }
                    <span className="absolute top-3 left-3 text-xs bg-[#704A87] text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">{course.mode}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#3E3431] text-lg mb-2">{course.title}</h3>
                    <p className="text-[#5C504E] text-sm mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-[#EBE3D5]">
                      <span className="text-[#704A87] font-extrabold text-xl">₹{course.price?.toLocaleString()}</span>
                      <Link to={`/courses/${course.id}`} className="btn-pink py-2 px-5 text-xs font-bold">
                        Enroll Now <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#8F8082]">
              <Palette size={48} className="mx-auto mb-4 opacity-20" />
              <p>Courses will be added soon. Check back!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/courses" className="btn-secondary">
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="relative overflow-hidden py-24 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl absolute" /><div className="wc-br absolute" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Our Work" title="Art Gallery" subtitle="A glimpse into the beautiful world of our students and instructors" />

          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {images.map((img, i) => (
                <div key={img.id}
                  className={`overflow-hidden rounded-2xl group cursor-pointer border border-[#EBE3D5] hover:border-[#D4B26F] transition-all shadow-sm hover:shadow-xl bg-white p-2.5 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  style={{ height: i === 0 ? '420px' : '200px' }}>
                  <img src={img.imageUrl} alt={img.title || 'artwork'}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-102 transition-transform duration-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i}
                  className={`rounded-2xl bg-gradient-to-br from-[#EAE2F3] to-[#FCEAEB] flex items-center justify-center border border-[#EBE3D5] ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  style={{ height: i === 0 ? '420px' : '200px' }}>
                  <Palette size={36} className="text-[#704A87] opacity-25" />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/gallery" className="btn-primary">
              Explore Full Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="relative overflow-hidden py-24 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-15 z-0" />
        <div className="wc-tr" /><div className="wc-bl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Don't Miss Out" title="Upcoming Events" subtitle="Workshops, exhibitions, and art events to inspire you" />

          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event.id} className="art-card group">
                  <div className="h-48 bg-gradient-to-br from-[#FCEAEB] to-[#EAE2F3] overflow-hidden relative border-b border-[#EBE3D5]/50">
                    {event.imageUrl
                      ? <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Brush size={40} className="text-[#704A87] opacity-25" /></div>
                    }
                    <span className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider bg-[#D4B26F] text-white shadow-sm">
                      ₹{Number(event.price || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#3E3431] mb-2">{event.title}</h3>
                    <p className="text-[#5C504E] text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#704A87] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Clock size={12} /> {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'TBA'}
                      </span>
                      <Link to={`/events/${event.id}`} className="text-[#704A87] font-bold text-sm hover:text-[#54316B] transition-colors flex items-center gap-1">
                        Register <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#8F8082]">
              <Brush size={48} className="mx-auto mb-4 opacity-20" />
              <p>Events will be announced soon. Stay tuned!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/events" className="btn-secondary">All Events <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative overflow-hidden py-24 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Student Stories" title="What Our Students Say" />

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t.id} className="art-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} className={i < (t.rating || 5) ? 'text-[#D4B26F] fill-[#D4B26F]' : 'text-gray-200 fill-gray-200'} />
                      ))}
                    </div>
                    <p className="text-[#5C504E] text-sm leading-relaxed mb-5 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                      "{t.message}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#EBE3D5]">
                    <div className="w-9 h-9 rounded-full bg-[#704A87]/10 flex items-center justify-center text-[#704A87] font-bold text-sm border border-[#704A87]/15">
                      {t.studentName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-[#3E3431] text-sm">{t.studentName}</p>
                      {t.courseName && <p className="text-[#D4B26F] text-xs font-semibold">{t.courseName}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#8F8082]">
              <p>Be the first to share your experience!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn-secondary">Read More Stories <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER with Soft Palace Overlay ── */}
      <section className="relative overflow-hidden py-28 bg-[#3E3431]">
        {/* Palace background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-25"
            style={{ filter: 'grayscale(0.2) contrast(1.1)' }}
          />
        </div>
        
        {/* Soft pastels overlay gradient */}
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(112,74,135,0.88) 0%, rgba(62,52,49,0.92) 60%, rgba(224,179,183,0.3) 100%)' }} />

        {/* Gold shimmer dots */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="section-tag text-[#E8D5B5]">Begin Your Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Your Creative Self
          </h2>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-gray-200 text-lg mb-10 leading-relaxed font-medium">
            Join hundreds of students who have discovered their creative potential at Kalakriti Art Studio.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/register" className="bg-[#E0B3B7] text-[#3E3431] px-8 py-4 rounded-full font-bold text-base hover:bg-[#D89FA4] transition-colors shadow-lg">
              Enroll Today
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#704A87] transition-all">
              Contact Us
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-gray-200 text-sm font-medium">
              <Clock size={15} className="text-[#D4B26F]" />
              <span>10:00 AM – 9:00 PM, Mon–Sun</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200 text-sm font-medium">
              <MapPin size={15} className="text-[#D4B26F]" />
              <span>Rajajinagar 4th Block, Bangalore</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
