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
    let { counter, dispatch } = this.props;

    let boundActionCreators = bindActionCreators(CounterActions, dispatch);

    return <CounterComponent counter={counter} {...boundActionCreators} />;
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});

export default connect(
  state => ({
    counter: state.counter
  })
)(Counter);