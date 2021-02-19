import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import indexRoutes from './routes';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/home" />
      {indexRoutes.map(({ routes }) =>
        routes.map(({ path, exact, component: Component }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => (
              // <Layout>
              <Component {...props} />
              // </Layout>
            )}
          />
        ))
      )}
    </Switch>
  </BrowserRouter>
);

export default withTranslation()(App);
