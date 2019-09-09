/* eslint-disable no-case-declarations */
const initialState = {
  base: 0,
  exchangeRates: {},
};

export function getCurrencys(value) {
  switch (value.type) {
    case 'dollarCourse':
      return {
        type: 'GET_CURRENCY',
        payload: {
          dollarCourse: value[value.type],
        },
      };
    case 'euroCourse':
      return {
        type: 'GET_CURRENCY',
        payload: {
          euroCourse: value[value.type],
        },
      };
    case 'poundeCourse':
      return {
        type: 'GET_CURRENCY',
        payload: {
          poundeCourse: value[value.type],
        },
      };
    default:
      return {
        type: 'GET_CURRENCY',
        payload: {
          ...value.exchangeRates,
        },
      };
  }
}

export function updateValue(value) {
  return {
    type: 'UPDATE_CURRENCY',
    payload: {
      value,
    },
  };
}

export function currency(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CURRENCY':
      const { value } = action.payload;
      return {
        ...state,
        base: value,
      };
    case 'GET_CURRENCY':
      return {
        ...state,
        exchangeRates: {
          ...state.exchangeRates,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
