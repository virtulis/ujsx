// TypeScript assumes JSX code returns "JSX.Element" so we hack it a little to allow mingling it with DOM
type DOMElement = Element;
declare namespace JSX {
	interface Element extends DOMElement, React.ReactElement<any> { }
}
