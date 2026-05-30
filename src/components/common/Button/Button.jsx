function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-[#1B2F5E] text-white shadow-[0_10px_22px_rgba(27,47,94,0.16)] hover:bg-[#1A2340]',
    secondary:
      'border border-[#E7E1D8] bg-white text-[#1B2F5E] shadow-[0_6px_16px_rgba(27,47,94,0.06)] hover:border-[#C8D6EE] hover:bg-[#F7FAFF]',
    social:
      'border border-[#E7E1D8] bg-white text-[#1B2F5E] shadow-[0_6px_16px_rgba(27,47,94,0.06)] hover:border-[#C8D6EE] hover:bg-[#F8FBFF]',
    ghost: 'bg-transparent text-[#7B8FAB] hover:text-[#1B2F5E]',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
