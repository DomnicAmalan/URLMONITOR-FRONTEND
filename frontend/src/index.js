import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { ThemeProvider, LoadingProvider, AuthenticationContextProvider } from 'hooks';
import i18n from './hooks/i18n';

ReactDOM.render(
    <LoadingProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<h1>Hi</h1>}>
            <App />
          </Suspense>
        </I18nextProvider>
      </ThemeProvider>
    </LoadingProvider>,
  document.getElementById('root')
);
