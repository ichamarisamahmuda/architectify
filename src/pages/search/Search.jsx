import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Map, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar.jsx'
import FilterButton from '../../components/search/FilterButton/FilterButton.jsx'
import SearchBar from '../../components/search/SearchBar/SearchBar.jsx'
import SearchResultCard from '../../components/search/SearchResultCard/SearchResultCard.jsx'
import { searchArchitects, subscribeArchitects } from '../../services/architectService.js'

const filters = ['All', 'Interior Architect', 'Residential Architect', 'Commercial Architect', 'Sustainable Architect', 'Urban Designer', 'Landscape Architect']

function toSpecializationFilter(filter) {
  if (filter === 'All') {
    return ''
  }

  return filter.replace(/\s*architect\s*/gi, '').trim()
}

function Search() {
  const [architects, setArchitects] = useState([])
  const [filteredArchitects, setFilteredArchitects] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeFilter, setActiveFilter] = useState(filters[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const specializationFilter = useMemo(() => toSpecializationFilter(activeFilter), [activeFilter])

  useEffect(() => {
    setLoading(true)
    setError('')

    const unsubscribe = subscribeArchitects(
      (items) => {
        setArchitects(items)
        setLoading(false)
      },
      {
        onError: (subscriptionError) => {
          console.error(subscriptionError)
          setError('Gagal mengambil data architect dari Firebase.')
          setLoading(false)
        },
      }
    )

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let cancelled = false

    const applySearch = async () => {
      try {
        const result = await searchArchitects({
          architects,
          keyword: searchKeyword,
          specialization: specializationFilter,
        })

        if (!cancelled) {
          setFilteredArchitects(result)
        }
      } catch (searchError) {
        console.error(searchError)
        if (!cancelled) {
          setError('Gagal memproses pencarian architect.')
          setFilteredArchitects([])
        }
      }
    }

    applySearch()

    return () => {
      cancelled = true
    }
  }, [architects, searchKeyword, specializationFilter])

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
          <SearchBar
            placeholder="Search architect, specialty..."
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            rightSlot={<SlidersHorizontal className="h-5 w-5 text-[#1B2F5E]" />}
          />
        </div>

        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 pr-1 [scrollbar-width:none]">
          {filters.map((filter) => (
            <FilterButton key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
              {filter}
            </FilterButton>
          ))}
        </div>
      </div>

      <section className="flex-1 min-h-0 space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-4 pb-24 pt-3">
        <p className="text-[12px] font-medium text-[#7B8FAB]">
          {loading ? 'Loading architects...' : `${filteredArchitects.length} architects found`}
        </p>

        {error ? (
          <p className="text-[13px] font-medium text-[#C43D3D]">{error}</p>
        ) : null}

        {!loading && architects.length === 0 ? (
          <p className="text-[13px] font-medium text-[#7B8FAB]">Belum ada architect yang tersedia</p>
        ) : null}

        {!loading && architects.length > 0 && filteredArchitects.length === 0 ? (
          <p className="text-[13px] font-medium text-[#7B8FAB]">Architect tidak ditemukan</p>
        ) : null}

        <div className="space-y-3.5">
          {filteredArchitects.map((architect) => (
            <SearchResultCard key={architect.uid || architect.id} architect={architect} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Search