import React, {
	InputHTMLAttributes,
	Ref,
	CSSProperties,
	KeyboardEvent,
	ChangeEvent,
	ReactElement,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind
} from '../../helpers';
import isKeyboardClick from '../common/isKeyboardClick';
import stylesheet from './FileSelect.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	disabled?: boolean;
	children: ReactElement<any>;
	onChange?(files: File[], event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	InputHTMLAttributes<HTMLInputElement>
>;

export default class FileSelect extends PureComponent<IProps> {

	static propTypes = {
		elementRef: PropTypes.func,
		style:      PropTypes.object,
		onChange:   PropTypes.func,
		disabled:   PropTypes.bool,
		children:   PropTypes.node
	};

	static defaultProps = {
		disabled: false
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
			<span
				{...stylesheet('root', {}, props)}
				style={style}
			>
				<input
					ref={elementRef}
					{...props}
					{...stylesheet('input')}
					tabIndex={-1}
					type='file'
					onChange={this.onChange}
					disabled={disabled}
				/>
				{cloneElement(
					Children.only(children),
					{
						'onKeyPress':    this.onFaceKeyPress,
						'aria-disabled': disabled,
						'disabled':      disabled
					}
				)}
			</span>
		);
	}

	@Bind()
	private onChange(event: ChangeEvent<HTMLInputElement>) {

		const {
			onChange
		} = this.props;

		if (typeof onChange === 'function') {

			const nextValue = Array.from(event.currentTarget.files);

			onChange(nextValue, event);
		}
	}

	private onFaceKeyPress(event: KeyboardEvent) {

		const {
			currentTarget,
			key
		} = event;

		if (isKeyboardClick(key)) {

			const input = currentTarget.previousElementSibling as HTMLInputElement;

			input.click();
		}
	}
}
