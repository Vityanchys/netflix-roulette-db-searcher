import { Counter, FilmItem } from './components';
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
    path: "/film",
    component: FilmItem
  },
  {
    path: "*",
    component: Page404
  }
];

export default routes;
