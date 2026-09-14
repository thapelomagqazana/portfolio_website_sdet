import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the heading as an h2', () => {
    render(<Contact />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /let's build better software/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders the supporting statement', () => {
    render(<Contact />);
    expect(
      screen.getByText(/interested in qa engineering, test automation/i),
    ).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<Contact />);
    expect(
      screen.getByRole('region', {
        name: /let's build better software/i,
      }),
    ).toBeInTheDocument();
  });

  it('does not render a contact form', () => {
    render(<Contact />);
    expect(screen.queryByRole('form')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
