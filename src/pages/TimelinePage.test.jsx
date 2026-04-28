import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TimelinePage from './TimelinePage';
import useStore from '../services/store';

// Mock useStore
vi.mock('../services/store', () => ({
  default: vi.fn(),
}));

describe('TimelinePage', () => {
  const mockTimeline = [
    { 
      id: 1, 
      phase: 'Phase 1', 
      description: 'Timeline Description 1', 
      date: '2024-01-01',
      status: 'completed'
    },
  ];

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      timeline: mockTimeline,
      fetchTimeline: vi.fn(),
      incrementProgress: vi.fn(),
      loading: false,
    });
  });

  it('renders the timeline title', () => {
    render(<TimelinePage />);
    expect(screen.getByText('timeline.title_part1')).toBeDefined();
  });

  it('renders the timeline items', () => {
    render(<TimelinePage />);
    expect(screen.getByText('Phase 1')).toBeDefined();
    expect(screen.getByText('Timeline Description 1')).toBeDefined();
  });
});
