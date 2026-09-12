import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders a link to #main by default', () => {
    render(<SkipLink />);
    expect(
      screen.getByRole('link', { name: /skip to main content/i }),
    ).toHaveAttribute('href', '#main');
  });

  it('accepts a custom target and label', () => {
    render(<SkipLink href="#content">Jump to content</SkipLink>);
    expect(
      screen.getByRole('link', { name: 'Jump to content' }),
    ).toHaveAttribute('href', '#content');
  });
});
