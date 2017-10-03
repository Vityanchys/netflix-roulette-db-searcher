import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
  <div>
    <Link to='/counter'>Counter</Link>
    <p />
    <Link to='/film'>FilmItem</Link>
    <h1>The main page</h1>
  </div>
);

export default Main;
