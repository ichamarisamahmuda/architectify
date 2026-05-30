import { Bath, BedDouble, Heart, MapPin, Star } from 'lucide-react'
import Card from '../../common/Card/Card.jsx'

function PropertyCard({ property }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-44 overflow-hidden bg-[linear-gradient(135deg,#1B2F5E_0%,#4A90D9_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_34%),linear-gradient(180deg,transparent_35%,rgba(26,35,64,0.65)_100%)]" />
        <div className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {property.label}
        </div>
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
          aria-label="Save property"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-white">
          <p className="text-sm font-medium text-white/80">{property.location}</p>
          <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">{property.title}</h3>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7B8FAB]">Starting from</p>
            <p className="mt-1 text-2xl font-semibold text-[#1A2340]">{property.price}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#F6F9FE] px-3 py-2 text-sm font-semibold text-[#1B2F5E]">
            <Star className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
            {property.rating}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#7B8FAB]">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-[#1B2F5E]" />
            {property.beds} beds
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-[#1B2F5E]" />
            {property.baths} baths
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#1B2F5E]" />
            {property.distance}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard
