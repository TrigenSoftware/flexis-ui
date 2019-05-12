/* tslint:disable no-magic-numbers */
import {
	DecoratorParameters
} from '@storybook/react';

export interface IStylableAPI {
	0: string;
	1: string[];
	2?: number;
	[Symbol.iterator]: any;
}

function propWithPrefix(prop: string, prefix: string) {

	if (!prefix.replace(/:/g, '').length) {
		return `${prefix}${prop}`;
	}

	return `${prefix}${prop.replace(prop[0], prop[0].toUpperCase())}`;
}

export function buildInfo(stylableApi: IStylableAPI[]): string {
	return stylableApi.map(([prefix, props, indent = 0]) =>
		props.map(_ =>
			`${'\t'.repeat(indent)}- ${propWithPrefix(_, prefix)}`
		).join('\n')
	).join('\n');
}

export function extendInfo(params: DecoratorParameters, stylableApi: IStylableAPI[]): DecoratorParameters {

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
