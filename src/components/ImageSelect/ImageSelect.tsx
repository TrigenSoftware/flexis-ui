import React, {
	Ref,
	ButtonHTMLAttributes,
	CSSProperties,
	ReactElement,
	ChangeEvent,
	PureComponent,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit
} from '../../helpers';
import FileSelect from '../FileSelect';
import SROnly from '../SROnly';
import stylesheet from './ImageSelect.st.css';

export enum DisplayVariant {
	Img = 'img',
	Block = 'block'
}

export type Display = 'img'|'block';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	display?: Display;
	name?: string;
	placeholder?: ReactElement<any>;
	defaultValue?: string;
	value?: string;
	disabled?: boolean;
	readOnly?: boolean;
	onChange?(image: File, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	ButtonHTMLAttributes<HTMLButtonElement>
>;

interface IState {
	value: string;
	filename: string;
}

export const DisplayValues: Display[] = Object.values(DisplayVariant);

export default class ImageSelect extends PureComponent<IProps, IState> {

	static propTypes = {
		...FileSelect.propTypes,
		elementRef:   PropTypes.func,
		display:      PropTypes.oneOf(DisplayValues),
		name:         PropTypes.string,
		placeholder:  PropTypes.element,
		defaultValue: PropTypes.string,
		value:        PropTypes.string,
		disabled:     PropTypes.bool,
		readOnly:     PropTypes.bool
	};

	static defaultProps = {
		...FileSelect.defaultProps,
		display:  DisplayVariant.Block,
		disabled: false,
		readOnly: false
	};

	static getDerivedStateFromProps(
		{ value }: IProps,
		{ value: prevValue }: IState
	): Partial<IState> {

		const nextValue = typeof value === 'undefined'
			? prevValue
			: value;

		if (nextValue === prevValue) {
			return null;
		}

		return {
			value: nextValue
		};
	}

	constructor(props) {

		super(props);

		const {
			defaultValue
		} = props;

		this.state = {
			value:    defaultValue,
			filename: ''
		};
	}

	render() {

		const {
			elementRef,
			style,
			display,
			name,
			placeholder,
			disabled,
			readOnly,
			...props
		} = this.props;
		const {
			value,
			filename
		} = this.state;
		const withPlaceholder = !value && placeholder;
		const previewStyle: CSSProperties = { ...style };
		let previewImg: ReactElement<any> = null;

		if (value) {

			if (display === DisplayVariant.Block) {
				previewStyle.backgroundImage = `url(${value})`;
			} else {
				previewImg = (
					<img
						{...stylesheet('img')}
						src={value}
					/>
				);
			}
		}

		return (
			<FileSelect
				elementRef={elementRef}
				{...stylesheet('root', {}, props)}
				name={name}
				onChange={this.onChange}
				disabled={disabled || readOnly}
			>
				<button
					{...omit(props, [
						'onChange',
						'defaultValue',
						'value'
					])}
					{...stylesheet('preview', {
						[display]: Boolean(display),
						readOnly,
						disabled
					})}
					style={previewStyle}
				>
					{previewImg}
					{withPlaceholder && cloneElement(
						placeholder,
						stylesheet('placeholder', {}, placeholder.props)
					)}
					<SROnly>
						<span>{filename}</span>
					</SROnly>
				</button>
			</FileSelect>
		);
	}

	@Bind()
	private onChange([image]: File[], event: ChangeEvent) {

		const {
			value: valueProp,
			onChange,
			disabled
		} = this.props;

		if (disabled || !image) {
			return;
		}

		const {
			value
		} = this.state;
		const nextValue = URL.createObjectURL(image);

		if (nextValue === value) {
			return;
		}

		if (typeof valueProp === 'undefined') {
			this.setState(() => ({
				value:    nextValue,
				filename: image.name
			}));
		}

		if (typeof onChange === 'function') {
			onChange(image, event);
		}
	}
}