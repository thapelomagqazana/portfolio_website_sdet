import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fonts first — self-hosted, no external requests (NFR-010, NFR-012)
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

// Design system — tokens + base layer
import './styles/globals.css';

import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
