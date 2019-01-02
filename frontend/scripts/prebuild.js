var fs = require('fs');

var { status, chunks = {} } = require('../../webpack-stats.json');
var files = Object.entries(chunks).reduce(
  (arr, [, item]) => arr.concat(item.map(({ path }) => path)),
  []
);

function handleError(err, res) {
  if (err) {
    console.error(err);
  }
}

files.forEach(file => fs.rename(file, `${file}.__backup`, handleError));
