import { Router } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';
import { QinisPage } from '@/pages/QinisPage';
import { BrikBytePage } from '@/pages/BrikBytePage';

/**
 * App — root component.
 *
 * Routes:
 *   /                  HomePage (all sections)
 *   /work/qinis        QINIS case study
 *   /work/brikbyteos   BrikByteOS case study
 */
function App() {
  return (
    <Router
      routes={[
        { path: '/', element: <HomePage /> },
        { path: '/work/qinis', element: <QinisPage /> },
        { path: '/work/brikbyteos', element: <BrikBytePage /> },
      ]}
    />
  );
}

export default App;
