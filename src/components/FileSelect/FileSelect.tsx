import React, {
	InputHTMLAttributes,
	Ref,
	CSSProperties,
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
		elementRef: null,
		style:      null,
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
				{...stylesheet('root', {}, props)}
				role='none'
				style={style}
			>
				<input
					ref={elementRef}
					{...props}
					{...stylesheet('input')}
					type='file'
					onChange={this.onChange}
					disabled={disabled}
				/>
				{cloneElement(
					Children.only(children),
					{
						'aria-disabled': disabled,
						'disabled':      disabled
					}
				)}
			</label>
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
}
