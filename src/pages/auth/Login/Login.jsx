import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm.jsx'

function Login() {
  const location = useLocation()

  return <LoginForm successMessage={location.state?.message ?? ''} />
}

export default Login
