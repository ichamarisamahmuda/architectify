import { Search } from 'lucide-react'

function SearchBar({ placeholder = 'Search properties, neighborhoods...' }) {
  return (
    <label className="flex h-14 items-center gap-3 rounded-full border border-white bg-white px-4 text-[#7B8FAB] shadow-[0_6px_16px_rgba(27,47,94,0.06)]">
      <Search className="h-5 w-5 text-[#1A2340]" />
      <input
        type="search"
        placeholder={placeholder}
        className="w-full border-0 bg-transparent text-[15px] text-[#1B2F5E] outline-none placeholder:text-[#A5B1C1]"
      />
    </label>
  )
}

export default SearchBar
