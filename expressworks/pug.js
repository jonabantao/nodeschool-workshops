// Create an Express.js app with a home page rendered by the Pug template engine.

// The home page should respond to / home.

// The view should show the current date using 'new Date().toDateString()'.

// We use 'toDateString()' to simply return the date in a human - readable format
// without the time.

const express = require('express');
const app = express();
const PORT = Number(process.argv[2]);
const pugPath = process.argv[3];

app.set('views', pugPath);
app.set('view engine', 'pug');

app.get('/home', (req, res) => {
  res.render('index', { date: new Date().toDateString() });
});

app.listen(PORT);