import LandingPage from 'pages/LandingPage';
import SignUp from 'pages/LandingPage/SignUp'
import SignIn from 'pages/LandingPage/SignIn'
import Dashboard from 'pages/Dashboard'
import Logs from 'pages/Logs'

const prefix = '/app';

const routes = [
  {
    path: `${prefix}`,
    component: LandingPage,
    exact: true,
  },
  {
    path: `${prefix}/signin`,
    component: SignIn,
    exact: true,
  },
  {
    path: `${prefix}/signup`,
    component: SignUp,
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
