import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileMenu } from './MobileMenu';

describe('MobileMenu', () => {
  it('hides the drawer by default', () => {
    render(<MobileMenu activeSection={null} />);
    expect(
      screen.getByRole('button', { name: /open navigation menu/i }),
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the drawer when the trigger is clicked', async () => {
    render(<MobileMenu activeSection={null} />);
    const trigger = screen.getByRole('button', {
      name: /open navigation menu/i,
    });

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('dialog', { name: /navigation/i }),
    ).toBeInTheDocument();
  });

  it('closes the drawer when Escape is pressed', async () => {
    render(<MobileMenu activeSection={null} />);
    const trigger = screen.getByRole('button', {
      name: /open navigation menu/i,
    });

    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('returns focus to the trigger after closing', async () => {
    render(<MobileMenu activeSection={null} />);
    const trigger = screen.getByRole('button', {
      name: /open navigation menu/i,
    });

    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');

    expect(trigger).toHaveFocus();
  });

  it('moves focus into the drawer when opened', async () => {
    render(<MobileMenu activeSection={null} />);
    await userEvent.click(
      screen.getByRole('button', { name: /open navigation menu/i }),
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});
