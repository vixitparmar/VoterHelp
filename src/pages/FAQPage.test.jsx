import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FAQPage from './FAQPage';
import useStore from '../services/store';

// Mock useStore
vi.mock('../services/store', () => ({
  default: vi.fn(),
}));

describe('FAQPage', () => {
  const mockFaqs = [
    { id: 1, question: 'Question 1', answer: 'Answer 1' },
    { id: 2, question: 'Question 2', answer: 'Answer 2' },
  ];

  beforeEach(() => {
    vi.mocked(useStore).mockReturnValue({
      faqs: mockFaqs,
      fetchFaqs: vi.fn(),
      incrementProgress: vi.fn(),
      loading: false,
    });
  });

  it('renders the FAQ title', () => {
    render(<FAQPage />);
    expect(screen.getByText('faq.title_part1')).toBeDefined();
  });

  it('renders the list of FAQs', () => {
    render(<FAQPage />);
    expect(screen.getByText('Question 1')).toBeDefined();
    expect(screen.getByText('Question 2')).toBeDefined();
  });
});
