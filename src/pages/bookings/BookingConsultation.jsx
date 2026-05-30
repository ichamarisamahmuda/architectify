import { ArrowLeft, User, Video, Phone } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Card from '../../components/common/Card/Card.jsx'
import Button from '../../components/common/Button/Button.jsx'

const architectProfiles = {
  'andi-prasetyo': {
    name: 'Andi Prasetyo, S.ArS',
    tags: ['Residential', 'Minimalist'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    consultationPrice: 500000,
  },
}

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const dates = [
  { day: 'Mon', date: 8 },
  { day: 'Tue', date: 9 },
  { day: 'Wed', date: 10 },
  { day: 'Thu', date: 11 },
  { day: 'Fri', date: 12 },
  { day: 'Sat', date: 13 },
]

export default function BookingConsultation() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const architect = architectProfiles[slug] || architectProfiles['andi-prasetyo']

  const [selectedDate, setSelectedDate] = useState(10)
  const [selectedTime, setSelectedTime] = useState('10:00')
  const [consultationType, setConsultationType] = useState('online')
  const [notes, setNotes] = useState('')

  const handleBack = () => {
    navigate(-1)
  }

  const handleConfirm = () => {
    // Navigate to order form
    navigate(`/bookings/order-form/${slug}`)
  }

  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2]">
      {/* Header */}
      <div className="border-b border-white/70 px-4 py-4 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[18px] font-semibold text-[#1A2340]">Book Consultation</h1>
      </div>

      {/* Architect Info */}
      <div className="border-b border-white/70 px-4 py-4 bg-[#F9F6F2]">
        <div className="flex items-center gap-3">
          <img
            src={architect.avatar}
            alt={architect.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h2 className="font-semibold text-[15px] text-[#1A2340]">{architect.name}</h2>
            <p className="text-[12px] text-[#8A96AA]">{architect.tags.join(' • ')}</p>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 bg-[#F9F6F2]">
          {/* Select Date */}
          <div>
            <h3 className="font-semibold text-[15px] text-[#1A2340] mb-3">Select Date</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((item) => (
              <button
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center justify-center min-w-14 h-16 rounded-2xl transition-colors ${
                  selectedDate === item.date
                    ? 'bg-[#1F2850] text-white'
                    : 'bg-white text-[#1A2340] hover:bg-gray-50 border border-white/70'
                }`}
              >
                <span className="text-[11px] font-medium">{item.day}</span>
                <span className="text-lg font-semibold">{item.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Available Time Slots */}
        <div>
          <h3 className="font-semibold text-[15px] text-[#1A2340] mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2.5 px-3 rounded-xl text-[13px] font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-[#1F2850] text-white'
                    : 'bg-white text-[#1A2340] hover:bg-gray-50 border border-white/70'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Consultation Type */}
        <div>
          <h3 className="font-semibold text-[15px] text-[#1A2340] mb-3">Consultation Type</h3>
          <div className="space-y-2">
            {/* Online Consultation */}
            <button
              onClick={() => setConsultationType('online')}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                consultationType === 'online'
                  ? 'border-[#1F2850] bg-[#EAF3FF]'
                  : 'border-white/70 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 p-3 rounded-lg ${
                    consultationType === 'online'
                      ? 'bg-[#1F2850] text-white'
                      : 'bg-[#F0F4F8] text-[#4A6C9A]'
                  }`}
                >
                  <Video size={20} />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-semibold text-[14px] text-[#1A2340]">Online Consultation</h4>
                  <p className="text-[12px] text-[#8A96AA]">Video Call & Chat Real Time</p>
                </div>
              </div>
            </button>

            {/* Offline Consultation */}
            <button
              onClick={() => setConsultationType('offline')}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                consultationType === 'offline'
                  ? 'border-[#1F2850] bg-[#EAF3FF]'
                  : 'border-white/70 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 p-3 rounded-lg ${
                    consultationType === 'offline'
                      ? 'bg-[#1F2850] text-white'
                      : 'bg-[#F0F4F8] text-[#4A6C9A]'
                  }`}
                >
                  <User size={20} />
                </div>
                <div className="text-left flex-1">
                  <h4 className="font-semibold text-[14px] text-[#1A2340]">Offline Consultation</h4>
                  <p className="text-[12px] text-[#8A96AA]">In-Person Meeting & Chat Real Time</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
            Notes <span className="text-[#8A96AA] font-normal text-[12px]">(Optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe your project briefly..."
            className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] resize-none bg-white text-[#1A2340] placeholder:text-[#C5CDD6]"
            rows="3"
          />
        </div>
      </div>
      </div>

      {/* Footer with Total Price & Button */}
      <div className="border-t border-white/70 bg-[#F9F6F2] px-3 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-[390px] space-y-3">
          {/* Total Price */}
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-medium text-[#8A96AA]">Total Price</span>
            <span className="text-[18px] font-bold text-[#1A2340]">
              Rp {architect.consultationPrice.toLocaleString('id-ID')}
            </span>
          </div>
          
          {/* Button */}
          <Button className="w-full rounded-[20px] py-4 text-[15px]" onClick={handleConfirm}>Order Form</Button>
        </div>
      </div>
    </div>
  )
}
