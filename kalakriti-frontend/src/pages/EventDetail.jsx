import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, X, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { eventService, siteService } from '../services/services'
import { useAuth } from '../context/AuthContext'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [event, setEvent] = useState(null)
  const [booking, setBooking] = useState(false)
  const [settings, setSettings] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    eventService.getById(id).then(r => setEvent(r.data)).catch(() => navigate('/events'))
    siteService.get().then(res => setSettings(res.data)).catch(() => {})
  }, [id])

  const handleBook = async () => {
    if (!isLoggedIn) { navigate('/login'); return }
    if (event.paid && event.price > 0) {
      setShowPaymentModal(true)
    } else {
      setBooking(true)
      try {
        await eventService.book(id)
        toast.success('Successfully registered for this event! Awaiting admin approval.')
      } catch (err) {
        toast.error(err.response?.data?.message || 'Booking failed')
      } finally {
        setBooking(false)
      }
    }
  }

  const submitBookingWithPayment = async (e) => {
    e.preventDefault()
    if (!transactionId.trim()) {
      toast.error('Please enter the transaction reference ID')
      return
    }
    setBooking(true)
    try {
      await eventService.book(id, transactionId)
      toast.success('Registration request submitted! Awaiting admin approval.')
      setShowPaymentModal(false)
      setTransactionId('')
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

      {/* Payment / Booking Request Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#FEFAF4] rounded-2xl w-full max-w-md p-6 border border-[#EDE0F8] shadow-2xl relative">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-[#7A5C4A] hover:text-[#2D1B69]">
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#EDE0F8] flex items-center justify-center text-[#6B2D8B]">
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#2D1B69]">Event Registration Fee</h3>
                <p className="text-xs text-[#7B6B8B]">Pay to secure your seat</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#EDE0F8] mb-6 text-center">
              <p className="text-[#7B6B8B] text-xs font-semibold uppercase tracking-wider">Amount to Pay</p>
              <p className="text-3xl font-extrabold text-[#6B2D8B] mt-1">₹{event.price?.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">For Event: {event.title}</p>
            </div>

            <form onSubmit={submitBookingWithPayment} className="space-y-5">
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-48 h-48 border-2 border-purple-100 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center shadow-inner">
                  {settings?.qrCodeUrl ? (
                    <img src={settings.qrCodeUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-[#6B2D8B] font-bold text-sm">UPI Payment</p>
                      <p className="text-xs text-[#7B6B8B] mt-1">Please pay to standard studio phone number/UPI ID:</p>
                      <p className="text-xs font-bold text-[#2D1B69] mt-1">{settings?.phone || '+918197344421'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Transaction ID Input */}
              <div>
                <label className="block text-xs font-bold text-[#2D1B69] uppercase tracking-wider mb-2">Transaction ID / UPI Ref No. *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 348910485912"
                  className="input-field text-center font-mono tracking-widest text-lg font-bold"
                  value={transactionId}
                  onChange={e => setTransactionId(e.target.value)}
                />
                <p className="text-[10px] text-[#7B6B8B] mt-1.5 text-center">
                  Once payment is completed, paste the 12-digit transaction reference ID above and submit. Admin will verify and confirm your seat.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 btn-secondary py-2.5">
                  Cancel
                </button>
                <button type="submit" disabled={booking} className="flex-1 btn-primary py-2.5 disabled:opacity-60">
                  {booking ? 'Submitting...' : 'Submit Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
