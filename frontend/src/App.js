import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import indexRoutes from './routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <Component {...props} />
              </>
            )}
          />
        ))
      )}
    </Switch>
  </BrowserRouter>
);

export default withTranslation()(App);
