import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateValue, getCurrencys } from './Currency';
import CurrenceField from './CurrenceField';
import CurrencysNews from './CurrencysNews';
import './App.css';

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
  constructor() {
    super();
    this.socket = new WebSocket('ws://localhost:3000/api');
  }

  state = {
    liveUpdateCurrencys: [],
  }

  valueHandler = (type) => {
    const { base, exchangeRates } = this.props;
    return Math.round((base / exchangeRates[type]) * 100) / 100;
  }

  eventHandler = (type) => ({ target }) => {
    const { exchangeRates, updateValueDispatch } = this.props;
    const { value } = target;
    if (type === 'base') {
      updateValueDispatch(value);
    } else {
      let curValue = value * exchangeRates[type]
      updateValueDispatch(curValue);
    }
  }

  getExchangeCurrencys() {
    this.socket.onmessage = (event) => {
      const { data } = event;
      const { getCurrencysDispatch } = this.props;
      if (data === 'Sending...') {
        console.log(data);
      } else {
        const updates = JSON.parse(data);
        getCurrencysDispatch(updates);
        if (updates.type !== 'baseCourse') {
          this.renderLiveCurrencysUpdates(updates);
        }
      }
    }
  }

  renderLiveCurrencysUpdates(value) {
    this.setState((state) => {
      let { liveUpdateCurrencys } = state;
      liveUpdateCurrencys.push(value);
      return {
        liveUpdateCurrencys: liveUpdateCurrencys,
      }
    });
  }

  componentDidMount() {
    this.getExchangeCurrencys();
  }

  render() {
    const { liveUpdateCurrencys } = this.state;
    const { base, exchangeRates } = this.props;
    if (Object.keys(exchangeRates).length === 0 ) {
      return (
        <div className="preloader"></div>
      )
    }
    return (
      <div className="currency-converter">
        <div className="exchange-fields-wrapper">
          <CurrenceField label={'Рубль'} value={base} change={this.eventHandler('base')}/>
          <CurrenceField label={'Доллар'} value={this.valueHandler('dollarCourse')} change={this.eventHandler('dollarCourse')}/>
          <CurrenceField label={'Евро'} value={this.valueHandler('euroCourse')} change={this.eventHandler('euroCourse')}/>
          <CurrenceField label={'Фунты'} value={this.valueHandler('poundCourse')} change={this.eventHandler('poundCourse')}/>
        </div>
        <div className="currencys-news-wrapper">
          {liveUpdateCurrencys.map((element) => {
            const { type } = element;
            return <CurrencysNews label={type} value={element[type]}/>
          })}
        </div>
      </div>
    )
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(App);
