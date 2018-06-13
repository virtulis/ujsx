export function camelToKebab(s: string) {
	return s.split(/([A-Z]+)/).map((p, i, a) => i % 2 ? (
		(a[i - 1] ? '-' : '') +
		(p.length > 1 && a[i + 1] ? p.slice(0, -1) + '-' + p.slice(-1) : p).toLowerCase()
	) : p).join('');
}

function flattenTo<T>(arr: (T | T[])[], to: T[]) {
	for (let i = 0, l = arr.length; i < l; i++) {
		if (Array.isArray(arr[i])) flattenTo(arr[i] as T[], to);
		else to.push(arr[i] as T);
	}
}

export function flatten<T>(arr: T | Array<T | T[] | any>): T[] {
	if (!Array.isArray(arr)) return [arr];
	const out: T[] = [];
	flattenTo(arr, out);
	return out;
}
