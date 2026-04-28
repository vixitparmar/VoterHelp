import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VotingGuide from './VotingGuide';
import useStore from '../services/store';

// Mock useStore
vi.mock('../services/store', () => ({
  default: vi.fn(),
}));

describe('VotingGuide', () => {
  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      incrementProgress: vi.fn(),
    });
  });

  it('renders the voting guide title', () => {
    render(<VotingGuide />);
    expect(screen.getByText('guide.title_part1')).toBeDefined();
  });

  it('renders the card sections', () => {
    render(<VotingGuide />);
    expect(screen.getByText('guide.steps.01.title')).toBeDefined();
    expect(screen.getByText('guide.steps.02.title')).toBeDefined();
  });
});
