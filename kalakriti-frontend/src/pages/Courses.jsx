import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Palette, BookOpen, Users, Star, Award, Brush, Zap, Calendar } from 'lucide-react'
import { courseService, eventService } from '../services/services'

const CATEGORIES = [
  { key: 'ALL', label: 'All Programs', icon: Palette },
  { key: 'HOBBY', label: 'Hobby Classes', icon: Users },
  { key: 'PROFESSIONAL', label: 'Professional Courses', icon: BookOpen },
  { key: 'BOOTCAMP', label: 'Bootcamp Programs', icon: Zap },
  { key: 'WORKSHOP', label: 'Workshops', icon: Brush },
  { key: 'SHORT_TERM', label: 'Short-Term Courses', icon: Calendar },
]

// Map course titles to categories
function categorize(title) {
  const t = title?.toLowerCase() || ''
  if (t.includes('bootcamp') || t.includes('foundation art')) return 'BOOTCAMP'
  if (t.includes('workshop')) return 'WORKSHOP'
  if (t.includes('hobby')) return 'HOBBY'
  if (t.includes('2-day') || t.includes('4-day') || t.includes('12-week') || t.includes('short')) return 'SHORT_TERM'
  return 'PROFESSIONAL'
}

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('ALL')

  useEffect(() => {
    courseService.getAll().then(r => setCourses(r.data || [])).catch(() => {}).finally(() => setLoading(false))
    eventService.getAll().then(r => {
      // Filter events that are workshops
      const ws = (r.data || []).filter(e =>
        e.title?.toLowerCase().includes('workshop') ||
        e.title?.toLowerCase().includes('bootcamp')
      )
      setWorkshops(ws)
    }).catch(() => {})
  }, [])

  // Merge courses and workshop-events together for display
  const allItems = [
    ...courses.map(c => ({ ...c, _type: 'course', _category: categorize(c.title) })),
    ...workshops.map(w => ({ ...w, _type: 'workshop', _category: 'WORKSHOP' })),
  ]

  const filtered = allItems.filter(item => {
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase())
    const matchTab = tab === 'ALL' || item._category === tab
    return matchSearch && matchTab
  })

  const counts = {}
  CATEGORIES.forEach(c => {
    counts[c.key] = c.key === 'ALL'
      ? allItems.length
      : allItems.filter(i => i._category === c.key).length
  })

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER */}
      <section className="relative overflow-hidden py-28 text-center bg-[#FAF6F0]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(250,246,240,0.88) 0%, rgba(242,234,224,0.92) 60%, rgba(224,179,183,0.3) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #D4B26F 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#D4B26F]">Learn & Grow</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Course & Program List</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-medium">
            Explore our full range of courses, bootcamps, workshops & hobby classes — for every age and skill level
          </p>
        </div>
      </section>

      {/* CATEGORY TABS + SEARCH */}
      <section className="py-6 border-b border-[#EBE3D5] bg-white sticky top-16 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-5">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B5A898]" />
              <input type="text" placeholder="Search courses & workshops..." value={search}
                onChange={e => setSearch(e.target.value)} className="input-field pl-11 shadow-sm" />
            </div>
            <p className="text-[#8F8082] text-xs font-semibold ml-auto">
              {filtered.length} {filtered.length === 1 ? 'program' : 'programs'} found
            </p>
          </div>
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  tab === key
                    ? 'bg-[#704A87] text-white shadow-sm'
                    : 'bg-[#FAF6F0] text-[#5C504E] border border-[#EBE3D5] hover:bg-[#F2EAE0]'
                }`}>
                <Icon size={12} />
                {label}
                {counts[key] > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5 ${
                    tab === key ? 'bg-white/20' : 'bg-[#EBE3D5]'
                  }`}>{counts[key]}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="relative overflow-hidden py-16 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-bl absolute" /><div className="wc-br absolute" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EBE3D5] border-t-[#704A87] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#8F8082]">Loading programs...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(item => (
                <div key={`${item._type}-${item.id}`} className="art-card group bg-white">
                  {/* Image */}
                  <div className="h-52 bg-gradient-to-br from-[#EAE2F3] to-[#FCEAEB] overflow-hidden relative border-b border-[#EBE3D5]/50">
                    {item.imageUrl
                      ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                      : <div className="w-full h-full flex items-center justify-center"><Palette size={48} className="text-[#704A87] opacity-20" /></div>
                    }
                    {/* Category badge */}
                    <span className={`absolute top-3 left-3 text-xs text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                      item._category === 'HOBBY' ? 'bg-[#D4B26F]' :
                      item._category === 'WORKSHOP' ? 'bg-[#E0B3B7]' :
                      item._category === 'BOOTCAMP' ? 'bg-emerald-600' :
                      item._category === 'SHORT_TERM' ? 'bg-blue-600' :
                      'bg-[#704A87]'
                    }`}>
                      {item._category === 'HOBBY' ? 'Hobby' :
                       item._category === 'WORKSHOP' ? 'Workshop' :
                       item._category === 'BOOTCAMP' ? 'Bootcamp' :
                       item._category === 'SHORT_TERM' ? 'Short-Term' :
                       'Professional'}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-bold text-[#3E3431] text-lg mb-2 leading-tight">{item.title}</h3>
                    <p className="text-[#5C504E] text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

                    {/* Highlights */}
                    {item.highlights && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.highlights.split('|').slice(0, 3).map(h => (
                          <span key={h} className="text-[10px] bg-[#704A87]/8 text-[#704A87] px-2.5 py-1 rounded-full font-semibold border border-[#704A87]/12">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Duration */}
                    {item.durationWeeks && (
                      <p className="text-xs text-[#8F8082] mb-4 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Award size={11} className="text-[#D4B26F]" />
                        Duration: {item.durationWeeks} weeks
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-[#EBE3D5]">
                      <span className="text-[#704A87] font-extrabold text-lg">
                        {(item.price === 0 || item.price === '0' || !item.price)
                          ? <span className="text-emerald-600 text-sm font-bold">Contact for Fees</span>
                          : `₹${Number(item.price).toLocaleString()}`}
                      </span>
                      {item._type === 'course' ? (
                        <Link to={`/courses/${item.id}`} className="btn-pink py-2 px-5 text-xs font-bold">
                          Enroll Now <ArrowRight size={13} />
                        </Link>
                      ) : (
                        <Link to={`/events/${item.id}`} className="btn-secondary py-2 px-5 text-xs font-bold">
                          Register <ArrowRight size={13} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Palette size={48} className="mx-auto mb-4 text-[#E0B3B7]" />
              <p className="text-[#8F8082] text-lg font-medium mb-2">No programs found.</p>
              <p className="text-[#8F8082] text-sm">Try a different category or check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Short-Term Courses Info */}
      <section className="relative overflow-hidden py-16 bg-[#FAF6F0]">
        <div className="absolute inset-0 bg-mandala opacity-15 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-tag text-[#D4B26F]">Quick Programs</span>
            <h2 className="section-title text-[#3E3431]">Short-Term Courses</h2>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4B26F]" />
              <div className="h-px w-12 bg-[#D4B26F] opacity-45" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { days: '2', unit: 'DAYS', title: '2-Day Workshop', desc: 'Intensive & Fun Learning — perfect for a quick creative burst over a weekend.', color: '#704A87' },
              { days: '4', unit: 'DAYS', title: '4-Day Workshop', desc: 'Focused Creative Training — dive deeper into a specific art technique.', color: '#D4B26F' },
              { days: '12', unit: 'WEEKS', title: '12-Week Course', desc: '3 Months Comprehensive Program — thorough, structured learning from basics to advanced.', color: '#E0B3B7' },
            ].map(({ days, unit, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-[#EBE3D5] shadow-sm hover:shadow-md hover:border-[#D4B26F] transition-all text-center">
                <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 shadow-sm" style={{ background: color + '15', border: `2px solid ${color}30` }}>
                  <span className="font-extrabold text-xl leading-none" style={{ color }}>{days}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{unit}</span>
                </div>
                <h3 className="font-bold text-[#3E3431] mb-2 text-base">{title}</h3>
                <p className="text-[#5C504E] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Enquire About Any Program <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
