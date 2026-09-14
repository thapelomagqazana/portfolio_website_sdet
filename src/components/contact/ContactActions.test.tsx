import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactActions } from './ContactActions';

describe('ContactActions', () => {
  it('renders three contact links', () => {
    render(<ContactActions />);
    expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('email link uses a mailto: URI', () => {
    render(<ContactActions />);
    const email = screen.getByRole('link', { name: 'Email' });
    expect(email).toHaveAttribute('href', expect.stringMatching(/^mailto:/));
  });

  it('email link does not open in a new tab', () => {
    render(<ContactActions />);
    const email = screen.getByRole('link', { name: 'Email' });
    expect(email).not.toHaveAttribute('target');
    expect(email).not.toHaveAttribute('rel');
  });

  it('LinkedIn link is external and safe', () => {
    render(<ContactActions />);
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute('href', expect.stringMatching(/^https:/));
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('GitHub link is external and safe', () => {
    render(<ContactActions />);
    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute('href', expect.stringMatching(/^https:/));
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external links announce they open in a new tab', () => {
    render(<ContactActions />);
    expect(
      screen.getByRole('link', { name: /linkedin.*opens in a new tab/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /github.*opens in a new tab/i }),
    ).toBeInTheDocument();
  });

  it('all contact links are keyboard focusable in the documented order', async () => {
    render(<ContactActions />);
    const user = userEvent.setup();

    // Tab order follows the priority order in
    // src/content/contact.ts: Email → Portfolio → LinkedIn → GitHub
    const expectedOrder = [
      { name: 'Email' },
      { name: /portfolio/i },
      { name: /linkedin/i },
      { name: /github/i },
    ];

    for (const { name } of expectedOrder) {
      await user.tab();
      expect(screen.getByRole('link', { name })).toHaveFocus();
    }
  });
});
