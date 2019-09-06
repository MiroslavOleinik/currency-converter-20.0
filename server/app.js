let express = require('express');
let app = express();
const enableWs = require('express-ws')(app);
const port = 3000;

app.get('/api', function(req, res) {
  res.send('Work!');
});

app.ws('/api', (webs, req) => {
  webs.on('open', () => {
    console.log('Opened');
  });
  webs.on('message', (msg) => {
    let initCurrency = {
      base: 0,
      exchangeRates: {
        dollarCourse: Math.round((Math.random() * (3 - 2) + 2) * 100) / 100,
        euroCourse: Math.round((Math.random() * (3 - 2) + 2) * 100) / 100,
        poundCourse: Math.round((Math.random() * (3 - 2) + 2) * 100) / 100,
      }
    }
    webs.send('Sending...');
    webs.send(JSON.stringify(initCurrency));
  });
});

app.listen(port);
