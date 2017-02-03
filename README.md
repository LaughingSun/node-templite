# node-templite
a light rendering template api which features placeholders, partials, blocks, block flow and rewndering for urls, markdown and markup. Based ib LaughingSun's Templite syntax, available in many flavors for many platforms.  See (coming soon) for implementations, documentation, details and add-ons.

## Syntax:

name              | definition                    | comment
----------------- | ----------------------------- | ---------------
`template-input` |  ( `literal`? `placeholder` )* `literal`? |
`placeholder`    |  `begin-mark` `type`? ( `length` \| `rendering` )? `values-key`? `partial`? `end-mark` |
`begin-mark`     |  '{'     | begin token [default '{']
`type`           |  '[' `block-name`?   | begin flow block
 |                 \| '@[' `block-name`?  | begin define block
 |                 \| '@' `block-name`?   | reference previously defined block
 |                 \| '![' `block-name`?  | begin else block
 |                 \| ']' `block-name`?   | end block
`block-name`     | `/[\w-]+/`
`length`         | '#'
`rendering`      | `/[&%]/`
`values-key`     |  ( `name-space` ':' | '.'+ )? ( `name-key` ( '.' `name-key` )* )?
`name-space`     | `/[\w]+/`
`name-key`       | `/[^.\s]+/`
`partial`        | ( '<' | '>' ) ( `name-space` '.' )? `partial-name` ( '(' `argument-list`? ')' )?
`argument-list`  | `argument` ( ',' `argument` )*
`argument`       | `/"([^"\\]*\|\\.)*"/` | `/0(x[0-9A-Fa-f]+|o[0-7]+|b[0-1]+])/`
                 | \| `/-?\d+(\.\d+)?/` | value-key
`end-mark`       |  '}'     | end token [default '}']



## Examples:

`Hello, {name}`      # "Hello world" for values = { name: 'world' }

`1 {&comp} 2`       # "1 \&lt; 2" for values = { comp: 1 < 2 }

`name={%value}`     # "name=%20padded%20" for values = { value: " padded " }

`count={#rows}`     # "count=3" for values = { rows: [ 'row0', 'row1', 'row2' ] }

`{[ rows}{.}\n{] rows}` # "row0\nrow1\nrow2\n" for values = { rows: [ 'row0', 'row1', 'row2' ] }

`{[ #rows}{#rows} rows{] rows}` # "" for values = { } or { rows: [] }

`{![ #rows}no rows{] rows}`     # "no rows" for values = { } or { rows: [] }

you can use the {[# for if block flow because it basically takes the length,
which will be undefined or zero if it is undefined or has no content or 
items.

### Advanced - defined blocks
```
{@[show_rows rows}
 {![#.}no rows{]}
 {[#}
   {#.} rows{]}
   {[.}{.}
   {]}
 {]}
{]show_rows}
```
defines a block called show_rows (not that the '@[show_rows' simply defines 
a block that is not immediately render, '[show_rows' also would define the 
same block which would be immediately rendered.)  Since named blocks are 
global your can only use that block name once per template.

and if you added:

`{@show_rows .rows}` for values = { rows: [ 'row0', 'row1', 'row2' ] }

it would render:
```
3 rows
row0
row1
row2
```

## install

`npm install node-templite` or `npm install -g node-templite`

or clone from https://github.com/LaughingSun/node-templite.git

## cli usage (requires global install or full path, execute with `node`)

```
$ node-templite <template-path> <json-values-path> [options]
```

## code usage

```
const Templite = require( 'node-templite' ).Templite
    , templite1 = new Template( 'Hello {[ #name}{name}{]}{![ #name}world{]}
    , values = { name: "Henry" }
    ;

templite1.render( {} );         // Hello world
templite1.render( values );     // Hello Henry
```

## explaination of namespaces

The following namespaces are available:

namespace   | description                         | example
----------- | ----------------------------------- | --------
api         | values available from the api       | api:now
root        | root values passed to the templite  | root:results.rows
local       | values from the current block       | local:rows
<user>      | a namespace included in the options | Math:PI
.           | relative scope to the local scope   | .rows
            | absolute scope to one of the above  | results.rows


## explaination of blocks

The value-key used with a block will determine what values are in the relative scope.  Values from root can be referenced usung their namespace.

Blocks can either be named or unnamed.  For un-named blocks make sure to put whitespace between the begiining part of the tag and the value-key.  If you do not the parser will take it as a block name and you will not get the desired results.

Both Named and un-named blocks can be referenced, so the define block tag is actually just a supress output tag.  

Named blocks can also cause errors if there is a name collision.  Although this only true with in the scoped namespace.  In future versions there is a plan to implement a named block chain to allow block names to be re-used within a child scope, however blocks still will not be allowed to share the same name.

For unnamed blocks the most inner block is assumed for all references and closing tags.  

Closing tags. If your closing tag is mis-matched, ie named with un-named closing or un-named with closing named, you will also get an error.  Likewise is the named closing tag is mismatched with the expended closing tag you will also get an error.

## explaination of partials

Partials are functions that processed the values, this can happen either before ('<') or after ('>') the value is rendered to the value that will replace the placeholder.  

Furthermore, the value-key before the partial will determine what values are in scope of the partial.

both values and partials may include an optional namespace.  If the namespace is present then values or partials are found only within the scope of the namespace.  If no namespace is specified than it will go up the scope chain starting with the partial scope, local block scope, the values root scope and finally to the global scope.  If the namespace is not specified but the value=key is relative (starts with '.'), then the scope with be only either the partial or local block scope.  Partial scope only exists within a partial tag.

## additional documentation and examples can be found at the templite website and the node-templite website, which also includes a jsdoc api reference manual.

MIT licensed.

