import React, {
	InputHTMLAttributes,
	Ref,
	CSSProperties,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind
} from '../../helpers';
import stylesheet from './Switch.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	type: 'checkbox'|'radius';
	name?: string;
	value?: string|number;
	defaultChecked?: boolean;
	checked?: boolean;
	onChange?(value: string|number|boolean, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	InputHTMLAttributes<HTMLInputElement>
>;

export default class Switch extends PureComponent<IProps> {

	static propTypes = {
		elementRef:     PropTypes.func,
		style:          PropTypes.object,
		type:           PropTypes.oneOf([
			'checkbox',
			'radio'
		]).isRequired,
		name:           PropTypes.string,
		onChange:       PropTypes.func,
		value:          PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		defaultChecked: PropTypes.bool,
		checked:        PropTypes.bool
	};

	static defaultProps = {
		elementRef:     null,
		style:          null,
		name:           null,
		onChange:       null,
		value:          undefined,
		defaultChecked: undefined,
		checked:        undefined
	};

	render() {

		const {
			elementRef,
			style,
			...props
		} = this.props;

		return (
			<label
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<input
					ref={elementRef}
					{...props}
					{...stylesheet('input')}
					onChange={this.onChange}
				/>
				<div
					{...stylesheet('face')}
				/>
			</label>
		);
	}

	@Bind()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			onChange,
			value
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = value !== null
				? value
				: event.currentTarget.checked;

			onChange(nextValue, event);
		}
	}
}
