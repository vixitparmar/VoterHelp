import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProcessPage from './ProcessPage';
import useStore from '../services/store';

// Mock useStore
vi.mock('../services/store', () => ({
  default: vi.fn(),
}));

describe('ProcessPage', () => {
  const mockProcess = [
    { 
      id: 1, 
      title: 'Step 1', 
      description: 'Description 1', 
      details: 'Detail 1A',
      icon: 'UserPlus'
    },
    { 
      id: 2, 
      title: 'Step 2', 
      description: 'Description 2', 
      details: 'Detail 2A',
      icon: 'Vote'
    },
  ];

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      process: mockProcess,
      fetchProcess: vi.fn(),
      incrementProgress: vi.fn(),
      loading: false,
    });
  });

  it('renders the process steps', () => {
    render(<ProcessPage />);
    expect(screen.getByRole('heading', { name: /The Election Journey/i })).toBeDefined();
    expect(screen.getByText('Step 1')).toBeDefined();
  });

  it('navigates through steps', () => {
    const incrementProgress = vi.fn();
    vi.mocked(useStore).mockReturnValue({
      process: mockProcess,
      fetchProcess: vi.fn(),
      incrementProgress,
      loading: false,
    });

    render(<ProcessPage />);
    
    // Find the "Continue Process" button
    const nextBtn = screen.getByText(/Continue Process/i);
    fireEvent.click(nextBtn);
    
    expect(screen.getByText('Step 2')).toBeDefined();
    expect(incrementProgress).toHaveBeenCalled();
  });
});
