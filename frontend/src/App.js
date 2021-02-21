import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import indexRoutes from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationContextProvider } from 'hooks';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/app" />
      {indexRoutes.map(({ routes }) =>
        routes.map(({ path, exact, component: Component }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => (
              <>
                <ToastContainer limit={3} />
                <AuthenticationContextProvider>
                  <Component {...props} />
                </AuthenticationContextProvider>
              </>
            )}
          />
        ))
      )}
    </Switch>
  </BrowserRouter>
);

export default withTranslation()(App);
