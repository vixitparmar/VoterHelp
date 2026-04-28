import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import useStore from '../services/store';

// Mock useStore
vi.mock('../services/store', () => ({
  default: vi.fn(),
}));

describe('MainLayout', () => {
  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      progress: 50,
    });
  });

  const renderWithRouter = (ui) => {
    return render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="test" element={<div>Test Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders navigation links', () => {
    renderWithRouter();
    expect(screen.getAllByText('nav.home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('nav.process').length).toBeGreaterThan(0);
  });

  it('renders the children content via Outlet', () => {
    renderWithRouter();
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('shows the progress bar percentage', () => {
    renderWithRouter();
    expect(screen.getByText('50%')).toBeDefined();
  });
});
