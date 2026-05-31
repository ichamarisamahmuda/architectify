import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
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
    portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
    description: data.description ?? '',
    createdAt: data.createdAt ?? serverTimestamp(),
  }
}

export async function createArchitectDocument(data) {
  assertFirestoreReady()
  const architectData = toArchitectDocumentData(data)
  await setDoc(doc(db, 'architects', architectData.uid), architectData)
  return architectData
}

export async function updateArchitectDocument(uid, data) {
  assertFirestoreReady()
  const payload = {
    ...data,
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
    id: snapshot.id,
    ...snapshot.data(),
  }
}
