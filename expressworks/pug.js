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