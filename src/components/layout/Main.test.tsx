import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Main } from './Main';

describe('Main', () => {
  it('renders a main landmark with id="main" by default', () => {
    render(<Main>Content</Main>);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main');
    expect(main).toHaveAttribute('tabindex', '-1');
  });

  it('accepts a custom id', () => {
    render(<Main id="content">Content</Main>);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'content');
  });
});
