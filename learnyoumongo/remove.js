// This lesson involves removing a document with the given _id.

// The database name will be accessible via process.argv[2].

// The collection name will be passed as the second argument to your script.

// The _id will be passed as the third argument to your script.

const MongoClient = require('mongodb').MongoClient;
const databaseName = process.argv[2];
const collectionName = process.argv[3];
const idToDelete = process.argv[4];

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.error(err);
  }

  const collection = client
    .db(databaseName)
    .collection(collectionName);

  collection.deleteOne({ _id: idToDelete })
    .then(() => client.close())
    .catch(() => client.close());
});