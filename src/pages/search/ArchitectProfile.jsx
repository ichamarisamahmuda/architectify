import { ArrowLeft, Briefcase, CalendarDays, CheckCircle2, ChevronRight, MapPin, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Card from '../../components/common/Card/Card.jsx'
import Button from '../../components/common/Button/Button.jsx'
import { getArchitectById } from '../../services/architectService.js'
import { subscribeArchitectPortfolios } from '../../services/portfolioService.js'

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-[18px] border border-white/70 bg-white px-4 py-5 text-center shadow-[0_8px_18px_rgba(27,47,94,0.05)]">
      <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F7FA] text-[#1B2F5E]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[17px] font-semibold text-[#1A2340]">{value}</p>
      <p className="mt-1 text-[12px] text-[#8A96AA]">{label}</p>
    </div>
  )
}

function SkillChip({ children }) {
  return (
    <span className="inline-flex rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[12px] font-medium text-[#4A6C9A]">
      {children}
    </span>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="relative h-[180px] overflow-hidden rounded-[20px] bg-slate-800 shadow-lg">
      {project.image ? (
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-[#D7E3F2]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div />
        <div>
          <p className="text-[16px] font-semibold text-white leading-tight">{project.title}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[13px] text-white/90">{project.year}</span>
            <span className="inline-flex rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
              {project.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArchitectProfile() {
  const params = useParams()
  const architectId = params.id || params.slug
  const [activeTab, setActiveTab] = useState('detail')
  const [profile, setProfile] = useState(null)
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError('')
    setProfile(null)
    setPortfolios([])
    setActiveTab('detail')

    const loadArchitect = async () => {
      try {
        const architect = await getArchitectById(architectId)

        if (!cancelled) {
          if (!architect) {
            setError('Data architect tidak ditemukan.')
            setProfile(null)
          } else {
            setProfile(architect)
          }
        }
      } catch (loadError) {
        console.error(loadError)
        if (!cancelled) {
          setError('Gagal mengambil data architect.')
          setProfile(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadArchitect()

    const unsubscribePortfolio = subscribeArchitectPortfolios(
      architectId,
      (items) => {
        if (!cancelled) {
          setPortfolios(items)
        }
      },
      (portfolioError) => {
        console.error(portfolioError)
        if (!cancelled) {
          setPortfolios([])
        }
      }
    )

    return () => {
      cancelled = true
      unsubscribePortfolio()
    }
  }, [architectId])

  const specialization = Array.isArray(profile?.specialization) ? profile.specialization : []
  const skills = Array.isArray(profile?.skills) ? profile.skills : []
  const portfolio = portfolios.map((item) => ({
    title: item?.projectName || 'Project',
    year: item?.projectYear || '-',
    category: item?.projectType || 'Portfolio',
    image: item?.projectImages?.[0] ?? null,
  }))

  const profileName = profile?.fullName || ''
  const profileLocation = profile?.location || ''
  const profileAvatar = profile?.profilePhoto || ''
  const profileTags = specialization
  const profileAbout = profile?.description || ''
  const consultationPrice = Number.isFinite(Number(profile?.consultationPrice))
    ? `Rp${Number(profile.consultationPrice).toLocaleString('id-ID')} / Consultation`
    : ''
  const experienceYears = Number.isFinite(Number(profile?.experienceYears)) ? Number(profile.experienceYears) : 0
  const totalProjectsHandled = Number.isFinite(Number(profile?.totalProjectsHandled)) ? Number(profile.totalProjectsHandled) : 0
  const profileStats = [
    { icon: CalendarDays, value: `${experienceYears} Years`, label: 'Experience' },
    { icon: Briefcase, value: `${totalProjectsHandled} Projects`, label: 'Project Handled' },
    { icon: MapPin, value: profileLocation, label: 'Location' },
  ]

  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2]">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-80 overflow-hidden rounded-b-[30px] bg-[#D7E3F2]">
          {profileAvatar ? (
            <img src={profileAvatar} alt={profileName} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[#D7E3F2]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

          <Link
            to="/search"
            className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#1A2340] shadow-lg transition hover:bg-white"
            aria-label="Back to search"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>

        {/* Avatar Overlap */}
        <div className="px-4">
          <div className="relative -mt-20 mb-4">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
              {profileAvatar ? (
                <img src={profileAvatar} alt={profileName} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-[#EAF3FF]" />
              )}
            </div>
          </div>

          {/* Profile Card */}
          <Card className="p-4">
            <h1 className="text-[26px] leading-tight font-semibold text-[#1A2340]">{profileName}</h1>

            {/* Tags */}
            {profileTags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {profileTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[12px] font-medium text-[#4A6C9A]">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Rating Row */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-[#1A2340]">4.8</span>
                <div className="inline-flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
                <span className="text-[13px] text-[#7B8FAB]">(0 reviews)</span>
              </div>

              <div className="inline-flex items-center gap-2 text-[13px] text-[#4A90D9]">
                <CheckCircle2 className="h-4 w-4" />
                Verified
              </div>
            </div>

            {/* Tab Pills */}
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-white p-1">
              <button 
                onClick={() => setActiveTab('detail')}
                className={`rounded-full py-2 px-4 text-[14px] font-semibold transition ${
                  activeTab === 'detail' 
                    ? 'bg-[#1B2F5E] text-white' 
                    : 'bg-transparent text-[#7B8FAB] hover:text-[#1B2F5E]'
                }`}
              >
                Detail Profile
              </button>
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`rounded-full py-2 px-4 text-[14px] font-semibold transition ${
                  activeTab === 'portfolio' 
                    ? 'bg-[#1B2F5E] text-white' 
                    : 'bg-transparent text-[#7B8FAB] hover:text-[#1B2F5E]'
                }`}
              >
                Portfolio
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6 pb-24 space-y-4">
        {loading ? (
          <p className="text-[13px] text-[#7B8FAB]">Loading architect profile...</p>
        ) : null}

        {!loading && error ? (
          <p className="text-[13px] text-[#C43D3D]">{error}</p>
        ) : null}

        {!loading && !error && profile ? (
          <>
        {activeTab === 'detail' ? (
          <>
            {/* About */}
            <section>
              <h2 className="mb-3 text-[16px] font-semibold text-[#1A2340]">About</h2>
              <p className="text-[14px] leading-7 text-[#7B8FAB]">{profileAbout}</p>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-3 gap-3">
              {profileStats.map((stat) => (
                <Stat key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
              ))}
            </section>

            {/* Availability Badge */}
            <section>
              <Card className="flex items-center gap-3 border-[#CFE0CC] bg-[#F3FAF1] px-4 py-3 shadow-none">
                <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#7CBF8A]" />
                <p className="text-[13px] font-medium text-[#78A36D]">Available This Week</p>
              </Card>
            </section>
            <section>
              <h2 className="mb-3 text-[16px] font-semibold text-[#1A2340]">Skills & Expertise</h2>
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillChip key={skill}>{skill}</SkillChip>
                  ))}
                </div>
              </Card>
            </section>

            {/* Reviews */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-[#1A2340]">Reviews</h2>
                <button className="inline-flex items-center gap-1 text-[13px] font-medium text-[#4A90D9]">
                  See All <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[13px] text-[#7B8FAB]">Belum ada review.</p>
            </section>
          </>
        ) : (
          <>
            {/* Portfolio Grid */}
            <section>
              {portfolio.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {portfolio.map((project) => (
                    <ProjectCard key={`${project.title}-${project.image}`} project={project} />
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-[#7B8FAB]">Belum ada portfolio.</p>
              )}
            </section>
          </>
        )}
          </>
        ) : null}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed inset-x-0 bottom-6 z-30 px-4">
        <div className="mx-auto max-w-[390px]">
          <Link to={`/bookings/consultation/${architectId}`}>
            <Button className="w-full rounded-[20px] py-4 text-[15px]">Book Consultation</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArchitectProfile
