import { Router } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';
import { QinisPage } from '@/pages/QinisPage';
import { BrikBytePage } from '@/pages/BrikBytePage';
import { InsightsPage } from '@/pages/InsightsPage';
import { NotePage } from '@/pages/NotePage';
import { CvPage } from '@/pages/CvPage';

/**
 * App — root component.
 *
 * Routes:
 *   /                  HomePage (all sections)
 *   /work/qinis        QINIS case study
 *   /work/brikbyteos   BrikByteOS case study
 *   /insights          Engineering Notes index
 *   /insights/:slug    Individual note
 *
 * Route ordering matters: exact paths must come before any
 * dynamic segment that could otherwise match them. So
 * "/insights" is listed before "/insights/:slug".
 *
 * Every `element` is a render function that receives the
 * matched params (empty object for static routes).
 */
function App() {
  return (
    <Router
      routes={[
        { path: '/', element: () => <HomePage /> },
        { path: '/work/qinis', element: () => <QinisPage /> },
        { path: '/work/brikbyteos', element: () => <BrikBytePage /> },
        { path: '/insights', element: () => <InsightsPage /> },
        {
          path: '/insights/:slug',
          element: ({ slug }) => <NotePage slug={slug ?? ''} />,
        },
        { path: '/cv', element: () => <CvPage /> },
      ]}
    />
  );
}

export default App;
