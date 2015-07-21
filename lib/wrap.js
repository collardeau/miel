var indent = '(^[ \\t]*)';
var SYMBOL = '{-}';
var REGEX = new RegExp('^' + indent + 
                       '(.*){ *- *}(?!["\\\']| *\\w)' + 
                       '(.*)' + 
                       '((\\s+\\1(?!\\n)\\s+\\S.*)*)', 'm');

module.exports = function wrap(input) {
  var output = input.replace(REGEX, '$1$2{$4\n$1}$3')
  if(input === output) return input
  return wrap(output);
}

