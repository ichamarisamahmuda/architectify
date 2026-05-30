import { ArrowLeft, Map, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar.jsx'
import FilterButton from '../../components/search/FilterButton/FilterButton.jsx'
import SearchBar from '../../components/search/SearchBar/SearchBar.jsx'
import SearchResultCard from '../../components/search/SearchResultCard/SearchResultCard.jsx'

const filters = ['Nearest', 'Interior Architect', 'Residential Architect', 'Commercial Architect', 'Sustainable Architect', 'Urban Designer', 'Landscape Architect']

const results = [
  {
    title: 'Andi Prasetyo, S.ArS',
    specialty: 'Residential Design',
    rating: '4.9',
    reviews: '128',
    distance: '2.3 km away',
    price: 'Rp 500K - 1M / hour',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Siti Nurhaliza',
    specialty: 'Commercial & Interior',
    rating: '4.8',
    reviews: '95',
    distance: '3.5 km away',
    price: 'Rp 750K - 1.5M / hour',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Bambang Suryadi',
    specialty: 'Minimalist & Sustainable',
    rating: '4.9',
    reviews: '142',
    distance: '4.1 km away',
    price: 'Rp 600K - 1.2M / hour',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80',
  },
]

function Search() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#F9F6F2]">
      <div className="sticky top-0 z-20 bg-[#F9F6F2] px-4 pt-3 pb-2">
        <Navbar
          leading={(
            <Link to="/home" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          )}
          title="Search Architect"
          trailing={(
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white">
              <Map className="h-6 w-6" />
            </button>
          )}
        />

        <div className="pt-3">
          <SearchBar placeholder="Search architect, specialty..." rightSlot={<SlidersHorizontal className="h-5 w-5 text-[#1B2F5E]" />} />
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 pr-1 [scrollbar-width:none]">
          {filters.map((filter, index) => (
            <FilterButton key={filter} active={index === 0}>
              {filter}
            </FilterButton>
          ))}
        </div>
      </div>

      <section className="flex-1 min-h-0 space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-4 pb-24 pt-3">
        <p className="text-[12px] font-medium text-[#7B8FAB]">3 architects found</p>

        <div className="space-y-3.5">
          {results.map((property) => (
            <SearchResultCard key={property.title} property={property} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Search