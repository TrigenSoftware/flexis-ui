#!/bin/bash

mkdir src/components/$1

# index.ts
printf "export { default } from './$1';
export * from './$1';
" > src/components/$1/index.ts

# Component.tsx
printf "import React, {
	HTMLAttributes,
	Ref,
	ReactNode,
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import stylesheet from './$1.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLDivElement>;
	children?: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export default class $1 extends Component<IProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		children:   PropTypes.node
	};

	static defaultProps = {
		elementRef: null,
		children:   null
	};

	render() {

		const {
			elementRef,
			children,
			...props
		} = this.props;

		return (
			<div
				ref={elementRef}
				{...props}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</div>
		);
	}
}
" > src/components/$1/$1.tsx

# Component.stories.tsx
printf "import React from 'react';
import {
	action
} from '@storybook/addon-actions';
import {
	text
} from '@storybook/addon-knobs/react';
import {
	storiesOf
} from '../../helpers/stories';
import $1 from './';

export const stylableApi = \`
Stylable API
---
\`;

export const events = {
	onClick: action('click')
};

export default storiesOf('$1', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with text',
		() => (
			<$1
				{...events}
			>
				{text('Text', 'Text')}
			</$1>
		)
	);
" > src/components/$1/$1.stories.tsx

# Component.st.css
printf "
.root {
	/* Empty block */
}
" > src/components/$1/$1.st.css
