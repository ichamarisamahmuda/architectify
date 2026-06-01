import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig.js'

function assertFirestoreReady() {
  if (!db) {
    throw new Error('Firestore belum dikonfigurasi. Isi environment variables Firebase terlebih dahulu.')
  }
}

function toUserDocumentData(data) {
  return {
    uid: data.uid,
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber ?? '',
    profilePhoto: data.profilePhoto ?? '',
    location: data.location ?? '',
    role: data.role,
    profileCompleted: Boolean(data.profileCompleted),
    createdAt: data.createdAt ?? serverTimestamp(),
    updatedAt: data.updatedAt ?? serverTimestamp(),
  }
}

export async function createUserDocument(data) {
  assertFirestoreReady()
  const userData = toUserDocumentData(data)
  await setDoc(doc(db, 'users', userData.uid), userData)
  return userData
}

export async function updateUserDocument(uid, data) {
  assertFirestoreReady()
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  }

  await updateDoc(doc(db, 'users', uid), payload)
  return payload
}

export async function getUserDocument(uid) {
  assertFirestoreReady()
  const snapshot = await getDoc(doc(db, 'users', uid))

  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}
