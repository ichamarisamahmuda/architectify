function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-[28px] border border-white/70 bg-white shadow-[0_10px_24px_rgba(27,47,94,0.06)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
