import React, {
	AllHTMLAttributes,
	Ref,
	CSSProperties,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Radio.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	name?: string;
	value?: string|number;
	defaultChecked?: boolean;
	checked?: boolean;
	onChange?(value: string|number|boolean, event: ChangeEvent): void;
	onChange?(value: string|number|boolean, name: string, event: ChangeEvent): void;
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLInputElement>;

export default class Radio extends PureComponent<IProps> {

	static propTypes = {
		elementRef:     PropTypes.func,
		style:          PropTypes.object,
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
		value:          null,
		defaultChecked: null,
		checked:        null
	};

	render() {

		const {
			elementRef,
			style,
			value,
			checked,
			defaultChecked,
			...props
		} = this.props;

		return (
			<label
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<input
					{...getHtmlProps(props)}
					{...stylesheet('radio')}
					ref={elementRef}
					type='radio'
					onChange={this.onChange}
					value={value}
					checked={checked}
					defaultChecked={defaultChecked}
				/>
				<div
					{...stylesheet('face')}
				/>
			</label>
		);
	}

	@Listener()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			name,
			onChange,
			value
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = value !== null
				? value
				: event.currentTarget.checked;

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}
