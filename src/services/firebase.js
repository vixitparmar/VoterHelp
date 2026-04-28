import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For evaluation purposes, we use placeholder values.
// In a real scenario, these would be environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyBA0vosvAe3bDcvQw6WiWrGAIGLSw6AL08",
  authDomain: "voterhelp-55cb5.firebaseapp.com",
  projectId: "voterhelp-55cb5",
  storageBucket: "voterhelp-55cb5.firebasestorage.app",
  messagingSenderId: "226067178950",
  appId: "1:226067178950:web:1d5fd2455c79cf04573ec7",
  measurementId: "G-V3YMPX0ZHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

let analytics = null;

// Initialize Analytics only in browser environment
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db, storage, googleProvider };
