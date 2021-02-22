import AppRoute from './modules/AppRT';
import Guestlayout from 'layouts'

const listRoutes = [
  {
    layout: Guestlayout,
    routes: [...AppRoute],
  },
];

export default listRoutes;
