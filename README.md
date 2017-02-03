# node-templite
a light rendering template api which features placeholders, partials, blocks, block flow and rewndering for urls, markdown and markup. Based ib LaughingSun's Templite syntax, available in many flavors for many platforms.  See (coming soon) for implementations, documentation, details and add-ons.

== Syntax:

name              | definition                    | comment
----------------- | ----------------------------- | ---------------
`template-input` |  ( literal? placeholder )* literal? |
`placeholder`    |  begin-mark type? rendering? values-key? partial? end-mark |
`begin-mark`     |  '{'     | begin token [default '{']
`type`           |  '[' `block-name`?   | begin flow block
 |                 \| '@[' `block-name`?  | begin define block
 |                 \| '@' `block-name`?   | reference previously defined block
 |                 \| '![' `block-name`?  | begin else block
 |                 \| ']' `block-name`?   | end block
`values-key`     |  `name-key`? ( '.' `name-key`? )+
`block-name`     | /[\w-]+/
`name-key`       | /[^.\s]+/
`end-mark`       |  '}'     | end token [default '}']

== Examples:

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

=== Advanced - defined blocks
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

`{@show_rows rows}` for values = { rows: [ 'row0', 'row1', 'row2' ] }

it would render:
```
3 rows
row0
row1
row2
```

== install

`npm node-templite`

or clone from https://github.com/LaughingSun/node-templite.git

== usage

```
const Templite = require( 'node-templite' ).Templite
    , templite1 = new Template( 'Hello {[ #name}{name}{]}{![ #name}world{]}
    , values = { name: "Henry" }
    ;

templite1.redner( {} );     // Hello world
templite1.redner( values );     // Hello Henry
```

MIT licensed.

