import { camelToKebab, flatten } from '../common/util';
import { isDOMNode, UJSXDOMContext } from './context';
import { ujsxObjectToDOM } from './convert';
import { isUJSXObject } from '../common/object';

export function createDOMElement(ctx: UJSXDOMContext, tag: string, attributes: { [key: string]: any }, ...children: any[]): HTMLElement | SVGElement {

	const document = ctx.document!;

	const xmlns = attributes && attributes.xmlns;
	const el = xmlns ? document.createElementNS(xmlns, tag) : document.createElement(tag);

	let dangerous: string | void;

	if (attributes) for (let rkey in attributes) {
		let key = rkey.toLowerCase();
		if (key == 'classname') key = 'class';
		if (key == 'htmlfor') key = 'for';

		const rval = attributes[rkey];
		if (rval === false || rval === null || rval === void 0 || typeof rval == 'function') continue;
		if (key == 'dangerouslysetinnerhtml') {
			dangerous = rval.__html;
			continue;
		}

		let val: any;
		if (key == 'style' && typeof rval == 'object') {
			const spairs = [];
			for (let skey in rval) spairs.push(camelToKebab(skey) + ': ' + rval[skey]);
			val = spairs.join('; ');
		}
		else if (Array.isArray(rval)) {
			val = rval.filter(e => e).join(' ');
		}
		else if (typeof rval == 'object') {
			const vkeys = [];
			for (let vkey in rval) if (rval[vkey]) vkeys.push(vkey);
			val = vkeys.join(' ');
		}
		else {
			val = rval === true ? key : rval + '';
		}

		el.setAttribute(key, val);

	}

	if (dangerous) {
		el.innerHTML = dangerous;
	}
	else if (children) {
		for (let cel of flatten(children)) {
			if (isDOMNode(ctx, cel)) el.appendChild(cel);
			else if (isUJSXObject(cel)) el.appendChild(ujsxObjectToDOM(ctx, cel));
			else el.appendChild(document.createTextNode(cel + ''));
		}
	}

	return el;

}
