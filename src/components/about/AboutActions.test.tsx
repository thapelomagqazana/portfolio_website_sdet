import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutActions } from './AboutActions';

describe('AboutActions', () => {
  it('renders the journey CTA with the correct destination', () => {
    render(<AboutActions />);
    const link = screen.getByRole('link', {
      name: /more about my journey/i,
    });
    expect(link).toHaveAttribute('href', '#career');
  });

  it('is keyboard focusable', () => {
    render(<AboutActions />);
    const link = screen.getByRole('link', {
      name: /more about my journey/i,
    });
    link.focus();
    expect(link).toHaveFocus();
  });
});
