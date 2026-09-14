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
          { path: '/', element: () => <div>Home</div> },
          { path: '/work/qinis', element: () => <div>QINIS</div> },
        ]}
      />,
    );

    expect(screen.getByText('QINIS')).toBeInTheDocument();
  });

  it('renders the fallback for unknown routes', () => {
    window.location.hash = '#/nope';

    render(
      <Router
        routes={[{ path: '/', element: () => <div>Home</div> }]}
        fallback={<div>404</div>}
      />,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('passes dynamic params to the element render function', () => {
    window.location.hash = '#/insights/qinis-lessons';

    render(
      <Router
        routes={[
          {
            path: '/insights/:slug',
            element: ({ slug }) => <div>Note: {slug}</div>,
          },
        ]}
      />,
    );

    expect(screen.getByText('Note: qinis-lessons')).toBeInTheDocument();
  });

  it('prefers exact matches over dynamic segments', () => {
    window.location.hash = '#/insights';

    render(
      <Router
        routes={[
          { path: '/insights', element: () => <div>Index</div> },
          {
            path: '/insights/:slug',
            element: () => <div>Detail</div>,
          },
        ]}
      />,
    );

    expect(screen.getByText('Index')).toBeInTheDocument();
    expect(screen.queryByText('Detail')).not.toBeInTheDocument();
  });
});
