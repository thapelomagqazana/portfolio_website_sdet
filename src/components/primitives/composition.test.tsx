import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section, Stack } from '@/components/layout';
import { Heading, Text } from '@/components/typography';
import { Button, Link } from '@/components/primitives';

describe('component composition', () => {
  it('renders a full hero-style block using only primitives', () => {
    render(
      <Section id="hero" heading="Welcome">
        <Stack gap={6} align="start">
          <Heading level={1} visual="display">
            I build, test and automate software for confidence.
          </Heading>
          <Text size="body-lg" tone="muted">
            QA Engineer focused on API, UI and CI/CD testing.
          </Text>
          <Stack direction="horizontal" gap={4}>
            <Button variant="primary">View Work</Button>
            <Link href="https://linkedin.com" variant="cta-secondary">
              LinkedIn
            </Link>
          </Stack>
        </Stack>
      </Section>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'View Work' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument();
  });
});
