import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Palette } from 'lucide-react'
import { courseService } from '../services/services'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    courseService.getAll().then(r => setCourses(r.data || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = courses.filter(c => {
    const matchSearch = c.title?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'ALL' || c.mode === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER with Indian art background */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(0.7)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(107,45,139,0.80) 0%, rgba(45,27,105,0.85) 60%, rgba(233,30,140,0.25) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#FFD6EC]">Learn & Grow</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Our Courses</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            Explore our carefully crafted courses for every skill level and age group
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-8 border-b border-[#EDE0F8]" style={{ background: '#FFF8FF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0A0C0]" />
            <input type="text" placeholder="Search courses..." value={search}
              onChange={e => setSearch(e.target.value)} className="input-field pl-11" />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {['ALL', 'ONLINE', 'OFFLINE', 'BOTH'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${filter === f ? 'bg-[#6B2D8B] text-white shadow-md' : 'bg-white text-[#6B2D8B] border border-[#D4B8E8] hover:bg-[#EDE0F8]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="relative overflow-hidden py-20" style={{ background: '#FEFAF4' }}>
        <div className="wc-bl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EDE0F8] border-t-[#6B2D8B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#7B6B8B]">Loading courses...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(course => (
                <div key={course.id} className="art-card group">
                  <div className="h-52 bg-gradient-to-br from-[#EDE0F8] to-[#FFD6EC] overflow-hidden relative">
                    {course.imageUrl
                      ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Palette size={48} className="text-[#6B2D8B] opacity-20" /></div>
                    }
                    <span className="absolute top-3 left-3 text-xs bg-[#6B2D8B] text-white px-3 py-1 rounded-full font-semibold">{course.mode}</span>
                    {course.totalSeats && (
                      <span className="absolute top-3 right-3 text-xs bg-white/90 text-[#6B2D8B] px-2 py-1 rounded-full font-semibold">
                        {course.availableSeats ?? course.totalSeats} seats left
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#2D1B69] text-lg mb-2">{course.title}</h3>
                    <p className="text-[#7B6B8B] text-sm mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                    {course.duration && <p className="text-xs text-[#B0A0C0] mb-4">Duration: {course.duration}</p>}
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
            <div className="text-center py-24">
              <Palette size={48} className="mx-auto mb-4 text-[#D4B8E8]" />
              <p className="text-[#7B6B8B] text-lg">No courses found. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
