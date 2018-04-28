const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = Number(process.argv[2]);

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/form', (req, res) => {
  const reversedString = req.body.str;
  
  res.send(reversedString.split('').reverse().join(''));
});

app.listen(PORT);