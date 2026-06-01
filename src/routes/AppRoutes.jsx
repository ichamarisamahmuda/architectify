import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import RoleProtectedRoute from './RoleProtectedRoute.jsx'
import Login from '../pages/auth/Login/Login.jsx'
import Register from '../pages/auth/Register/Register.jsx'
import Home from '../pages/home/Home.jsx'
import Search from '../pages/search/Search.jsx'
import ArchitectProfile from '../pages/search/ArchitectProfile.jsx'
import BookingConsultation from '../pages/bookings/BookingConsultation.jsx'
import OrderForm from '../pages/bookings/OrderForm.jsx'
import PaymentConfirmation from '../pages/bookings/PaymentConfirmation.jsx'
import PaymentSuccess from '../pages/bookings/PaymentSuccess.jsx'
import BookingHistory from '../pages/bookings/BookingHistory.jsx'
import ChatHistory from '../pages/chat/ChatHistory.jsx'
import Chat from '../pages/chat/Chat.jsx'
import Profile from '../pages/profile/Profile.jsx'
import EditProfile from '../pages/profile/EditProfile/EditProfile.jsx'
import ArchitectProfessionalProfile from '../pages/architect/Profile/ArchitectProfessionalProfile.jsx'
import ArchitectPortfolio from '../pages/architect/Portfolio/ArchitectPortfolio.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/architect/:id" element={<ArchitectProfile />} />
          <Route path="/search/architect/:slug" element={<ArchitectProfile />} />
          <Route path="/bookings/consultation/:slug" element={<BookingConsultation />} />
          <Route path="/bookings/order-form/:slug" element={<OrderForm />} />
          <Route path="/bookings/payment/:slug" element={<PaymentConfirmation />} />
          <Route path="/bookings/success/:slug" element={<PaymentSuccess />} />
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/chat" element={<ChatHistory />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route element={<RoleProtectedRoute allowedRoles={['Architect']} redirectTo="/home" />}>
            <Route path="/architect/profile" element={<ArchitectProfessionalProfile />} />
            <Route path="/architect/portfolio" element={<ArchitectPortfolio />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
