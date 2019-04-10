/**
 * Get state attribute name from stylesheet.
 * @param  stylesheet - Stylesheet props.
 * @return State attribute name.
 */
export default function getStylesheetState(stylesheet: Record<string, any>): string {

	const [state] = Object
		.keys(stylesheet)
		.filter(_ => _ !== 'className');

	return state;
}
