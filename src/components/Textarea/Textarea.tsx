import React, {
	AllHTMLAttributes,
	Ref,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Textarea.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLTextAreaElement>;
	name?: string;
	defaultValue?: string|number;
	value?: string|number;
	onChange?(value: string, event: ChangeEvent);
	onChange?(value: string, name: string, event: ChangeEvent);
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLTextAreaElement>;

export default class Textarea extends PureComponent<IProps> {

	static propTypes = {
		elementRef:   PropTypes.func,
		name:         PropTypes.string,
		onChange:     PropTypes.func,
		defaultValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		value:        PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	};

	static defaultProps = {
		elementRef:   null,
		name:         null,
		onChange:     null,
		defaultValue: null,
		value:        null
	};

	render() {

		const {
			elementRef,
			value,
			defaultValue,
			...props
		} = this.props;

		return (
			<textarea
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
				ref={elementRef}
				onChange={this.onChange}
				value={value}
				defaultValue={defaultValue}
			/>
		);
	}

	@Listener()
	onChange(event: ChangeEvent<HTMLTextAreaElement>) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = event.currentTarget.value;

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}
