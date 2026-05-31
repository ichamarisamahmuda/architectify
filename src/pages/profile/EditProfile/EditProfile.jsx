import { useRef, useState } from 'react'
import { ArrowLeft, Camera } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/common/Card/Card.jsx'
import Input from '../../../components/common/Input/Input.jsx'
import Button from '../../../components/common/Button/Button.jsx'
import Navbar from '../../../components/common/Navbar/Navbar.jsx'
import { useAuth } from '../../../hooks/useAuth.js'
import { uploadToCloudinary } from '../../../services/cloudinaryService.js'
import { updateUserDocument } from '../../../services/userService.js'
import { updateArchitectDocument } from '../../../services/architectService.js'

function EditProfile() {
  const navigate = useNavigate()
  const { user, refreshSession } = useAuth()
  return <EditProfileForm key={user?.uid ?? 'guest'} user={user} navigate={navigate} refreshSession={refreshSession} />
}

function createInitialFormData(user) {
  return {
    fullName: user?.fullName ?? '',
    location: user?.location ?? user?.architectProfile?.location ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    aboutMe: user?.description ?? user?.architectProfile?.description ?? '',
    consultationPrice: user?.architectProfile?.consultationPrice ?? '',
    specialization: Array.isArray(user?.architectProfile?.specialization)
      ? user.architectProfile.specialization.join(', ')
      : '',
  }
}

function EditProfileForm({ user, navigate, refreshSession }) {
  const [formData, setFormData] = useState(() => createInitialFormData(user))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const fileInputRef = useRef(null)
  const portfolioInputRef = useRef(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(user?.profilePhoto || user?.architectProfile?.profilePhoto || '')
  const [portfolioPreviews, setPortfolioPreviews] = useState(Array.isArray(user?.architectProfile?.portfolio) ? user.architectProfile.portfolio : (Array.isArray(user?.portfolio) ? user.portfolio : []))

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

  const handleChoosePortfolio = () => {
    portfolioInputRef.current?.click()
  }

  const handlePortfolioFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const previews = files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }))
    setPortfolioPreviews((current) => [...current, ...previews])
    setFormData((current) => ({ ...current, _portfolioFiles: [...(current._portfolioFiles || []), ...files] }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    setLoading(true)

    try {
      // Upload profile photo if provided (skip if Cloudinary not configured)
      let profilePhotoUrl = user?.profilePhoto || user?.architectProfile?.profilePhoto || ''
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

      if (user.role === 'Architect') {
        // Upload portfolio files if any
        const existingPortfolio = Array.isArray(user.architectProfile?.portfolio) ? user.architectProfile.portfolio : []
        const newPortfolio = []
        if (formData._portfolioFiles && formData._portfolioFiles.length > 0) {
          try {
            const uploads = await Promise.all(
              formData._portfolioFiles.map((file) => uploadToCloudinary(file, { resourceType: 'auto' }))
            )
            uploads.forEach((u) => newPortfolio.push(u.secureUrl))
          } catch (uploadErr) {
            if (uploadErr?.message && uploadErr.message.toLowerCase().includes('cloudinary')) {
              setNotice((prev) => prev ? prev + ' Portfolio tidak diupload.' : 'Cloudinary belum dikonfigurasi. Portfolio tidak diupload.')
            } else {
              throw uploadErr
            }
          }
        }

        const specializationArr = formData.specialization ? formData.specialization.split(',').map((s) => s.trim()).filter(Boolean) : []

        await updateArchitectDocument(user.uid, {
          fullName: formData.fullName,
          email: user.email,
          profilePhoto: profilePhotoUrl,
          location: formData.location,
          consultationPrice: formData.consultationPrice,
          specialization: specializationArr,
          portfolio: [...existingPortfolio, ...newPortfolio],
          description: formData.aboutMe,
        })

        // Also update basic user doc
        await updateUserDocument(user.uid, {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          profileCompleted: true,
        })
      } else {
        // Client
        await updateUserDocument(user.uid, {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          description: formData.aboutMe,
          profileCompleted: true,
        })
        // Optionally upload profile photo for client and save URL on user doc
        if (profilePhotoUrl) {
          await updateUserDocument(user.uid, { profilePhoto: profilePhotoUrl })
        }
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

  const isArchitect = user?.role === 'Architect'

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
                {user?.role === 'Architect' ? (
                  <button type="button" onClick={handleChoosePortfolio} className="text-sm font-semibold text-[#1B78D6]">
                    Upload Portfolio
                  </button>
                ) : null}
              </div>
              <input ref={fileInputRef} onChange={handleProfileFile} type="file" accept="image/*" className="hidden" />
              <input ref={portfolioInputRef} onChange={handlePortfolioFiles} type="file" accept="image/*,application/pdf" multiple className="hidden" />
            </div>

            <Input
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
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
            <Input
              label="About Me"
              name="aboutMe"
              type="text"
              value={formData.aboutMe}
              onChange={handleChange}
            />

            {isArchitect ? (
              <>
                <Input
                  label="Consultation Price"
                  name="consultationPrice"
                  type="text"
                  value={formData.consultationPrice}
                  onChange={handleChange}
                />
                <Input
                  label="Specialization"
                  name="specialization"
                  type="text"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </>
            ) : null}

            {portfolioPreviews && portfolioPreviews.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#1B2F5E]">Portfolio</p>
                <div className="grid grid-cols-3 gap-2">
                  {portfolioPreviews.map((p, idx) => (
                    <div key={idx} className="h-20 w-full overflow-hidden rounded-md bg-white">
                      <img src={p.url || p} alt={p.name || `portfolio-${idx}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

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
