import { ArrowLeft, CheckCircle2, ChevronRight, MapPin, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import Card from '../../components/common/Card/Card.jsx'
import Button from '../../components/common/Button/Button.jsx'

const architectProfiles = {
  'andi-prasetyo': {
    name: 'Andi Prasetyo, S.ArS',
    role: 'Residential Architect',
    location: 'Jakarta, Indonesia',
    rating: 4.9,
    reviewCount: '128 reviews',
    heroImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    tags: ['Residential', 'Minimalist', 'Sustainable'],
    about: 'Experienced architect specializing in residential minimalist and sustainable design. Passionate about creating functional spaces that blend modern aesthetics with eco-friendly principles. Committed to delivering exceptional results that exceed client expectations.',
    stats: [
      { value: '8 Years', label: 'Experience' },
      { value: '45+', label: 'Projects' },
      { value: 'Jakarta', label: 'Location' },
    ],
    skills: ['AutoCAD', 'SketchUp', '3D Render', 'Site Supervision', 'Project Management', 'Sustainable Design'],
    reviews: [
      {
        name: 'Budi Santoso',
        time: '2 weeks ago',
        text: 'Excellent work! Very professional and detail-oriented. Highly recommended for residential projects.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
      {
        name: 'Sari Wijaya',
        time: '1 month ago',
        text: 'Amazing architect! I listened to all my ideas and turned them into reality. The minimalist design is perfect!',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
    ],
    portfolio: [
      {
        title: 'Serenity Villa',
        year: '2025',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Minimalist Home',
        year: '2024',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Urban Sanctuary',
        year: '2024',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Green Haven',
        year: '2023',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
}

function Stat({ value, label }) {
  return (
    <div className="rounded-[18px] border border-white/70 bg-white px-4 py-5 text-center shadow-[0_8px_18px_rgba(27,47,94,0.05)]">
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

function ReviewCard({ review }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
          <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-semibold text-[#1A2340]">{review.name}</p>
              <p className="mt-0.5 text-[12px] text-[#8A96AA]">{review.time}</p>
            </div>
            <div className="inline-flex items-center gap-1 text-[12px] font-medium text-[#FBBC05]">
              <Star className="h-4 w-4 fill-[#FBBC05]" />
              {review.rating}.0
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-6 text-[#6B7F9B]">{review.text}</p>
        </div>
      </div>
    </Card>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="relative h-[180px] overflow-hidden rounded-[20px] bg-slate-800 shadow-lg">
      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
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
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('detail')
  const profile = architectProfiles[slug] ?? architectProfiles['andi-prasetyo']

  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2]">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-80 overflow-hidden rounded-b-[30px] bg-[#D7E3F2]">
          <img src={profile.heroImage} alt={profile.name} className="h-full w-full object-cover" />
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
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Profile Card */}
          <Card className="p-4">
            <h1 className="font-serif text-[26px] leading-tight text-[#1A2340]">{profile.name}</h1>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[12px] font-medium text-[#4A6C9A]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating Row */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-[#1A2340]">{profile.rating}</span>
                <div className="inline-flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
                <span className="text-[13px] text-[#7B8FAB]">({profile.reviewCount})</span>
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
        {activeTab === 'detail' ? (
          <>
            {/* About */}
            <section>
              <h2 className="mb-3 text-[16px] font-semibold text-[#1A2340]">About</h2>
              <p className="text-[14px] leading-7 text-[#7B8FAB]">{profile.about}</p>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-3 gap-3">
              {profile.stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </section>

            {/* Availability Badge */}
            <section>
              <Card className="flex items-center gap-3 border-[#CFE0CC] bg-[#F3FAF1] px-4 py-3 shadow-none">
                <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#7CBF8A]" />
                <p className="text-[13px] font-medium text-[#78A36D]">Available This Week</p>
              </Card>
            </section>

            {/* Skills */}
            <section>
              <h2 className="mb-3 text-[16px] font-semibold text-[#1A2340]">Skills & Expertise</h2>
              <Card className="p-4">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
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
              <div className="space-y-3">
                {profile.reviews.map((review) => (
                  <ReviewCard key={review.name} review={review} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Portfolio Grid */}
            <section>
              <div className="grid grid-cols-2 gap-4">
                {profile.portfolio.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed inset-x-0 bottom-6 z-30 px-4">
        <div className="mx-auto max-w-[390px]">
          <Link to={`/bookings/consultation/${slug}`}>
            <Button className="w-full rounded-[20px] py-4 text-[15px]">Book Consultation</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArchitectProfile
