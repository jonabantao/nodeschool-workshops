const fs = require('fs');
const path = require('path');

function handleDirAndExt (dir, ext, callback) {
  fs.readdir(dir, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    const filtered = data.filter(file => path.extname(file) === `.${ext}`);
    callback(null, filtered);
  });
}

module.exports = handleDirAndExt;