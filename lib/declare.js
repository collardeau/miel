var REGEX = new RegExp('^([ \\t]*)([_$a-zA-Z0-9\xA0-\uFFFF]+ *):=', 'gm');

module.exports = function(input){
  return input.replace(REGEX, '$1var $2=');
};
