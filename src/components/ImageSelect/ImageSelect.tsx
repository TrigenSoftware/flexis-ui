import React, {
	Ref,
	ButtonHTMLAttributes,
	CSSProperties,
	ReactElement,
	ChangeEvent,
	MouseEvent,
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
import {
	style,
	classes
} from './ImageSelect.st.css';

export enum DisplayVariant {
	Img = 'img',
	Block = 'block'
}

export type Display = 'img'|'block';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	previewStyle?: CSSProperties;
	display?: Display;
	name?: string;
	placeholder?: ReactElement<any>;
	defaultValue?: string;
	value?: string;
	disabled?: boolean;
	readOnly?: boolean;
	resetButton?: ReactElement<any>;
	onChange?(image: File, event: ChangeEvent|MouseEvent);
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

const defaultResetButton = (
	<button type='button'>
		&times;
	</button>
);

function getDefaultState(props: IProps) {

	const {
		defaultValue
	} = props;

	return {
		value:    defaultValue,
		filename: ''
	};
}

export default class ImageSelect extends PureComponent<IProps, IState> {

	static propTypes = {
		...FileSelect.propTypes,
		elementRef:   PropTypes.func,
		previewStyle: PropTypes.object,
		display:      PropTypes.oneOf(DisplayValues),
		name:         PropTypes.string,
		placeholder:  PropTypes.element,
		defaultValue: PropTypes.string,
		value:        PropTypes.string,
		disabled:     PropTypes.bool,
		readOnly:     PropTypes.bool,
		resetButton:  PropTypes.element
	};

	static defaultProps = {
		...FileSelect.defaultProps,
		display:     DisplayVariant.Block,
		disabled:    false,
		readOnly:    false,
		resetButton: defaultResetButton
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

		this.state = getDefaultState(props);
	}

	render() {

		const {
			className,
			elementRef,
			style: styleProp,
			previewStyle: previewStyleProp,
			display,
			name,
			placeholder,
			disabled,
			readOnly,
			resetButton,
			...props
		} = this.props;
		const {
			value,
			filename
		} = this.state;
		const withPlaceholder = !value && placeholder;
		const previewStyle: CSSProperties = { ...previewStyleProp };
		let previewImg: ReactElement<any> = null;

		if (value) {

			if (display === DisplayVariant.Block) {
				previewStyle.backgroundImage = `url(${value})`;
			} else {
				previewImg = (
					<img
						className={classes.img}
						src={value}
					/>
				);
			}
		}

		return (
			<FileSelect
				elementRef={elementRef}
				style={styleProp}
				className={style(classes.root, className)}
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
					className={style(classes.preview, {
						[display]: Boolean(display),
						readOnly,
						disabled
					})}
					style={previewStyle}
				>
					{previewImg}
					{withPlaceholder && cloneElement(
						placeholder,
						{
							className: style(classes.placeholder, placeholder.props.className)
						}
					)}
					<SROnly>
						<span>{filename}</span>
					</SROnly>
				</button>
				{resetButton && cloneElement(
					resetButton,
					{
						className: style(classes.resetButton, {
							hidden: disabled || readOnly || !value
						}, resetButton.props.className),
						onClick: this.onReset
					}
				)}
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

	@Bind()
	private onReset(event: MouseEvent) {

		const {
			value: valueProp,
			onChange
		} = this.props;
		const fileInput: HTMLInputElement = (event.target as any).parentElement.firstElementChild;

		if (typeof valueProp === 'undefined') {
			fileInput.value = null;
			this.setState(() =>
				getDefaultState(this.props)
			);
		}

		if (typeof onChange === 'function') {
			event.target = fileInput;
			onChange(null, event);
		}
	}
}
