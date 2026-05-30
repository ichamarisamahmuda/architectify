import { CalendarDays, Home, MessageCircle, Search, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Search', to: '/search', icon: Search },
  { label: 'Bookings', to: '/bookings', icon: CalendarDays },
  { label: 'Chat', to: '/chat', icon: MessageCircle },
  { label: 'Profile', to: '/profile', icon: UserRound },
]

function BottomNavigation({ activePath = '/home' }) {
  return (
    <nav className="rounded-[28px] border border-[#EAE2D8] bg-white/96 px-3.5 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_10px_24px_rgba(27,47,94,0.1)] backdrop-blur-xl">
      <div className="grid grid-cols-5 gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = item.to ? activePath === item.to : false

          if (item.to) {
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex h-[72px] flex-col items-center justify-center gap-1 rounded-[18px] px-1.5 text-[11px] font-medium transition duration-300',
                    isActive ? 'text-[#1B2F5E]' : 'text-[#8A96AA] hover:text-[#1B2F5E]',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={[
                        'flex h-10 w-10 items-center justify-center rounded-full transition duration-300',
                        isActive ? 'text-[#1B2F5E]' : 'text-[#8A96AA]',
                      ].join(' ')}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            )
          }

          return (
            <button
              key={item.label}
              type="button"
              className={[
                'flex h-[72px] flex-col items-center justify-center gap-1 rounded-[18px] px-1.5 text-[11px] font-medium transition duration-300',
                active ? 'text-[#1B2F5E]' : 'text-[#8A96AA] hover:text-[#1B2F5E]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full transition duration-300',
                  active ? 'text-[#1B2F5E]' : 'text-[#8A96AA]',
                ].join(' ')}
              >
                <Icon className="h-6 w-6" />
              </span>
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
