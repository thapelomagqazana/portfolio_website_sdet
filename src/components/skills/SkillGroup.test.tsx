import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillGroup } from './SkillGroup';
import { skillGroups } from '@/content/skills';

describe('SkillGroup', () => {
  const testGroup = skillGroups.find((g) => g.id === 'test')!;

  it('renders the group label as a heading', () => {
    render(<SkillGroup group={testGroup} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Test' }),
    ).toBeInTheDocument();
  });

  it('renders the purpose statement', () => {
    render(<SkillGroup group={testGroup} />);
    expect(
      screen.getByText(/verify software behaves as intended/i),
    ).toBeInTheDocument();
  });

  it('renders every capability in the group', () => {
    render(<SkillGroup group={testGroup} />);
    ['Functional', 'Regression', 'API', 'Database', 'Usability'].forEach(
      (item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      },
    );
  });

  it('exposes the group as a labelled region', () => {
    render(<SkillGroup group={testGroup} />);
    expect(screen.getByRole('region', { name: 'Test' })).toBeInTheDocument();
  });

  it('marks the group icon as decorative', () => {
    const { container } = render(<SkillGroup group={testGroup} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render skill bars or percentages', () => {
    const { container } = render(<SkillGroup group={testGroup} />);
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
    expect(container.textContent).not.toMatch(/%/);
  });
});
