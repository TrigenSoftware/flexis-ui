import React, {
	HTMLAttributes,
	ReactNode,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '../../../helpers';
import {
	Placement,
	Align,
	AlignVariant,
	PlacementValues,
	AlignValues
} from '../../common/types';
import stylesheet from './BadgeContainer.st.css';

interface ISelfProps {
	placement: Placement;
	align?: Align;
	children: ReactNode;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLSpanElement>
>;

export default class BadgeContainer extends PureComponent<IProps> {

	static propTypes = {
		placement: PropTypes.oneOf(PlacementValues).isRequired,
		align:     PropTypes.oneOf(AlignValues),
		children:  PropTypes.node.isRequired
	};

	static defaultProps = {
		align: AlignVariant.Center
	};

	render() {

		const {
			placement,
			align,
			children,
			...props
		} = this.props;

		return (
			<span
				{...props}
				{...stylesheet('root', {
					[`${placement}Placement`]: Boolean(placement),
					[`${align}Align`]:         Boolean(align)
				}, props)}
			>
				{children}
			</span>
		);
	}
}
