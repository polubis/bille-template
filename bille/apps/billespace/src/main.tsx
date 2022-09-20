import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/app';
import { ErrorScreen, GlobalStyle, ErrorBoundary } from '@bille/ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <ErrorBoundary
        fallback={<ErrorScreen text="Unexpected error" fullHeight />}
      >
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </>
);
