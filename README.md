# µJSX

µJSX is a trivial JSX-to-DOM/HTML processor.\
It can be used with TypeScript or JavaScript,
in browser, on server or with a custom DOM context (like jsdom).

If given a DOM context, it will produce DOM nodes right away.
Otherwise it will return simple objects that can be converted
to HTML or DOM later.

You can mix real DOM and µJSX objects too.


## Warning

This package contains a declaration that "JSX elements"
are also DOM elements.

This may not actually be true when running on server
(or if using a different JSX factory in the same project).

Unfortunately I don't know of an easy way to make that distinction
while allowing code like `document.body.appendChild(<div>Hi!</div>)`
in browser (which currently compiles and works perfectly well).


## Exports

### auto

An object containing three functions (`ujsx`, `ujsxToHTML`, `ujsxToDOM`)
bound either to browser DOM context
or to no DOM context (in which case `ujsxToDOM` will fail if called).

These bound functions are also exported separately.

### ujsx(tag, attributes, ...children)

The main method that can be used as a drop-in JSX factory (see below).

If given a DOM context, it will produce DOM nodes right away.
Otherwise it will return simple objects that can be converted
to HTML or DOM with two functions defined below.

Note that if there is a DOM context
you can also pass DOM nodes as children.

### ujsxToHTML(ujsx)

Converts anything that its sibling `ujsx()` can return to a HTML string.

### ujsxToDOM(ujsx | ujsx[])

Given a DOM context converts uJSX objects to DOM a dom element
or array thereof.

This function is a no-op for elements created in the browser
since they're already DOM nodes.

### ujsxFor({ window?, document? })

Create a bundle of functions for a given DOM context (like `auto`).
`document` is assumed to be `window.document` if not passed.

`window` is also used to obtain `Node` and `Element` classes
which `instanceof` is used on
(therefore mixing DOM elements from different documents won't work).

    import { ujsxFor } from 'ujsx';
    import { JSDOM } from 'jsdom';
    const dom = new JSDOM(...);
    const { ujsx, ujsxToDOM } = ujsxFor({ window: dom.window });

### isUJSXObject(obj)

Returns true if `obj` seems compatible with what `createUJSXObject()`
returns (basically duck-typing
by checking for `tag`, `attributes` and `children` properties).

### createUJSXObject(tag, attributes, ...children)

Explicitly creates an intermediate object even if DOM is present.
(this is what `ujsx()` falls back to if there is no `window`).


## Usage with TypeScript in .tsx files

    {
        "compilerOptions": {
            "jsx": "react",
            "jsxFactory": "ujsx"
        },
        "include": [
            "./**/*.tsx"
        ]
    }


## Feedback

If you think there's something wrong or something is missing,
please contact me :)

 * [Issue tracker](https://bitbucket.org/verypositive/ujsx/issues)
 * [Email](mailto:danko@very.lv)


## License

MIT
