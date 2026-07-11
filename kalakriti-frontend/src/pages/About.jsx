import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, MapPin, Clock, Phone, Palette, Brush, Users, Award } from 'lucide-react'

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

export default function About() {
  return (
    <div className="pt-16 md:pt-20">

      {/* PAGE HEADER with Indian palace background */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.28) saturate(0.75)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(107,45,139,0.75) 0%, rgba(45,27,105,0.80) 60%, rgba(201,168,76,0.20) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-8"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#FFD6EC]">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>About Us</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-lg leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Where creativity blooms and every stroke tells a story
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="relative overflow-hidden py-24" style={{ background: '#FFF8FF' }}>
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader tag="Our Journey" title="A Decade of Nurturing Artists" center={false} />
              <p className="text-[#7B6B8B] leading-relaxed mb-4">
                Nestled in the heart of Rajajinagar, Bangalore, Kalakriti Art Studio was founded with a single dream —
                to make art accessible to everyone. What started as a small studio has grown into Bangalore's most
                beloved creative space.
              </p>
              <p className="text-[#7B6B8B] leading-relaxed mb-4">
                We believe that every person is born with the ability to create. Our role is simply to guide,
                inspire, and provide the tools to let that creativity flourish.
              </p>
              <p className="text-[#7B6B8B] leading-relaxed mb-8">
                From traditional Indian art forms like Madhubani and Warli to contemporary watercolors,
                acrylics, and mixed media — our curriculum is as diverse as art itself.
              </p>
              <div className="space-y-3 mb-8">
                {['Personalized attention in small batches', 'All art materials provided', 'Flexible morning & evening batches', 'Classes for all age groups — 5 to 65+'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#E91E8C] shrink-0" />
                    <span className="text-[#7B6B8B] text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indian art image + stats */}
            <div>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#C9A84C]/25 mb-5">
                <img
                  src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=700&q=80"
                  alt="Indian art"
                  className="w-full h-64 object-cover"
                  onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#EDE0F8,#FFD6EC)'; e.target.style.display = 'none' }}
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
                    <div className="w-10 h-10 rounded-full bg-[#EDE0F8] flex items-center justify-center mx-auto mb-2">
                      <Icon size={18} className="text-[#6B2D8B]" />
                    </div>
                    <p className="text-[#6B2D8B] font-bold text-2xl">{value}</p>
                    <p className="text-[#7B6B8B] text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US with Indian art bg */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=70"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.22) saturate(0.6)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, rgba(45,27,105,0.88) 0%, rgba(107,45,139,0.82) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Why Choose Us" title="What Makes Us Special" light />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Expert Instructors', desc: 'Learn from passionate, experienced artists who love teaching as much as creating.' },
              { icon: Palette, title: 'Personalized Learning', desc: 'Small batch sizes ensure every student gets individual attention and guidance.' },
              { icon: Brush, title: 'All Art Forms', desc: 'From Madhubani to watercolors, acrylics to digital — we cover every medium.' },
              { icon: Award, title: 'All Age Groups', desc: 'Specially designed programs for kids (5+), teens, adults, and senior citizens.' },
              { icon: CheckCircle, title: 'All Materials Provided', desc: 'No need to buy anything. All art supplies are included in the course fee.' },
              { icon: Clock, title: 'Flexible Timings', desc: 'Morning, afternoon, and evening batches to fit your busy schedule.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center mb-4 border border-[#C9A84C]/30">
                  <Icon size={18} className="text-[#C9A84C]" />
                </div>
                <h4 className="font-bold text-white mb-2">{title}</h4>
                <p className="text-purple-200 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT US */}
      <section className="relative overflow-hidden py-24" style={{ background: '#FEFAF4' }}>
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader tag="Visit Us" title="Come Find Us" />
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {[
              { icon: MapPin, label: 'Address', value: '208-B, 54th Cross, Opp Sri Rama Mandira,\nRajajinagar 4th Block, Bangalore-10', color: '#E91E8C' },
              { icon: Clock, label: 'Studio Timings', value: '10:00 AM – 9:00 PM\nMonday to Sunday', color: '#6B2D8B' },
              { icon: Phone, label: 'Call Us', value: '+91 81973 44421', color: '#C9A84C' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="art-card p-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: color + '18' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h4 className="font-bold text-[#2D1B69] mb-2 text-sm">{label}</h4>
                <p className="text-[#7B6B8B] text-sm whitespace-pre-line leading-relaxed">{value}</p>
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
