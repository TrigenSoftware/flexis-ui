/* tslint:disable no-magic-numbers */

export interface IStylableAPI {
	values: string[];
	prefix?: string;
	postfix?: string;
	indent?: number;
}

function formatValue(value: string, prefix: string, postfix: string) {

	const formatedValue = prefix.replace(/:/g, '').length
		? value.replace(value[0], value[0].toUpperCase())
		: value;
	const formatedPostfix = postfix && postfix.replace(postfix[0], postfix[0].toUpperCase());

	return `${prefix}${formatedValue}${formatedPostfix}`;
}

export function buildInfo(stylableApi: IStylableAPI[]): string {
	return stylableApi.map(({
		values,
		prefix = '',
		postfix = '',
		indent = 0
	}) =>
	values.map(_ =>
			`${'\t'.repeat(indent)}- ${formatValue(_, prefix, postfix)}`
		).join('\n')
	).join('\n');
}

export function extendInfo(params: Record<string, any>, stylableApi: IStylableAPI[]): Record<string, any> {

	let sourceInfo: string = params.info;

	if (sourceInfo.length) {
		sourceInfo += '\n';
	}

	sourceInfo += buildInfo(stylableApi);

	return {
		...params,
		info: sourceInfo
	};
}
