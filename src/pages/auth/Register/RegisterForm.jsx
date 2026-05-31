import { useState } from 'react'
import { Building2, Home, DraftingCompass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button/Button.jsx'
import Input from '../../../components/common/Input/Input.jsx'
import PasswordInput from '../../../components/auth/PasswordInput/PasswordInput.jsx'
import AuthTabs from '../../../components/auth/AuthTabs/AuthTabs.jsx'
import { useAuth } from '../../../hooks/useAuth.js'

const roles = [
  {
    key: 'Client',
    label: 'Client',
    icon: Home,
  },
  {
    key: 'Architect',
    label: 'Architect',
    icon: DraftingCompass,
  },
]

function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    role: 'Client',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lengkapi seluruh field yang wajib diisi.')
      return
    }

    if (!formData.agree) {
      setError('Silakan setujui Terms & Conditions dan Privacy Policy.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan confirm password tidak sama.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phoneNumber: formData.phone,
      })

      navigate('/login', {
        replace: true,
        state: { message: 'Akun berhasil dibuat' },
      })
    } catch (registerError) {
      setError(registerError?.message || 'Gagal membuat akun. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
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
        <p className="mt-3 text-[17px] text-[#7B8FAB]">Create your account</p>
      </div>

      <AuthTabs />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="mb-3 text-sm font-semibold text-[#1B2F5E]">I am a</p>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => {
              const Icon = role.icon
              const isActive = formData.role === role.key

              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setFormData((current) => ({ ...current, role: role.key }))}
                  className={[
                    'flex min-h-[94px] flex-col items-center justify-center gap-3 rounded-[18px] border px-4 py-4 text-center transition duration-300',
                    isActive
                      ? 'border-[#1B2F5E] bg-[#F5F8FF] text-[#1B2F5E] shadow-[0_6px_16px_rgba(27,47,94,0.1)]'
                      : 'border-[#E8E3DA] bg-white text-[#7B8FAB] shadow-[0_4px_12px_rgba(27,47,94,0.05)]',
                  ].join(' ')}
                >
                  <span className={[
                    'flex h-12 w-12 items-center justify-center text-3xl transition duration-300',
                    isActive ? 'text-[#1B2F5E]' : 'text-[#9FB0C5]',
                  ].join(' ')}>
                    <Icon className="h-9 w-9" />
                  </span>
                  <span className={['text-sm font-semibold', isActive ? 'text-[#1B2F5E]' : 'text-[#7B8FAB]'].join(' ')}>
                    {role.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <Input
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+62 812 3456 7890"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="••••••••"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label className="flex items-start gap-3 pt-1 text-sm text-[#7B8FAB]">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-0.5 h-5 w-5 rounded-[6px] border-[#C9D3E1] text-[#1B2F5E] focus:ring-[#1B2F5E]"
          />
          <span className="leading-6">
            I agree to the{' '}
            <a href="#" className="font-semibold text-[#1B2F5E] underline decoration-[#1B2F5E]/30 underline-offset-4">
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="font-semibold text-[#1B2F5E] underline decoration-[#1B2F5E]/30 underline-offset-4">
              Privacy Policy
            </a>
          </span>
        </label>

        {error ? (
          <div className="rounded-2xl border border-[#F3C4C4] bg-[#FFF4F4] px-4 py-3 text-sm font-medium text-[#C43D3D]">
            {error}
          </div>
        ) : null}

        <Button type="submit" className="h-14 w-full rounded-[20px] text-base">
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
