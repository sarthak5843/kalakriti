import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, Users, Monitor, MapPin, CheckCircle, X, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { courseService, siteService } from '../services/services'
import { useAuth } from '../context/AuthContext'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [course, setCourse] = useState(null)
  const [selectedBatch, setSelectedBatch] = useState('')
  const [enrolling, setEnrolling] = useState(false)
  const [settings, setSettings] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    courseService.getById(id).then(r => setCourse(r.data)).catch(() => navigate('/courses'))
    siteService.get().then(res => setSettings(res.data)).catch(() => {})
  }, [id])

  const handleEnroll = async () => {
    if (!isLoggedIn) { navigate('/login'); return }
    if (!selectedBatch && course?.batches?.length > 0) {
      toast.error('Please select a batch')
      return
    }
    setShowPaymentModal(true)
  }

  const submitEnrollmentWithPayment = async (e) => {
    e.preventDefault()
    if (!transactionId.trim()) {
      toast.error('Please enter the transaction reference ID')
      return
    }
    setEnrolling(true)
    try {
      await courseService.enroll({ 
        courseId: course.id, 
        batchId: selectedBatch || null,
        paymentId: transactionId
      })
      toast.success('Enrollment request submitted! Awaiting admin approval.')
      setShowPaymentModal(false)
      setTransactionId('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  if (!course) return (
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
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-[#C9A84C]/20 text-[#C9A84C] text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">{course.mode}</span>
            {course.active && <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">Enrolling Now</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{course.title}</h1>
          <p className="text-purple-200 max-w-2xl text-sm md:text-base leading-relaxed">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {course.imageUrl && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#EDE0F8]">
                <img src={course.imageUrl} alt={course.title} className="w-full h-72 md:h-96 object-cover" />
              </div>
            )}
            {course.highlights && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE0F8]">
                <h3 className="font-bold text-[#2D1B69] text-lg mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>What You'll Learn</h3>
                <ul className="space-y-3">
                  {course.highlights.split('\n').filter(Boolean).map((h, i) => (
                    <li key={i} className="flex gap-3 text-[#7B6B8B] text-sm">
                      <CheckCircle size={16} className="text-[#E91E8C] mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {course.batches?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EDE0F8]">
                <h3 className="font-bold text-[#2D1B69] text-lg mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Available Batches</h3>
                <div className="space-y-3">
                  {course.batches.map(batch => (
                    <label key={batch.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedBatch === batch.id ? 'border-[#6B2D8B] bg-[#6B2D8B]/5' : 'border-purple-100 hover:border-[#C9A84C]'
                    }`}>
                      <input type="radio" name="batch" value={batch.id} onChange={() => setSelectedBatch(batch.id)} className="accent-[#6B2D8B]" />
                      <div>
                        <p className="font-bold text-[#2D1B69] text-sm">{batch.batchName}</p>
                        <p className="text-[#7B6B8B] text-xs mt-0.5">{batch.schedule} • {batch.timing}</p>
                        {batch.startDate && <p className="text-[#E91E8C] text-xs mt-0.5 font-semibold">Starts: {new Date(batch.startDate).toLocaleDateString('en-IN')}</p>}
                      </div>
                      <span className="ml-auto text-xs bg-[#EDE0F8] text-[#6B2D8B] px-2.5 py-1 rounded-full font-bold">{batch.availableSeats} seats left</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-[#EDE0F8]">
              <div className="text-3xl font-extrabold text-[#6B2D8B] mb-1">₹{course.price?.toLocaleString()}</div>
              <p className="text-[#7B6B8B] text-sm mb-6 font-medium">One-time enrollment fee</p>
              <div className="space-y-3 mb-6 text-sm text-[#7B6B8B]">
                {course.durationWeeks && (
                  <div className="flex gap-3 items-center"><Clock size={16} className="text-[#E91E8C]" /> {course.durationWeeks} weeks duration</div>
                )}
                {course.totalSeats && (
                  <div className="flex gap-3 items-center"><Users size={16} className="text-[#E91E8C]" /> {course.totalSeats} total seats</div>
                )}
                <div className="flex gap-3 items-center">
                  {course.mode === 'ONLINE' ? <Monitor size={16} className="text-[#E91E8C]" /> : <MapPin size={16} className="text-[#E91E8C]" />}
                  {course.mode === 'ONLINE' ? 'Online' : course.mode === 'OFFLINE' ? 'In-Studio' : 'Online & In-Studio'}
                </div>
              </div>
              <button onClick={handleEnroll} disabled={enrolling}
                className="btn-primary w-full text-center disabled:opacity-60 py-3 text-base">
                {enrolling ? 'Submitting...' : isLoggedIn ? 'Enroll Now' : 'Login to Enroll'}
              </button>
              <p className="text-xs text-[#7B6B8B] text-center mt-3 font-medium">Enrollment is subject to admin approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-purple-100 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-purple-50" style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #6B2D8B 100%)' }}>
              <div className="flex items-center gap-2 text-white">
                <CreditCard size={20} className="text-[#C9A84C]" />
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Complete Enrollment</h3>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={submitEnrollmentWithPayment} className="p-6 space-y-5">
              <div className="text-center bg-[#FEFAF4] p-4 rounded-xl border border-purple-100">
                <p className="text-xs text-[#7B6B8B] uppercase tracking-wider font-bold">Amount to Pay</p>
                <p className="text-3xl font-extrabold text-[#6B2D8B] mt-1">₹{course.price?.toLocaleString()}</p>
                <p className="text-[11px] text-[#7B6B8B] mt-1">Scan the QR code below using any UPI App (GPay, PhonePe, Paytm)</p>
              </div>

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
                  Once payment is completed, paste the 12-digit transaction reference ID above and submit. Admin will verify and approve your enrollment.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 btn-secondary py-2.5">
                  Cancel
                </button>
                <button type="submit" disabled={enrolling} className="flex-1 btn-primary py-2.5 disabled:opacity-60">
                  {enrolling ? 'Submitting...' : 'Submit Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
