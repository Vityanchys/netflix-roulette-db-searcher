import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../../actions/counter';

import { default as CounterComponent } from './Counter.jsx';

class Counter extends Component {
  static initialAction() {
    return CounterActions.fetchCounter();
  }

  componentDidMount() {
    if (!this.props.counter) {
      this.props.dispatch(Counter.initialAction());
    }
  }

  render() {
    return <CounterComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
