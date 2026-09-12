import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavLink } from './NavLink';

describe('NavLink', () => {
  it('renders a link with the given label', () => {
    render(<NavLink href="#work" label="Work" active={false} />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'href',
      '#work',
    );
  });

  it('exposes aria-current="true" when active', () => {
    render(<NavLink href="#work" label="Work" active />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('does not set aria-current when inactive', () => {
    render(<NavLink href="#work" label="Work" active={false} />);
    expect(screen.getByRole('link', { name: 'Work' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
