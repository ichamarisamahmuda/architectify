function CategoryCard({ category }) {
  return (
    <button
      type="button"
      className="flex min-w-[108px] flex-col gap-3 rounded-[24px] border border-white/70 bg-white px-4 py-4 text-left shadow-[0_6px_16px_rgba(27,47,94,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,47,94,0.1)]"
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${category.color}`}>
        {category.icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-[#1A2340]">{category.title}</p>
        <p className="mt-1 text-xs text-[#7B8FAB]">{category.count}</p>
      </div>
    </button>
  )
}

export default CategoryCard
