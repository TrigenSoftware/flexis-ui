import React, {
	Ref,
	ReactElement,
	CSSProperties,
	MouseEvent,
	ChangeEvent,
	PureComponent,
	Children
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	Bind,
	omit,
	getAriaLabelProps
} from '../../helpers';
import {
	SelectValue
} from '../common/types';
import isCurrentValue from '../common/isCurrentValue';
import Dropdown, {
	IProps as IDropdownProps,
	DropdownContent
} from '../Dropdown';
import CustomFlatSelect, {
	IProps as ICustomFlatSelectProps
} from '../CustomFlatSelect';
import {
	isCustomSelectFace
} from './CustomSelectFace';
import stylesheet from './CustomSelect.st.css';

export * from './CustomSelectFace';
export * from './CustomSelectOption';

interface ISelfProps extends ICustomFlatSelectProps {
	elementRef?: Ref<Dropdown>;
	style?: CSSProperties;
	placeholder?: string;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	IDropdownProps
>;

interface IState {
	value: SelectValue;
}

export default class CustomSelect extends PureComponent<IProps, IState> {

	static propTypes = {
		...CustomFlatSelect.propTypes,
		elementRef:  PropTypes.func,
		style:       PropTypes.object,
		placeholder: PropTypes.string
	};

	static defaultProps = CustomFlatSelect.defaultProps;

	static getDerivedStateFromProps = CustomFlatSelect.getDerivedStateFromProps;

	private dropdownRef: Dropdown = null;

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
			'aria-labelledby': ariaLabelledBy,
			'aria-label': ariaLabel,
			style,
			name,
			placeholder,
			multiple,
			disabled,
			children,
			...props
		} = this.props;
		const {
			value
		} = this.state;
		const ariaLabelProps = getAriaLabelProps({
			labelledBy: ariaLabelledBy,
			label:      ariaLabel || placeholder
		});
		let label = multiple ? [] : '';
		let selectFace: ReactElement<any> = null;
		const options = Children.map(children, (child: ReactElement<any>) => {

			if (!child) {
				return null;
			}

			if (child.type[isCustomSelectFace]) {
				selectFace = child;
				return null;
			}

			const {
				value: optionValue,
				children: optionLabel
			} = child.props;
			const option = typeof optionValue === 'undefined'
				? optionLabel
				: optionValue;
			const checked = isCurrentValue(multiple, value, option);

			if (checked) {

				if (multiple) {
					(label as string[]).push(optionLabel);
				} else {
					label = optionLabel;
				}
			}

			return child;
		});

		return (
			<Dropdown
				ref={this.onDropdownRef}
				{...stylesheet('root', {}, props)}
				style={style}
				disabled={disabled}
			>
				{this.face(selectFace, label)}
				<DropdownContent
					{...ariaLabelProps}
					{...stylesheet('dropdownContent')}
					role='region'
					aria-multiselectable={multiple}
				>
					<CustomFlatSelect
						{...omit(props, ['elementRef'])}
						{...ariaLabelProps}
						{...stylesheet('options')}
						name={name}
						multiple={multiple}
						onClick={this.onDropdownHide}
						onChange={this.onChange}
						value={value}
						disabled={disabled}
					>
						{options}
					</CustomFlatSelect>
				</DropdownContent>
				{name && (
					<input
						type='hidden'
						name={name}
						value={value as string || ''}
					/>
				)}
			</Dropdown>
		);
	}

	private face(faceChild: ReactElement<any>, label: string|string[]) {

		const {
			multiple,
			placeholder,
			disabled
		} = this.props;
		const faceLabel = (
			(multiple ? (label as string[]).join(', ') : label)
			|| placeholder && (
				<span
					{...stylesheet('placeholder')}
				>
					{placeholder}
				</span>
			)
			|| (
				<i>&nbsp;</i>
			)
		);

		if (!faceChild) {
			return (
				<button
					type='button'
					disabled={disabled}
				>
					{faceLabel}
				</button>
			);
		}

		const {
			children: renderFace,
			...props
		} = faceChild.props;
		const faceProps = {
			multiple,
			disabled,
			...props
		};

		return renderFace(
			faceLabel,
			faceProps
		);
	}

	@Bind()
	private onDropdownRef(ref: Dropdown) {

		const {
			elementRef
		} = this.props;

		this.dropdownRef = ref;

		if (typeof elementRef === 'function') {
			elementRef(ref);
		}
	}

	@Bind()
	private onDropdownHide(event: MouseEvent) {

		const {
			multiple
		} = this.props;
		const {
			dropdownRef
		} = this;

		if (!multiple && dropdownRef) {
			dropdownRef.toggleActiveState(false, event);
		}
	}

	@Bind()
	private onChange(nextValue: SelectValue, event: ChangeEvent<Element>) {

		const {
			onChange
		} = this.props;

		this.setState(() => ({
			value: nextValue
		}));

		if (typeof onChange === 'function') {
			onChange(nextValue, event);
		}
	}
}
