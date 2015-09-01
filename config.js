var util = require('util');
var configParser = require('./tools').configParser;
var ConfigFile = './config.toml';

var _config = configParser.parseFile(ConfigFile);
var mode = _config.mode;

var config = {};
Object.keys(_config).forEach(function(key) {
  var configItem = _config[key];

  if(!util.isUndefined(configItem[mode])) {
    config[key] = configItem[mode];
  } else {
    config[key] = configItem;
  }
});

module.exports = config;