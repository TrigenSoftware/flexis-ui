import {
	ResizeObserver,
	ResizeObserverCallback,
	ResizeObserverEntry
} from './ResizeObserver';

export class ColumnsSyncObserver {

	private ro: ResizeObserver = null;
	private callback: ResizeObserverCallback = null;
	private source: HTMLElement = null;
	private target: HTMLElement = null;

	constructor(callback?: ResizeObserverCallback) {
		this.callback = callback;
		this.ro = new ResizeObserver(this.sync.bind(this));
	}

	observe(source: HTMLElement, target: HTMLElement) {

		const {
			source: prevSource,
			ro
		} = this;

		if (source === null || target === null) {
			return;
		}

		this.source = source;
		this.target = target;

		if (source !== prevSource) {
			ro.disconnect();
			Array.from(source.children).forEach((cell) => {
				ro.observe(cell);
			});
		}

		this.sync();
	}

	sync(entries: ResizeObserverEntry[] = [], observer: ResizeObserver = this.ro) {

		const {
			callback,
			source,
			target
		} = this;

		if (source !== null && target !== null) {
			syncColumns(source, target);
		}

		if (typeof callback === 'function') {
			callback(entries, observer);
		}
	}

	destroy() {
		this.ro.disconnect();
		this.ro = null;
		this.callback = null;
		this.source = null;
		this.target = null;
	}
}

export function syncColumns(sourceRow: HTMLElement, targetRow: HTMLElement) {

	const sourceChildren = Array.from(sourceRow.children) as HTMLElement[];
	const targetChildren = Array.from(targetRow.children) as HTMLElement[];
	const columnsWidths = sourceChildren.map(cell => cell.offsetWidth);
	const sourceChildrenCount = sourceChildren.length;

	targetChildren.forEach((cell, i) => {

		if (i < sourceChildrenCount) {
			cell.style.width = `${columnsWidths[i]}px`;
		}
	});
}
