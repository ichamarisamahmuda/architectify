import { ArrowLeft, Upload, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../components/common/Button/Button.jsx'

const architectProfiles = {
  'andi-prasetyo': {
    name: 'Andi Prasetyo, S.ArS',
    tags: ['Residential', 'Minimalist'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    consultationPrice: 500000,
  },
}

const projectTypes = ['Residential', 'Commercial', 'Hospitality', 'Educational', 'Healthcare', 'Industrial']

export default function OrderForm() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const architect = architectProfiles[slug] || architectProfiles['andi-prasetyo']

  const [formData, setFormData] = useState({
    projectName: '',
    projectType: 'Residential',
    buildingArea: '',
    landArea: '',
    projectLocation: '',
    projectDescription: '',
    budget: '',
    timeline: '',
  })

  const [moodboards, setMoodboards] = useState([])
  const [fileInputKey, setFileInputKey] = useState(0)

  const handleBack = () => {
    navigate(-1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMoodboardUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setMoodboards((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            preview: event.target.result,
            size: (file.size / 1024).toFixed(2),
          },
        ])
      }
      reader.readAsDataURL(file)
    })
    // Reset input
    setFileInputKey((prev) => prev + 1)
  }

  const removeMoodboard = (id) => {
    setMoodboards((prev) => prev.filter((m) => m.id !== id))
  }

  const handleSubmit = () => {
    console.log({
      architect: architect.name,
      ...formData,
      moodboards: moodboards.map((m) => ({ name: m.name, size: m.size })),
    })
    // Navigate to payment confirmation with form data
    navigate(`/bookings/payment/${slug}`, { 
      state: {
        formData,
        moodboards,
      }
    })
  }

  return (
    <div className="flex min-h-full flex-col bg-[#F9F6F2]">
      {/* Header */}
      <div className="border-b border-white/70 px-4 py-4 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A2340] transition hover:bg-white"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[18px] font-semibold text-[#1A2340]">Project Details</h1>
      </div>

      {/* Architect Info */}
      <div className="border-b border-white/70 px-4 py-4 bg-[#F9F6F2]">
        <div className="flex items-center gap-3">
          <img
            src={architect.avatar}
            alt={architect.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h2 className="font-semibold text-[15px] text-[#1A2340]">{architect.name}</h2>
            <p className="text-[12px] text-[#8A96AA]">{architect.tags.join(' • ')}</p>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 bg-[#F9F6F2]">
          {/* Project Name */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="e.g., Modern Family Home Renovation"
              className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] text-[14px]"
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Building Area & Land Area (2 columns on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Building Area */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
                Building Area <span className="text-[#8A96AA] font-normal text-[12px]">(m²)</span>
              </label>
              <input
                type="number"
                name="buildingArea"
                value={formData.buildingArea}
                onChange={handleInputChange}
                placeholder="e.g., 250"
                className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
              />
            </div>

            {/* Land Area */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
                Land Area <span className="text-[#8A96AA] font-normal text-[12px]">(m²)</span>
              </label>
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
              />
            </div>
          </div>

          {/* Project Location */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">Project Location</label>
            <input
              type="text"
              name="projectLocation"
              value={formData.projectLocation}
              onChange={handleInputChange}
              placeholder="City, District"
              className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
              Project Description <span className="text-[#8A96AA] font-normal text-[12px]">(Optional)</span>
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              placeholder="Describe your project, vision, and specific requirements..."
              className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] resize-none bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
              rows="4"
            />
          </div>

          {/* Budget & Timeline (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Budget */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
                Budget <span className="text-[#8A96AA] font-normal text-[12px]">(Optional)</span>
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Rp"
                className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] placeholder:text-[#C5CDD6] text-[14px]"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
                Timeline <span className="text-[#8A96AA] font-normal text-[12px]">(Optional)</span>
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1F2850] bg-white text-[#1A2340] text-[14px]"
              >
                <option value="">Select timeline</option>
                <option value="1-3months">1-3 Months</option>
                <option value="3-6months">3-6 Months</option>
                <option value="6-12months">6-12 Months</option>
                <option value="12plus">12+ Months</option>
              </select>
            </div>
          </div>

          {/* Moodboard Upload */}
          <div>
            <label className="block text-[14px] font-semibold text-[#1A2340] mb-2">
              Upload Moodboard <span className="text-[#8A96AA] font-normal text-[12px]">(Optional)</span>
            </label>
            <div className="mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/50 rounded-2xl bg-white cursor-pointer transition hover:border-[#4A6C9A] hover:bg-[#EAF3FF]/30">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="text-[#4A6C9A] mb-2" />
                  <p className="text-[13px] font-medium text-[#1A2340]">Click to upload images</p>
                  <p className="text-[12px] text-[#8A96AA]">PNG, JPG up to 10MB</p>
                </div>
                <input
                  key={fileInputKey}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMoodboardUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Moodboard List */}
            {moodboards.length > 0 && (
              <div className="space-y-3">
                <p className="text-[13px] font-medium text-[#1A2340]">
                  {moodboards.length} {moodboards.length === 1 ? 'file' : 'files'} uploaded
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {moodboards.map((mood) => (
                    <div key={mood.id} className="relative group rounded-xl overflow-hidden bg-white border border-white/70">
                      <img
                        src={mood.preview}
                        alt={mood.name}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        onClick={() => removeMoodboard(mood.id)}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={20} className="text-white" />
                      </button>
                      <p className="text-[11px] text-[#8A96AA] px-2 py-1 truncate">{mood.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with Submit Button */}
      <div className="border-t border-white/70 bg-[#F9F6F2] px-3 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-[390px] space-y-3">
          <Button className="w-full rounded-[20px] py-4 text-[15px]" onClick={handleSubmit}>
            Submit Order
          </Button>
        </div>
      </div>
    </div>
  )
}
