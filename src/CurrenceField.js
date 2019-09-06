import React from 'react';
import './App.css';

const CurrenceField = (props) => {
  return <div>
    <label>{props.label}: </label>
    <input min="0" type='number' value={props.value} onChange={props.change}/>
</div>
}

export default CurrenceField;
