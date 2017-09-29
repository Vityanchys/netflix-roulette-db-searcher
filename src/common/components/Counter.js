import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ increment, incrementIfOdd, incrementAsync, decrement, randomRefresh, counter }) => (
  <p>
    Clicked: {counter} times
    {' '}
    <button onClick={randomRefresh}>Refresh by API</button>
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={incrementIfOdd}>Increment if odd</button>
    {' '}
    <button onClick={() => incrementAsync()}>Increment async</button>
  </p>
);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  randomRefresh: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;
