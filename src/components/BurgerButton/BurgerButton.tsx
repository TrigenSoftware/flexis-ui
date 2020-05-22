import React, {
	ButtonHTMLAttributes,
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../helpers';
import SROnly from '../SROnly';
import {
	style,
	classes
} from './BurgerButton.st.css';

interface ISelfProps {
	active: boolean;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	ButtonHTMLAttributes<HTMLButtonElement>
>;

export default class BurgerButton extends Component<IProps> {

	static propTypes = {
		active: PropTypes.bool.isRequired
	};

	render() {

		const {
			className,
			active,
			children,
			...props
		} = this.props;

		return (
			<button
				{...props}
				className={style(classes.root, {
					active
				}, className)}
			>
				{children && (
					<SROnly>
						<span>
							{children}
						</span>
					</SROnly>
				)}
			</button>
		);
	}
}
