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
import {
	style,
	classes
} from './Textarea.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLTextAreaElement>;
	defaultValue?: string;
	value?: string;
	onChange?(value: string, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	TextareaHTMLAttributes<HTMLTextAreaElement>
>;

export default class Textarea extends PureComponent<IProps> {

	static propTypes = {
		elementRef:   PropTypes.func,
		onChange:     PropTypes.func,
		defaultValue: PropTypes.string,
		value:        PropTypes.string
	};

	render() {

		const {
			className,
			elementRef,
			...props
		} = this.props;

		return (
			<textarea
				ref={elementRef}
				{...props}
				className={style(classes.root, className)}
				onChange={this.onChange}
			/>
		);
	}

	@Bind()
	private onChange(event: ChangeEvent<HTMLTextAreaElement>) {

		const {
			onChange
		} = this.props;

		if (typeof onChange === 'function') {
			onChange(
				event.currentTarget.value,
				event
			);
		}
	}
}
