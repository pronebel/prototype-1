var fs = require('fs');
var toml = require('toml');

var parse = function(str) {
  return toml.parse(str);
};

var parseFile = function(file) {
  var content = fs.readFileSync(file);

  return parse(content); 
};

module.exports = {
  parse: parse,
  parseFile: parseFile
};