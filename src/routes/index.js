import AppRoute from './modules/AppRT';
import Guestlayout from '../components/layouts/guestLayout'

const listRoutes = [
  {
    layout: Guestlayout,
    routes: [...AppRoute],
  },
];

export default listRoutes;
