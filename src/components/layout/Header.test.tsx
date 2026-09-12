import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders a banner landmark', () => {
    render(<Header>Logo</Header>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('is sticky by default', () => {
    render(<Header>Logo</Header>);
    expect(screen.getByRole('banner')).toHaveClass('sticky');
  });

  it('can opt out of sticky positioning', () => {
    render(<Header sticky={false}>Logo</Header>);
    expect(screen.getByRole('banner')).not.toHaveClass('sticky');
  });
});
