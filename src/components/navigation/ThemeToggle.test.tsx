import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders three theme options', () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole('button', { name: /light theme/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /dark theme/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /system theme/i }),
    ).toBeInTheDocument();
  });

  it('marks the active mode with aria-pressed', () => {
    render(<ThemeToggle />);
    // Default mode is "system"
    expect(
      screen.getByRole('button', { name: /system theme/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: /light theme/i }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('changes the mode when a button is clicked', async () => {
    render(<ThemeToggle />);

    await userEvent.click(screen.getByRole('button', { name: /light theme/i }));

    expect(
      screen.getByRole('button', { name: /light theme/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('persists the choice to localStorage', async () => {
    render(<ThemeToggle />);

    await userEvent.click(screen.getByRole('button', { name: /dark theme/i }));

    expect(window.localStorage.getItem('theme')).toBe('dark');
  });
});
