import React, {
	InputHTMLAttributes,
	Ref,
	CSSProperties,
	KeyboardEvent,
	ChangeEvent,
	ReactNode,
	ReactElement,
	PureComponent,
	Children,
	cloneElement,
	isValidElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind
} from '../../helpers';
import isKeyboardClick from '../common/isKeyboardClick';
import {
	style,
	classes
} from './FileSelect.st.css';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	disabled?: boolean;
	children: ReactNode;
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
			className,
			elementRef,
			style: styleProp,
			disabled,
			children,
			...props
		} = this.props;

		return (
			<span
				className={style(classes.root, className)}
				style={styleProp}
			>
				<input
					ref={elementRef}
					{...props}
					className={classes.input}
					tabIndex={-1}
					type='file'
					onChange={this.onChange}
					disabled={disabled}
				/>
				{Children.map(children, (child, i) => {

					if (i === 0 && isValidElement(child)) {
						return cloneElement(
							child as ReactElement,
							{
								'onKeyPress':    this.onFaceKeyPress,
								'aria-disabled': disabled,
								'disabled':      disabled
							}
						);
					}

					return child;
				})}
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
