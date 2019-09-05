let express = require('express');
const enableWs = require('express-ws')
let app = express();
enableWs(app);
const port = 3000;

app.ws('/api', (ws, req) => {
  ws.on('message', msg => {
    const initCurrency = {
      base: 0,
      exchangeRates: {
        dollarCourse: Math.round((Math.random() * (3 - 2) + 2) * 100) / 100,
        euroCourse: Math.round((Math.random() * (3 - 2) + 2) * 100) / 100,
        poundCourse: Math.round((Math.random() * (3 - 2) + 2) * 100) / 100,
      }
    }
    switch (msg) {
    case 'UPDATE':
        ws.send(JSON.stringify(initCurrency));
      break;
    default:
        ws.send(JSON.stringify(initCurrency));
      break;
    }
  });
});

app.listen(port);
