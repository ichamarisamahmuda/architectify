import { useState } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/common/Card/Card.jsx'
import Input from '../../../components/common/Input/Input.jsx'
import Button from '../../../components/common/Button/Button.jsx'
import Navbar from '../../../components/common/Navbar/Navbar.jsx'
import { useAuth } from '../../../hooks/useAuth.js'
import { updateArchitectDocument } from '../../../services/architectService.js'

function ArrayEditor({ label, values, placeholder, onChange, allowFreeTextEdit = false }) {
  const [draft, setDraft] = useState('')
  const [editingIndex, setEditingIndex] = useState(-1)

  const addItem = () => {
    const nextValue = draft.trim()
    if (!nextValue) {
      return
    }

    if (editingIndex >= 0) {
      const nextValues = [...values]
      nextValues[editingIndex] = nextValue
      onChange(nextValues)
      setEditingIndex(-1)
    } else {
      onChange([...values, nextValue])
    }

    setDraft('')
  }

  const startEdit = (index) => {
    setEditingIndex(index)
    setDraft(values[index])
  }

  const removeItem = (index) => {
    const nextValues = values.filter((_, currentIndex) => currentIndex !== index)
    onChange(nextValues)
    if (editingIndex === index) {
      setEditingIndex(-1)
      setDraft('')
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[#1B2F5E]">{label}</p>
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-[16px] border border-[#E8E3DA] bg-white px-4 text-[14px] text-[#1B2F5E] outline-none placeholder:text-[#A5B1C1]"
        />
        <button
          type="button"
          onClick={addItem}
          className="shrink-0 rounded-[16px] bg-[#1B2F5E] px-4 text-[13px] font-semibold text-white"
        >
          {editingIndex >= 0 ? 'Save' : 'Add'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[12px] font-medium text-[#4A6C9A]"
          >
            <button
              type="button"
              onClick={allowFreeTextEdit ? () => startEdit(index) : undefined}
              className="text-left"
            >
              <span>{item}</span>
            </button>
            <span className="inline-flex gap-1">
              {allowFreeTextEdit ? (
                <button type="button" onClick={() => startEdit(index)} className="text-[11px]">
                  Edit
                </button>
              ) : null}
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation()
                  removeItem(index)
                }}
                onKeyDown={(event) => {
                  event.stopPropagation()
                  if (event.key === 'Enter' || event.key === ' ') {
                    removeItem(index)
                  }
                }}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#4A6C9A]"
              >
                <X className="h-3 w-3" />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function createInitialFormData(architectProfile) {
  return {
    description: architectProfile?.description ?? '',
    consultationPrice: architectProfile?.consultationPrice ?? '',
    specialization: Array.isArray(architectProfile?.specialization) ? architectProfile.specialization : [],
    skills: Array.isArray(architectProfile?.skills) ? architectProfile.skills : [],
    experienceYears: architectProfile?.experienceYears ?? 0,
    totalProjectsHandled: architectProfile?.totalProjectsHandled ?? 0,
  }
}

function ArchitectProfessionalProfile() {
  const navigate = useNavigate()
  const { user, architectProfile, refreshSession } = useAuth()
  const [formData, setFormData] = useState(() => createInitialFormData(architectProfile))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const profileName = user?.fullName || architectProfile?.fullName || 'Architect'
  const profilePhoto = user?.profilePhoto || architectProfile?.profilePhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'

  const isArchitect = user?.role === 'Architect'
  const canEdit = Boolean(isArchitect)

  const handleSave = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    setLoading(true)

    try {
      if (!canEdit) {
        throw new Error('Hanya architect yang dapat mengedit profile profesional.')
      }

      const payload = {
        uid: user.uid,
        fullName: user.fullName,
        email: user.email,
        profilePhoto,
        location: user.location || architectProfile?.location || '',
        description: formData.description,
        consultationPrice: Number(formData.consultationPrice) || 0,
        specialization: formData.specialization,
        skills: formData.skills,
        experienceYears: Number(formData.experienceYears) || 0,
        totalProjectsHandled: Number(formData.totalProjectsHandled) || 0,
      }

      await updateArchitectDocument(user.uid, payload)

      if (typeof refreshSession === 'function') {
        await refreshSession()
      }

      setNotice('Professional profile berhasil disimpan')
      navigate('/profile')
    } catch (saveError) {
      console.error(saveError)
      setError(saveError?.message || 'Gagal menyimpan professional profile')
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
                <ArrowLeft className="h-6 w-6 text-white" />
              </Link>
            )}
            title={<span className="text-white">Architect Profile</span>}
          />
        </div>
      </div>

      <div className="-mt-5 px-4">
        <Card className="relative z-20 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-white shadow-md">
              <img src={profilePhoto} alt={profileName} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-[#1A2340]">{profileName}</p>
              <p className="text-[12px] text-[#8A96AA]">Professional profile management</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <Input
              label="Description"
              name="description"
              type="text"
              value={formData.description}
              onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
            />

            <Input
              label="Consultation Price"
              name="consultationPrice"
              type="number"
              value={formData.consultationPrice}
              onChange={(event) => setFormData((current) => ({ ...current, consultationPrice: event.target.value }))}
            />

            <ArrayEditor
              label="Specialization"
              values={formData.specialization}
              placeholder="Add specialization"
              onChange={(values) => setFormData((current) => ({ ...current, specialization: values }))}
              allowFreeTextEdit
            />

            <ArrayEditor
              label="Skills"
              values={formData.skills}
              placeholder="Add skill"
              onChange={(values) => setFormData((current) => ({ ...current, skills: values }))}
              allowFreeTextEdit
            />

            <Input
              label="Experience Years"
              name="experienceYears"
              type="number"
              value={formData.experienceYears}
              onChange={(event) => setFormData((current) => ({ ...current, experienceYears: event.target.value }))}
            />

            <Input
              label="Total Projects Handled"
              name="totalProjectsHandled"
              type="number"
              value={formData.totalProjectsHandled}
              onChange={(event) => setFormData((current) => ({ ...current, totalProjectsHandled: event.target.value }))}
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

            <Button type="submit" className="h-14 w-full rounded-[20px] text-base" disabled={!canEdit || loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default ArchitectProfessionalProfile
