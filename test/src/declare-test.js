let should = require("chai").should();
let declare = require("../../lib/declare");

let input, key;

describe('rewrites variable declarations from smalltalk syntax', () => {

  it('works in the basic case', ()=> {
    input = '\nalbum := "vitalogy"\n';
    key = '\nvar album = "vitalogy"\n'; 
    declare(input).should.equal(key);
  });

  it('is not phased by spaces ahead of it', () => {
    input = '  abc:= def;';
    key = '  var abc= def;';
    declare(input).should.equal(key);
  });

  it('is not phased by tabs ahead of it', () => {
    input = '\n\t\tabc:= def;';
    key = '\n\t\tvar abc= def;';
    declare(input).should.equal(key);
  });

  it('is not phased by a variable that starts with $', () => {
    input = '  $abc := def';
    key = '  var $abc = def';
    declare(input).should.equal(key);
  });

  it('is not phased by a variable that starts with _', () => {
    input = '\n\n_abc := def;';
    key = '\n\nvar _abc = def;';
    declare(input).should.equal(key);
  });

  it('not phased by a number in the variable', ()=> {
    input = '\nalbum4 := "no code"\n';
    key = '\nvar album4 = "no code"\n'; 
    declare(input).should.equal(key);
  });

  it('ignores the call if there are two words in front of it', () => {
    input = 'junk abc:= def;'
    declare(input).should.equal(input);
  });

  it('ignores the symbol if too late on the line', ()=> {
    input = '\n\nvar random = "i love to use :="\n';
    key = '\n\nvar random = "i love to use :="\n';
    declare(input).should.equal(key);
  });

  it('ignores some craziness that closely resembles the signature', ()=> {
    input = '\nfoo("baz := bar")';
    key = '\nfoo("baz := bar")';
    declare(input).should.equal(key);
  });

  it('does multiple passes (as per g modifier)', ()=> {
    input = 'album := "vitalogy"\nsong := "whipping"'
    key = 'var album = "vitalogy"\nvar song = "whipping"'; 
    declare(input).should.equal(key);
  });

});
