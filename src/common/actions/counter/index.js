import { fetchCounterApi } from '../../api/counter';

export const SET_COUNTER = 'SET_COUNTER';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const FETCH_COUNTER_REQUEST = "FETCH_COUNTER_REQUEST";
export const FETCH_COUNTER_SUCCESS = "FETCH_COUNTER_SUCCESS";
export const FETCH_COUNTER_FAILURE = "FETCH_COUNTER_FAILURE";

export const set = (value) => ({
  type: SET_COUNTER,
  payload: value
});

export const increment = () => ({
  type: INCREMENT_COUNTER
});

export const decrement = () => ({
  type: DECREMENT_COUNTER
});

export const incrementIfOdd = () => (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    return;
  }

  dispatch(increment());
}

export const incrementAsync = (delay = 1000) => dispatch => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
}

const requestCounter = () => ({ type: FETCH_COUNTER_REQUEST });
const receivedCounter = counter => ({ type: SET_COUNTER, payload: counter });
const fetchError = () => ({ type: FETCH_COUNTER_FAILURE });

export const fetchCounter = () => dispatch => {
  dispatch(requestCounter());
  return fetchCounterApi()
    .then(counter => {dispatch(receivedCounter(counter)) })
    .catch(err => dispatch(fetchError(err)));
};
