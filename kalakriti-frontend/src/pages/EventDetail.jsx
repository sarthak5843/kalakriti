import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { eventService } from '../services/services'
import { useAuth } from '../context/AuthContext'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [event, setEvent] = useState(null)
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    eventService.getById(id).then(r => setEvent(r.data)).catch(() => navigate('/events'))
  }, [id])

  const handleBook = async () => {
    if (!isLoggedIn) { navigate('/login'); return }
    setBooking(true)
    try {
      await eventService.book(id)
      toast.success('Successfully registered for this event!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setBooking(false)
    }
  }

  if (!event) return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-[#FEFAF4]">
      <div className="w-10 h-10 border-4 border-[#6B2D8B] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="pt-16 md:pt-20 bg-[#FEFAF4] min-h-screen">
      <div className="bg-[#2D1B69] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className={`text-xs px-3 py-1 rounded-full font-bold mb-4 inline-block uppercase tracking-wider ${event.paid ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-green-500/20 text-green-400'}`}>
            {event.paid ? `₹${event.price?.toLocaleString()}` : 'Free Event'}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-purple-200 text-sm">
            {event.eventDate && <span className="flex gap-2 items-center font-medium"><Calendar size={14} className="text-[#C9A84C]" /> {new Date(event.eventDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>}
            {event.venue && <span className="flex gap-2 items-center font-medium"><MapPin size={14} className="text-[#C9A84C]" /> {event.venue}</span>}
            {event.availableSeats != null && <span className="flex gap-2 items-center font-medium"><Users size={14} className="text-[#C9A84C]" /> {event.availableSeats} seats left</span>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {event.imageUrl && (
          <div className="rounded-2xl overflow-hidden shadow-md border border-[#EDE0F8] mb-8">
            <img src={event.imageUrl} alt={event.title} className="w-full h-72 md:h-96 object-cover" />
          </div>
        )}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE0F8] mb-8">
          <h3 className="font-bold text-[#2D1B69] text-lg mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>About This Event</h3>
          <p className="text-[#7B6B8B] leading-relaxed text-sm md:text-base">{event.description}</p>
        </div>
        <button onClick={handleBook} disabled={booking || event.availableSeats === 0}
          className="btn-primary w-full text-center text-lg py-4 disabled:opacity-60">
          {booking ? 'Registering...' : event.availableSeats === 0 ? 'Fully Booked' : isLoggedIn ? 'Register for This Event' : 'Login to Register'}
        </button>
      </div>
    </div>
  )
}
