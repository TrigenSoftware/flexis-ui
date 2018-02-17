export { stylable } from 'wix-react-tools';
export { default as getHtmlProps } from './get-html-props';

export function valueOrNull(value) {
	return value == null
		? global.undefined
		: value;
}
