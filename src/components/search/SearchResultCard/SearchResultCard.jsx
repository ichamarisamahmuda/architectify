import { Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../common/Card/Card.jsx'

function SearchResultCard({ architect }) {
  const profilePhoto = architect?.profilePhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  const fullName = architect?.fullName || 'Architect'
  const specializationText = Array.isArray(architect?.specialization) && architect.specialization.length > 0
    ? architect.specialization.join(', ')
    : 'General Architecture'
  const locationText = architect?.location || 'Lokasi belum diisi'
  const consultationPrice = architect?.consultationPrice
    ? `Rp${Number(architect.consultationPrice).toLocaleString('id-ID')} / Consultation`
    : 'Harga konsultasi belum diisi'
  const ratingValue = Number.isFinite(Number(architect?.rating)) ? Number(architect.rating) : 0

  return (
    <Card className="relative overflow-hidden px-4 py-3.5">
      <div className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4A90D9] text-white shadow-[0_6px_12px_rgba(74,144,217,0.2)]">
        <Heart className="h-4 w-4 fill-white" />
      </div>

      <div className="flex items-start gap-4 pr-8">
        <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full bg-[linear-gradient(145deg,#D8E4F7_0%,#B4C8E6_100%)] shadow-[0_6px_14px_rgba(27,47,94,0.08)]">
          <img src={profilePhoto} alt={fullName} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="truncate text-[16px] font-semibold text-[#1A2340]">{fullName}</h3>
          <p className="mt-1 truncate text-[12px] text-[#8A96AA]">{locationText}</p>
          <span className="mt-2 inline-flex rounded-full bg-[#DDE8F7] px-3 py-1.5 text-[12px] font-medium text-[#4A6C9A]">
            {specializationText}
          </span>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-[#1A2340]">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
              {ratingValue > 0 ? ratingValue.toFixed(1) : '0.0'} Rating
            </span>
            <span className="inline-flex items-center gap-1 text-[#4A90D9]">
              <MapPin className="h-4 w-4" />
              {locationText}
            </span>
          </div>

          <p className="mt-2 text-[13px] text-[#7B8FAB]">{consultationPrice}</p>

          <Link
            to={`/architect/${architect?.uid}`}
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-[18px] border-2 border-[#1B2F5E] text-[14px] font-semibold text-[#1B2F5E] transition hover:bg-[#F4F7FC]"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default SearchResultCard
