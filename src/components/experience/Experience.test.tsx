import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders the section heading', () => {
    render(<Experience />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /where i've worked and what i built/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all three roles in chronological order', () => {
    render(<Experience />);
    const items = screen.getAllByRole('listitem');
    // The list is scoped inside <ol>; filter the ones
    // belonging to our experience list.
    const organisations = ['QINIS', 'Alula Technologies', 'C. Steinweg Bridge'];
    organisations.forEach((org) => {
      expect(screen.getByText(org)).toBeInTheDocument();
    });
    expect(items.length).toBeGreaterThanOrEqual(3);
  });
});
