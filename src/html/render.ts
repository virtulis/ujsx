import { camelToKebab, flatten } from '../common/util';
import { UJSX } from '../common/types';
import {
	isDOMElement,
	UJSXDOMContext,
	UJSXExtractedDOMContext,
	UJSXNoDOMContext
} from '../dom/context';
import { isUJSXObject } from '../common/object';

const voidTags: { [key: string]: boolean } = {
	area: true,
	base: true,
	br: true,
	col: true,
	command: true,
	embed: true,
	hr: true,
	img: true,
	input: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true
};

function html(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function script(s: string) {
	return s.replace(/<\/script/g, '<\\/script');
}

type String = string | StringArray;
interface StringArray extends Array<String> {}

function stringify(uo: UJSX, ctx: UJSXExtractedDOMContext | UJSXNoDOMContext): StringArray | string {

	if (!uo) return '';
	if (typeof uo == 'string') return html(uo);

	if (isDOMElement(ctx, uo)) {
		return uo.outerHTML;
	}
	if (Array.isArray(uo)) {
		return uo.map(el => stringify(el, ctx));
	}

	if (!isUJSXObject(uo)) return String(uo);

	let dangerous: string | void;

	const apairs: string[] = [];
	if (uo.attributes) for (let key in uo.attributes) {
		const rval = uo.attributes[key];
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
		apairs.push(' ' + html(key) + '="' + html(val) + '"');
	}

	const efun = uo.tag == 'script' ? script : html;

	const safechs = dangerous === void 0 ? flatten<UJSX>(uo.children).map(c => {
		if (c === undefined || c === null || c as any === false) return '';
		if (typeof c == 'string') return efun(c);
		return stringify(c, ctx);
	}) as StringArray : null;

	if (voidTags[uo.tag] && dangerous === void 0 && !safechs!.length) return ['<', uo.tag, apairs.join(''), ' />'];

	return ['<', uo.tag, apairs.join(''), '>', dangerous !== void 0 ? dangerous : safechs!, '</', uo.tag, '>'];

}

export function ujsxToHTML(ctx: UJSXDOMContext, arr: UJSX) {
	return flatten(stringify(arr, ctx)).join('');
}
