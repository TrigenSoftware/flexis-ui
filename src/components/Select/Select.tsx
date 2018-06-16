import React, {
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Select.st.css';

export * from './SelectOption';

export default class Select extends PureComponent {

	static propTypes = {
		elementRef: PropTypes.func,
		style:      PropTypes.object,
		name:       PropTypes.string,
		onChange:   PropTypes.func,
		children:   PropTypes.node.isRequired
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
		name:       null,
		onChange:   null
	};

	originalValues = [];

	render() {

		const {
			elementRef,
			style,
			children,
			...props
		} = this.props;

		this.originalValues = Children
			.toArray(children)
			.filter(Boolean)
			.map(({ props: { value, children } }) => (
				typeof value == 'undefined'
					? children
					: value
			));

		return (
			<span
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<select
					{...getHtmlProps(props, ['multiple'])}
					{...stylesheet('select')}
					ref={elementRef}
					onChange={this.onChange()}
				>
					{children}
				</select>
				<div
					{...stylesheet('border')}
				/>
			</span>
		);
	}

	@Listener()
	onChange(event) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {

			const nextValue = this.originalValues[event.target.options.selectedIndex];

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}
