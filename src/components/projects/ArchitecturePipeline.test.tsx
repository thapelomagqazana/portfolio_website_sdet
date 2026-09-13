import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArchitecturePipeline } from './ArchitecturePipeline';

describe('ArchitecturePipeline', () => {
  it('renders all seven stages', () => {
    render(<ArchitecturePipeline />);
    [
      'Command',
      'Execution Engine',
      'Test / Security Signals',
      'Normalized Results',
      'Evidence Bundle',
      'Policy Gate',
      'Release Decision',
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('exposes the pipeline as a labelled ordered list', () => {
    render(<ArchitecturePipeline />);
    expect(
      screen.getByRole('list', { name: /brikbyteos execution pipeline/i }),
    ).toBeInTheDocument();
  });
});
