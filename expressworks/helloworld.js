const express = require('express');
const app = express();
const PORT = Number(process.argv[2]);

app.get('/home', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT);