import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Certifications } from './Certifications';

describe('Certifications', () => {
  it('renders the section heading', () => {
    render(<Certifications />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /independent validation/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders both certifications', () => {
    render(<Certifications />);
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /ISTQB® Certified Tester — Foundation Level/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /Microsoft Certified: Azure Fundamentals/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders both issuers', () => {
    render(<Certifications />);
    expect(screen.getByText('ISTQB®')).toBeInTheDocument();
    expect(screen.getByText('Microsoft')).toBeInTheDocument();
  });

  it('exposes the section as a labelled region', () => {
    render(<Certifications />);
    expect(
      screen.getByRole('region', { name: /independent validation/i }),
    ).toBeInTheDocument();
  });

  it('does not invent credential IDs or verify links', () => {
    render(<Certifications />);
    // No credential ID text, no "Verify credential" links until
    // real IDs exist.
    expect(screen.queryByText(/^ID:/)).toBeNull();
    expect(
      screen.queryByRole('link', { name: /verify credential/i }),
    ).toBeNull();
  });
});
