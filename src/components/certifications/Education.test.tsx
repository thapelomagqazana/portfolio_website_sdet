import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from './Education';

describe('Education', () => {
  it('renders the section heading', () => {
    render(<Education />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /academic and technical foundation/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all three institutions', () => {
    render(<Education />);
    ['UNISA', 'WeThinkCode_', 'Wits'].forEach((name) => {
      expect(
        screen.getByRole('heading', { level: 3, name }),
      ).toBeInTheDocument();
    });
  });

  it('renders every programme', () => {
    render(<Education />);
    expect(
      screen.getByText('BSc Computer Science & Mathematics'),
    ).toBeInTheDocument();
    expect(screen.getByText('NQF 5 Systems Development')).toBeInTheDocument();
    expect(screen.getByText('BSc Construction Studies')).toBeInTheDocument();
  });

  it('renders every date range', () => {
    render(<Education />);
    expect(screen.getByText('2026 – Present')).toBeInTheDocument();
    expect(screen.getByText('2022 – 2024')).toBeInTheDocument();
    expect(screen.getByText('2017 – 2021')).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<Education />);
    expect(
      screen.getByRole('region', {
        name: /academic and technical foundation/i,
      }),
    ).toBeInTheDocument();
  });
});
