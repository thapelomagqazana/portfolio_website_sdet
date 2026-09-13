import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TerminalDemo } from './TerminalDemo';

describe('TerminalDemo', () => {
  it('renders the command', () => {
    render(<TerminalDemo />);
    expect(screen.getByText('bb run')).toBeInTheDocument();
  });

  it('renders all four success lines', () => {
    render(<TerminalDemo />);
    ['Tests', 'Security', 'Quality', 'Evidence'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders the release decision', () => {
    render(<TerminalDemo />);
    expect(screen.getByText('RELEASE: PASS')).toBeInTheDocument();
  });

  it('exposes an accessible figure landmark', () => {
    render(<TerminalDemo />);
    expect(
      screen.getByRole('figure', { name: /brikbyteos terminal output/i }),
    ).toBeInTheDocument();
  });

  it('does not depend on animation to convey meaning', () => {
    render(<TerminalDemo />);
    // No aria-live region, no role="timer", no animated counters
    expect(document.querySelector('[aria-live]')).toBeNull();
    expect(document.querySelector('[role="timer"]')).toBeNull();
  });
});
