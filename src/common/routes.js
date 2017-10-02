import Counter from './components/Counter';
import { Main, Page404 } from "./containers/pages";

const routes = [
  {
    path: "/",
    exact: true,
    component: Main
  },
  {
    path: "/counter",
    component: Counter
  },
  {
    path: "*",
    component: Page404
  }
];

export default routes;