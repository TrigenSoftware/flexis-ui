import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	Stylable,
	Listener,
	getHtmlProps
} from '../../helpers';
import stylesheet from './Paginator.st.css';

const HALF = 2,
	PENULTIMATE_PAGE = -2;

const visiblePages = 7,
	visiblePagesMid = Math.floor(visiblePages / HALF);

@Stylable(stylesheet)
export default class Paginator extends PureComponent {

	static propTypes = {
		tabIndex:    PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		]),
		name:        PropTypes.string,
		onChange:    PropTypes.func,
		defaultPage: PropTypes.number,
		page:        PropTypes.number,
		total:       PropTypes.number.isRequired,
		disabled:    PropTypes.bool
	};

	static defaultProps = {
		tabIndex:    1,
		name:        null,
		onChange:    null,
		defaultPage: -1,
		page:        null,
		disabled:    false
	};

	static getDerivedStateFromProps({ page }, { page: prevPage }) {

		const nextPage = typeof page == 'number'
			? page
			: prevPage;

		if (nextPage == prevPage) {
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
			disabled,
			...props
		} = this.props;

		const {
			page
		} = this.state;

		return (
			<ul
				{...getHtmlProps(props, [
					'tabIndex',
					'name',
					'onChange'
				])}
				style-state={{
					disabled
				}}
			>
				{name && (
					<input
						type='hidden'
						nane={name}
						value={page}
					/>
				)}
				{this.pages()}
			</ul>
		);
	}

	pages() {

		const {
			total
		} = this.props;

		const pages = Array(Math.min(visiblePages, total));

		for (let i = 0, pagesLength = pages.length; i < pagesLength; i++) {
			pages[i] = this.page(i);
		}

		return pages;
	}

	page(visiblePagePlace) {

		const {
			tabIndex,
			total,
			disabled
		} = this.props;

		const {
			page
		} = this.state;

		let delta = 1,
			doStartDots = false,
			doEndDots = true;

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

		let separate = false,
			number = visiblePagePlace + delta,
			text = String(number);

		const active = number - 1 == page;

		switch (visiblePagePlace) {

			case 0:
				text = '1';
				number = 1;
				break;

			case visiblePages - 1:
				text = String(total);
				number = total;
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
				break;
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
						onClick={this.onChange(number - 1)}
						disabled={disabled}
					>
						{text}
					</button>
				)}
			</li>
		);
	}

	@Listener()
	onChange(page, event) {
		this.triggerNewPage(page, event);
	}

	triggerNewPage(nextPage, event) {

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

		if (typeof pageProp != 'number') {
			this.setState(() => ({
				page: nextPage
			}));
		}

		if (typeof onChange == 'function') {
			onChange(nextPage, event);
		}
	}
}
