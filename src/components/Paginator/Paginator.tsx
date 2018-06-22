import React, {
	AllHTMLAttributes,
	MouseEvent,
	ReactElement,
	PureComponent
} from 'react';
import PropTypes from 'prop-types';
import { getHtmlProps } from '../../helpers';
import stylesheet from './Paginator.st.css';

interface ISelfProps {
	tabIndex?: number|string;
	name?: string;
	defaultPage?: number;
	page?: number;
	total: number;
	disabled?: boolean;
	mapPagesLabel?(label: string): string;
	onChange?(page: number, event: MouseEvent);
	onChange?(page: number, name: string, event: MouseEvent);
}

export type IProps = ISelfProps & AllHTMLAttributes<HTMLElement>;

interface IState {
	page: number;
}

const HALF = 2;
const PENULTIMATE_PAGE = -2;

const visiblePages = 7;
const visiblePagesMid = Math.floor(visiblePages / HALF);

export default class Paginator extends PureComponent<IProps, IState> {

	static propTypes = {
		tabIndex:      PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
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
	) {

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
				{...getHtmlProps(props, [
					'tabIndex',
					'onChange'
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

	private page(visiblePagePlace) {

		const {
			tabIndex,
			total,
			disabled,
			mapPagesLabel
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
						type='button'
						tabIndex={tabIndex}
						onClick={this.onChange(num - 1)}
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
			name,
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

			if (name) {
				onChange(nextPage, name, event);
			} else {
				onChange(nextPage, event);
			}
		}
	}
}
