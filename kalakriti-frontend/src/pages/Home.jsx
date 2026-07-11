import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, BookOpen, Award, Palette, Brush, Star, CheckCircle, Clock, MapPin } from 'lucide-react'
import { courseService, galleryService, eventService, testimonialService } from '../services/services'

// Free Indian art illustration images (Unsplash / public domain)
const BG = {
  hero: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1600&q=80',         // Indian palace arch painting
  about: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&q=75',        // Indian art / Taj Mahal watercolor
  cta: 'https://images.unsplash.com/photo-1567591370429-c3e7e4e5e3e3?w=1400&q=75',          // Indian floral pattern
}

function SectionHeader({ tag, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className={`section-tag ${light ? 'text-[#FFD6EC]' : ''}`}>{tag}</span>
      <h2 className={`section-title ${light ? 'text-white' : ''}`}>{title}</h2>
      <div className={`flex items-center gap-3 my-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-[#C9A84C]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <div className="h-px w-12 bg-[#C9A84C]" />
      </div>
      {subtitle && <p className={`text-base max-w-xl mx-auto leading-relaxed ${light ? 'text-purple-200' : 'text-[#7B6B8B]'}`}>{subtitle}</p>}
    </div>
  )
}

export default function Home() {
  const [courses, setCourses] = useState([])
  const [images, setImages] = useState([])
  const [events, setEvents] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    courseService.getAll().then(r => setCourses(r.data?.slice(0, 3) || [])).catch(() => {})
    galleryService.getImages().then(r => setImages(r.data?.slice(0, 6) || [])).catch(() => {})
    eventService.getAll().then(r => setEvents(r.data?.slice(0, 3) || [])).catch(() => {})
    testimonialService.getApproved().then(r => setTestimonials(r.data?.slice(0, 3) || [])).catch(() => {})
  }, [])

  return (
    <div className="pt-16 md:pt-20">

      {/* ── HERO with Indian palace background ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(0.8)' }}
          />
        </div>
        {/* Warm overlay matching theme */}
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(107,45,139,0.55) 0%, rgba(45,27,105,0.65) 50%, rgba(201,168,76,0.25) 100%)' }} />

        {/* Watercolor blobs on top */}
        <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none z-1 opacity-30"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(233,30,140,0.5) 0%, transparent 65%)' }} />
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none z-1 opacity-30"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(107,45,139,0.5) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase mb-6 border border-[#C9A84C]/60 px-5 py-2 rounded-full backdrop-blur-sm bg-white/5">
              Bangalore's Premier Art Studio
            </span>

            {/* Logo image in hero */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo.png"
                alt="Kalakriti Art Studio"
                className="w-52 h-52 md:w-64 md:h-64 object-contain drop-shadow-2xl"
              />
            </div>

            <p className="text-[#C9A84C] font-bold text-sm md:text-base tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              — Bangalore's Premier Art Studio —
            </p>

            <div className="flex items-center justify-center gap-3 my-6">
              <div className="h-px w-16 bg-[#C9A84C]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <div className="h-px w-16 bg-[#C9A84C]" />
            </div>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              Where creativity blooms and every stroke tells a story.
              Discover the joy of art in a warm, inspiring space.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses" className="bg-[#E91E8C] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#C4186F] transition-all shadow-lg flex items-center gap-2">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link to="/gallery" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#6B2D8B] transition-all flex items-center gap-2">
                View Gallery
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-10 mt-16 pt-10 border-t border-white/20">
              {[
                { icon: Users, value: '500+', label: 'Happy Students' },
                { icon: BookOpen, value: '20+', label: 'Art Courses' },
                { icon: Award, value: '10+', label: 'Years of Excellence' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Icon size={20} className="text-[#C9A84C]" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-xl leading-none">{value}</p>
                    <p className="text-white/60 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section className="py-5 bg-[#6B2D8B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {['Art Classes', 'Workshops', 'Hobby Classes', 'Custom Art', 'Art Events', 'Birthday Parties'].map(s => (
              <span key={s} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET with Indian art background ── */}
      <section className="relative overflow-hidden py-24">
        {/* Indian watercolor art background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=75"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.08) saturate(0.5)' }}
          />
        </div>
        <div className="absolute inset-0 z-0" style={{ background: '#FFF8FF' }} />
        {/* Subtle Indian pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=60")`,
            backgroundSize: '400px',
            backgroundRepeat: 'repeat',
            filter: 'grayscale(1)'
          }} />
        <div className="wc-tl absolute" /><div className="wc-br absolute" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader tag="Our Story" title="A Legacy of Art & Creativity" center={false} />
              <p className="text-[#7B6B8B] leading-relaxed mb-4 text-base">
                Nestled in the heart of Rajajinagar, Bangalore, Kalakriti Art Studio has been a sanctuary
                for art lovers for over a decade. We believe art is not just a skill — it's a language of the soul.
              </p>
              <p className="text-[#7B6B8B] leading-relaxed mb-8 text-base">
                Our expert instructors guide students of all ages through a rich curriculum blending
                traditional Indian art forms with contemporary techniques.
              </p>
              <div className="space-y-3 mb-8">
                {['Personalized attention in small batches', 'All art materials provided', 'Flexible morning & evening batches', 'Classes for all age groups — 5 to 65+'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#E91E8C] shrink-0" />
                    <span className="text-[#7B6B8B] text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Our Story <ArrowRight size={16} />
              </Link>
            </div>

            {/* Indian art illustration panel */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#C9A84C]/30">
                <img
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=700&q=80"
                  alt="Indian art illustration"
                  className="w-full h-80 object-cover"
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
                    <div className="w-9 h-9 rounded-xl bg-[#EDE0F8] flex items-center justify-center mb-2">
                      <Icon size={16} className="text-[#6B2D8B]" />
                    </div>
                    <h4 className="font-bold text-[#2D1B69] text-xs mb-1">{title}</h4>
                    <p className="text-[#7B6B8B] text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="relative overflow-hidden py-24" style={{ background: '#FEFAF4' }}>
        <div className="wc-tr" /><div className="wc-bl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Learn & Grow" title="Our Courses" subtitle="Explore our carefully crafted courses for every skill level and age group" />

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="art-card group">
                  <div className="h-52 bg-gradient-to-br from-[#EDE0F8] to-[#FFD6EC] overflow-hidden relative">
                    {course.imageUrl
                      ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Palette size={48} className="text-[#6B2D8B] opacity-30" /></div>
                    }
                    <span className="absolute top-3 left-3 text-xs bg-[#6B2D8B] text-white px-3 py-1 rounded-full font-semibold">{course.mode}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#2D1B69] text-lg mb-2">{course.title}</h3>
                    <p className="text-[#7B6B8B] text-sm mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-[#EDE0F8]">
                      <span className="text-[#6B2D8B] font-bold text-xl">₹{course.price?.toLocaleString()}</span>
                      <Link to={`/courses/${course.id}`} className="btn-pink py-2 px-5 text-xs">
                        Enroll Now <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#7B6B8B]">
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

      {/* ── GALLERY PREVIEW with Indian art bg ── */}
      <section className="relative overflow-hidden py-24">
        {/* Indian art pattern background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=70"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.06) saturate(0.3)' }}
          />
        </div>
        <div className="absolute inset-0 z-0" style={{ background: '#FFF8FF' }} />
        <div className="wc-tl absolute" /><div className="wc-br absolute" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Our Work" title="Art Gallery" subtitle="A glimpse into the beautiful world of our students and instructors" />

          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={img.id}
                  className={`overflow-hidden rounded-2xl group cursor-pointer border border-[#EDE0F8] hover:border-[#C9A84C] transition-all shadow-sm hover:shadow-lg ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  style={{ height: i === 0 ? '420px' : '200px' }}>
                  <img src={img.imageUrl} alt={img.title || 'artwork'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i}
                  className={`rounded-2xl bg-gradient-to-br from-[#EDE0F8] to-[#FFD6EC] flex items-center justify-center border border-[#D4B8E8] ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  style={{ height: i === 0 ? '420px' : '200px' }}>
                  <Palette size={36} className="text-[#6B2D8B] opacity-25" />
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
      <section className="relative overflow-hidden py-24" style={{ background: '#FEFAF4' }}>
        <div className="wc-tr" /><div className="wc-bl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Don't Miss Out" title="Upcoming Events" subtitle="Workshops, exhibitions, and art events to inspire you" />

          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event.id} className="art-card group">
                  <div className="h-48 bg-gradient-to-br from-[#FFD6EC] to-[#EDE0F8] overflow-hidden relative">
                    {event.imageUrl
                      ? <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Brush size={40} className="text-[#6B2D8B] opacity-25" /></div>
                    }
                    <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${event.paid ? 'bg-[#C9A84C] text-white' : 'bg-emerald-500 text-white'}`}>
                      {event.paid ? `₹${event.price}` : 'Free'}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#2D1B69] mb-2">{event.title}</h3>
                    <p className="text-[#7B6B8B] text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#6B2D8B] font-medium">
                        {event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Date TBA'}
                      </span>
                      <Link to={`/events/${event.id}`} className="text-[#E91E8C] font-semibold text-sm hover:text-[#6B2D8B] transition-colors flex items-center gap-1">
                        Register <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#7B6B8B]">
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
      <section className="relative overflow-hidden py-24" style={{ background: '#FFF8FF' }}>
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Student Stories" title="What Our Students Say" />

          {testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t.id} className="art-card p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className={i < (t.rating || 5) ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <p className="text-[#7B6B8B] text-sm leading-relaxed mb-5 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "{t.message}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#EDE0F8]">
                    <div className="w-9 h-9 rounded-full bg-[#EDE0F8] flex items-center justify-center text-[#6B2D8B] font-bold text-sm">
                      {t.studentName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D1B69] text-sm">{t.studentName}</p>
                      {t.courseName && <p className="text-[#E91E8C] text-xs">{t.courseName}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#7B6B8B]">
              <p>Be the first to share your experience!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn-secondary">Read More Stories <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER with Indian art background ── */}
      <section className="relative overflow-hidden py-28">
        {/* Indian palace / art background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(0.7)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(107,45,139,0.80) 0%, rgba(45,27,105,0.85) 60%, rgba(233,30,140,0.30) 100%)' }} />
        {/* Gold shimmer dots */}
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="section-tag text-[#FFD6EC]">Begin Your Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Your Creative Self
          </h2>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <p className="text-purple-200 text-lg mb-10 leading-relaxed">
            Join hundreds of students who have discovered their creative potential at Kalakriti Art Studio.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/register" className="bg-[#E91E8C] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#C4186F] transition-colors shadow-lg">
              Join Now — It's Free
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-[#6B2D8B] transition-all">
              Contact Us
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-purple-200 text-sm">
              <Clock size={15} className="text-[#C9A84C]" />
              <span>10:00 AM – 9:00 PM, Mon–Sun</span>
            </div>
            <div className="flex items-center gap-2 text-purple-200 text-sm">
              <MapPin size={15} className="text-[#C9A84C]" />
              <span>Rajajinagar 4th Block, Bangalore</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
