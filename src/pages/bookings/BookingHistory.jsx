import { ArrowLeft, Clock, MapPin, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar.jsx'
import Card from '../../components/common/Card/Card.jsx'
import FilterButton from '../../components/search/FilterButton/FilterButton.jsx'

const bookings = [
  {
    id: 1,
    name: 'Andi Prasetyo, S.ArS',
    specialty: 'Residential',
    date: 'Sabtu, 12 April 2026',
    time: '10:00 WIB',
    method: 'Video Call',
    total: 'Rp 500,000',
    status: 'Upcoming',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    specialty: 'Commercial',
    date: 'Rabu, 2 April 2026',
    time: '14:00 WIB',
    method: 'In-person',
    location: 'Studio Office, Jakarta',
    total: 'Rp 750,000',
    status: 'Completed',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Bambang Suryadi',
    specialty: 'Minimalist',
    date: 'Jumat, 4 April 2026',
    time: '09:30 WIB',
    method: 'Studio Meeting',
    location: 'Architect Studio, Bandung',
    total: 'Rp 620,000',
    status: 'Cancelled',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    name: 'Maya Kusuma',
    specialty: 'Interior',
    date: 'Senin, 7 April 2026',
    time: '16:00 WIB',
    method: 'Video Call',
    total: 'Rp 450,000',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
]

function SmallBadge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-medium leading-none'
  const color = variant === 'upcoming'
    ? 'bg-[#EAF6FF] text-[#1B78D6]'
    : variant === 'completed'
      ? 'bg-[#EAF7ED] text-[#14804A]'
      : variant === 'cancelled'
        ? 'bg-[#FFF1F2] text-[#E11D48]'
        : variant === 'pending'
          ? 'bg-[#FFF7E8] text-[#C77700]'
          : 'bg-[#F6F6F7] text-[#6B7280]'
  return <span className={`${base} ${color} ${className}`}>{children}</span>
}

function BookingCard({ b }) {
  const badgeVariant =
    b.status === 'Upcoming'
      ? 'upcoming'
      : b.status === 'Completed'
        ? 'completed'
        : b.status === 'Cancelled'
          ? 'cancelled'
          : b.status === 'Pending'
            ? 'pending'
            : 'default'

  return (
    <Card className="p-3 sm:p-3.5">
      <div className="flex items-center justify-between gap-3">
        <SmallBadge variant={badgeVariant}>
          {b.status}
        </SmallBadge>
        <p className="text-[11px] text-[#9AA3B2]">ID: #{b.id}</p>
      </div>

      <div className="mt-2.5 flex items-start gap-2.5">
        <img src={b.avatar} alt={b.name} className="h-12 w-12 rounded-full object-cover flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-[#1A2340]">{b.name}</p>
          <SmallBadge variant="default" className="mt-1 max-w-[140px] truncate">{b.specialty}</SmallBadge>

          <div className="mt-2.5 space-y-1.5 text-[11px] text-[#374151]">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#6A84A6]" />
              <span className="truncate">{b.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-[#6A84A6]" />
              <span>{b.time}</span>
            </div>
            {b.location ? (
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="h-3.5 w-3.5 text-[#6A84A6]" />
                <span className="truncate">{b.location}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#6A84A6]" />
                <span>{b.method}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-3 border-t border-[#E5EAF1]" />

      <div className="flex flex-wrap items-end justify-between gap-2.5">
        <div className="min-w-0">
          <p className="text-[11px] text-[#8BA0BC]">Total Payment</p>
          <p className="mt-0.5 text-[24px] leading-none font-semibold tracking-[-0.01em] text-[#1B2F5E] sm:text-[26px]">{b.total}</p>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="rounded-full border border-[#EA556A] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#D23046]">Cancel</button>
          <button className="rounded-full bg-[#1B2F5E] px-3 py-1.5 text-[11px] font-semibold text-white">Booking</button>
        </div>
      </div>
    </Card>
  )
}

function BookingHistory() {
  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled']

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F9F6F2] px-3 sm:px-4">
      <div className="sticky top-0 z-20 bg-[#F9F6F2] pb-2">
        <Navbar
          leading={(
            <Link to="/home" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          )}
          title="Booking History"
        />

        <div className="mt-2.5 flex gap-3 overflow-x-auto pb-1 pr-1 [scrollbar-width:none]">
          {tabs.map((tab, index) => (
            <FilterButton key={tab} active={index === 0}>
              {tab}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 space-y-3.5 overflow-y-auto overscroll-contain scroll-smooth pb-24 pr-1">
        {bookings.map((b) => (
          <BookingCard key={b.id} b={b} />
        ))}
      </div>
    </div>
  )
}

export default BookingHistory
