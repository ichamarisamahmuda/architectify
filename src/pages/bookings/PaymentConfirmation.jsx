import { ArrowLeft, Check } from 'lucide-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../components/common/Button/Button.jsx'

const architectProfiles = {
  'andi-prasetyo': {
    name: 'Andi Prasetyo, S.ArS',
    tags: ['Residential', 'Minimalist'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    consultationPrice: 500000,
  },
}

const paymentMethods = [
  { id: 'bank', label: 'Bank Transfer', description: 'BCA, Mandiri, BNI', icon: '🏦' },
  { id: 'ewallet', label: 'E-Wallet', description: 'GoPay, OVO, Dana, DANA/hey', icon: '📱' },
  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, JCB', icon: '💳' },
]

export default function PaymentConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const architect = architectProfiles[slug] || architectProfiles['andi-prasetyo']

  // Get form data from OrderForm
  const formData = location.state?.formData || {}
  
  // Calculate service fee based on building area or flat rate
  let serviceFee = 100000 // Default flat rate
  if (formData.buildingArea) {
    // Calculate based on building area: Rp 5,000 per m²
    const areaFee = parseInt(formData.buildingArea) * 5000
    serviceFee = areaFee > serviceFee ? areaFee : serviceFee
  }

  const [paymentTerm, setPaymentTerm] = useState('full')
  const [paymentMethod, setPaymentMethod] = useState('ewallet')
  const [promoCode, setPromoCode] = useState('')

  const subtotal = architect.consultationPrice
  const platformFee = 50000
  const total = subtotal + serviceFee + platformFee

  const installmentAmount = Math.floor(total / 2)
  const displayAmount = paymentTerm === 'full' ? total : installmentAmount

  const handleBack = () => {
    navigate(-1)
  }

  const handleBooking = () => {
    console.log({
      architect: architect.name,
      formData,
      paymentTerm,
      paymentMethod,
      promoCode,
      subtotal,
      serviceFee,
      platformFee,
      total,
    })
    // Navigate to payment success
    navigate(`/bookings/success/${slug}`)
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
        <h1 className="text-[18px] font-semibold text-[#1A2340]">Payment Confirmation</h1>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 bg-[#F9F6F2]">
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
                <span className="text-[16px] font-bold text-[#1A2340]">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <h3 className="font-semibold text-[15px] text-[#1A2340] mb-3">Payment Terms</h3>
            <div className="space-y-3">
              {/* Pay Full */}
              <button
                onClick={() => setPaymentTerm('full')}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  paymentTerm === 'full'
                    ? 'border-[#1F2850] bg-[#EAF3FF]'
                    : 'border-white/70 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-[14px] text-[#1A2340]">Pay Full</h4>
                    <p className="text-[12px] text-[#8A96AA]">Pay the full amount now</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[15px] text-[#1A2340]">
                      Rp {total.toLocaleString('id-ID')}
                    </p>
                    {paymentTerm === 'full' && (
                      <Check size={16} className="text-[#1F2850] ml-auto mt-1" />
                    )}
                  </div>
                </div>
              </button>

              {/* Pay in 2 Installments */}
              <button
                onClick={() => setPaymentTerm('installment')}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  paymentTerm === 'installment'
                    ? 'border-[#1F2850] bg-[#EAF3FF]'
                    : 'border-white/70 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-[14px] text-[#1A2340]">Pay in 2 Installments</h4>
                    <p className="text-[12px] text-[#8A96AA]">
                      Rp {installmentAmount.toLocaleString('id-ID')} now + Rp {installmentAmount.toLocaleString('id-ID')} later
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[15px] text-[#1A2340]">
                      Rp {installmentAmount.toLocaleString('id-ID')}
                    </p>
                    {paymentTerm === 'installment' && (
                      <Check size={16} className="text-[#1F2850] ml-auto mt-1" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-[15px] text-[#1A2340] mb-3">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === method.id
                      ? 'border-[#1F2850] bg-[#EAF3FF]'
                      : 'border-white/70 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-[20px]">{method.icon}</span>
                    <div className="text-left">
                      <p className="font-semibold text-[14px] text-[#1A2340]">{method.label}</p>
                      <p className="text-[12px] text-[#8A96AA]">{method.description}</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id
                        ? 'border-[#1F2850] bg-[#1F2850]'
                        : 'border-white/70 bg-white'
                    }`}
                  >
                    {paymentMethod === method.id && <Check size={14} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
              />
              <button className="px-6 py-3 border-2 border-[#4A6C9A] text-[#4A6C9A] rounded-2xl font-semibold text-[14px] hover:bg-[#EAF3FF] transition">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Total & Button */}
      <div className="border-t border-white/70 bg-[#F9F6F2] px-3 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-[390px] space-y-3">
          {/* Total Payment */}
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-medium text-[#8A96AA]">Total Payment</span>
            <span className="text-[20px] font-bold text-[#1A2340]">
              Rp {displayAmount.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Button */}
          <Button className="w-full rounded-[20px] py-4 text-[15px]" onClick={handleBooking}>
            Booking Now
          </Button>
        </div>
      </div>
    </div>
  )
}
