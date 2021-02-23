import LandingPage from 'pages/LandingPage';
import Dashboard from 'pages/Dashboard';
import Logs from 'pages/Logs'

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
  {
    path: `${prefix}/logs`,
    component: Logs,
    exact: true,
  },
];

export default routes;
