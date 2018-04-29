// Here we will learn how to search for documents.

// In this exercise the database name is learnyoumongo.
// So, the url would be something like: mongodb://localhost:27017/learnyoumongo

// Use the parrots collection to find all documents where age
// is greater than the first argument passed to your script.

// Using console.log, print the documents to stdout.

const MongoClient = require('mongodb').MongoClient;
const age = Number(process.argv[2]);

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.log(err);
  }

  const collection = client
    .db('learnyoumongo')
    .collection('parrots');

  collection.find({
    age: {
      $gt: age,
    }
  }).toArray((err2, docs) => {
    if (err2) {
      return console.log(err2);
    }

    console.log(docs);
  });

  client.close();
});