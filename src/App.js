import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateValue, getCurrencys } from './currency'
import CurrenceField from './CurrenceField'
import './App.css';

const socket = new WebSocket('ws://localhost:3000/api');

const mapStateToProps = (state) => ({
  base: state.base,
  exchangeRates: state.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  updateValueDispatch: (curBase) => {
    dispatch(updateValue(curBase))
  }, 
  getCurrencysDispatch: (value) => {
    dispatch(getCurrencys(value));
  },
});

class App extends Component {
  state = {
    socketComplite: false
  }

  eventHandler = (type) => ({ target }) => {
    const { exchangeRates, updateValueDispatch } = this.props;
    if (type === 'base') {
      updateValueDispatch(target.value);
    } else {
      let curValue = target.value * exchangeRates[type]
      updateValueDispatch(curValue);
    }
  }

  valueHandler = (type) => {
    return Math.round((this.props.base / this.props.exchangeRates[type]) * 100) / 100;
  }

  exchangeRateseUpdate() {
    socket.onopen = () => {
      socket.send('Opened');
    }
    socket.onmessage = (event) => {
      if (event.data === 'Sending...') {
        console.log(event.data);
      } else {
        console.log(JSON.parse(event.data));
        this.props.getCurrencysDispatch(JSON.parse(event.data));
      }
    }
  }

  componentDidMount() {
    this.exchangeRateseUpdate();
  }

  render() {
    if (Object.keys(this.props.exchangeRates).length === 0 ) {
      return (
        <div className="preloader"></div>
      )
    }
    return (
      <Fragment>
        <CurrenceField label={'Рубль'} value={this.props.base} change={this.eventHandler('base')}/>
        <CurrenceField label={'Доллар'} value={this.valueHandler('dollarCourse')} change={this.eventHandler('dollarCourse')}/>
        <CurrenceField label={'Евро'} value={this.valueHandler('euroCourse')} change={this.eventHandler('euroCourse')}/>
        <CurrenceField label={'Фунты'} value={this.valueHandler('poundCourse')} change={this.eventHandler('poundCourse')}/>
      </Fragment>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(App);
