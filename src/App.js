import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import indexRoutes from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationContextProvider } from 'hooks';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './configs/theme'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/app" />
      {indexRoutes.map(({ layout: Layout, routes }) =>
        routes.map(({ path, exact, component: Component }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => (
              <ThemeProvider theme={theme}>
                <ToastContainer limit={3} />
                <AuthenticationContextProvider>
                  <Layout>
                    <Component {...props} />
                  </Layout>
                </AuthenticationContextProvider>
              </ThemeProvider>
            )}
          />
        ))
      )}
    </Switch>
  </BrowserRouter>
);

export default withTranslation()(App);
