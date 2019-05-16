import React, {
	Ref,
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
import FileSelect, {
	IProps as IFileSelectProps
} from '../FileSelect';
import stylesheet from './ImageSelect.st.css';

export enum DisplayVariant {
	Img = 'img',
	Block = 'block'
}

export type Display = 'img'|'block';

interface ISelfProps {
	elementRef?: Ref<HTMLInputElement>;
	style?: CSSProperties;
	display?: Display;
	placeholder?: ReactElement<any>;
	defaultValue?: string;
	value?: string;
	onChange?(image: File, event: ChangeEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	IFileSelectProps
>;

interface IState {
	value: string;
}

export const DisplayValues: Display[] = Object.values(DisplayVariant);

export default class ImageSelect extends PureComponent<IProps, IState> {

	static propTypes = {
		...FileSelect.propTypes,
		elementRef:   PropTypes.func,
		style:        PropTypes.object,
		display:      PropTypes.oneOf(DisplayValues),
		placeholder:  PropTypes.element,
		defaultValue: PropTypes.string,
		value:        PropTypes.string,
		readOnly:     PropTypes.bool
	};

	static defaultProps = {
		...FileSelect.defaultProps,
		display:  DisplayVariant.Block,
		readOnly: false
	};

	static getDerivedStateFromProps(
		{ value }: IProps,
		{ value: prevValue }: IState
	): IState {

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
			value: defaultValue
		};
	}

	render() {

		const {
			elementRef,
			style,
			display,
			placeholder,
			disabled,
			readOnly,
			children,
			...props
		} = this.props;
		const {
			value
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
				{...omit(props, [
					'defaultValue',
					'value'
				])}
				{...stylesheet('root', {}, props)}
				onChange={this.onChange}
				disabled={disabled || readOnly}
			>
				<figure
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
				</figure>
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
				value: nextValue
			}));
		}

		if (typeof onChange === 'function') {
			onChange(image, event);
		}
	}
}
