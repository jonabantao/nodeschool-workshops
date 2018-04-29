// Connect to MongoDB on port 27017.
// You should connect to the database named learnyoumongo and insert
// a document into the docs collection.

// The document should be a json document with the following properties:

//   * `firstName`
//   * `lastName`

// firstName will be passed as the first argument to the lesson.

// lastName will be passed as the second argument to the lesson.

// Use console.log to print out the object used to create the document.

// Make sure you use JSON.stringify convert it to JSON.

const MongoClient = require('mongodb').MongoClient;
const [ firstName, lastName ] = process.argv.slice(2, 4);

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.error(err);
  }

  const docsCollection = client
    .db('learnyoumongo')
    .collection('docs');

  docsCollection.insertOne(
    { firstName, lastName },
    { forceServerObjectId: true })
    .then(data => console.log(JSON.stringify(data.ops[0])))
    .catch(err2 => console.error(err2));

  client.close();
});