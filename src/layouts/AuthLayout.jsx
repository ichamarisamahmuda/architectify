import { ArrowLeft } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

function AuthLayout() {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
      return
    }

    navigate('/home')
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(27,47,94,0.1),_transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(249,246,242,0.92))]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-[#4A90D9]/10 blur-3xl" />

      <div className="relative mx-auto flex h-[calc(100svh-2rem)] w-full max-w-[430px] flex-col overflow-hidden rounded-[32px] border border-white/70 bg-[#F9F6F2] shadow-[0_18px_44px_rgba(27,47,94,0.08)]">
        <header className="flex items-center justify-between px-5 pt-5">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E3DA] bg-white text-[#1B2F5E] shadow-[0_5px_14px_rgba(27,47,94,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(27,47,94,0.1)] active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-11 w-11" />
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-3 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
