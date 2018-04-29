// Here we will learn how to search for documents but only fetch the fields
// we need. Also known as projection in MongoDB

// Use the parrots collection from the database named learnyoumongo to
// find all documents where age is greater than the first argument
// passed to your script.

// The difference from the last lesson will be that we only want the
// name and age properties

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

  collection
    .find({ 
      age: { $gt: age } 
    })
    .project({ _id: 0 })
    .toArray((err2, docs) => {
      if (err2) {
        return console.log(err2);
      }

      console.log(docs);
    });

  client.close();
});