import React, {
	TextareaHTMLAttributes,
	Ref,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind
} from '../../helpers';
import stylesheet from './Textarea.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLTextAreaElement>;
	name?: string;
	defaultValue?: string|number;
	value?: string|number;
	onChange?(value: string, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	TextareaHTMLAttributes<HTMLTextAreaElement>
>;

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
		defaultValue: undefined,
		value:        undefined
	};

	render() {

		const {
			elementRef,
			defaultValue,
			...props
		} = this.props;

		return (
			<textarea
				ref={elementRef}
				{...props}
				{...stylesheet('root', {}, props)}
				onChange={this.onChange}
				defaultValue={defaultValue as string}
			/>
		);
	}

	@Bind()
	private onChange(event: ChangeEvent<HTMLTextAreaElement>) {

		const {
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = event.currentTarget.value;

			onChange(nextValue, event);
		}
	}
}
