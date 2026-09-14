import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

describe('Skills', () => {
  it('renders the section heading', () => {
    render(<Skills />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /what i work with, grouped by purpose/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all four capability groups', () => {
    render(<Skills />);
    ['Test', 'Automate', 'Build', 'Deliver'].forEach((label) => {
      expect(
        screen.getByRole('heading', { level: 3, name: label }),
      ).toBeInTheDocument();
    });
  });

  it('renders automation tools', () => {
    render(<Skills />);
    ['Playwright', 'Selenium', 'JUnit', 'Cypress'].forEach((tool) => {
      expect(screen.getByText(tool)).toBeInTheDocument();
    });
  });

  it('renders build tools', () => {
    render(<Skills />);
    ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'].forEach((lang) => {
      expect(screen.getByText(lang)).toBeInTheDocument();
    });
  });

  it('renders delivery tools', () => {
    render(<Skills />);
    [
      'Git',
      'Docker',
      'CI/CD',
      'GitHub Actions',
      'GitLab CI',
      'Azure DevOps',
    ].forEach((tool) => {
      expect(screen.getByText(tool)).toBeInTheDocument();
    });
  });

  it('exposes the section as a labelled region', () => {
    render(<Skills />);
    expect(
      screen.getByRole('region', {
        name: /what i work with, grouped by purpose/i,
      }),
    ).toBeInTheDocument();
  });
});
