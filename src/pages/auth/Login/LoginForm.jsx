import { useState } from 'react'
import { Building2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button/Button.jsx'
import Input from '../../../components/common/Input/Input.jsx'
import PasswordInput from '../../../components/auth/PasswordInput/PasswordInput.jsx'
import SocialLogin from '../../../components/auth/SocialLogin/SocialLogin.jsx'
import AuthTabs from '../../../components/auth/AuthTabs/AuthTabs.jsx'

function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <div className="space-y-5 pt-2">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center text-[#1B2F5E]">
          <Building2 className="h-10 w-10 stroke-[1.6]" />
        </div>
        <h1 className="mt-5 font-serif text-[32px] font-medium leading-tight tracking-[-0.03em] text-[#1A2340]">
          Welcome Back
        </h1>
        <p className="mt-3 text-[17px] text-[#7B8FAB]">Sign in to continue</p>
      </div>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1B2F5E]">Password</span>
            <Link to="/login" className="text-sm font-semibold text-[#4A90D9] transition hover:text-[#1B2F5E]">
              Forgot?
            </Link>
          </div>
          <PasswordInput
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="h-14 w-full rounded-[22px] text-base">
          Sign In
        </Button>
      </form>

      <div className="flex items-center gap-4 py-2">
        <span className="h-px flex-1 bg-[#E8E3DA]" />
        <span className="text-sm font-medium text-[#7B8FAB]">or continue with</span>
        <span className="h-px flex-1 bg-[#E8E3DA]" />
      </div>

      <SocialLogin />
    </div>
  )
}

export default LoginForm
