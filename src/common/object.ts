export interface UJSXObject {
	tag: string;
	attributes: { [key: string]: any };
	children: any[];
}

export function isUJSXObject(obj: any): obj is UJSXObject {
	return (
		obj &&
		typeof obj == 'object' &&
		typeof obj.tag == 'string' &&
		typeof obj.attributes == 'object' &&
		Array.isArray(obj.children)
	);
}

export function createUJSXObject(tag: string, attributes: { [key: string]: any }, ...children: any[]): UJSXObject {
	const attrs: { [key: string]: any } = {};

	if (attributes) for (let rkey in attributes) {
		let key = rkey.toLowerCase();
		if (key == 'classname') key = 'class';
		if (key == 'htmlfor') key = 'for';

		attrs[key] = attributes[rkey];
	}

	return {
		tag: tag.toLowerCase(),
		attributes: attrs,
		children
	}

}
