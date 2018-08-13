import { UJSX, UJSXArray } from '../common/types';
import { isDOMElement, UJSXDOMContext } from './context';
import { createDOMElement } from './create';
import { flatten } from '../common/util';
import { createUJSXObject, isUJSXObject, UJSXObject } from '../common/object';

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 10;

export function ujsxObjectToDOM(ctx: UJSXDOMContext, obj: UJSXObject) {
	return createDOMElement(ctx, obj.tag, obj.attributes, obj.children);
}

export function ujsxToDOM(ctx: UJSXDOMContext, ujsx: UJSXArray): Node[];
export function ujsxToDOM(ctx: UJSXDOMContext, ujsx: UJSX): Node;
export function ujsxToDOM(ctx: UJSXDOMContext, ujsx: UJSX): Node | Node[] {

	const document = ctx.document!;

	if (typeof ujsx != 'object') return document.createTextNode(String(ujsx));
	if (Array.isArray(ujsx)) return flatten<UJSX>(ujsx).map(e => ujsxToDOM(ctx, e) as Node);
	if (isDOMElement(ctx, ujsx)) return ujsx;
	if (!isUJSXObject(ujsx)) return document.createTextNode(String(ujsx));

	return ujsxObjectToDOM(ctx, ujsx);

}

export function domToUJSX(node: Node | any): UJSX {
	
	const nt = node && node.nodeType;

	const recc = () => Array.from(node.childNodes).map(
		cn => domToUJSX(cn)
	);

	if (!nt || nt == TEXT_NODE) return node && node.textContent;
	if (nt == DOCUMENT_NODE || nt == DOCUMENT_FRAGMENT_NODE) return recc();

	if (nt != ELEMENT_NODE) return null;
	const el = node as Element;

	const attrs = {} as Record<string, string>;
	for (let attr of Array.from(el.attributes)) {
		attrs[attr.name] = attr.value;
	}

	return createUJSXObject(el.tagName, attrs, recc());

}
