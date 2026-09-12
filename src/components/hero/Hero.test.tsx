import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the value proposition as the page H1', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /I build, test and automate software for confidence\./i,
    );
  });

  it('renders the eyebrow positioning text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/QA ENGINEER · TEST AUTOMATION · SOFTWARE QUALITY/i),
    ).toBeInTheDocument();
  });

  it('renders the supporting statement', () => {
    render(<Hero />);
    expect(
      screen.getByText(/QA Engineer focused on API, UI and CI\/CD testing\./i),
    ).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<Hero />);
    expect(
      screen.getByRole('region', {
        name: /I build, test and automate software for confidence/i,
      }),
    ).toBeInTheDocument();
  });
});
