import {
	PureComponent
} from 'react';
import PropTypes from 'prop-types';

export interface ICustomSelectFaceProps {
	children(...args): any;
}

export class CustomSelectFace extends PureComponent<ICustomSelectFaceProps> {

	static propTypes = {
		children: PropTypes.func.isRequired
	};

	render() {
		return null;
	}
}
