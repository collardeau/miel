let should = require("chai").should();
let compile = require("../../lib/wrap");

describe('wraps code that is evoked by the special syntax', () => {

  let input, key;

 it('works with 2 spaces for indentation', () => {

    input = ''+
    '\njunk\n\n  function {-}\n    block\n    block\n\n  junk';
    key = '' +
    '\njunk\n\n  function {\n    block\n    block\n  }\n\n  junk';

    compile(input).should.equal(key);

  });

 it('works with windows carriages returns for indentation', () => {

    input = ''+
    '\r\njunk\r\n\r\n  function {-}\r\n    block\r\n    block\r\n\r\n  junk';
    key = '' +
    '\r\njunk\r\n\r\n  function {\r\n    block\r\n    block\n  }\r\n\r\n  junk';
    // a \r is lost after the last block

    compile(input).should.equal(key);

  });


  it('works with tabs for indentation', () => {

    input = ''+
    '\n\tjunk\n\n\tfunction {-}\n\t\tblock\n\t\tblock\n\n\tjunk';
    key = '' +
    '\n\tjunk\n\n\tfunction {\n\t\tblock\n\t\tblock\n\t}\n\n\tjunk';
    compile(input).should.equal(key);

  });

  it('carries over the semi-colon', () => {

    input = ''+
      '\njunk\n\n  function {-};\n    block\n    block\n\n  junk';
    key = '' +
      '\njunk\n\n  function {\n    block\n    block\n  };\n\n  junk';

    compile(input).should.equal(key);
    
  });

  it('carries over comments', () => {

    input = ''+
      '\njunk\n\n  function {-}; //comment\n    block\n\n  junk';
    key = '' +
      '\njunk\n\n  function {\n    block\n  }; //comment\n\n  junk';

    compile(input).should.equal(key);

  });

 it('works with multi spaces before the next chunk of code', () => {

    input = ''+
    '\nvar foo = function {-}\n  block\n\njunk';
    key = '' +
    '\nvar foo = function {\n  block\n\}\n\njunk'

    compile(input).should.equal(key);

  });

  it('works at the end of the document', () => {

    input = 'junk\n\tfunction {-}\n\t\tblock\n\n\n';
    key   = 'junk\n\tfunction {\n\t\tblock\n\t}\n\n\n'

    compile(input).should.equal(key);

  });

  it('works with lines that start with punctation', () => {

    input = ''+
    '\njunk\n\n  function {-}\n    {block\n    block\n\n  junk';
    key = '' +
    '\njunk\n\n  function {\n    {block\n    block\n  }\n\n  junk';

    compile(input).should.equal(key);

 });


 it('with another nested symbol inside it', () => {

    input = ''+
      '\njunk\n\n  function {-};\n    block"{-}" boo;\n  junk';
    key = '' +
      '\njunk\n\n  function {\n    block"{-}" boo;\n  };\n  junk';

    compile(input).should.equal(key);
    
  });

 it('with an equal sign in there', () => {

    input = ''+
    '\nvar foo = function {-}\n  block\njunk';
    key = '' +
    '\nvar foo = function {\n  block\n\}\njunk'
    compile(input).should.equal(key);

  });

  it('works with with a medley of whitepace and junk before', () => {

    input = ''+
    'junk\n\n\t\n\njunk\nfunction {-}\n  block\n  block\njunk';
    key = '' +
    'junk\n\n\t\n\njunk\nfunction {\n  block\n  block\n}\njunk';
    compile(input).should.equal(key);

  });

  it('works when the user has spaced over too much without writing anything', () => {

    input = ''+
    'junk\nfunction {-}\n  block\n    \n  block\njunk';
    key = '' +
    'junk\nfunction {\n  block\n    \n  block\n}\njunk';
    compile(input).should.equal(key);

  });

  it('works with the user has tabbed over too much without writing anything', () => {

    input = ''+
      'junk\nfunction {-}\n\tblock\n\t\n\t\t\n\tblock\njunk';
    key = '' +
      'junk\nfunction {\n\tblock\n\t\n\t\t\n\tblock\n}\njunk';
    compile(input).should.equal(key);

  });

  it('ignores the symbol when inside quotes', () => {

    input = ''+
      'junk\nfunction "{-}"\n\tblock\n\t\n\t\t\n\tblock\njunk';
    key = '' +
      'junk\nfunction "{-}"\n\tblock\n\t\n\t\t\n\tblock\njunk';
    compile(input).should.equal(key);

  });

  it('ignores the symbol when there is text on the same line directly after it', () => {

    input = ''+
      'junk\nfunction {-}  some text'; 
    key = '' +
      'junk\nfunction {-}  some text'; 
    compile(input).should.equal(key);

  });

  it('accepts the symbol with too much padding space', () => {

    input = 'junk\n\tfunction { - }\n\t\tblock\n\n\n';
    key   = 'junk\n\tfunction {\n\t\tblock\n\t}\n\n\n'

    compile(input).should.equal(key);

  });

  it('wraps even with only one line', () => {

    input = 'function { - }';
    key = 'function {\n}';

    compile(input).should.equal(key);

  });


  it('DOESNT match the indendation given at the top of the block by the user', () => {

    // it wraps the code as soon as it can

    input = ''+
    '\njunk\n\n  function {-}\n\n    block\n    block\n\n  junk';
    key = '' +
    '\njunk\n\n  function {\n\n    block\n    block\n\n  }\n\n  junk';
    //compile(input).should.equal(key);

  });

});
