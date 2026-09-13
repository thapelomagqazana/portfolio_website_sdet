import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrikByteCard } from './BrikByteCard';

describe('BrikByteCard', () => {
  it('renders the project name and tagline', () => {
    render(<BrikByteCard />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'BrikByteOS' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/release confidence from the command line/i),
    ).toBeInTheDocument();
  });

  it('renders the terminal demonstration', () => {
    render(<BrikByteCard />);
    expect(screen.getByText('bb run')).toBeInTheDocument();
    expect(screen.getByText('RELEASE: PASS')).toBeInTheDocument();
  });

  it('renders a CTA to the case study', () => {
    render(<BrikByteCard />);
    const cta = screen.getByRole('link', { name: /explore brikbyteos/i });
    expect(cta).toHaveAttribute('href', '#/work/brikbyteos');
  });
});
