import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Philosophy } from './Philosophy';

describe('Philosophy', () => {
  it('renders the section heading', () => {
    render(<Philosophy />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /how i think about quality/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all four principles', () => {
    render(<Philosophy />);
    ['Understand', 'Challenge', 'Automate', 'Evidence'].forEach((title) => {
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument();
    });
  });

  it('renders each principle number', () => {
    render(<Philosophy />);
    ['01', '02', '03', '04'].forEach((num) => {
      expect(screen.getByText(num)).toBeInTheDocument();
    });
  });

  it('renders the closing statement', () => {
    render(<Philosophy />);
    expect(
      screen.getByText('Build. Test. Automate. Ship with confidence.'),
    ).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<Philosophy />);
    expect(
      screen.getByRole('region', { name: /how i think about quality/i }),
    ).toBeInTheDocument();
  });
});
