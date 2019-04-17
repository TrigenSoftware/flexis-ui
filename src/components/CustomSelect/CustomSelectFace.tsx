import {
	PureComponent,
	ReactChild
} from 'react';
import PropTypes from 'prop-types';
import {
	IProps as ICustomSelectProps
} from './CustomSelect';

export interface ICustomSelectFacePassedProps extends ICustomSelectProps {}

export interface ICustomSelectFaceProps {
	children(label: ReactChild, props: ICustomSelectFacePassedProps): ReactChild;
}

export const isCustomSelectFace = Symbol('isCustomSelectFace');

export class CustomSelectFace extends PureComponent<ICustomSelectFaceProps> {

	static [isCustomSelectFace] = true;

	static propTypes = {
		children: PropTypes.func.isRequired
	};

	render() {
		return null;
	}
}
