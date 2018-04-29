// Next up is aggregation. Aggregation allows one to do things like
// calculate the sum of a field of multiple documents or the average
// of a field of documents meeting particular criteria.

// Say you have a collection named prices. Each price document is modeled
// like so:

//     {
//       "name": "Tshirt",
//       "size": "S",
//       "price": 10,
//       "quantity": 12
//       "meta": {
//         "vendor": "hanes",
//         "location": "US"
//       }
//     }

// In this exercise, we need to calculate the average price for all documents
// in the prices collection in the database named learnyoumongo that have
// the size that will be passed as the first argument to your script.

// Use console.log() to print the average price rounded to 2 decimal places
// to stdout after you have found it.

const MongoClient = require('mongodb').MongoClient;
const size = process.argv[2];

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) {
    return console.error(err);
  }

  const db = client.db('learnyoumongo');

  db.collection('prices').aggregate([
    { $match: { size } },
    { $group: {
        _id: 'average',
        average: { $avg: '$price' },
      }
    },
  ]).toArray((err2, docs) => {
    if (err2) {
      return console.log(err2);
    }

    console.log(docs[0].average.toFixed(2));
  });

  client.close();
});