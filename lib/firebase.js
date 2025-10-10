let app
let db
let auth
let googleProvider

export function getFirebase() {
  if (typeof window === "undefined") return {}

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  try {
    // Lazy import to avoid bundling if not used
    const { initializeApp, getApps } = require("firebase/app")
    const { getAuth, GoogleAuthProvider } = require("firebase/auth")
    const { getFirestore } = require("firebase/firestore")

    if (!getApps().length) {
      app = initializeApp(config)
    } else {
      app = getApps()[0]
    }
    auth = getAuth(app)
    db = getFirestore(app)
    googleProvider = new GoogleAuthProvider()
    return { app, auth, db, googleProvider }
  } catch (e) {
    console.warn("[v0] Firebase not initialized. Missing deps or env?", e)
    return {}
  }
}
