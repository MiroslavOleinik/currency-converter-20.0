/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';

const CurrenceField = (props) => {
  const { label, value, change } = props;
  return (
    <div>
      <label htmlFor={label}>
        {label}
:
        {' '}
      </label>
      <input id={label} min="0" type="number" value={value} onChange={change} />
    </div>
  );
};

export default CurrenceField;
