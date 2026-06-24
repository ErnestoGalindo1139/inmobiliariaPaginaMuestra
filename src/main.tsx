import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './InmobiliariaPaginaMuestra/context/AuthContext';
import { UIProvider } from './InmobiliariaPaginaMuestra/context/UIContext';
import { InmobiliariaPaginaMuestraApp } from './InmobiliariaPaginaMuestraApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UIProvider>
        <HashRouter>
          <InmobiliariaPaginaMuestraApp />
        </HashRouter>
      </UIProvider>
    </AuthProvider>
  </StrictMode>
);
