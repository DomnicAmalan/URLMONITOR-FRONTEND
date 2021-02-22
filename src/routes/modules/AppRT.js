import LandingPage from 'pages/LandingPage';
import Dashboard from 'pages/Dashboard';

const prefix = '/app';

const routes = [
  {
    path: `${prefix}`,
    component: LandingPage,
    exact: true,
  },
  {
    path: `${prefix}/dashboard`,
    component: Dashboard,
    exact: true,
  },
];

export default routes;
