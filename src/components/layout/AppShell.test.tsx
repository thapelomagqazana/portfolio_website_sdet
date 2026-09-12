import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders header, main and footer landmarks', () => {
    render(
      <AppShell
        header={<span>Header content</span>}
        footer={<span>Footer content</span>}
      >
        <p>Page content</p>
      </AppShell>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a skip link as the first focusable element', () => {
    render(
      <AppShell footer={<span>Footer</span>}>
        <p>Content</p>
      </AppShell>,
    );

    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    expect(skipLink).toHaveAttribute('href', '#main');
  });

  it('exposes the main landmark with id="main" for the skip link', () => {
    render(
      <AppShell footer={<span>Footer</span>}>
        <p>Content</p>
      </AppShell>,
    );

    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  });

  it('renders children inside main', () => {
    render(
      <AppShell footer={<span>Footer</span>}>
        <p data-testid="page-content">Inside main</p>
      </AppShell>,
    );

    const main = screen.getByRole('main');
    expect(main).toContainElement(screen.getByTestId('page-content'));
  });
});
