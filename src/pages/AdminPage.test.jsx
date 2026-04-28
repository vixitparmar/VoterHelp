import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminPage from './AdminPage';
import useStore from '../services/store';

// Mock useStore
vi.mock('../services/store', () => ({
  default: vi.fn(),
}));

describe('AdminPage', () => {
  const mockStatus = {
    currentPhase: 'Announcement',
    isVotingOpen: false,
    totalVoters: 1000,
    votesCast: 100,
    turnoutPercentage: 10,
    displayPhase: 'Pre-Election'
  };

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      status: mockStatus,
      fetchStatus: vi.fn(),
      updateSimulation: vi.fn(),
      incrementProgress: vi.fn(),
    });
  });

  it('renders the admin control panel', () => {
    render(<AdminPage />);
    expect(screen.getByText('admin.title_part1')).toBeDefined();
    expect(screen.getByText('admin.global_sim')).toBeDefined();
  });

  it('allows changing the election phase', () => {
    const updateSimulation = vi.fn();
    vi.mocked(useStore).mockReturnValue({
      status: mockStatus,
      fetchStatus: vi.fn(),
      updateSimulation,
      incrementProgress: vi.fn(),
    });

    render(<AdminPage />);
    
    // Find the button for "Announcement" phase
    const announcementBtn = screen.getByText('admin.phases.Announcement');
    fireEvent.click(announcementBtn);
    
    expect(updateSimulation).toHaveBeenCalledWith({ currentPhase: 'Announcement' });
  });

  it('toggles voting status', () => {
    const updateSimulation = vi.fn();
    vi.mocked(useStore).mockReturnValue({
      status: mockStatus,
      fetchStatus: vi.fn(),
      updateSimulation,
      incrementProgress: vi.fn(),
    });

    const { container } = render(<AdminPage />);
    // Find the toggle button - it's the one in the first section
    const toggleBtn = container.querySelector('button.relative.w-20.h-10');
    fireEvent.click(toggleBtn);
    
    expect(updateSimulation).toHaveBeenCalled();
  });
});
