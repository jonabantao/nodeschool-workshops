// Here we are going to update a document in the users collection.

// The database name will be accessible via process.argv[2].

// Say we have a user defined like:

//     {
//       "name": "Tina",
//       "age": 30,
//       "username": "tinatime"
//     }

// We want to change Tina's age from 30 to 40.

// For the purpose of this lesson, assume that the username property is unique.

const MongoClient = require('mongodb').MongoClient;
const databaseName = process.argv[2];

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.error(err);
  }

  const docsCollection = client
    .db(databaseName)
    .collection('users');

  docsCollection.update({
    name: 'Tina',
  }, {
    $set: {
      age: 40
    },
  })
    .then(() => console.log('success'))
    .catch(err2 => console.error(err2));

  client.close();
});