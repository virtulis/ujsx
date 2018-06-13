import './common/global';

import { ujsxFor } from './bind';

import { isUJSXObject, createUJSXObject, UJSXObject } from './common/object';
import { UJSX, UJSXArray, UJSXHandler } from './common/types';
import { UJSXDOMContextParam } from './dom/context';

const w = typeof window !== 'undefined' ? window : undefined;
const auto = ujsxFor({ window: w });
const { ujsx, ujsxToDOM, ujsxToHTML } = auto;

export {

	UJSXObject,
	isUJSXObject,
	createUJSXObject,

	UJSX,
	UJSXArray,
	UJSXHandler,

	ujsxFor,
	UJSXDOMContextParam,

	auto,
	ujsx,
	ujsxToDOM,
	ujsxToHTML

};
