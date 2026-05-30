function Navbar({ eyebrow, title, subtitle, leading, trailing, align = 'left', className = '' }) {
  return (
    <div
      className={[
        'flex items-center gap-4 px-4 pt-5',
        align === 'center' ? 'justify-between' : 'justify-between',
        className,
      ].join(' ')}
    >
      <div className="shrink-0">{leading}</div>

      <div className={['min-w-0 flex-1', align === 'center' ? 'text-center' : 'text-left'].join(' ')}>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7B8FAB]">{eyebrow}</p> : null}
        <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.04em] text-[#1A2340]">
          {title}
        </h1>
        {subtitle ? <p className="mt-1.5 text-sm leading-6 text-[#7B8FAB]">{subtitle}</p> : null}
      </div>

      <div className="shrink-0">{trailing}</div>
    </div>
  )
}

export default Navbar
