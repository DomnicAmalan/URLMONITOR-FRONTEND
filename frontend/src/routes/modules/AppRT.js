import LandingPage from '../../pages/LandingPage';

const prefix = '/home';

const routes = [
  {
    path: `${prefix}`,
    component: LandingPage,
    exact: true,
  },
];

export default routes;
