// This exercise is about using URL parameters.
// For example, if you have /message/526aa677a8ceb64569c9d4fb, then you should know how to
// extract that value which is an ID of the message.

// Create an Express.js server that processes PUT /message/:id requests
// and produces a SHA-1 hash of the current date combined with the ID from the URL.

// For instance, if the server receives

//     PUT /message/526aa677a8ceb64569c9d4fb

// it will respond with a hash of the current date (as a string) and the ID.

// The SHA-1 can be computed like this:

//     require('crypto')
//       .createHash('sha1')
//       .update(new Date().toDateString() + id)
//       .digest('hex')

const express = require('express');
const app = express();
const crypto = require('crypto');

const PORT = Number(process.argv[2]);

function produceDateIdHash(id) {
  return crypto.createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex');
}

app.put('/message/:id', (req, res) => {
  res.send(produceDateIdHash(req.params.id));
});

app.listen(PORT);