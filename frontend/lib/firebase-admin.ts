import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

function getFirebaseAdminApp(): App {
  const existingApps = getApps()
  if (existingApps.length > 0) {
    return existingApps[0]
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined

  if (!privateKey) {
    console.error("FIREBASE_PRIVATE_KEY is not set or is invalid")
    throw new Error("Firebase private key is missing or invalid")
  }

  if (!process.env.FIREBASE_CLIENT_EMAIL) {
    console.error("FIREBASE_CLIENT_EMAIL is not set")
    throw new Error("Firebase client email is missing")
  }

  if (!process.env.FIREBASE_PROJECT_ID) {
    console.error("FIREBASE_PROJECT_ID is not set")
    throw new Error("Firebase project ID is missing")
  }

  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  }

  try {
    console.log("Initializing Firebase Admin SDK")
    return initializeApp(firebaseAdminConfig)
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error)
    throw error
  }
}

const firebaseAdmin = getFirebaseAdminApp()
export const adminAuth = getAuth(firebaseAdmin)

console.log("Firebase Admin SDK initialized successfully")

