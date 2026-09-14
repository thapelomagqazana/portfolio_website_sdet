import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Journey } from './Journey';

describe('Journey', () => {
  it('renders the section heading', () => {
    render(<Journey />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /from construction to quality engineering/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all six career stages', () => {
    render(<Journey />);
    [
      'Construction',
      'Systems Development',
      'Software Testing',
      'QA Engineering',
      'Test Automation',
      'Quality Engineering',
    ].forEach((label) => {
      expect(
        screen.getByRole('heading', { level: 3, name: label }),
      ).toBeInTheDocument();
    });
  });

  it('renders the narrative paragraph', () => {
    render(<Journey />);
    expect(
      screen.getByText(/construction taught me to think about systems/i),
    ).toBeInTheDocument();
  });

  it('exposes the timeline as an ordered list', () => {
    render(<Journey />);
    expect(
      screen.getByRole('list', { name: /career progression/i }),
    ).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<Journey />);
    expect(
      screen.getByRole('region', {
        name: /from construction to quality engineering/i,
      }),
    ).toBeInTheDocument();
  });
});
