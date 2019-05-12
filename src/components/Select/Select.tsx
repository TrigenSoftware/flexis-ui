import React, {
	SelectHTMLAttributes,
	Ref,
	ReactElement,
	CSSProperties,
	ChangeEvent,
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';
import stylesheet from './Select.st.css';

export * from './SelectOption';

interface ISelfProps {
	elementRef?: Ref<HTMLSelectElement>;
	style?: CSSProperties;
	name?: string;
	defaultValue?: any;
	value?: any;
	children: ReactElement<any>|ReactElement<any>[];
	onChange?(value, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	SelectHTMLAttributes<HTMLSelectElement>
>;

export default class Select extends PureComponent<IProps> {

	static propTypes = {
		elementRef:   PropTypes.func,
		style:        PropTypes.object,
		name:         PropTypes.string,
		defaultValue: PropTypes.any,
		value:        PropTypes.any,
		onChange:     PropTypes.func,
		children:     PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.oneOfType([
				PropTypes.element,
				PropTypes.arrayOf(PropTypes.element)
			]))
		]).isRequired
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
		name:       null,
		onChange:   null
	};

	private originalValues = [];

	render() {

		const {
			elementRef,
			style,
			children,
			...props
		} = this.props;

		this.originalValues = Children.toArray(children).map(({
			props: {
				value,
				children
			}
		}: ReactElement<any>) => (
			typeof value === 'undefined'
				? children
				: value
		));

		return (
			<span
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<select
					ref={elementRef}
					{...omit(props, ['multiple'])}
					{...stylesheet('select')}
					onChange={this.onChange}
				>
					{children}
				</select>
				<div
					{...stylesheet('border')}
				/>
			</span>
		);
	}

	@Bind()
	onChange(event: ChangeEvent<HTMLSelectElement>) {

		const {
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const {
				selectedIndex
			} = event.currentTarget.options;
			const nextValue = this.originalValues[selectedIndex];

			onChange(nextValue, event);
		}
	}
}
