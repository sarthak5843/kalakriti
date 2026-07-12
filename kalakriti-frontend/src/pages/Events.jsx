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
          <span className="section-tag text-[#D4B26F]">Don't Miss Out</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#3E3431] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}>Events & Workshops</h1>
          <div className="flex items-center justify-center gap-3 my-5">
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
            <div className="w-2 h-2 rounded-full bg-[#D4B26F]" />
            <div className="h-px w-16 bg-[#D4B26F] opacity-45" />
          </div>
          <p className="text-[#5C504E] text-base leading-relaxed font-semibold">
            Workshops, exhibitions, and art events to inspire and delight you
          </p>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="relative overflow-hidden py-20 bg-[#FCFAF7]">
        <div className="absolute inset-0 bg-mandala opacity-20 z-0" />
        <div className="wc-tl" /><div className="wc-br" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-[#EBE3D5] border-t-[#704A87] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#8F8082]">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event.id} className="art-card group bg-white">
                  <div className="h-52 bg-gradient-to-br from-[#FCEAEB] to-[#EAE2F3] overflow-hidden relative border-b border-[#EBE3D5]/50">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Brush size={40} className="text-[#704A87] opacity-25" />
                      </div>
                    )}
                    <span className={`absolute top-3 right-3 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${event.paid ? 'bg-[#D4B26F] text-white shadow-sm' : 'bg-emerald-500 text-white'}`}>
                      {event.paid ? `₹${event.price}` : 'Free'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#3E3431] text-lg mb-2">{event.title}</h3>
                    <p className="text-[#5C504E] text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-2 text-xs text-[#704A87] mb-5 font-bold uppercase tracking-wider">
                      <Calendar size={13} />
                      <span>{event.eventDate ? new Date(event.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date TBA'}</span>
                    </div>
                    <Link to={`/events/${event.id}`} className="btn-pink w-full text-center py-2.5 text-sm flex items-center justify-center gap-1 font-bold">
                      View & Register <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Brush size={48} className="mx-auto mb-4 text-[#E0B3B7]" />
              <p className="text-[#8F8082] text-lg font-medium">Events will be announced soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
