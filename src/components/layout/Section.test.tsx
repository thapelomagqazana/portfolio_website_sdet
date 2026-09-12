import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('exposes an accessible landmark when given a heading', () => {
    render(
      <Section id="work" heading="Selected Work">
        <p>Content</p>
      </Section>,
    );

    const region = screen.getByRole('region', { name: 'Selected Work' });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('id', 'work');
  });

  it('renders without a heading when none is provided', () => {
    render(
      <Section>
        <p>Content</p>
      </Section>,
    );

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
