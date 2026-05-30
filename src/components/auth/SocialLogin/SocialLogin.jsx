import Button from '../../common/Button/Button.jsx'

function GoogleMark() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-bold leading-none shadow-[0_3px_8px_rgba(27,47,94,0.08)]">
      <span className="bg-[linear-gradient(90deg,#4285F4_0%,#34A853_40%,#FBBC05_72%,#EA4335_100%)] bg-clip-text text-transparent">
        G
      </span>
    </span>
  )
}

function FacebookMark() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-[14px] font-bold text-white shadow-[0_3px_8px_rgba(24,119,242,0.16)]">
      f
    </span>
  )
}

function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="social" className="justify-center px-3">
        <GoogleMark />
        Google
      </Button>
      <Button variant="social" className="justify-center px-3">
        <FacebookMark />
        Facebook
      </Button>
    </div>
  )
}

export default SocialLogin
