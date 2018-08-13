import { UJSXObject } from './object';

export interface UJSXArray extends Array<UJSX> {}

export type UJSXNonArray = UJSXObject | string | Element | JSX.Element | null;
export type UJSX = UJSXNonArray | UJSXArray;

export type UJSXHandler = (tag: string, attributes: { [key: string]: any }, ...children: UJSX[]) => UJSX;
