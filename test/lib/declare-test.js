"use strict";

var should = require("chai").should();
var declare = require("../../lib/declare");

var input = undefined,
    key = undefined;

describe("rewrites variable declarations from smalltalk syntax", function () {

  it("works in the basic case", function () {
    input = "\nalbum := \"vitalogy\"\n";
    key = "\nvar album = \"vitalogy\"\n";
    declare(input).should.equal(key);
  });

  it("is not phased by spaces ahead of it", function () {
    input = "  abc:= def;";
    key = "  var abc= def;";
    declare(input).should.equal(key);
  });

  it("is not phased by tabs ahead of it", function () {
    input = "\n\t\tabc:= def;";
    key = "\n\t\tvar abc= def;";
    declare(input).should.equal(key);
  });

  it("is not phased by a variable that starts with $", function () {
    input = "  $abc := def";
    key = "  var $abc = def";
    declare(input).should.equal(key);
  });

  it("is not phased by a variable that starts with _", function () {
    input = "\n\n_abc := def;";
    key = "\n\nvar _abc = def;";
    declare(input).should.equal(key);
  });

  it("ignores the call if there are two words in front of it", function () {
    input = "junk abc:= def;";
    declare(input).should.equal(input);
  });

  it("ignores the symbol if too late on the line", function () {
    input = "\n\nvar random = \"i love to use :=\"\n";
    key = "\n\nvar random = \"i love to use :=\"\n";
    declare(input).should.equal(key);
  });

  it("ignores some craziness that closely resembles the signature", function () {
    input = "\nfoo(\"baz := bar\")";
    key = "\nfoo(\"baz := bar\")";
    declare(input).should.equal(key);
  });

  it("does multiple passes (as per g modifier)", function () {
    input = "album := \"vitalogy\"\nsong := \"whipping\"";
    key = "var album = \"vitalogy\"\nvar song = \"whipping\"";
    declare(input).should.equal(key);
  });
});