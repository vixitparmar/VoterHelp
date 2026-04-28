import { describe, it, expect, beforeEach, vi } from 'vitest';
import useStore from '../services/store';
import i18n from '../i18n';

// Mock i18n
vi.mock('../i18n', () => ({
  default: {
    language: 'en',
    changeLanguage: vi.fn(),
  }
}));

describe('useStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { getState } = useStore;
    useStore.setState({
      process: [],
      timeline: [],
      faqs: [],
      status: {
        currentPhase: 'PRE_ELECTION',
        isVotingOpen: false,
        totalVoters: 1250000,
        votesCast: 0,
        turnoutPercentage: 0
      },
      loading: false,
      error: null,
      progress: 0,
    });
  });

  it('should initialize with default state', () => {
    const state = useStore.getState();
    expect(state.process).toEqual([]);
    expect(state.progress).toBe(0);
    expect(state.loading).toBe(false);
  });

  it('should increment progress correctly', () => {
    useStore.getState().incrementProgress(50);
    expect(useStore.getState().progress).toBe(50);

    useStore.getState().incrementProgress(120); // Should cap at 100
    expect(useStore.getState().progress).toBe(100);

    useStore.getState().incrementProgress(30); // Should not go backwards if current is 100
    expect(useStore.getState().progress).toBe(100);
  });

  it('should fetch process data with localization', () => {
    useStore.getState().fetchProcess();
    const state = useStore.getState();
    expect(state.process.length).toBeGreaterThan(0);
    expect(state.loading).toBe(false);
    
    // Check if first item has localized content
    const firstItem = state.process[0];
    expect(firstItem).toHaveProperty('title');
    expect(firstItem).toHaveProperty('description');
  });

  it('should fetch timeline data', () => {
    useStore.getState().fetchTimeline();
    const state = useStore.getState();
    expect(state.timeline.length).toBeGreaterThan(0);
    expect(state.loading).toBe(false);
  });

  it('should fetch FAQs', () => {
    useStore.getState().fetchFaqs();
    const state = useStore.getState();
    expect(state.faqs.length).toBeGreaterThan(0);
  });

  it('should update simulation status', () => {
    const newData = {
      currentPhase: 'VOTING_DAY',
      isVotingOpen: true
    };
    useStore.getState().updateSimulation(newData);
    const state = useStore.getState();
    expect(state.status.currentPhase).toBe('VOTING_DAY');
    expect(state.status.isVotingOpen).toBe(true);
  });
});
