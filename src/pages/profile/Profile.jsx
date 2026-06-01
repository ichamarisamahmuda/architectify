import { useState } from 'react'
import { ArrowLeft, Mail, Phone, MapPin, Edit2, ChevronRight, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar/Navbar.jsx'
import Card from '../../components/common/Card/Card.jsx'
import { useAuth } from '../../hooks/useAuth.js'

function InfoRow({ icon: Icon, title, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#6A84A6]"><Icon className="h-5 w-5" /></div>
      <div className="min-w-0">
        <p className="text-[12px] text-[#8BA0BC]">{title}</p>
        <p className="mt-0.5 truncate text-[14px] font-medium text-[#1A2340]">{value}</p>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded-[12px] bg-white px-5 py-4 shadow-[0_5px_14px_rgba(27,47,94,0.05)]">
        <p className="text-[20px] font-semibold text-[#1B2F5E]">{value}</p>
      </div>
      <p className="text-[12px] text-[#8A96AA]">{label}</p>
    </div>
  )
}

function Profile() {
  const navigate = useNavigate()
  const { user, architectProfile, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const isArchitect = user?.role === 'Architect'

  const handleLogout = async () => {
    setLogoutError('')
    setIsLoggingOut(true)

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
      setLogoutError('Gagal logout. Coba lagi.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const displayName = user?.fullName || user?.name || '—'
  const displayEmail = user?.email || '—'
  const displayPhone = user?.phoneNumber || user?.phone || '—'
  const displayLocation = user?.location || architectProfile?.location || '—'
  const avatarSrc = (user?.profilePhoto) || (architectProfile?.profilePhoto) || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'

  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2] pb-4">
      <div className="relative">
        <div className="rounded-t-[28px] bg-gradient-to-b from-[#18325b] to-[#1f4b86] px-4 pt-5 pb-8 z-10">
          <Navbar
            leading={(
              <Link to="/home" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10">
                <ArrowLeft className="h-6 w-6 text-white" />
              </Link>
            )}
            trailing={(
              <Link to="/profile/edit" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10">
                <Edit2 className="h-5 w-5 text-white" />
              </Link>
            )}
            title={<span className="text-white">My Profile</span>}
          />
        </div>
      </div>

      <div className="px-4 -mt-5">
        <div className="space-y-3.5 pb-10">
        <Card className="relative z-20 p-6">
          <div className="flex flex-col items-center">
            <div className="-mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#111827] shadow-[0_8px_20px_rgba(27,47,94,0.14)] border-4 border-white">
              <img src={avatarSrc} alt="avatar" className="h-20 w-20 rounded-full object-cover" />
            </div>

            <h2 className="mt-4 text-[20px] font-semibold text-[#1A2340]">{displayName}</h2>
            <p className="mt-1 text-sm text-[#7B8FAB]">{user?.role ?? 'Member'}</p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[13px] text-[#1B78D6]">
              <Check className="h-4 w-4" />
              Verified Account
            </div>

            <hr className="my-4 w-full border-t border-[#E5EAF1]" />

            <div className="w-full space-y-3">
              <InfoRow icon={Mail} title="Email" value={displayEmail} />
              <InfoRow icon={Phone} title="Phone" value={displayPhone} />
              <InfoRow icon={MapPin} title="Location" value={displayLocation} />
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {isArchitect ? (
            <>
              <Card className="p-0">
                <Link to="/architect/profile" className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#F3F7FA] p-3">
                      <ChevronRight className="h-4 w-4 text-[#6A84A6] rotate-180" />
                    </div>
                    <div>
                      <p className="text-[16px] font-medium text-[#1A2340]">Professional Settings</p>
                      <p className="mt-0.5 text-[12px] text-[#8BA0BC]">Manage your professional profile</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#C9D4E6]" />
                </Link>
              </Card>

              <Card className="p-0">
                <Link to="/architect/portfolio" className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#F3F7FA] p-3">
                      <ChevronRight className="h-4 w-4 text-[#6A84A6] rotate-180" />
                    </div>
                    <div>
                      <p className="text-[16px] font-medium text-[#1A2340]">Manage Portfolio</p>
                      <p className="mt-0.5 text-[12px] text-[#8BA0BC]">Update your professional portfolio</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#C9D4E6]" />
                </Link>
              </Card>
            </>
          ) : null}
         
          <div>
            {logoutError ? (
              <p className="mb-2 rounded-xl border border-[#F3C4C4] bg-[#FFF4F4] px-3 py-2 text-sm font-medium text-[#C43D3D]">
                {logoutError}
              </p>
            ) : null}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full rounded-full border border-[#EA556A] bg-white px-4 py-3 text-[15px] font-semibold text-[#D23046] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
