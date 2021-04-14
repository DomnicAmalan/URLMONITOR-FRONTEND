import AppRoute from './modules/AppRT';
import MainLayout from 'layouts/Main'

const listRoutes = [
  {
    layout: MainLayout,
    routes: [...AppRoute],
  },
];

export default listRoutes;
