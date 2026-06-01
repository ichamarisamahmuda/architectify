import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
} from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseConfig.js'
import { createArchitectDocument } from './architectService.js'
import { createUserDocument } from './userService.js'

function assertFirebaseReady() {
  if (!auth || !db) {
    throw new Error('Firebase belum dikonfigurasi. Isi environment variables VITE_FIREBASE_* terlebih dahulu.')
  }
}

function mapAuthError(error) {
  const code = error?.code || ''
  const message = String(error?.message || '')

  if (code === 'auth/invalid-api-key' || message.toLowerCase().includes('api key')) {
    return new Error('Firebase API key tidak valid atau domain lokal belum diizinkan. Periksa VITE_FIREBASE_API_KEY dan authorized domains.')
  }

  return error
}

export async function registerWithEmailAndPassword({ fullName, email, password, role, phoneNumber = '' }) {
  assertFirebaseReady()
  let credential
  try {
    credential = await createUserWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error('Firebase Auth error during register:', err?.code || err?.message || err)
    throw mapAuthError(err)
  }
  const uid = credential.user.uid
  const normalizedRole = role === 'Architect' ? 'Architect' : 'Client'

  try {
    await createUserDocument({
      uid,
      fullName,
      email,
      role: normalizedRole,
      profileCompleted: false,
      phoneNumber,
      profilePhoto: '',
      location: '',
    })

    if (normalizedRole === 'Architect') {
      await createArchitectDocument({
        uid,
        fullName,
        email,
        profilePhoto: '',
        location: '',
        consultationPrice: '',
        specialization: [],
        skills: [],
        experienceYears: 0,
        totalProjectsHandled: 0,
        portfolio: [],
        description: '',
      })
    }

    await signOut(auth)

    return credential.user
  } catch (error) {
    try {
      await deleteDoc(doc(db, 'users', uid))
    } catch {
      // Ignore cleanup errors and continue surfacing the original failure.
    }

    try {
      if (normalizedRole === 'Architect') {
        await deleteDoc(doc(db, 'architects', uid))
      }
    } catch {
      // Ignore cleanup errors and continue surfacing the original failure.
    }

    try {
      if (auth.currentUser?.uid === uid) {
        await deleteUser(auth.currentUser)
      }
    } catch {
      // Ignore cleanup errors and continue surfacing the original failure.
    }

    throw mapAuthError(error)
  }
}

export async function loginWithEmailAndPassword({ email, password }) {
  assertFirebaseReady()
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (err) {
    console.error('Firebase Auth error during login:', err?.code || err?.message || err)
    throw mapAuthError(err)
  }
}

export async function logoutUser() {
  if (!auth) {
    return
  }

  await signOut(auth)
}

export async function updateAuthEmail(nextEmail) {
  assertFirebaseReady()

  const currentUser = auth.currentUser
  if (!currentUser) {
    throw new Error('User belum login.')
  }

  if (!nextEmail || nextEmail === currentUser.email) {
    return currentUser
  }

  await updateEmail(currentUser, nextEmail)
  return currentUser
}
