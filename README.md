# Miel.js 
[![Build Status](https://travis-ci.org/collardeau/miel.svg?branch=master)](https://travis-ci.org/collardeau/miel)
[![Coverage Status](https://coveralls.io/repos/collardeau/miel/badge.svg?branch=master&service=github)](https://coveralls.io/github/collardeau/miel?branch=master)

[![Join the chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/collardeau/miel?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A javaScript pre-loader to add indentation syntax, (a la Sass or CoffeeScript).

Check out the REPL:
[https://rawgit.com/collardeau/Miel-REPL/master/public/index.html](https://rawgit.com/collardeau/Miel-REPL/master/public/index.html)

The blog post (rant):
[https://medium.com/@collardeau/what-craziness-drove-me-to-write-a-javascript-syntax-extension-fadc04bd36e9](https://medium.com/@collardeau/what-craziness-drove-me-to-write-a-javascript-syntax-extension-fadc04bd36e9)


## Usage

```javascript
function translate(word) {-}
    var translation = 'le ' + word
    if (word === 'miel') {-}
        translation = 'honey'
    return translation

```
compiles to:

```javascript
function translate(word) {
    var translation = 'le ' + word
    if (word === 'miel') {
        translation = 'honey'
    }
    return translation
}
```

## Installation ##

Use [gulp-miel](https://github.com/collardeau/gulp-miel) to run in a Gulp build.

Use [miel-loader](https://github.com/collardeau/miel-loader) for a Webpack bundle.

You can run these in tandem with Babel.

## Miel Syntax

### {-} Wrap 

The ```{-}``` syntax will wrap the code following it that is **more indented** than the line it is on. (It is a hyphen in between brackets). The hyphen can be spaced out: ```{ -  }``` and still be recognized by Miel.

```{-}``` carries over comments, parenthesis, or semi-colons that are on the same line after it. 
For example:

```javascript
describe("works with indentation', () => {-});
    it('smartly knows when to wrap code');
```

compiles to:

```javascript
describe("works with indentation', () => {
    it('smartly knows when to wrap code');
});
```

```{-}``` can be used anywhere that needs bracket wrapping like with if statement, or for an object literal:

```javascript```
if(true){-}
  return true
else {-}
  return false

var bee = {-}
  family: 'Honey Bee',
  colonySize: 50000
  
```
Miel does not touch semi-colons. You can have them in, or not, after {-} (and they will be carried down).

"{-}" (wrapped in single or double quotes) will never be invoked.

## Experimental

The following features are likely to change in the near future.

### Variable Declaration 

Miel recognizes a variable declaration using the Smalltalk type syntax ```:=```, and it will convert it to a ```var``` declaration.

```javascript
syntax:= 'miel';
language := 'javaScript';
```
compiles to:

```javascript
var syntax= 'miel';
var language = 'javaScript';
```
## Conclusion
Don't get bogged down counting and moving brackets, and you can better focus on the task at hand!
  
  
