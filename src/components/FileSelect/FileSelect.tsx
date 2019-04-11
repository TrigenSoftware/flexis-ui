import React, {
	AllHTMLAttributes,
	Ref,
	CSSProperties,
	ChangeEvent,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './FileSelect.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	name?: string;
	disabled?: boolean;
	children?: ReactNode;
	onChange?(files: File[], event: ChangeEvent);
	onChange?(files: File[], name: string, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	AllHTMLAttributes<HTMLInputElement>
>;

export default class FileSelect extends PureComponent<IProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		style:      PropTypes.object,
		name:       PropTypes.string,
		onChange:   PropTypes.func,
		disabled:   PropTypes.bool,
		children:   PropTypes.node
	};

	static defaultProps = {
		elementRef: null,
		style:      null,
		name:       null,
		onChange:   null,
		disabled:   false,
		children:   null
	};

	render() {

		const {
			elementRef,
			style,
			disabled,
			children,
			...props
		} = this.props;

		return (
			<label
				{...stylesheet('root', {
					disabled
				}, props)}
				style={style}
			>
				{children}
				<input
					ref={elementRef}
					{...getHtmlProps(props)}
					{...stylesheet('input')}
					type='file'
					onChange={this.onChange}
					disabled={disabled}
				/>
				<div
					{...stylesheet('border')}
				/>
			</label>
		);
	}

	@Listener()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			name,
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = Array.from(event.currentTarget.files);

			if (name) {
				onChange(nextValue, name, event);
			} else {
				onChange(nextValue, event);
			}
		}
	}
}
