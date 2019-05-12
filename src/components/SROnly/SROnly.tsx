import {
	ReactElement,
	PureComponent,
	Children,
	cloneElement
} from 'react';
import PropTypes from 'prop-types';
import stylesheet from './SROnly.st.css';

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
			focusable,
			children,
			...props
		} = this.props;

		return cloneElement(
			Children.only(children),
			stylesheet('root', {
				focusable
			}, props)
		);
	}
}
