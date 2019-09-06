let initialState = {
  base: 0,
  exchangeRates: {},
}

export function getCurrencys(value) {
  return {
    type: 'GET_CURRENCY',
    payload: {
      ...value.exchangeRates
    },
  }
}

export function updateValue(value) {
  return {
    type: 'UPDATE_CURRENCY',
    payload: {
      value
    },
  }
}

export function currency(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CURRENCY':
      const { value } = action.payload;
      return {
        ...state,
        base: value,
      }
      
    case 'GET_CURRENCY':
      return {
        ...state,
        exchangeRates: action.payload,
      }
    default:
      return state;
  }
}
