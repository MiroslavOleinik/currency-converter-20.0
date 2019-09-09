
/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';

const CurrencysNews = (props) => {
  const { label, value } = props;
  let currencyName = '';
  switch (label) {
    case 'dollarCourse':
      currencyName = 'Доллар';
      break;
    case 'euroCourse':
      currencyName = 'Евро';
      break;
    case 'poundCourse':
      currencyName = 'Фунты';
      break;
    default:
      break;
  }
  return (
    <div className="currencys-item">
      <span>
        {currencyName}
:
        {' '}
      </span>
      <span>{value}</span>
    </div>
  );
};

export default CurrencysNews;
