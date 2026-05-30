import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Sign In', to: '/login' },
  { label: 'Register', to: '/register' },
]

function AuthTabs() {
  return (
    <div className="rounded-full border border-[#E7E1D8] bg-[#F7F4EE] p-1 shadow-[0_6px_16px_rgba(27,47,94,0.06)]">
      <div className="grid grid-cols-2 gap-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              [
                'rounded-full px-4 py-3 text-center text-sm font-semibold transition duration-300',
                isActive
                  ? 'bg-[#1B2F5E] !text-white shadow-[0_8px_18px_rgba(27,47,94,0.16)]'
                  : 'text-[#7B8FAB] hover:text-[#1B2F5E]',
              ].join(' ')
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AuthTabs
