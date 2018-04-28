// Most of the times we're building RESTful API servers with JSON.

// Write a server that, when it receives a GET, reads a file, parses it to JSON,
// and responds with that content to the user.

// The server should respond to any GET that matches the /books resource path.
// As always, the port is passed in process.argv[2]. The file to read is passed
// in process.argv[3].

// Respond with:

//     res.json(object)

// Everything should match the /books resource path.

// For reading the file, use the fs module, e.g.,

//     fs.readFile(filename, callback)

const express = require('express');
const fs = require('fs');
const app = express();

const PORT = Number(process.argv[2]);
const fileToRead = process.argv[3];

app.get('/books', (req, res) =>{
  fs.readFile(fileToRead, (err, fileData) => {
    if (err) {
      return res.status(500).json({ message: 'Error occured' });
    }

    res.status(200).json(JSON.parse(fileData));
  });
});

app.listen(PORT);