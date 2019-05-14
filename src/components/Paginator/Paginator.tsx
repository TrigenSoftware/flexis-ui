import React, {
	HTMLAttributes,
	MouseEvent,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes,
	omit
} from '../../helpers';
import stylesheet from './Paginator.st.css';

interface ISelfProps {
	tabIndex?: number;
	type?: 'button'|'submit';
	name?: string;
	defaultPage?: number;
	page?: number;
	total: number;
	disabled?: boolean;
	mapPagesLabel?(label: string): string;
	onChange?(page: number, event: MouseEvent);
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLElement>
>;

interface IState {
	page: number;
}

const HALF = 2;
const PENULTIMATE_PAGE = -2;

const visiblePages = 7;
const visiblePagesMid = Math.floor(visiblePages / HALF);

export default class Paginator extends PureComponent<IProps, IState> {

	static propTypes = {
		tabIndex:      PropTypes.number,
		type:          PropTypes.oneOf([
			'button',
			'submit'
		]),
		name:          PropTypes.string,
		onChange:      PropTypes.func,
		defaultPage:   PropTypes.number,
		page:          PropTypes.number,
		total:         PropTypes.number.isRequired,
		disabled:      PropTypes.bool,
		mapPagesLabel: PropTypes.func
	};

	static defaultProps = {
		tabIndex:      0,
		type:          'button',
		name:          null,
		onChange:      null,
		defaultPage:   -1,
		page:          null,
		disabled:      false,
		mapPagesLabel: _ => _
	};

	static getDerivedStateFromProps(
		{ page }: IProps,
		{ page: prevPage }: IState
	): IState {

		const nextPage = typeof page === 'number'
			? page
			: prevPage;

		if (nextPage === prevPage) {
			return null;
		}

		return {
			page: nextPage
		};
	}

	constructor(props) {

		super(props);

		const {
			defaultPage
		} = props;

		this.state = {
			page: defaultPage
		};
	}

	render() {

		const {
			name,
			disabled,
			...props
		} = this.props;
		const {
			page
		} = this.state;

		return (
			<nav
				{...omit(props, [
					'tabIndex',
					'type',
					'onChange',
					'mapPagesLabel',
					'defaultPage',
					'page',
					'total'
				])}
				{...stylesheet('root', {
					disabled
				}, props)}
				aria-disabled={disabled}
			>
				<ul
					{...stylesheet('list')}
				>
					{this.pages()}
				</ul>
				{name && (
					<input
						type='hidden'
						name={name}
						value={page}
					/>
				)}
			</nav>
		);
	}

	private pages() {

		const {
			total
		} = this.props;
		const pages: ReactElement<any>[] = Array(Math.min(visiblePages, total));
		const pagesLength = pages.length;

		for (let i = 0; i < pagesLength; i++) {
			pages[i] = this.page(i);
		}

		return pages;
	}

	private page(visiblePagePlace: number) {

		const {
			tabIndex,
			total,
			disabled,
			mapPagesLabel,
			type,
			name
		} = this.props;
		const {
			page
		} = this.state;
		let delta = 1;
		let doStartDots = false;
		let doEndDots = true;

		if (total < visiblePages) {
			doEndDots = false;
		} else
		if (page > visiblePagesMid) {

			doStartDots = true;

			if (page >= total - visiblePagesMid - 1) {
				delta = total - visiblePages + 1;
				doEndDots = false;
			} else {
				delta = page - visiblePagesMid + 1;
			}
		}

		let separate = false;
		let num = visiblePagePlace + delta;
		let text = String(num);
		const active = num - 1 === page;

		switch (visiblePagePlace) {

			case 0:
				text = '1';
				num = 1;
				break;

			case visiblePages - 1:
				text = String(total);
				num = total;
				break;

			case 1:

				if (doStartDots) {
					separate = true;
				}

				break;

			case visiblePages + PENULTIMATE_PAGE:

				if (doEndDots) {
					separate = true;
				}

				break;

			default:
		}

		const pageNum = num - 1;

		return (
			<li
				key={visiblePagePlace}
				{...stylesheet('item')}
			>
				{separate ? (
					<span
						{...stylesheet('separator')}
					/>
				) : (
					<button
						{...stylesheet('button', {
							active
						})}
						type={type}
						tabIndex={tabIndex}
						onClick={this.onChange(pageNum)}
						name={name}
						value={pageNum}
						disabled={disabled}
						aria-current={active ? 'page' : null}
					>
						{mapPagesLabel(text)}
					</button>
				)}
			</li>
		);
	}

	private onChange(page: number) {
		return (event: MouseEvent) => {
			this.triggerNewPage(page, event);
		};
	}

	private triggerNewPage(nextPage: number, event: MouseEvent) {

		const {
			page: pageProp,
			onChange,
			disabled
		} = this.props;

		if (disabled) {
			return;
		}

		const {
			page
		} = this.state;

		if (nextPage === page) {
			return;
		}

		if (typeof pageProp !== 'number') {
			this.setState(() => ({
				page: nextPage
			}));
		}

		if (typeof onChange === 'function') {
			onChange(nextPage, event);
		}
	}
}
