import { useCallback, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig.js'
import { getArchitectDocument } from '../services/architectService.js'
import { loginWithEmailAndPassword, logoutUser, registerWithEmailAndPassword } from '../services/authService.js'
import { getUserDocument } from '../services/userService.js'
import AuthContext from './authContext.js'

async function resolveSession(firebaseUser) {
  if (!firebaseUser) {
    return { user: null, architectProfile: null }
  }

  const userDocument = await getUserDocument(firebaseUser.uid)

  if (!userDocument) {
    throw new Error('Data user tidak ditemukan di Firestore.')
  }

  const architectProfile = userDocument.role === 'Architect' ? await getArchitectDocument(firebaseUser.uid) : null

  return {
    user: {
      uid: firebaseUser.uid,
      email: firebaseUser.email ?? userDocument.email ?? '',
      ...userDocument,
    },
    architectProfile,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [architectProfile, setArchitectProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const applySession = (sessionUser, sessionArchitectProfile) => {
    setUser(sessionUser)
    setArchitectProfile(sessionArchitectProfile)
  }

  const syncCurrentUser = useCallback(async (firebaseUser) => {
    try {
      const session = await resolveSession(firebaseUser)
      applySession(session.user, session.architectProfile)
      return session
    } catch (error) {
      applySession(null, null)

      if (firebaseUser) {
        try {
          await logoutUser()
        } catch {
          // Ignore secondary logout failures.
        }
      }

      throw error
    }
  }, [])

  useEffect(() => {
    if (!auth) {
      setUser(null)
      setArchitectProfile(null)
      setLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)

      try {
        await syncCurrentUser(firebaseUser)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [syncCurrentUser])

  const login = async ({ email, password }) => {
    const firebaseUser = await loginWithEmailAndPassword({ email, password })
    const session = await syncCurrentUser(firebaseUser)
    return session
  }

  const register = async ({ fullName, email, password, role, phoneNumber }) => {
    return registerWithEmailAndPassword({ fullName, email, password, role, phoneNumber })
  }

  const logout = async () => {
    await logoutUser()
    applySession(null, null)
  }

  const refreshSession = async () => {
    const currentUser = auth.currentUser

    if (!currentUser) {
      applySession(null, null)
      return null
    }

    return syncCurrentUser(currentUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        architectProfile,
        loading,
        login,
        register,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
