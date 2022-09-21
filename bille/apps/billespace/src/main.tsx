import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/app';
import { Provider } from 'react-redux';
import { ErrorScreen, GlobalStyle, ErrorBoundary } from '@bille/ui';
import { store } from '@bille/billespace-store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary
          fallback={<ErrorScreen text="Unexpected error" fullHeight />}
        >
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </>
);
