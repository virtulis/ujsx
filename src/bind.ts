import { createDOMElement } from './dom/create';
import { UJSX, UJSXArray, UJSXNonArray } from './common/types';
import { ujsxToHTML } from './html/render';
import { ujsxToDOM } from './dom/convert';
import { extractDOMContext, UJSXDOMContextParam } from './dom/context';
import { createUJSXObject } from './common/object';

export function ujsxFor(ctx: UJSXDOMContextParam) {

	const ectx = extractDOMContext(ctx);

	const createElement = ectx.window
		? (tag: string, attributes: { [key: string]: any }, ...children: any[]) => createDOMElement(ectx, tag, attributes, ...children)
		: (tag: string, attributes: { [key: string]: any }, ...children: any[]) => createUJSXObject(tag, attributes, ...children);

	function ujsxToDOMBound(ujsx: UJSXArray): Node[];
	function ujsxToDOMBound(ujsx: UJSX): Node;
	function ujsxToDOMBound(ujsx: UJSXArray | UJSX): Node[] | Node {
		return ujsxToDOM(ectx, ujsx);
	}

	function ujsx(tag: string | ((props: any) => UJSX), attributes: { [key: string]: any }, ...children: any[]): UJSX {
		if (typeof tag == 'function') return tag(Object.assign({}, attributes, { children }));
		return createElement(tag, attributes, ...children);
	}

	return {
		ujsx,
		ujsxToHTML: (ujsx: UJSX) => ujsxToHTML(ectx, ujsx),
		ujsxToDOM: ujsxToDOMBound
	};

}
