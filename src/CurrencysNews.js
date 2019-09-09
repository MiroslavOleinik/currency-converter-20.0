import React from 'react';
import './App.css';

const CurrencysNews = (props) => {
  const { label, value } = props;
  const currencyName = label === 'dollarCourse' ? 'Доллар' : 
  'euroCourse' ? 'Евро' : 'Фунты';
  return <div className="currencys-item">
    <span>{currencyName}: </span>
    <span>{value}</span>
  </div>
}

export default CurrencysNews;
