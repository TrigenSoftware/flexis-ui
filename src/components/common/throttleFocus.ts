import {
	throttle
} from 'throttle-debounce';

const delay = 100;

function focus(element: HTMLElement) {
	element.focus();
}

export default throttle(delay, true, focus) as typeof focus;
