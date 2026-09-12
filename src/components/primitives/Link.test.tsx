import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  it('renders an internal link with no target override', () => {
    render(<Link href="/work">View work</Link>);
    const link = screen.getByRole('link', { name: 'View work' });
    expect(link).toHaveAttribute('href', '/work');
    expect(link).not.toHaveAttribute('target');
  });

  it('opens external links safely with a screen-reader hint', () => {
    render(<Link href="https://github.com/thapelo">GitHub</Link>);
    const link = screen.getByRole('link', {
      name: /GitHub.*opens in a new tab/i,
    });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
