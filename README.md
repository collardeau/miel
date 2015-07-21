# Miel.js [![Build Status](https://travis-ci.org/collardeau/miel.svg?branch=master)](https://travis-ci.org/collardeau/miel)
A sweetener for a more concise javaScript syntax.

## Usage

```javascript
function translate(word) {-}
    translation:= 'le ' + word
    if (word === 'miel') {-}
        translation = 'honey'
    return translation

```
compiles to:

```javascript
function translate(word) {
    var translation= 'le ' + word
    if (word === 'miel') {
        translation = 'honey'
    }
    return translation
}
```

Miel does **two things**:
* wraps code after ```{-}``` (based on indentation).
* changes declarations from ```:=``` to ```var```

## Installation ##

Use [gulp-miel](https://github.com/collardeau/gulp-miel) to run in a Gulp build.

Use [miel-loader](https://github.com/collardeau/miel-loader) to run for Webpack.


## Miel Syntax

### {-} Wrap 

The ```{-}``` syntax will wrap the code following it that is **more indented** than the line it is on. It is a hyphen in between the brackets, which can be spaced out.

```{-}``` will also carry over comments, parenthesis, or a semi-colons that are on the same line after it. For example:

```javascript
$("button").click(function(){-});
    doSomething();
```
compiles to:
```javascript
$("button").click(function(){
  doSomething();
});
```

```{-}``` can be used anywhere that needs bracket wrapping like with if statement or an object:

```javascript```
if(true){-}
  return true
else {-}
  return false

bee := {-};
  family: 'Honey Bee',
  colonySize: 50000
  
```
Miel does not touch semi-colons. You can have them in, or not, after ```{-}```.

```"{-}"``` (wrapped in single or double quotes) will never be invoked. Also, Miel will ignore any ```{-}``` with any characters but comment or punctuation behind it (as a safety for an invalid invocation). 

### := Variable Declaration 

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
### Conclusion
Don't get bogged down counting and moving brackets, or letting var keywords clutter your view; so you can better focus on the task at hand!
  
  
