import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	select,
	text
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import ImageSelect, {
	DisplayValues
} from './';

const {
	TestIcon
} = global as any;

export const stylableApi = `
Stylable API
---
`;

// tslint:disable-next-line
const imageUrl = 'https://cdn3.iconfinder.com/data/icons/message-and-communication-sets/50/Icon_Profile_Macbook-256.png';

const style = {
	border:         '1px solid silver',
	backgroundSize: 'cover',
	minWidth:       '4em',
	minHeight:      '4em'
};

export default storiesOf('ImageSelect', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with default state',
		() => (
			<ImageSelect
				style={style}
				onChange={action('change')}
				display={select('Display', DisplayValues, 'block')}
			/>
		)
	)
	.add(
		'with placeholder',
		() => (
			<ImageSelect
				style={style}
				onChange={action('change')}
				display={select('Display', DisplayValues, 'block')}
				placeholder={<TestIcon/>}
			/>
		)
	)
	.add(
		'with value',
		() => (
			<ImageSelect
				style={style}
				onChange={action('change')}
				display={select('Display', DisplayValues, 'block')}
				value={text('Value', imageUrl)}
			/>
		)
	)
	.add(
		'with default value',
		() => (
			<ImageSelect
				style={style}
				onChange={action('change')}
				display={select('Display', DisplayValues, 'block')}
				defaultValue={text('Default value', imageUrl)}
			/>
		)
	);
