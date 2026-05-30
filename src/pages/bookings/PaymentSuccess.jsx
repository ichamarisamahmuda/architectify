import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const architectProfiles = {
  'andi-prasetyo': {
    name: 'Andi Prasetyo, S.ArS',
    tags: ['Residential'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    consultationPrice: 500000,
  },
}

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const architect = architectProfiles[slug] || architectProfiles['andi-prasetyo']
  const formData = location.state?.formData || {}

  let serviceFee = 100000
  if (formData.buildingArea) {
    const areaFee = parseInt(formData.buildingArea) * 5000
    serviceFee = areaFee > serviceFee ? areaFee : serviceFee
  }

  const subtotal = architect.consultationPrice
  const platformFee = 50000
  const total = subtotal + serviceFee + platformFee

  const handleBack = () => {
    navigate('/bookings')
  }

  const handleChatArchitect = () => {
    navigate(`/chat`)
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
        <h1 className="text-[18px] font-semibold text-[#1A2340]">Payment Success</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 bg-[#F9F6F2]">
          {/* Success Message */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-[#1F2850] rounded-full blur-lg opacity-20"></div>
              <div className="relative w-16 h-16 bg-[#1F2850] rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} className="text-white" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-[18px] font-semibold text-[#1A2340] mb-1">
              Payment Successful!
            </h2>
            <p className="text-[13px] text-[#8A96AA]">
              Your booking is confirmed
            </p>
          </div>

          {/* Order Summary */}
          <div className="border-2 border-[#1F2850] rounded-2xl p-4 bg-white">
            <h3 className="font-semibold text-[15px] text-[#1A2340] mb-4">Order Summary</h3>

            {/* Architect Info */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/70">
              <img
                src={architect.avatar}
                alt={architect.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-[14px] text-[#1A2340]">{architect.name}</h4>
                <p className="text-[12px] text-[#8A96AA]">{architect.tags[0]} Architect</p>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[13px] text-[#8A96AA]">Service</span>
                <span className="text-[13px] font-semibold text-[#1A2340] text-right">
                  Initial Consultation — 60 min
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[13px] text-[#8A96AA]">Date & Time</span>
                <span className="text-[13px] font-semibold text-[#1A2340] text-right">
                  Sabtu, 12 April · 10:00 WIB
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-t border-white/70 mt-5 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#8A96AA]">Subtotal</span>
                <span className="text-[13px] font-medium text-[#1A2340]">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#8A96AA]">Service Fee</span>
                <span className="text-[13px] font-medium text-[#1A2340]">
                  Rp {serviceFee.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-[#8A96AA]">Platform Fee</span>
                <span className="text-[13px] font-medium text-[#1A2340]">
                  Rp {platformFee.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="border-t border-white/70 mt-3 pt-3 flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#1A2340]">Total</span>
                <span className="text-[16px] font-bold text-[#1A2850]">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleChatArchitect}
            className="w-full px-4 py-4 bg-[#1A2340] text-white rounded-2xl font-semibold text-[15px] transition hover:bg-[#0f1628] mb-6"
          >
            Chat with Architect
          </button>
        </div>
      </div>
    </div>
  )
}
