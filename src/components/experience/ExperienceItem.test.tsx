import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExperienceItem } from './ExperienceItem';
import type { ExperienceEntry } from '@/content/experience';

const sampleEmployment: ExperienceEntry = {
  id: 'alula',
  kind: 'employment',
  organisation: 'Alula Technologies',
  position: 'Test Analyst Intern',
  dates: 'May 2025 – Apr 2026',
  location: 'Pretoria, South Africa',
  summary: 'Hands-on QA work across functional testing.',
  responsibilities: ['Created 100+ test scenarios.'],
  metrics: [{ value: '100+', label: 'Test scenarios' }],
};

const sampleProject: ExperienceEntry = {
  id: 'qinis',
  kind: 'project',
  organisation: 'QINIS',
  position: 'Independent Project',
  dates: '2026 – Present',
  summary: 'Ongoing engineering project.',
  responsibilities: ['Designed the architecture.'],
  evidence: [
    { label: 'View case study', url: '/work/qinis', kind: 'internal' },
  ],
};

describe('ExperienceItem', () => {
  it('renders organisation, position and dates in the summary', () => {
    render(<ExperienceItem entry={sampleEmployment} />);
    expect(screen.getByText('Alula Technologies')).toBeInTheDocument();
    expect(screen.getByText('Test Analyst Intern')).toBeInTheDocument();
    expect(screen.getByText('May 2025 – Apr 2026')).toBeInTheDocument();
  });

  it('renders the correct role kind badge', () => {
    render(<ExperienceItem entry={sampleEmployment} />);
    expect(screen.getByText('EMPLOYMENT')).toBeInTheDocument();
  });

  it('renders the project badge for independent work', () => {
    render(<ExperienceItem entry={sampleProject} />);
    expect(screen.getByText('INDEPENDENT PROJECT')).toBeInTheDocument();
  });

  it('uses native <details> for expandable content', () => {
    render(<ExperienceItem entry={sampleEmployment} />);
    // details is collapsed by default for non-qinis entries
    const details = document.querySelector('details');
    expect(details).not.toBeNull();
    expect(details).not.toHaveAttribute('open');
  });

  it('exposes responsibilities when expanded', async () => {
    render(<ExperienceItem entry={sampleEmployment} />);
    const summary = document.querySelector('summary')!;

    await userEvent.click(summary);

    expect(
      screen.getByText('Created 100+ test scenarios.'),
    ).toBeInTheDocument();
  });

  it('renders metrics inside the expanded content', () => {
    render(<ExperienceItem entry={sampleEmployment} />);
    // Force-open for the assertion
    const details = document.querySelector('details')!;
    details.setAttribute('open', '');

    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('Test scenarios')).toBeInTheDocument();
  });
});
