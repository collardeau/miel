var wrap = require('./wrap.js');
var declare = require('./declare.js');

module.exports = function(input){
  return declare(wrap(input));
};
