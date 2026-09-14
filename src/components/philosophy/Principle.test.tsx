import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Principle } from './Principle';
import type { Principle as PrincipleData } from '@/content/philosophy';

const sample: PrincipleData = {
  number: '01',
  title: 'Understand',
  body: 'Understand the system before testing the system.',
};

describe('Principle', () => {
  it('renders the title as a heading', () => {
    render(<Principle principle={sample} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Understand' }),
    ).toBeInTheDocument();
  });

  it('renders the number', () => {
    render(<Principle principle={sample} />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<Principle principle={sample} />);
    expect(
      screen.getByText('Understand the system before testing the system.'),
    ).toBeInTheDocument();
  });

  it('marks the number as decorative', () => {
    const { container } = render(<Principle principle={sample} />);
    const numberSpan = container.querySelector('[aria-hidden="true"]');
    expect(numberSpan).toHaveTextContent('01');
  });
});
