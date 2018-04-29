// Here we will learn how to count the number of documents that
// meet certain criteria.

// Use the parrots collection from the database named learnyoumongo to
// count all documents where age is greater than the first argument
// passed to your script.

// Using console.log, print the number to stdout.

const MongoClient = require('mongodb').MongoClient;
const age = Number(process.argv[2]);

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.error(err);
  }

  const db = client.db('learnyoumongo');

  db.collection('parrots').count({ age: { $gt: age } })
    .then(console.log)
    .catch(err2 => console.error(err2.message));

  client.close();
});