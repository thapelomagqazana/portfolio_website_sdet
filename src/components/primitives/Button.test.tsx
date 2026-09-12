import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children as accessible text', () => {
    render(<Button>View Work</Button>);
    expect(
      screen.getByRole('button', { name: 'View Work' }),
    ).toBeInTheDocument();
  });

  it('defaults to type="button" to avoid accidental form submits', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('fires onClick when activated by keyboard', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);

    const button = screen.getByRole('button', { name: 'Press' });
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is discoverable by role even when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });
});
