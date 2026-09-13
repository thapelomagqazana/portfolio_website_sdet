import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QinisCard } from './QinisCard';

describe('QinisCard', () => {
  it('renders the QINIS name and tagline', () => {
    render(<QinisCard />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'QINIS' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/engineering intelligence for software quality/i),
    ).toBeInTheDocument();
  });

  it('renders the problem heading and body', () => {
    render(<QinisCard />);
    expect(screen.getByText(/the problem/i)).toBeInTheDocument();
    expect(
      screen.getByText(/engineering teams generate many development/i),
    ).toBeInTheDocument();
  });

  it('renders the architecture flow with all five stages', () => {
    render(<QinisCard />);
    const flow = screen.getByRole('list', {
      name: /qinis architecture flow/i,
    });
    expect(flow).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Evidence')).toBeInTheDocument();
    expect(screen.getByText('Quality')).toBeInTheDocument();
    expect(screen.getByText('Decision')).toBeInTheDocument();
  });

  it('renders all seven technology tags', () => {
    render(<QinisCard />);
    [
      'Python',
      'FastAPI',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'CI/CD',
    ].forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders a CTA to the QINIS case study', () => {
    render(<QinisCard />);
    const cta = screen.getByRole('link', { name: /explore qinis/i });
    expect(cta).toHaveAttribute('href', '#/work/qinis');
  });
});
