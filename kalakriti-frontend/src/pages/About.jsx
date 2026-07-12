import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, MapPin, Clock, Phone, Palette, Brush, Users, Award, Heart } from 'lucide-react'
import { siteService } from '../services/services'

function SectionHeader({ tag, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <span className={`section-tag ${light ? 'text-[#E8D5B5]' : 'text-[#D4B26F]'}`}>{tag}</span>
      <h2 className={`section-title ${light ? 'text-white' : 'text-[#3E3431]'}`}>{title}</h2>
      <div className={`flex items-center gap-3 my-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
        <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
      </div>
      {subtitle && <p className={`text-base max-w-xl mx-auto leading-relaxed ${light ? 'text-gray-200' : 'text-[#5C504E]'}`}>{subtitle}</p>}
    </div>
  )
}

export default function About() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    siteService.get()
      .then(res => setSettings(res.data))
      .catch(() => {})
  }, [])

  // Dynamic values or original defaults as fallback
  const aboutText = settings?.aboutText || 
    "Nestled in the heart of Rajajinagar, Bangalore, Kalakriti Art Studio was founded with a single dream — to make art accessible to everyone. What started as a small studio has grown into Bangalore's most beloved creative space.\n\nWe believe that every person is born with the ability to create. Our role is simply to guide, inspire, and provide the tools to let that creativity flourish.\n\nFrom traditional Indian art forms like Madhubani and Warli to contemporary watercolors, acrylics, and mixed media — our curriculum is as diverse as art itself.";

  const aboutImageUrl = settings?.aboutImageUrl || 
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=700&q=80";

  const instructorName = settings?.instructorName || "Ms. Anjali Sharma";

  const instructorBio = settings?.instructorBio || 
    "Ms. Anjali Sharma is an accomplished fine arts graduate with over 15 years of professional painting and teaching experience. Specializing in traditional Indian art forms (Madhubani, Tanjore, Pattachitra) as well as contemporary acrylic and oil mediums, she has nurtured hundreds of budding artists at Kalakriti Art Studio.";

  const instructorImageUrl = settings?.instructorImageUrl || 
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=80";

  return (
    <div className="pt-16 md:pt-20">

      {/* PAGE HEADER with Art Background */}
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
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#D4B26F]">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>About Us</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-lg leading-relaxed font-semibold"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Where creativity blooms and every stroke tells a story
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="relative overflow-hidden py-24 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader tag="Our Journey" title="A Decade of Nurturing Artists" center={false} />
              <div className="text-[#5C504E] leading-relaxed mb-8 text-base font-medium space-y-4 whitespace-pre-line">
                {aboutText}
              </div>
              <div className="space-y-3.5 mb-8">
                {['Personalized attention in small batches', 'All art materials provided', 'Flexible morning & evening batches', 'Classes for all age groups — 5 to 65+'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#D4B26F] shrink-0" />
                    <span className="text-[#5C504E] text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indian art image + stats */}
            <div>
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#D4B26F]/25 bg-white p-2 mb-5">
                <img
                  src={aboutImageUrl}
                  alt="Art Tools"
                  className="w-full h-64 object-cover rounded-2xl"
                  onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#EAE2F3,#FCEAEB)'; e.target.style.display = 'none' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, value: '500+', label: 'Happy Students' },
                  { icon: Palette, value: '20+', label: 'Art Courses' },
                  { icon: Award, value: '10+', label: 'Years of Excellence' },
                  { icon: Brush, value: '50+', label: 'Workshops Conducted' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="art-card p-5 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#704A87]/10 flex items-center justify-center mx-auto mb-2 border border-[#704A87]/15">
                      <Icon size={18} className="text-[#704A87]" />
                    </div>
                    <p className="text-[#704A87] font-extrabold text-2xl">{value}</p>
                    <p className="text-[#5C504E] text-xs font-semibold mt-1 uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: INSTRUCTOR PROFILE SECTION */}
      <section className="relative overflow-hidden py-24 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-10 z-0" />
        <div className="wc-tr" /><div className="wc-bl" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Instructor Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full">
                {/* Decorative background shape */}
                <div className="absolute inset-0 bg-[#E0B3B7] rounded-3xl transform rotate-3 scale-102 opacity-40 shadow-md" />
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#D4B26F]/25 bg-white p-2">
                  <img
                    src={instructorImageUrl}
                    alt={instructorName}
                    className="w-full h-96 object-cover rounded-2xl"
                    onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#E0B3B7,#704A87)'; e.target.style.display = 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Instructor Bio */}
            <div className="lg:col-span-7">
              <span className="section-tag text-[#D4B26F]">Meet the Artist</span>
              <h2 className="section-title text-[#3E3431] text-3xl font-extrabold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {instructorName}
              </h2>
              <p className="text-[#704A87] text-sm uppercase tracking-widest font-bold mb-6">Founder & Head Instructor</p>
              <div className="flex items-center gap-3 my-4">
                <div className="h-px w-20 bg-[#D4B26F] opacity-45" />
                <Heart size={14} className="text-[#D4B26F] fill-[#D4B26F]/20" />
                <div className="h-px w-20 bg-[#D4B26F] opacity-45" />
              </div>
              <div className="text-[#5C504E] leading-relaxed mb-6 text-base font-medium space-y-4 whitespace-pre-line">
                {instructorBio}
              </div>
              <div className="bg-[#704A87]/5 rounded-2xl p-6 border border-[#704A87]/10 flex items-start gap-4">
                <Palette size={24} className="text-[#704A87] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#3E3431] text-sm">Instructor's Philosophy</h4>
                  <p className="text-[#5C504E] text-xs leading-relaxed mt-1 font-medium italic">
                    "Every blank canvas is a conversation waiting to happen. There are no mistakes in art — only opportunities to discover a new path."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Dynamic Instructor Portfolio Artwork Images */}
          {settings?.instructorImages ? (
            <div className="mt-20 border-t border-[#EBE3D5]/40 pt-16">
              <SectionHeader tag="Artist Showcase" title="Selected Artworks & Creations" subtitle={`Beautiful masterpieces created by ${instructorName} and featured in our studio exhibition.`} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {settings.instructorImages.split(',').filter(Boolean).map((url, i) => (
                  <div key={i} className="art-card group bg-white p-2">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FCFAF7] border border-[#EBE3D5]/60 relative">
                      <img
                        src={url}
                        alt={`Instructor Creation ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Fallback artwork collection if none is set in Settings */
            <div className="mt-20 border-t border-[#EBE3D5]/40 pt-16">
              <SectionHeader tag="Artist Showcase" title="Selected Artworks & Creations" subtitle={`Beautiful masterpieces created by ${instructorName} and featured in our studio exhibition.`} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80",
                  "https://images.unsplash.com/photo-1579783928621-7a13d66a6211?w=500&q=80",
                  "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=500&q=80",
                  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&q=80"
                ].map((url, i) => (
                  <div key={i} className="art-card group bg-white p-2">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FCFAF7] border border-[#EBE3D5]/60 relative">
                      <img
                        src={url}
                        alt={`Creation ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* WHY CHOOSE US with Art Background */}
      <section className="relative overflow-hidden py-24 bg-[#3E3431]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=70"
            alt=""
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, rgba(112,74,135,0.85) 0%, rgba(62,52,49,0.88) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Why Choose Us" title="What Makes Us Special" light />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Expert Instructors', desc: 'Learn from passionate, experienced artists who love teaching as much as creating.' },
              { icon: Palette, title: 'Personalized Learning', desc: 'Small batch sizes ensure every student gets individual attention and guidance.' },
              { icon: Brush, title: 'All Art Forms', desc: 'From Madhubani to watercolors, acrylics to digital — we cover every medium.' },
              { icon: Award, title: 'All Age Groups', desc: 'Specially designed programs for kids (5+), teens, adults, and senior citizens.' },
              { icon: CheckCircle, title: 'All Materials Provided', desc: 'No need to buy anything. All art supplies are included in the course fee.' },
              { icon: Clock, title: 'Flexible Timings', desc: 'Morning, afternoon, and evening batches to fit your schedule.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#D4B26F]/20 flex items-center justify-center mb-4 border border-[#D4B26F]/30">
                  <Icon size={18} className="text-[#D4B26F]" />
                </div>
                <h4 className="font-bold text-white mb-2">{title}</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section className="relative overflow-hidden py-24 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader tag="Visit Us" title="Come Find Us" />
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {[
              { icon: MapPin, label: 'Address', value: '208-B, 54th Cross, Opp Sri Rama Mandira,\nRajajinagar 4th Block, Bangalore-10', color: '#704A87' },
              { icon: Clock, label: 'Studio Timings', value: '10:00 AM – 9:00 PM\nMonday to Sunday', color: '#D4B26F' },
              { icon: Phone, label: 'Call Us', value: '+91 81973 44421', color: '#E0B3B7' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="art-card p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: color + '18' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h4 className="font-bold text-[#3E3431] mb-2 text-sm">{label}</h4>
                <p className="text-[#5C504E] text-sm whitespace-pre-line leading-relaxed font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/contact" className="btn-primary">
              Get In Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
