import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JourneyStage } from './JourneyStage';
import type { JourneyStage as JourneyStageData } from '@/content/journey';

const pastStage: JourneyStageData = {
  id: 'construction',
  label: 'Construction',
  description: 'An engineering mindset around planning.',
  status: 'past',
};

const presentStage: JourneyStageData = {
  id: 'qa-engineering',
  label: 'QA Engineering',
  description: 'Current focus.',
  status: 'present',
};

describe('JourneyStage', () => {
  it('renders the label as a heading', () => {
    render(<JourneyStage stage={pastStage} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'Construction' }),
    ).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<JourneyStage stage={pastStage} />);
    expect(
      screen.getByText('An engineering mindset around planning.'),
    ).toBeInTheDocument();
  });

  it('marks the timeline dot as decorative', () => {
    const { container } = render(<JourneyStage stage={pastStage} />);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
  });

  it('applies the accent colour to the present stage', () => {
    const { container } = render(<JourneyStage stage={presentStage} />);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).toHaveClass('bg-accent');
  });
});
