import { create } from 'zustand';
import i18n from '../i18n';
import { dummyData } from '../data/dummyData';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

/**
 * useStore - Centralized State Management Store with Firebase Integration
 * 
 * Manages global state and provides real-time synchronization with Google Firebase.
 */
const useStore = create((set, get) => ({
  process: [],
  timeline: [],
  faqs: [],
  status: dummyData.status,
  loading: false,
  error: null,
  progress: 0,
  user: null,

  // --- Authentication Actions ---
  login: async () => {
    try {
      set({ loading: true });
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: error.message });
    }
  },

  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user });
      if (user) {
        // Subscribe to real-time status updates from Firestore for this user
        const statusDoc = doc(db, 'simulation', 'global_status');
        onSnapshot(statusDoc, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const lang = i18n.language;
            set({ 
              status: {
                ...data,
                displayPhase: dummyData.statusTranslations[data.currentPhase]?.[lang] || data.currentPhase
              }
            });
          }
        });
      }
    });
  },

  // --- Content Actions ---
  fetchProcess: () => {
    set({ loading: true });
    const lang = i18n.language;
    const localizedProcess = dummyData.process.map(item => ({
      ...item,
      title: item.translations[lang]?.title || item.title,
      description: item.translations[lang]?.description || item.description,
      details: item.translations[lang]?.details || item.details
    }));
    set({ process: localizedProcess, loading: false });
  },

  fetchTimeline: () => {
    set({ loading: true });
    const lang = i18n.language;
    const localizedTimeline = dummyData.timeline.map(item => ({
      ...item,
      phase: item.translations[lang]?.phase || item.phase,
      description: item.translations[lang]?.description || item.description
    }));
    set({ timeline: localizedTimeline, loading: false });
  },

  fetchFaqs: () => {
    set({ loading: true });
    const lang = i18n.language;
    const localizedFaqs = dummyData.faqs.map(item => ({
      ...item,
      question: item.translations[lang]?.question || item.question,
      answer: item.translations[lang]?.answer || item.answer
    }));
    set({ faqs: localizedFaqs, loading: false });
  },

  fetchStatus: async () => {
    const lang = i18n.language;
    // Try to get from Firestore first
    try {
      const statusDoc = await getDoc(doc(db, 'simulation', 'global_status'));
      if (statusDoc.exists()) {
        const data = statusDoc.data();
        set({ 
          status: {
            ...data,
            displayPhase: dummyData.statusTranslations[data.currentPhase]?.[lang] || data.currentPhase
          }
        });
        return;
      }
    } catch (e) {
      console.error("Firestore fetch failed, falling back to dummy data", e);
    }
    
    const currentStatus = { ...dummyData.status };
    currentStatus.displayPhase = dummyData.statusTranslations[currentStatus.currentPhase]?.[lang] || currentStatus.currentPhase;
    set({ status: currentStatus });
  },

  updateSimulation: async (data) => {
    const lang = i18n.language;
    const newStatus = {
      ...get().status,
      currentPhase: data.currentPhase,
      isVotingOpen: data.isVotingOpen,
      displayPhase: dummyData.statusTranslations[data.currentPhase]?.[lang] || data.currentPhase
    };
    
    set({ status: newStatus });

    // Persist to Firebase if authenticated
    if (get().user) {
      try {
        await setDoc(doc(db, 'simulation', 'global_status'), {
          currentPhase: data.currentPhase,
          isVotingOpen: data.isVotingOpen,
          updatedBy: get().user.email,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.error("Failed to persist to Firestore", e);
      }
    }
  },

  incrementProgress: (val) => {
    set((state) => ({ progress: Math.min(100, Math.max(state.progress, val)) }));
  }
}));

export default useStore;
