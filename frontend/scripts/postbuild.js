var fs = require('fs');
var path = require("path");
var files = fs.readdirSync('./build/').filter(fn => fn.endsWith('.js.__backup'));

const handleError = file => err => {
  if (err) {
    return void console.error(err);
  }
  console.log(`deleted ${file}`);
};

files.forEach(file => fs.unlink(path.resolve('./build/', file), handleError(file)));

