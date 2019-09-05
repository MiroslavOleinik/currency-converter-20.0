const socket = new WebSocket('ws://localhost:3000/api');
let initialState = {}
socket.onopen = () => {
  socket.send('UPDATE');
}
socket.onmessage = (event) => {
  initialState = JSON.parse(event.data);
}

export function getCurrencys() {
  return {
    type: 'GET_CURRENCY',
    payload: {
      ...initialState
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
        ...action.payload,
      }
    default:
      return state;
  }
}
