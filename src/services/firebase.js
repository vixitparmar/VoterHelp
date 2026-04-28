import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For evaluation purposes, we use placeholder values.
// In a real scenario, these would be environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyDummyApiKey-1234567890",
  authDomain: "voter-help-evaluation.firebaseapp.com",
  projectId: "voter-help-evaluation",
  storageBucket: "voter-help-evaluation.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-DUMMY123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;

// Initialize Analytics only in browser environment
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
