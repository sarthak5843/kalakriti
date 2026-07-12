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

      {/* HEADER with Soft Pastels */}
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
          <span className="section-tag text-[#D4B26F]">Learn & Grow</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Our Courses</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-medium">
            Explore our carefully crafted courses for every skill level and age group
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-8 border-b border-[#EBE3D5] bg-[#FAF6F0] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B5A898]" />
            <input type="text" placeholder="Search courses..." value={search}
              onChange={e => setSearch(e.target.value)} className="input-field pl-11 shadow-sm" />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {['ALL', 'ONLINE', 'OFFLINE', 'BOTH'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${filter === f ? 'bg-[#704A87] text-white shadow-sm' : 'bg-white text-[#3E3431] border border-[#E0D8C8] hover:bg-[#F2EAE0]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="relative overflow-hidden py-20 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-bl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EBE3D5] border-t-[#704A87] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#8F8082]">Loading courses...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(course => (
                <div key={course.id} className="art-card group bg-white">
                  <div className="h-52 bg-gradient-to-br from-[#EAE2F3] to-[#FCEAEB] overflow-hidden relative border-b border-[#EBE3D5]/50">
                    {course.imageUrl
                      ? <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Palette size={48} className="text-[#704A87] opacity-20" /></div>
                    }
                    <span className="absolute top-3 left-3 text-xs bg-[#704A87] text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">{course.mode}</span>
                    {course.totalSeats && (
                      <span className="absolute top-3 right-3 text-xs bg-white/90 text-[#704A87] px-2 py-1.5 rounded-full font-bold uppercase tracking-wider border border-[#EBE3D5]">
                        {course.availableSeats ?? course.totalSeats} seats left
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#3E3431] text-lg mb-2">{course.title}</h3>
                    <p className="text-[#5C504E] text-sm mb-5 line-clamp-2 leading-relaxed">{course.description}</p>
                    {course.duration && <p className="text-xs text-[#8F8082] mb-4 font-semibold uppercase tracking-wider">Duration: {course.duration}</p>}
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
            <div className="text-center py-24">
              <Palette size={48} className="mx-auto mb-4 text-[#E0B3B7]" />
              <p className="text-[#8F8082] text-lg font-medium">No courses found. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
