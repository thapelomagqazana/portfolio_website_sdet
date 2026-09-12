import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProofStrip } from './ProofStrip';

describe('ProofStrip', () => {
  it('renders all five proof items', () => {
    render(<ProofStrip />);
    expect(screen.getByText('2+ Years')).toBeInTheDocument();
    expect(screen.getByText('ISTQB®')).toBeInTheDocument();
    expect(screen.getByText('Azure')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  it('groups items as a labelled region', () => {
    render(<ProofStrip />);
    expect(
      screen.getByRole('region', { name: /professional proof points/i }),
    ).toBeInTheDocument();
  });

  it('does not render animated counters', () => {
    render(<ProofStrip />);
    // No element should carry aria-live or a role of "timer".
    expect(document.querySelector('[aria-live]')).toBeNull();
    expect(document.querySelector('[role="timer"]')).toBeNull();
  });
});
