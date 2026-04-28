import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

const ThrowError = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Content')).toBeDefined();
  });

  it('renders error UI when a child throws', () => {
    // Suppress console.error for this test to keep output clean
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/Something went wrong/i)).toBeDefined();
    expect(screen.getByText(/unexpected error/i)).toBeDefined();
    
    spy.mockRestore();
  });
});
