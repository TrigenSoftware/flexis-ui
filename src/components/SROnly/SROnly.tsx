import {
	ReactElement,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
	style,
	classes
} from './SROnly.st.css';

export interface IProps {
	focusable?: boolean;
	children: ReactElement<any>;
	[prop: string]: any;
}

export default class SROnly extends PureComponent<IProps> {

	static propTypes = {
		focusable: PropTypes.bool,
		children:  PropTypes.element.isRequired
	};

	static defaultProps = {
		focusable: false
	};

	render() {

		const {
			className,
			focusable,
			children,
			...props
		} = this.props;

		return cloneElement(
			Children.only(children),
			{
				...props,
				className: style(classes.root, {
					focusable
				}, className)
			}
		);
	}
}
