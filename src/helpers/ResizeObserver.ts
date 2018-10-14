import {
	ResizeObserver as ResizeObserverPolyfill
} from 'resize-observer';
import {
	ResizeObserverCallback
} from 'resize-observer/lib/ResizeObserverCallback';
import {
	ResizeObserverEntry
} from 'resize-observer/lib//ResizeObserverEntry';

type ResizeObserverConstructor = typeof ResizeObserverPolyfill;
type ResizeObserver = ResizeObserverPolyfill;

const ResizeObserver: ResizeObserverConstructor = (global as any).ResizeObserver || ResizeObserverPolyfill;

export {
	ResizeObserver,
	ResizeObserverCallback,
	ResizeObserverEntry
};
