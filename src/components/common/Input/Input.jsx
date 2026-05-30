function Input({ label, rightSlot, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      {label ? (
        <span className="mb-2 block text-sm font-semibold text-[#1B2F5E]">{label}</span>
      ) : null}
      <div className="relative">
        <input
          className="h-14 w-full rounded-2xl border border-[#E8E3DA] bg-white px-4 text-[15px] text-[#1B2F5E] outline-none transition duration-300 placeholder:text-[#A5B1C1] focus:border-[#4A90D9] focus:ring-4 focus:ring-[#4A90D9]/10"
          {...props}
        />
        {rightSlot ? <div className="absolute inset-y-0 right-4 flex items-center">{rightSlot}</div> : null}
      </div>
    </label>
  )
}

export default Input
