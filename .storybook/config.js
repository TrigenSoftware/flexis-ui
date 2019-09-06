import './injectTestIcon';
import {
	configure
} from '@trigen/scripts-preset-react-app/storybook/config';
import '../src/reboot.st.css';

if (process.env.SEED) {
	document.body.style.fontFamily = 'Arial';
}

const stories = require.context(
	process.env.PROJECT_SRC,
	true,
	/\.stories\.tsx$/
);

configure(module, stories);
