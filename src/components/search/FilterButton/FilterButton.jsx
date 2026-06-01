function FilterButton({ active = false, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'whitespace-nowrap rounded-full px-4 py-2.5 text-[15px] font-medium transition duration-300',
        active
          ? 'bg-[#1B2F5E] text-white shadow-[0_6px_14px_rgba(27,47,94,0.16)]'
          : 'border border-[#D5D9E2] bg-white text-[#1A2340] shadow-[0_4px_10px_rgba(27,47,94,0.05)] hover:text-[#1B2F5E]',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default FilterButton
