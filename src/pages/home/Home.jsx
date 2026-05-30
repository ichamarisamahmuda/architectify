import { Search as SearchIcon, ChevronRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar.jsx'

const architects = [
  {
    name: 'Sarah Anderson',
    specialty: 'Residential Design',
    rating: '4.9',
    distance: '2.3 km',
    tone: 'from-[#F1E1D0] to-[#C58F70]',
    initials: 'SA',
  },
  {
    name: 'Michael Chen',
    specialty: 'Commercial Design',
    rating: '4.8',
    distance: '3.1 km',
    tone: 'from-[#D9D9D9] to-[#8E8E8E]',
    initials: 'MC',
  },
  {
    name: 'David Miller',
    specialty: 'Interior Design',
    rating: '4.7',
    distance: '4.8 km',
    tone: 'from-[#D9E7D7] to-[#84A58B]',
    initials: 'DM',
  },
]

const projects = [
  {
    title: 'Modern Villa Design',
    author: 'Andi Prasetyo, S.ArS',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Contemporary Residence',
    author: 'Siti Nurhaliza',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
]

function ArchitectCard({ architect }) {
  return (
    <button
      type="button"
      className="w-[160px] shrink-0 rounded-[22px] border border-[#E8E3DA] bg-white px-3 py-3.5 text-left shadow-[0_6px_16px_rgba(27,47,94,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(27,47,94,0.1)]"
    >
      <div className={`mx-auto flex h-15 w-15 items-center justify-center rounded-full bg-gradient-to-br ${architect.tone} text-sm font-semibold text-white shadow-[0_6px_14px_rgba(27,47,94,0.1)]`}>
        {architect.initials}
      </div>
      <div className="mt-3 text-center">
        <p className="text-[14px] font-semibold leading-tight text-[#1A2340]">{architect.name}</p>
        <p className="mt-1 text-[12px] text-[#7B8FAB]">{architect.specialty}</p>
      </div>
      <div className="mt-2.5 flex items-center justify-center gap-1 text-[13px] text-[#1A2340]">
        <span className="text-[#FBBC05]">★</span>
        <span>{architect.rating}</span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-[#DCE7F7] px-3 py-1.5 text-[12px] text-[#4A90D9]">
        <MapPin className="h-4 w-4" />
        <span>{architect.distance}</span>
      </div>
    </button>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="relative h-[176px] overflow-hidden rounded-[28px] bg-slate-900 shadow-[0_10px_24px_rgba(27,47,94,0.12)]">
      <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,47,94,0.06)_0%,rgba(27,47,94,0.34)_55%,rgba(26,35,64,0.72)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="max-w-[220px] font-serif text-[24px] leading-tight tracking-[-0.03em]">{project.title}</p>
        <p className="mt-1.5 text-[14px] text-white/85">by {project.author}</p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2] pb-4">
      <Navbar
        title={(
          <>
            Good Morning, Budi <span className="align-middle text-[24px]">👋</span>
          </>
        )}
        trailing={(
          <button
            type="button"
            className="h-12 w-12 overflow-hidden rounded-full border border-white bg-white shadow-[0_6px_14px_rgba(27,47,94,0.08)]"
            aria-label="Profile"
          >
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
              alt="Budi"
              className="h-full w-full object-cover"
            />
          </button>
        )}
      />

      <div className="px-4">
        <Link to="/search" className="mt-4 flex h-13 items-center gap-3 rounded-full bg-white px-4 text-[#7B8FAB] shadow-[0_6px_16px_rgba(27,47,94,0.06)]">
          <SearchIcon className="h-5 w-5 text-[#7B8FAB]" />
          <span className="text-[14px]">Search architects, projects...</span>
        </Link>

        <div className="mt-5 flex items-end justify-between">
          <h2 className="text-[20px] font-semibold text-[#1A2340]">Nearest Architects</h2>
          <button type="button" className="inline-flex items-center gap-1 text-[13px] font-medium text-[#4A90D9]">
            See All <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 pr-1 [scrollbar-width:none]">
          {architects.map((architect) => (
            <ArchitectCard key={architect.name} architect={architect} />
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between">
          <h2 className="text-[20px] font-semibold text-[#1A2340]">Featured Projects</h2>
        </div>

        <div className="mt-3 space-y-3.5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home
