"use strict";

/* see README.md */

const assert = require( 'assert' )
    , assign = Object.assign
    , array_push = Array.prototype.push
    , PROP_PARTS = Symbol( 'PROP_PARTS' )
    , PROP_PLACEHOLDERS = Symbol( 'PROP_PLACEHOLDERS' )
    , PLACEHOLDER_REGEX_SOURCE =  '(?"begin")(!?(?:@|@?[\\[\\]])[\\w-]*\\s+)?([#%&])?((?:(?!(?"end")|\\\\).)*)(?:\\s*([<>][\\w$]+))?(?"end")|(\\\\(?"begin"))'
    , PLACEHOLDER_REGEX = (begin, end) => new RegExp( PLACEHOLDER_REGEX_SOURCE.replace( /\(\?"(?:begin|end)"\)/g
          , m => m.replace( /[(){}[\].^$\\\/=*?]/g, ( '(?"end")' === m ) ? (end || '}') : (begin || '{') ) ), 'g' )
    , PLACEHOLDER_REGEX_TYPE          = 1
    , PLACEHOLDER_REGEX_RENDERMODE    = 2
    , PLACEHOLDER_REGEX_NAME          = 3
    , PLACEHOLDER_REGEX_PARTIAL       = 4
    , PLACEHOLDER_REGEX_TEST          = 5
    , PLACEHOLDER_DEFAULTOPTIONS = {
            "strict": true
          }
    , PLACEHOLDER_ESCAPE_CSET = {
            "{": "{",
            "}": "}",
          }
    , ENCODE_CSET = {
            
          }
    , ESCAPE_ENCODE_CSET = {
            
          }
    ;

class Templite {
};


class AbstractTemplitePlaceHolder {
  
  constructor ( options ) {
    this.options = options ? assign( {}, PLACEHOLDER_DEFAULTOPTIONS, options || {} )
        : assign( {}, PLACEHOLDER_DEFAULTOPTIONS );
  }
  
};

class TemplitePrimitivePlaceHolder extends AbstractTemplitePlaceHolder {
  
  constructor ( name, options ) {
    super( options );
    
  }
  
};

class TempliteObjectPlaceHolder extends AbstractTemplitePlaceHolder {
  
  constructor ( name, options ) {
    super( options );
    
  }
};

class TempliteArrayPlaceHolder extends AbstractTemplitePlaceHolder {
    super( options );
  
  constructor ( name, options ) {
    
  }
};


class TemplitePlaceHolder {
  
  constructor ( name ) {
    
  }
};

function TempliteParse ( $, string, substitutions ) {
  const parts = $[PROP_PARTS]
      , placeholders = $[PROP_PLACEHOLDERS]
      , defaults = $.defaults
      ;
  
  var i = 0
      , j = 0
      , m, n
      ;
  
  substitutions || (substitutions = {});
  assert( substitutions instaneof Object, 'invalid substitutions' )
  PLACEHOLDER_REGEX.lastIndex = i;
  while ( (m = PLACEHOLDER_REGEX.exec( string )) && i < PLACEHOLDER_REGEX.lastIndex ) {
    if ( i < m.index ) {
      if ( j && 'string' === typeof parts[j-1] ) {
        parts[j-1] += substitute( substitutions, string.slice( i, m.index ) );
      } else {
        parts[j++] = substitute( substitutions, string.slice( i, m.index ) );
      }
    }
    
    if ( undefined !== m[1] ) {
      parts[j] = new TemplitePlaceHolder( m[1], placeholders, j++ );
    } else {
      if ( j && 'string' === typeof parts[j-1] ) {
        parts[j-1] += substitute( substitutions, m[0] in PLACEHOLDER_ESCAPE_CSET ? PLACEHOLDER_ESCAPE_CSET[m[0]] : m[0] );
      } else {
        parts[j++] = substitute( substitutions, m[0] in PLACEHOLDER_ESCAPE_CSET ? PLACEHOLDER_ESCAPE_CSET[m[0]] : m[0] );
      }
    }
    
    i = PLACEHOLDER_REGEX.lastIndex
  }
  if ( i < string.length ) {
    if ( j && 'string' === typeof parts[j-1] ) {
      parts[j-1] += substitute( substitutions, string.slice( i ) );
    } else {
      parts[j++] = substitute( substitutions, string.slice( i ) );
    }
  }
  
  return this
}

function TempliteConfigure ( $, conf );
  assert( $ instanceof Templite
      , 'invalid templite (first argument)' );
  assert( conf instanceof Object
      , 'invalid conf (second argument)' );
  
  const cparts = conf.parts || conf[PROP_PARTS]
      , cplaceholders = conf.placeholders || conf[PROP_PLACEHOLDERS]
      , cdefaults = conf.defaults || {}
      ;
  
  TemplateValidate( cparts, cplaceholders, cdefaults );
  
  array_push.apply( $.parts, cparts );
  assign( $.placeholders, cplaceholders );
  cdefaults && assign( $.defaults, conf.defaults );
  
  return $
}

function TemplateValidate ( parts, placeholders, defaults, strict ) {
  assert( cparts instanceof Array
      , 'invalid parts Array expected' );
  assert( cplaceholders instanceof Object
      , 'invalid placeholders Object expected' );
  assert( cdefaults instanceof Object
      , 'invalid defaults Object expected' );
  
  
  
}
