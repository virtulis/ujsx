export interface UJSXDOMContextParam {
	window?: Window;
	document?: Document;
}

export interface UJSXExtractedDOMContext {
	extracted: boolean;
	window: Window;
	document: Document;
	DOMNode: Function;
	DOMElement: Function;
}

export interface UJSXNoDOMContext {
	extracted: boolean;
	window: undefined;
	document: undefined;
	DOMNode: undefined;
	DOMElement: undefined;
}

export type UJSXDOMContext = UJSXExtractedDOMContext | UJSXNoDOMContext;

const noContext: UJSXNoDOMContext = {
	extracted: true,
	window: undefined,
	document: undefined,
	DOMNode: undefined,
	DOMElement: undefined,
};

export function extractDOMContext(ctx: UJSXDOMContextParam): UJSXExtractedDOMContext | UJSXNoDOMContext {

	if (ctx && (ctx as UJSXExtractedDOMContext).extracted) {
		return ctx as UJSXExtractedDOMContext | UJSXNoDOMContext;
	}

	if (!ctx || !ctx.window) return noContext;

	const w = ctx.window as any;
	return {

		window: ctx.window,
		document: ctx.document || ctx.window.document,

		DOMNode: w.Node as Function,
		DOMElement: w.Element as Function,

	} as UJSXExtractedDOMContext;

}

export function isDOMNode(ctx: UJSXDOMContext, obj: any): obj is Node {
	return ctx && ctx.DOMNode && (obj instanceof ctx.DOMNode) || false;
}
export function isDOMElement(ctx: UJSXDOMContext, obj: any): obj is Element {
	return ctx && ctx.DOMElement && (obj instanceof ctx.DOMElement) || false;
}
