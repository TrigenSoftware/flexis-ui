import React, {
	AllHTMLAttributes,
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
	Listener,
	getHtmlProps
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
	onChange?(value, name: string, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLSelectElement>
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
			PropTypes.arrayOf(PropTypes.element)
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

		this.originalValues = Children.map(children, (child: ReactElement<any>) => {

			if (!child) {
				return null;
			}

			const {
				value,
				children
			} = child.props;

			return typeof value === 'undefined'
				? children
				: value;
		});

		return (
			<span
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<select
					{...getHtmlProps(props, ['multiple'])}
					{...stylesheet('select')}
					ref={elementRef}
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

	@Listener()
	onChange(event: ChangeEvent<HTMLSelectElement>) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const {
				selectedIndex
			} = event.currentTarget.options;
			const nextValue = this.originalValues[selectedIndex];

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}
