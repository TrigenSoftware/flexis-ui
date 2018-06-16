import React, {
	HTMLAttributes,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Badge.st.css';

export {
	default as BadgeContainer
} from './BadgeContainer';

interface IProps extends HTMLAttributes<HTMLLabelElement> {}

export default class Badge extends PureComponent<IProps> {

	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: null
	};

	render() {

		const {
			children,
			...props
		} = this.props;

		return (
			<label
				{...getHtmlProps(props)}
				{...stylesheet('root', {}, props)}
			>
				{children}
			</label>
		);
	}
}
