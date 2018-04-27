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
		onChange:   PropTypes.func,
		children:   PropTypes.any.isRequired
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
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
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(
				this.originalValues[event.target.options.selectedIndex],
				event
			);
		}
	}
}
