import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from './Router';

describe('Router', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('renders the matched route', () => {
    window.location.hash = '#/work/qinis';

    render(
      <Router
        routes={[
          { path: '/', element: <div>Home</div> },
          { path: '/work/qinis', element: <div>QINIS</div> },
        ]}
      />,
    );

    expect(screen.getByText('QINIS')).toBeInTheDocument();
  });

  it('renders the fallback for unknown routes', () => {
    window.location.hash = '#/nope';

    render(
      <Router
        routes={[{ path: '/', element: <div>Home</div> }]}
        fallback={<div>404</div>}
      />,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
