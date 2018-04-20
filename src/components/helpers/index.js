export { stylable as Stylable } from 'wix-react-tools';
export { default as getHtmlProps } from './getHtmlProps';
export { default as hasFixedLineage } from './hasFixedLineage';

export function valueOrNull(value) {
	return value == null
		? global.undefined
		: value;
}
