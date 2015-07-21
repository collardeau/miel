"use strict";

var should = require("chai").should();
var compile = require("../../lib/wrap");

describe("wraps code that is evoked by the special syntax", function () {

  var input = undefined,
      key = undefined;

  it("works with 2 spaces for indentation", function () {

    input = "" + "\njunk\n\n  function {-}\n    block\n    block\n\n  junk";
    key = "" + "\njunk\n\n  function {\n    block\n    block\n  }\n\n  junk";

    compile(input).should.equal(key);
  });

  it("works with windows carriages returns for indentation", function () {

    input = "" + "\r\njunk\r\n\r\n  function {-}\r\n    block\r\n    block\r\n\r\n  junk";
    key = "" + "\r\njunk\r\n\r\n  function {\r\n    block\r\n    block\n  }\r\n\r\n  junk";
    // a \r is lost after the last block

    compile(input).should.equal(key);
  });

  it("works with tabs for indentation", function () {

    input = "" + "\n\tjunk\n\n\tfunction {-}\n\t\tblock\n\t\tblock\n\n\tjunk";
    key = "" + "\n\tjunk\n\n\tfunction {\n\t\tblock\n\t\tblock\n\t}\n\n\tjunk";
    compile(input).should.equal(key);
  });

  it("carries over the semi-colon", function () {

    input = "" + "\njunk\n\n  function {-};\n    block\n    block\n\n  junk";
    key = "" + "\njunk\n\n  function {\n    block\n    block\n  };\n\n  junk";

    compile(input).should.equal(key);
  });

  it("carries over comments", function () {

    input = "" + "\njunk\n\n  function {-}; //comment\n    block\n\n  junk";
    key = "" + "\njunk\n\n  function {\n    block\n  }; //comment\n\n  junk";

    compile(input).should.equal(key);
  });

  it("works with multi spaces before the next chunk of code", function () {

    input = "" + "\nvar foo = function {-}\n  block\n\njunk";
    key = "" + "\nvar foo = function {\n  block\n}\n\njunk";

    compile(input).should.equal(key);
  });

  it("works at the end of the document", function () {

    input = "junk\n\tfunction {-}\n\t\tblock\n\n\n";
    key = "junk\n\tfunction {\n\t\tblock\n\t}\n\n\n";

    compile(input).should.equal(key);
  });

  it("works with lines that start with punctation", function () {

    input = "" + "\njunk\n\n  function {-}\n    {block\n    block\n\n  junk";
    key = "" + "\njunk\n\n  function {\n    {block\n    block\n  }\n\n  junk";

    compile(input).should.equal(key);
  });

  it("with another nested symbol inside it", function () {

    input = "" + "\njunk\n\n  function {-};\n    block\"{-}\" boo;\n  junk";
    key = "" + "\njunk\n\n  function {\n    block\"{-}\" boo;\n  };\n  junk";

    compile(input).should.equal(key);
  });

  it("with an equal sign in there", function () {

    input = "" + "\nvar foo = function {-}\n  block\njunk";
    key = "" + "\nvar foo = function {\n  block\n}\njunk";
    compile(input).should.equal(key);
  });

  it("works with with a medley of whitepace and junk before", function () {

    input = "" + "junk\n\n\t\n\njunk\nfunction {-}\n  block\n  block\njunk";
    key = "" + "junk\n\n\t\n\njunk\nfunction {\n  block\n  block\n}\njunk";
    compile(input).should.equal(key);
  });

  it("works when the user has spaced over too much without writing anything", function () {

    input = "" + "junk\nfunction {-}\n  block\n    \n  block\njunk";
    key = "" + "junk\nfunction {\n  block\n    \n  block\n}\njunk";
    compile(input).should.equal(key);
  });

  it("works with the user has tabbed over too much without writing anything", function () {

    input = "" + "junk\nfunction {-}\n\tblock\n\t\n\t\t\n\tblock\njunk";
    key = "" + "junk\nfunction {\n\tblock\n\t\n\t\t\n\tblock\n}\njunk";
    compile(input).should.equal(key);
  });

  it("ignores the symbol when inside quotes", function () {

    input = "" + "junk\nfunction \"{-}\"\n\tblock\n\t\n\t\t\n\tblock\njunk";
    key = "" + "junk\nfunction \"{-}\"\n\tblock\n\t\n\t\t\n\tblock\njunk";
    compile(input).should.equal(key);
  });

  it("ignores the symbol when there is text on the same line directly after it", function () {

    input = "" + "junk\nfunction {-}  some text";
    key = "" + "junk\nfunction {-}  some text";
    compile(input).should.equal(key);
  });

  it("accepts the symbol with too much padding space", function () {

    input = "junk\n\tfunction { - }\n\t\tblock\n\n\n";
    key = "junk\n\tfunction {\n\t\tblock\n\t}\n\n\n";

    compile(input).should.equal(key);
  });

  it("wraps even with only one line", function () {

    input = "function { - }";
    key = "function {\n}";

    compile(input).should.equal(key);
  });

  it("DOESNT match the indendation given at the top of the block by the user", function () {

    // it wraps the code as soon as it can

    input = "" + "\njunk\n\n  function {-}\n\n    block\n    block\n\n  junk";
    key = "" + "\njunk\n\n  function {\n\n    block\n    block\n\n  }\n\n  junk";
    //compile(input).should.equal(key);
  });
});