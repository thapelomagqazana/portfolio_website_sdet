import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /engineering quality, not just finding bugs/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all four pillars as labelled terms', () => {
    render(<About />);
    expect(screen.getByText('QA experience')).toBeInTheDocument();
    expect(screen.getByText('Development background')).toBeInTheDocument();
    expect(screen.getByText('Current studies')).toBeInTheDocument();
    expect(screen.getByText('Career direction')).toBeInTheDocument();
  });

  it('renders the intro paragraph', () => {
    render(<About />);
    expect(
      screen.getByText(/I approach testing as an engineering discipline/i),
    ).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<About />);
    expect(
      screen.getByRole('region', {
        name: /engineering quality, not just finding bugs/i,
      }),
    ).toBeInTheDocument();
  });
});
