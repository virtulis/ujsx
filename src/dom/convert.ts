import { UJSX, UJSXArray, UJSXNonArray } from '../common/types';
import { isDOMElement, UJSXDOMContext } from './context';
import { createDOMElement } from './create';
import { flatten } from '../common/util';
import { isUJSXObject, UJSXObject } from '../common/object';

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
