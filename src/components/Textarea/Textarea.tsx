import React, {
	AllHTMLAttributes,
	Ref,
	ChangeEvent,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
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

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLTextAreaElement>
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
			value,
			defaultValue,
			...props
		} = this.props;

		return (
			<textarea
				ref={elementRef}
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
				onChange={this.onChange}
				value={value}
				defaultValue={defaultValue as string}
			/>
		);
	}

	@Listener()
	private onChange(event: ChangeEvent<HTMLTextAreaElement>) {

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
