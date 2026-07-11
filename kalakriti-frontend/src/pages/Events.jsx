import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Brush } from 'lucide-react'
import { eventService } from '../services/services'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    eventService.getAll().then(r => setEvents(r.data || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-16 md:pt-20">

      {/* HEADER with Indian art background */}
      <section className="relative overflow-hidden py-32 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&q=80"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.25) saturate(0.7)' }}
          />
        </div>
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(233,30,140,0.45) 0%, rgba(107,45,139,0.80) 50%, rgba(45,27,105,0.85) 100%)' }} />
        <div className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <span className="section-tag text-[#FFD6EC]">Don't Miss Out</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Events & Workshops</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>
          <p className="text-white/80 text-base leading-relaxed">
            Workshops, exhibitions, and art events to inspire and delight you
          </p>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="relative overflow-hidden py-20" style={{ background: '#FFF8FF' }}>
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EDE0F8] border-t-[#6B2D8B] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#7B6B8B]">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event.id} className="art-card group">
                  <div className="h-52 bg-gradient-to-br from-[#FFD6EC] to-[#EDE0F8] overflow-hidden relative">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Brush size={40} className="text-[#6B2D8B] opacity-25" />
                      </div>
                    )}
                    <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${event.paid ? 'bg-[#C9A84C] text-white' : 'bg-emerald-500 text-white'}`}>
                      {event.paid ? `₹${event.price}` : 'Free'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#2D1B69] text-lg mb-2">{event.title}</h3>
                    <p className="text-[#7B6B8B] text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-2 text-xs text-[#6B2D8B] mb-5">
                      <Calendar size={13} />
                      <span>{event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date TBA'}</span>
                    </div>
                    <Link to={`/events/${event.id}`} className="btn-pink w-full text-center py-2.5 text-sm flex items-center justify-center gap-1">
                      View & Register <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Brush size={48} className="mx-auto mb-4 text-[#D4B8E8]" />
              <p className="text-[#7B6B8B] text-lg">Events will be announced soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
