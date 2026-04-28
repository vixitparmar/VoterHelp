import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('HomePage Component', () => {
  it('renders the hero section title', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('hero.title_part1')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('features.process.title')).toBeInTheDocument();
    expect(screen.getByText('features.timeline.title')).toBeInTheDocument();
    expect(screen.getByText('features.support.title')).toBeInTheDocument();
  });
});
