import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QinisPage } from './QinisPage';

describe('QinisPage', () => {
  it('renders all nine case-study sections', () => {
    render(<QinisPage />);

    [
      'Overview',
      'Problem',
      'Architecture',
      'Engineering Decisions',
      'Quality Model',
      'Implementation',
      'Current Status',
      'Lessons',
      'Repository',
    ].forEach((title) => {
      expect(
        screen.getByRole('heading', { level: 2, name: title }),
      ).toBeInTheDocument();
    });
  });

  it('exposes QINIS as the page H1', () => {
    render(<QinisPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'QINIS' }),
    ).toBeInTheDocument();
  });

  it('provides a back-to-work link', () => {
    render(<QinisPage />);
    const backLinks = screen.getAllByRole('link', { name: /back to work/i });
    expect(backLinks[0]).toHaveAttribute('href', '#/');
  });
});
