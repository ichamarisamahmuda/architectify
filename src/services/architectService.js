import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig.js'

function assertFirestoreReady() {
  if (!db) {
    throw new Error('Firestore belum dikonfigurasi. Isi environment variables Firebase terlebih dahulu.')
  }
}

function toArchitectDocumentData(data) {
  return {
    uid: data.uid,
    fullName: data.fullName,
    email: data.email,
    profilePhoto: data.profilePhoto ?? '',
    location: data.location ?? '',
    consultationPrice: data.consultationPrice ?? '',
    specialization: Array.isArray(data.specialization) ? data.specialization : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    experienceYears: Number.isFinite(Number(data.experienceYears)) ? Number(data.experienceYears) : 0,
    totalProjectsHandled: Number.isFinite(Number(data.totalProjectsHandled)) ? Number(data.totalProjectsHandled) : 0,
    portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
    description: data.description ?? '',
    createdAt: data.createdAt ?? serverTimestamp(),
    updatedAt: data.updatedAt ?? serverTimestamp(),
  }
}

function normalizeArchitect(snapshot) {
  const data = snapshot.data()

  return {
    id: snapshot.id,
    uid: data.uid ?? snapshot.id,
    fullName: data.fullName ?? '',
    email: data.email ?? '',
    profilePhoto: data.profilePhoto ?? '',
    location: data.location ?? '',
    consultationPrice: data.consultationPrice ?? '',
    specialization: Array.isArray(data.specialization) ? data.specialization : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    experienceYears: Number.isFinite(Number(data.experienceYears)) ? Number(data.experienceYears) : 0,
    totalProjectsHandled: Number.isFinite(Number(data.totalProjectsHandled)) ? Number(data.totalProjectsHandled) : 0,
    portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
    description: data.description ?? '',
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  }
}

function parsePriceToNumber(value) {
  if (typeof value === 'number') {
    return value
  }

  const text = String(value || '').toLowerCase().replace(/\s+/g, '')
  if (!text) {
    return null
  }

  const match = text.match(/(\d+(?:[.,]\d+)?)(k|m|jt|rb)?/i)
  if (!match) {
    return null
  }

  const number = Number(match[1].replace(',', '.'))
  if (!Number.isFinite(number)) {
    return null
  }

  const unit = match[2]
  if (unit === 'm' || unit === 'jt') {
    return number * 1000000
  }
  if (unit === 'k' || unit === 'rb') {
    return number * 1000
  }

  return number
}

function matchesConsultationPrice(architect, consultationPrice) {
  if (!consultationPrice) {
    return true
  }

  const priceText = String(consultationPrice).trim()
  if (!priceText) {
    return true
  }

  if (priceText.startsWith('min:')) {
    const minValue = Number(priceText.slice(4))
    const architectPrice = parsePriceToNumber(architect.consultationPrice)
    if (!Number.isFinite(minValue) || architectPrice === null) {
      return false
    }
    return architectPrice >= minValue
  }

  if (priceText.startsWith('max:')) {
    const maxValue = Number(priceText.slice(4))
    const architectPrice = parsePriceToNumber(architect.consultationPrice)
    if (!Number.isFinite(maxValue) || architectPrice === null) {
      return false
    }
    return architectPrice <= maxValue
  }

  if (priceText.startsWith('range:')) {
    const [minRaw, maxRaw] = priceText.slice(6).split('-')
    const minValue = Number(minRaw)
    const maxValue = Number(maxRaw)
    const architectPrice = parsePriceToNumber(architect.consultationPrice)

    if (!Number.isFinite(minValue) || !Number.isFinite(maxValue) || architectPrice === null) {
      return false
    }

    return architectPrice >= minValue && architectPrice <= maxValue
  }

  return String(architect.consultationPrice || '').toLowerCase().includes(priceText.toLowerCase())
}

function applyClientSearch(architects, { keyword = '', specialization = '', location = '', consultationPrice = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  const normalizedLocation = location.trim().toLowerCase()
  const normalizedSpecialization = specialization.trim().toLowerCase()

  return architects.filter((architect) => {
    if (normalizedSpecialization) {
      const specializationText = architect.specialization.join(' ').toLowerCase()
      if (!specializationText.includes(normalizedSpecialization)) {
        return false
      }
    }

    if (normalizedLocation) {
      const locationText = String(architect.location || '').toLowerCase()
      if (!locationText.includes(normalizedLocation)) {
        return false
      }
    }

    if (!matchesConsultationPrice(architect, consultationPrice)) {
      return false
    }

    if (!normalizedKeyword) {
      return true
    }

    const searchableValues = [
      architect.fullName,
      architect.location,
      architect.consultationPrice,
      ...architect.specialization,
      ...architect.skills,
    ]

    return searchableValues.some((value) => String(value || '').toLowerCase().includes(normalizedKeyword))
  })
}

function buildArchitectsQuery({ specialization = '' } = {}) {
  const architectsCollection = collection(db, 'architects')

  if (specialization?.trim()) {
    return query(
      architectsCollection,
      where('specialization', 'array-contains', specialization.trim()),
      orderBy('createdAt', 'desc')
    )
  }

  return query(architectsCollection, orderBy('createdAt', 'desc'))
}

export async function createArchitectDocument(data) {
  assertFirestoreReady()
  const architectData = toArchitectDocumentData(data)
  await setDoc(doc(db, 'architects', architectData.uid), architectData)
  return architectData
}

export async function updateArchitectDocument(uid, data) {
  assertFirestoreReady()
  const normalizedPayload = { ...data }

  if (Object.prototype.hasOwnProperty.call(data, 'specialization')) {
    normalizedPayload.specialization = Array.isArray(data.specialization) ? data.specialization : []
  }

  if (Object.prototype.hasOwnProperty.call(data, 'skills')) {
    normalizedPayload.skills = Array.isArray(data.skills) ? data.skills : []
  }

  if (Object.prototype.hasOwnProperty.call(data, 'experienceYears')) {
    normalizedPayload.experienceYears = Number.isFinite(Number(data.experienceYears)) ? Number(data.experienceYears) : 0
  }

  if (Object.prototype.hasOwnProperty.call(data, 'totalProjectsHandled')) {
    normalizedPayload.totalProjectsHandled = Number.isFinite(Number(data.totalProjectsHandled)) ? Number(data.totalProjectsHandled) : 0
  }

  if (Object.prototype.hasOwnProperty.call(data, 'portfolio')) {
    normalizedPayload.portfolio = Array.isArray(data.portfolio) ? data.portfolio : []
  }

  const payload = {
    ...normalizedPayload,
    updatedAt: serverTimestamp(),
  }

  await updateDoc(doc(db, 'architects', uid), payload)
  return payload
}

export async function getArchitectDocument(uid) {
  assertFirestoreReady()
  const snapshot = await getDoc(doc(db, 'architects', uid))

  if (!snapshot.exists()) {
    return null
  }

  return {
    ...normalizeArchitect(snapshot),
  }
}

export async function getAllArchitects(options = {}) {
  assertFirestoreReady()
  const { specialization = '', location = '', consultationPrice = '' } = options

  const snapshot = await getDocs(buildArchitectsQuery({ specialization }))
  const architects = snapshot.docs.map(normalizeArchitect)

  return applyClientSearch(architects, {
    specialization,
    location,
    consultationPrice,
  })
}

export async function searchArchitects(options = {}) {
  const {
    keyword = '',
    specialization = '',
    location = '',
    consultationPrice = '',
    architects,
  } = options

  const sourceArchitects = Array.isArray(architects)
    ? architects
    : await getAllArchitects({ specialization, location, consultationPrice })

  return applyClientSearch(sourceArchitects, {
    keyword,
    specialization,
    location,
    consultationPrice,
  })
}

export async function getArchitectById(uid) {
  return getArchitectDocument(uid)
}

export function subscribeArchitects(callback, options = {}) {
  assertFirestoreReady()
  const { specialization = '', onError } = options

  const architectsQuery = buildArchitectsQuery({ specialization })

  return onSnapshot(
    architectsQuery,
    (snapshot) => {
      callback(snapshot.docs.map(normalizeArchitect))
    },
    (error) => {
      if (typeof onError === 'function') {
        onError(error)
      }
    }
  )
}
