import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from '../components/home/BottomNavigation/BottomNavigation.jsx'
import ChatComposerNav from '../components/chat/ChatComposerNav/ChatComposerNav.jsx'

function MainLayout() {
  const location = useLocation()
  const isChatRoom = location.pathname.startsWith('/chat/') && location.pathname !== '/chat'
  const isArchitectDetail = location.pathname.startsWith('/search/architect/')
  const isBookingConsultation = location.pathname.startsWith('/bookings/consultation/')
  const isOrderForm = location.pathname.startsWith('/bookings/order-form/')
  const isPaymentConfirmation = location.pathname.startsWith('/bookings/payment/')
  const isPaymentSuccess = location.pathname.startsWith('/bookings/success/')
  const showBottomNavigation = location.pathname !== '/' && !isChatRoom && !isArchitectDetail && !isBookingConsultation && !isOrderForm && !isPaymentConfirmation && !isPaymentSuccess
  const allowBottomOverlap = location.pathname === '/bookings' || location.pathname === '/chat' || location.pathname === '/search' || isChatRoom
  const mainClassName = showBottomNavigation
    ? `min-h-0 flex-1 overflow-y-auto overscroll-contain ${allowBottomOverlap ? 'pb-0' : 'pb-36'}`
    : 'min-h-0 flex-1 overflow-y-auto overscroll-contain pb-30'

  return (
    <div className="relative h-full overflow-hidden px-3 py-3 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(27,47,94,0.08),_transparent_30%),linear-gradient(180deg,rgba(252,250,248,0.94),rgba(249,246,242,1))]" />
      <div className="pointer-events-none absolute right-0 top-24 h-40 w-40 rounded-full bg-[#4A90D9]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-0 h-52 w-52 rounded-full bg-[#1B2F5E]/6 blur-3xl" />

      <div className="relative mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden rounded-[32px] border border-white/70 bg-[#F9F6F2] shadow-[0_18px_44px_rgba(27,47,94,0.08)]">
        <main className={mainClassName}>
          <Outlet />
        </main>
        {showBottomNavigation ? (
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-[390px] -translate-x-1/2">
            <div className="pointer-events-auto">
              <BottomNavigation activePath={location.pathname} />
            </div>
          </div>
        ) : null}

        {isChatRoom ? <ChatComposerNav /> : null}
      </div>
    </div>
  )
}

export default MainLayout
