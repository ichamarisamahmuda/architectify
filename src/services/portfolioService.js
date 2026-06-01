import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig.js'

function assertFirestoreReady() {
  if (!db) {
    throw new Error('Firestore belum dikonfigurasi. Isi environment variables Firebase terlebih dahulu.')
  }
}

function normalizePortfolio(snapshot) {
  const data = snapshot.data()

  return {
    id: snapshot.id,
    portfolioId: data.portfolioId ?? snapshot.id,
    architectId: data.architectId ?? '',
    projectName: data.projectName ?? '',
    projectType: data.projectType ?? '',
    projectYear: Number.isFinite(Number(data.projectYear)) ? Number(data.projectYear) : 0,
    projectDescription: data.projectDescription ?? '',
    projectImages: Array.isArray(data.projectImages) ? data.projectImages : [],
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  }
}

function getTimestampValue(value) {
  if (!value) {
    return 0
  }

  if (typeof value.toMillis === 'function') {
    return value.toMillis()
  }

  const parsed = new Date(value).getTime()
  return Number.isFinite(parsed) ? parsed : 0
}

function sortPortfoliosByRecent(items) {
  return [...items].sort((left, right) => {
    const rightTime = getTimestampValue(right.updatedAt || right.createdAt)
    const leftTime = getTimestampValue(left.updatedAt || left.createdAt)
    return rightTime - leftTime
  })
}

function getPortfolioCollection() {
  return collection(db, 'architect_portfolios')
}

export async function getPortfolioById(portfolioId) {
  assertFirestoreReady()
  const snapshot = await getDoc(doc(db, 'architect_portfolios', portfolioId))

  if (!snapshot.exists()) {
    return null
  }

  return normalizePortfolio(snapshot)
}

export async function getArchitectPortfolios(architectId) {
  assertFirestoreReady()

  if (!architectId) {
    return []
  }

  const snapshot = await getDocs(query(getPortfolioCollection(), where('architectId', '==', architectId)))
  return sortPortfoliosByRecent(snapshot.docs.map(normalizePortfolio))
}

export function subscribeArchitectPortfolios(architectId, callback, onError) {
  assertFirestoreReady()

  if (!architectId) {
    callback([])
    return () => {}
  }

  const portfolioQuery = query(getPortfolioCollection(), where('architectId', '==', architectId))

  return onSnapshot(
    portfolioQuery,
    (snapshot) => callback(sortPortfoliosByRecent(snapshot.docs.map(normalizePortfolio))),
    (error) => {
      if (typeof onError === 'function') {
        onError(error)
      }
    }
  )
}

export async function createPortfolioDocument(data) {
  assertFirestoreReady()

  const portfolioRef = doc(collection(db, 'architect_portfolios'))
  const portfolioId = data.portfolioId || portfolioRef.id
  const payload = {
    portfolioId,
    architectId: data.architectId,
    projectName: data.projectName,
    projectType: data.projectType,
    projectYear: Number.isFinite(Number(data.projectYear)) ? Number(data.projectYear) : 0,
    projectDescription: data.projectDescription ?? '',
    projectImages: Array.isArray(data.projectImages) ? data.projectImages : [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(doc(db, 'architect_portfolios', portfolioId), payload)
  return {
    id: portfolioId,
    ...payload,
  }
}

export async function updatePortfolioDocument(portfolioId, data) {
  assertFirestoreReady()

  const payload = {
    ...data,
    projectYear: Number.isFinite(Number(data.projectYear)) ? Number(data.projectYear) : 0,
    projectImages: Array.isArray(data.projectImages) ? data.projectImages : [],
    updatedAt: serverTimestamp(),
  }

  await updateDoc(doc(db, 'architect_portfolios', portfolioId), payload)
  return payload
}

export async function deletePortfolioDocument(portfolioId) {
  assertFirestoreReady()
  await deleteDoc(doc(db, 'architect_portfolios', portfolioId))
}

export { normalizePortfolio }
