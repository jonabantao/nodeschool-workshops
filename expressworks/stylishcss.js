const express = require('express');
const stylus = require('stylus');
const path = require('path');

const app = express();
const PORT = Number(process.argv[2]);
const stylusFiles = process.argv[3];

app.use(stylus.middleware(stylusFiles));
app.use(express.static(stylusFiles));

// app.get('/main.css', (req, res) => {
//   res.send(req.body);
// });

app.listen(PORT);