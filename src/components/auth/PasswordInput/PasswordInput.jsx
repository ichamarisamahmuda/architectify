import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import Input from '../../common/Input/Input.jsx'

function PasswordInput(props) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      rightSlot={
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="text-[#7B8FAB] transition hover:text-[#1B2F5E]"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      }
    />
  )
}

export default PasswordInput
