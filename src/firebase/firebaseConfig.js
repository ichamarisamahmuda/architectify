import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const fallbackFirebaseConfig = {
  apiKey: 'AIzaSyBPj5aiZjE5iOIsc0bI2TfYJd4mAlBxQ20',
  authDomain: 'architectify-560fc.firebaseapp.com',
  projectId: 'architectify-560fc',
  storageBucket: 'architectify-560fc.appspot.com',
  messagingSenderId: '456859692686',
  appId: '1:456859692686:web:9a891c39d4b98f41f363df',
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackFirebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackFirebaseConfig.appId,
}

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']
const hasFirebaseConfig = requiredKeys.every((key) => Boolean(firebaseConfig[key]))

let app = null
let auth = null
let db = null

if (hasFirebaseConfig) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
} else if (import.meta.env.DEV) {
  console.warn('Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* di .env.local agar auth dan Firestore aktif.')
}

export { app, auth, db }
export default app
