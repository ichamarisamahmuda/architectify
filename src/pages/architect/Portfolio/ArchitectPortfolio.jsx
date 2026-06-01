import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Pencil, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../../components/common/Card/Card.jsx'
import Input from '../../../components/common/Input/Input.jsx'
import Button from '../../../components/common/Button/Button.jsx'
import Navbar from '../../../components/common/Navbar/Navbar.jsx'
import { useAuth } from '../../../hooks/useAuth.js'
import { uploadToCloudinary } from '../../../services/cloudinaryService.js'
import {
  createPortfolioDocument,
  deletePortfolioDocument,
  subscribeArchitectPortfolios,
  updatePortfolioDocument,
} from '../../../services/portfolioService.js'

const projectTypes = ['Residential', 'Commercial', 'Interior Design', 'Landscape', 'Hospitality', 'Office', 'Renovation', 'Public Building']

function toInitialFormData() {
  return {
    projectName: '',
    projectType: projectTypes[0],
    projectYear: new Date().getFullYear(),
    projectDescription: '',
  }
}

function ArchitectPortfolio() {
  const { user } = useAuth()
  const [portfolios, setPortfolios] = useState([])
  const [formData, setFormData] = useState(() => toInitialFormData())
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('')
  const [existingImages, setExistingImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const profilePhoto = user?.profilePhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'

  const selectedPortfolio = useMemo(
    () => portfolios.find((portfolio) => portfolio.id === selectedPortfolioId) || null,
    [portfolios, selectedPortfolioId]
  )

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = subscribeArchitectPortfolios(
      user.uid,
      (items) => {
        setPortfolios(items)
        setLoading(false)
      },
      (portfolioError) => {
        console.error(portfolioError)
        setError('Gagal mengambil portfolio dari Firebase.')
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user?.uid])

  useEffect(() => {
    if (!selectedPortfolio) {
      setFormData(toInitialFormData())
      setExistingImages([])
      setImageFiles([])
      setImagePreviews([])
      return
    }

    setFormData({
      projectName: selectedPortfolio.projectName,
      projectType: selectedPortfolio.projectType || projectTypes[0],
      projectYear: selectedPortfolio.projectYear || new Date().getFullYear(),
      projectDescription: selectedPortfolio.projectDescription,
    })
    setExistingImages(selectedPortfolio.projectImages || [])
    setImageFiles([])
    setImagePreviews(selectedPortfolio.projectImages || [])
  }, [selectedPortfolio])

  const handleChooseImages = () => {
    document.getElementById('portfolio-images-input')?.click()
  }

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) {
      return
    }

    setImageFiles((current) => [...current, ...files])
    setImagePreviews((current) => [...current, ...files.map((file) => URL.createObjectURL(file))])
  }

  const removePreview = (index) => {
    const existingCount = existingImages.length

    if (index < existingCount) {
      setExistingImages((current) => current.filter((_, currentIndex) => currentIndex !== index))
      setImagePreviews((current) => current.filter((_, currentIndex) => currentIndex !== index))
      return
    }

    const newImageIndex = index - existingCount
    setImageFiles((current) => current.filter((_, currentIndex) => currentIndex !== newImageIndex))
    setImagePreviews((current) => current.filter((_, currentIndex) => currentIndex !== index))
  }

  const resetForm = () => {
    setSelectedPortfolioId('')
    setFormData(toInitialFormData())
    setExistingImages([])
    setImageFiles([])
    setImagePreviews([])
    setNotice('')
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')

    try {
      if (!user?.uid) {
        throw new Error('User belum login.')
      }

      const uploadedImages = imageFiles.length > 0
        ? await Promise.all(imageFiles.map((file) => uploadToCloudinary(file, { resourceType: 'image' })))
        : []

      const projectImages = selectedPortfolio
        ? [
            ...existingImages,
            ...uploadedImages.map((upload) => upload.secureUrl),
          ]
        : uploadedImages.map((upload) => upload.secureUrl)

      const payload = {
        architectId: user.uid,
        projectName: formData.projectName,
        projectType: formData.projectType,
        projectYear: Number(formData.projectYear) || new Date().getFullYear(),
        projectDescription: formData.projectDescription,
        projectImages,
      }

      if (selectedPortfolio) {
        await updatePortfolioDocument(selectedPortfolio.id, payload)
      } else {
        await createPortfolioDocument(payload)
      }

      setNotice('Portfolio berhasil disimpan')
      resetForm()
    } catch (saveError) {
      console.error(saveError)
      setError(saveError?.message || 'Gagal menyimpan portfolio')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (portfolioId) => {
    const confirmed = window.confirm('Hapus portfolio ini?')
    if (!confirmed) {
      return
    }

    setSaving(true)
    setError('')
    setNotice('')

    try {
      await deletePortfolioDocument(portfolioId)
      if (selectedPortfolioId === portfolioId) {
        resetForm()
      }
      setNotice('Portfolio berhasil dihapus')
    } catch (deleteError) {
      console.error(deleteError)
      setError(deleteError?.message || 'Gagal menghapus portfolio')
    } finally {
      setSaving(false)
    }
  }

  const beginEdit = (portfolio) => {
    setSelectedPortfolioId(portfolio.id)
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
            title={<span className="text-white">Portfolio Management</span>}
          />
        </div>
      </div>

      <div className="-mt-5 px-4 space-y-4">
        <Card className="relative z-20 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-white shadow-md">
              <img src={profilePhoto} alt={user.fullName} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-[#1A2340]">{user.fullName}</p>
              <p className="text-[12px] text-[#8A96AA]">Manage portfolio projects</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Project Name"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={(event) => setFormData((current) => ({ ...current, projectName: event.target.value }))}
            />

            <div>
              <p className="mb-2 text-sm font-semibold text-[#1B2F5E]">Project Type</p>
              <select
                value={formData.projectType}
                onChange={(event) => setFormData((current) => ({ ...current, projectType: event.target.value }))}
                className="h-12 w-full rounded-[16px] border border-[#E8E3DA] bg-white px-4 text-[14px] text-[#1B2F5E] outline-none"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Project Year"
              name="projectYear"
              type="number"
              value={formData.projectYear}
              onChange={(event) => setFormData((current) => ({ ...current, projectYear: event.target.value }))}
            />

            <div>
              <p className="mb-2 text-sm font-semibold text-[#1B2F5E]">Project Description</p>
              <textarea
                value={formData.projectDescription}
                onChange={(event) => setFormData((current) => ({ ...current, projectDescription: event.target.value }))}
                rows="4"
                className="w-full rounded-[16px] border border-[#E8E3DA] bg-white px-4 py-3 text-[14px] text-[#1B2F5E] outline-none placeholder:text-[#A5B1C1]"
                placeholder="Describe the project"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#1B2F5E]">Project Images</p>
                <button type="button" onClick={handleChooseImages} className="text-sm font-semibold text-[#1B78D6]">
                  Upload Images
                </button>
              </div>
              <input id="portfolio-images-input" onChange={handleImageChange} type="file" accept="image/*" multiple className="hidden" />
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((image, index) => (
                  <div key={`${image}-${index}`} className="relative h-20 overflow-hidden rounded-md bg-white">
                    <img src={image} alt={`portfolio-${index}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A2340] shadow"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {imagePreviews.length === 0 ? (
                  <div className="col-span-3 rounded-[16px] border border-dashed border-[#D5D9E2] bg-white px-4 py-6 text-center text-[13px] text-[#8A96AA]">
                    No images selected yet
                  </div>
                ) : null}
              </div>
            </div>

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

            <div className="flex gap-3">
              <Button type="submit" className="h-14 flex-1 rounded-[20px] text-base" disabled={saving}>
                {saving ? 'Saving...' : selectedPortfolio ? 'Update Portfolio' : 'Add Portfolio'}
              </Button>
              {selectedPortfolio ? (
                <button type="button" onClick={resetForm} className="h-14 rounded-[20px] border border-[#D5D9E2] bg-white px-4 text-[14px] font-semibold text-[#1A2340]">
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </Card>

        <div className="space-y-3 pb-8">
          <p className="px-1 text-[12px] font-medium text-[#7B8FAB]">
            {loading ? 'Loading portfolios...' : `${portfolios.length} portfolios found`}
          </p>

          {!loading && portfolios.length === 0 ? (
            <p className="px-1 text-[13px] font-medium text-[#7B8FAB]">Belum ada portfolio yang tersedia</p>
          ) : null}

          <div className="space-y-3">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="overflow-hidden p-4">
                <div className="flex items-start gap-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[16px] bg-white">
                    <img src={portfolio.projectImages?.[0] || profilePhoto} alt={portfolio.projectName} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-[#1A2340]">{portfolio.projectName}</p>
                    <p className="mt-1 text-[12px] text-[#8A96AA]">{portfolio.projectType} • {portfolio.projectYear}</p>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-[#7B8FAB]">{portfolio.projectDescription}</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => beginEdit(portfolio)} className="inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[12px] font-medium text-[#4A6C9A]">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(portfolio.id)} className="inline-flex items-center gap-2 rounded-full bg-[#FFF4F4] px-3 py-1.5 text-[12px] font-medium text-[#C43D3D]">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectPortfolio
