const express = require('express');
const app = express();
const PORT = Number(process.argv[2]);
const staticPath = process.argv[3];

app.use(express.static(staticPath));

app.listen(PORT);