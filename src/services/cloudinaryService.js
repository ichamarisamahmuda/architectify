const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const cloudinaryFolder = import.meta.env.VITE_CLOUDINARY_FOLDER ?? ''

function ensureCloudinaryConfig() {
  if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
    throw new Error('Cloudinary belum dikonfigurasi. Lengkapi environment variables Cloudinary.')
  }
}

function mapCloudinaryError(errorMessage) {
  const normalizedMessage = String(errorMessage || '')

  if (normalizedMessage.toLowerCase().includes('unknown api key')) {
    return 'Cloudinary cloud name atau upload preset tidak cocok. Pastikan VITE_CLOUDINARY_CLOUD_NAME dan VITE_CLOUDINARY_UPLOAD_PRESET benar.'
  }

  return normalizedMessage || 'Gagal mengunggah file ke Cloudinary.'
}

export async function uploadToCloudinary(file, options = {}) {
  ensureCloudinaryConfig()

  if (!file) {
    throw new Error('File upload tidak ditemukan.')
  }

  const resourceType = options.resourceType ?? 'auto'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', cloudinaryUploadPreset)

  if (cloudinaryFolder) {
    formData.append('folder', cloudinaryFolder)
  }

  if (options.publicId) {
    formData.append('public_id', options.publicId)
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: formData,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(mapCloudinaryError(result?.error?.message))
  }

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
    originalFilename: result.original_filename,
    bytes: result.bytes,
  }
}
