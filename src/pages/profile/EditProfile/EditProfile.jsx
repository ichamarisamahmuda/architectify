import { useRef, useState } from 'react'
import { ArrowLeft, Camera } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/common/Card/Card.jsx'
import Input from '../../../components/common/Input/Input.jsx'
import Button from '../../../components/common/Button/Button.jsx'
import Navbar from '../../../components/common/Navbar/Navbar.jsx'
import { useAuth } from '../../../hooks/useAuth.js'
import { updateAuthEmail } from '../../../services/authService.js'
import { uploadToCloudinary } from '../../../services/cloudinaryService.js'
import { updateArchitectDocument } from '../../../services/architectService.js'
import { updateUserDocument } from '../../../services/userService.js'

function EditProfile() {
  const navigate = useNavigate()
  const { user, architectProfile, refreshSession } = useAuth()
  return (
    <EditProfileForm
      key={user?.uid ?? 'guest'}
      user={user}
      architectProfile={architectProfile}
      navigate={navigate}
      refreshSession={refreshSession}
    />
  )
}

function createInitialFormData(user, architectProfile) {
  return {
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    location: user?.location ?? architectProfile?.location ?? '',
    phoneNumber: user?.phoneNumber ?? '',
  }
}

function EditProfileForm({ user, architectProfile, navigate, refreshSession }) {
  const [formData, setFormData] = useState(() => createInitialFormData(user, architectProfile))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const fileInputRef = useRef(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(user?.profilePhoto || architectProfile?.profilePhoto || '')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleChooseProfilePhoto = () => {
    fileInputRef.current?.click()
  }

  const handleProfileFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfilePhotoPreview(URL.createObjectURL(file))
    setFormData((current) => ({ ...current, _profileFile: file }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    setLoading(true)

    try {
      // Upload profile photo if provided (skip if Cloudinary not configured)
      let profilePhotoUrl = user?.profilePhoto || architectProfile?.profilePhoto || ''
      if (formData._profileFile) {
        try {
          const res = await uploadToCloudinary(formData._profileFile, { resourceType: 'image' })
          profilePhotoUrl = res.secureUrl
        } catch (uploadErr) {
          // If Cloudinary not configured, do not block saving other fields
          if (uploadErr?.message && uploadErr.message.toLowerCase().includes('cloudinary')) {
            setNotice('Cloudinary belum dikonfigurasi. File tidak diupload; data lain disimpan.')
          } else {
            throw uploadErr
          }
        }
      }

      await updateAuthEmail(formData.email)

      await updateUserDocument(user.uid, {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        profilePhoto: profilePhotoUrl,
        location: formData.location,
        profileCompleted: true,
      })

      if (user.role === 'Architect') {
        await updateArchitectDocument(user.uid, {
          uid: user.uid,
          fullName: formData.fullName,
          email: formData.email,
          profilePhoto: profilePhotoUrl,
          location: formData.location,
        })
      }

      // refresh context session so Profile reflects latest Firestore data
      try {
        if (typeof refreshSession === 'function') {
          await refreshSession()
        }
      } catch (e) {
        // ignore refresh errors, still navigate
        console.warn('refreshSession failed', e)
      }

      setNotice('Profile berhasil disimpan')
      navigate('/profile')
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Gagal menyimpan profil')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2] pb-4">
      <div className="relative">
        <div className="rounded-t-[28px] bg-gradient-to-b from-[#18325b] to-[#1f4b86] px-4 pb-8 pt-5 z-10">
          <Navbar
            leading={(
              <Link to="/profile" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10">
                <ArrowLeft className="h-6 w-6" />
              </Link>
            )}
            title={<span className="text-white">Edit Profile</span>}
          />
        </div>
      </div>

      <div className="-mt-5 px-4">
        <Card className="relative z-20 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#111827] shadow-[0_8px_20px_rgba(27,47,94,0.14)] overflow-hidden">
                {profilePhotoPreview ? (
                  <img src={profilePhotoPreview} alt="avatar" className="h-24 w-24 object-cover" />
                ) : (
                  <Camera className="h-8 w-8 text-white" />
                )}
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={handleChooseProfilePhoto} className="text-sm font-semibold text-[#1B78D6]">
                  Upload Foto
                </button>
              </div>
              <input ref={fileInputRef} onChange={handleProfileFile} type="file" accept="image/*" className="hidden" />
            </div>

            <Input
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            {error ? (
              <div className="rounded-2xl border border-[#F3C4C4] bg-[#FFF4F4] px-4 py-3 text-sm font-medium text-[#C43D3D]">
                {error}
              </div>
            ) : null}

            {notice ? (
              <div className="rounded-2xl border border-[#CFE6D5] bg-[#EFFAF1] px-4 py-3 text-sm font-medium text-[#2D7A49]">
                {notice}
              </div>
            ) : null}

            <Button type="submit" className="h-14 w-full rounded-[20px] text-base">
              Save Changes
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default EditProfile
