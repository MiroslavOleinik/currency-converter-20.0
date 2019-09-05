import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateValue, getCurrencys } from './currency'
import './App.css';

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  updateValueDispatch: (curBase) => {
    dispatch(updateValue(curBase))
  }, 
  getCurrencysDispatch: () => {
    dispatch(getCurrencys());
  }
})

class App extends Component {
  state = {
    socketComplite: false
  }

  eventHandler = (type) => ({ target }) => {
    const { state:{ exchangeRates }, updateValueDispatch } = this.props;
    if (type === 'base') {
      updateValueDispatch(target.value);
    } else {
      let curValue = target.value * exchangeRates[type]
      updateValueDispatch(curValue);
    }
  }

  valueHandler = (type) => {
    return Math.round((this.props.state.base / this.props.state.exchangeRates[type]) * 100) / 100;
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getCurrencysDispatch();
      this.setState({
        socketComplite: true,
      });
    }, 1000);
  }

  render() {
    if (this.state.socketComplite) {
      console.log(this.props.state)
      return (
        <Fragment>
          <div>
            <label>Рубль: </label>
            <input min="0" type='number' value={this.props.state.base} onChange={this.eventHandler('base')}/>
          </div>
          <div>
            <label>Евро: </label>
            <input min="0" type='number' value={this.valueHandler('euroCourse')} onChange={this.eventHandler('euroCourse')}/>
          </div>
          <div>
            <label>Доллар: </label>
            <input min="0" type='number' value={this.valueHandler('dollarCourse')} onChange={this.eventHandler('dollarCourse')}/>
          </div>
          <div>
            <label>Фунты: </label>
            <input min="0" type='number' value={this.valueHandler('poundCourse')} onChange={this.eventHandler('poundCourse')}/>
          </div>
        </Fragment>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(App);
