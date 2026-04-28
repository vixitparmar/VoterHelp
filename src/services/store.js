import { create } from 'zustand';
import i18n from '../i18n';
import { dummyData } from '../data/dummyData';

const useStore = create((set, get) => ({
  process: [],
  timeline: [],
  faqs: [],
  status: dummyData.status,
  loading: false,
  error: null,
  progress: 0, // 0 to 100

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

  fetchStatus: () => {
    const lang = i18n.language;
    const currentStatus = { ...dummyData.status };
    currentStatus.displayPhase = dummyData.statusTranslations[currentStatus.currentPhase]?.[lang] || currentStatus.currentPhase;
    set({ status: currentStatus });
  },

  updateSimulation: (data) => {
    const lang = i18n.language;
    const newStatus = {
      ...get().status,
      currentPhase: data.currentPhase,
      isVotingOpen: data.isVotingOpen,
      displayPhase: dummyData.statusTranslations[data.currentPhase]?.[lang] || data.currentPhase
    };
    set({ status: newStatus });
  },

  incrementProgress: (val) => {
    set((state) => ({ progress: Math.min(100, Math.max(state.progress, val)) }));
  }
}));

export default useStore;
