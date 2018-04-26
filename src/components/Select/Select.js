import React, {
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Select.st.css';

export * from './SelectOption';

@Stylable(stylesheet)
export default class Select extends PureComponent {

	static propTypes = {
		style:    PropTypes.object,
		onChange: PropTypes.func,
		children: PropTypes.any.isRequired
	};

	static defaultProps = {
		style:    null,
		onChange: null
	};

	originalValues = [];

	render() {

		const {
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
				style={style}
			>
				<select
					{...getHtmlProps(props, ['multiple'])}
					className='select'
					onChange={this.onChange()}
				>
					{children}
				</select>
				<div className='border'/>
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
