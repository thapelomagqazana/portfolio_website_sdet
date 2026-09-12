import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroActions } from './HeroActions';

describe('HeroActions', () => {
  it('renders the primary CTA with an internal destination', () => {
    render(<HeroActions />);
    const primary = screen.getByRole('link', { name: /explore my work/i });
    expect(primary).toHaveAttribute('href', '#work');
    expect(primary).not.toHaveAttribute('target');
  });

  it('renders the secondary CTA as an external link', () => {
    render(<HeroActions />);
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute('href', expect.stringMatching(/^https:/));
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('adds a screen-reader hint to the external link', () => {
    render(<HeroActions />);
    expect(
      screen.getByRole('link', { name: /linkedin.*opens in a new tab/i }),
    ).toBeInTheDocument();
  });
});
