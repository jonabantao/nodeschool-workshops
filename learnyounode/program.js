// console.log('HELLO WORLD');

// // Step 2 - Sum all arguments
// console.log(
//   process.argv.slice(2).reduce((sum, el) => sum + Number(el), 0)
// );

// // Step 3 - Count all '\n' (Sync)
// const fs = require('fs');

// const file = fs.readFileSync(process.argv[2], 'utf8');
// console.log(file.split('\n').length - 1);

// // Step 4 - Count all '\n' (Async)
// const fs = require('fs');
// fs.readFile(
//   process.argv[2],
//   'utf8',
//   (err, file) => {
//     if (err) {
//       return console.log(err);
//     }

//     console.log(file.split('\n').length - 1);
//   }
// );

// // Step 5 - Filter by file extension
// const fs = require('fs');
// const path = require('path');

// const [ dirToCheck, fileExt ] = process.argv.slice(2, 4);
// const regex = new RegExp(`\.${fileExt}`, 'i');
// fs.readdir(
//   dirToCheck,
//   'utf8',
//   (err, data) => {
//     if (err) {
//       return console.log(err);
//     }

    // data.forEach(filename => {
    //   if (regex.test(filename)) {
    //     console.log(filename);
    //   }
    //   if (path.extname(filename) === `.${fileExt}`) {
    //     console.log(filename);
    //   }
    // });
//   }
// );

// // Step 6 - Modules
// const myModule = require('./mymodule');

// const [dirToCheck, fileExt] = process.argv.slice(2, 4);

// myModule(dirToCheck, fileExt, function(err, data) {
//   if (err) {
//     return console.log(err);
//   }

//   data.forEach(filename => console.log(filename));
// });

// // Step 7 - HTTP Client - GET request to arg
// const https = require('http');

// https.get(process.argv[2], (response) => {
//   response.setEncoding('utf8');
//   response.on('data', console.log);
//   response.on('error', console.error);
// }).on('err', console.error);

// // Step 8 HTTP Collect - return length of chars and string
// const https = require('http');
// const bl = require('bl');

// https.get(process.argv[2], response => {
//   response.pipe(bl((err, data) => {
//     if (err) {
//       return console.error(err);
//     }

//     const res = data.toString();
//     console.log(res.length);
//     console.log(res);
//   }));
// });

// // Step 9 Return requests in order
// const http = require('http');
// const bl = require('bl');

// const urls = process.argv.slice(2);
// let count = urls.length;

// const results = [];

// urls.forEach((url, index) => {
//   http.get(url, (res) => {
//     res.pipe(bl((err, data) => {
//       if (err) {
//         console.error(err);
//       }

//       results[index] = data.toString();
//       count--;

//       if (count === 0) {
//         results.forEach((result) => {
//           console.log(result);
//         });
//       }
//     }));
//   });
// });

// // Step 10 - TCP
// const net = require('net');
// const strf = require('strftime');
// const PORT = Number(process.argv[2]);

// const server = net.createServer((socket) => {
//   socket.end(strf('%F %R\n'));
// });

// server.listen(PORT);

// // Step 11 - HTTP File Server
// const http = require('http');
// const fs = require('fs');
// const PORT = Number(process.argv[2]);
// const fileLocation = process.argv[3];

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'content-type': 'text/plain' });

//   fs.createReadStream(fileLocation).pipe(res);
// });

// server.listen(PORT);

// // Step 12 - HTTP UPPERCASER
// const http = require('http');
// const map = require('through2-map');
// const PORT = Number(process.argv[2]);

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     res.writeHead(200, { 'content-type': 'text/plain' });

//     req.pipe(map(chunk => chunk.toString().toUpperCase()))
//       .pipe(res);
//   }
// });

// server.listen(PORT);

// Step 13 - HTTP JSON API SERVER
const http = require('http');
const url = require('url');
const PORT = Number(process.argv[2]);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const ISOtime = new Date(query.iso);

  res.writeHead(200, { 'Content-Type': 'application/json' });

  function parseHMS(time) {
    return JSON.stringify({
      'hour': ISOtime.getHours(),
      'minute': ISOtime.getMinutes(),
      'second': ISOtime.getSeconds(),
    });
  }

  function parseUnix(time) {
    return JSON.stringify({ 'unixtime': ISOtime.getTime() });
  }

  function notFound() {
    return JSON.stringify({ 'message': 'Not found' });
  }

  switch (pathname) {
    case '/api/parsetime':
      return res.end(parseHMS(ISOtime));
    case '/api/unixtime':
      return res.end(parseUnix(ISOtime));
    default:
      return res.end(notFound());
  }
});

server.listen(PORT);