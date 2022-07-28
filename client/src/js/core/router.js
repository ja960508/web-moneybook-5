import render404 from '../pages/404';
import action from '../store/action';
import store from '../store/store';
import { moveScrollToHitoryItem } from '../utils/move_scroll';
import { getPathnameFromHref } from '../utils/url_path';

function replaceURLIfYearAndMonthIsInvalid(hash) {
	const { year: yearFromURL, month: monthFromURL } =
		getYearAndMonthFromURLParams();

	if (!yearFromURL || !monthFromURL || monthFromURL <= 0 || monthFromURL > 12) {
		const { year, month } = store.getState('date');
		const now = new Date();
		const nowYear = year || now.getFullYear();
		const nowMonth = month || now.getMonth() + 1;

		window.history.replaceState(
			{},
			null,
			`${window.location.pathname}?year=${nowYear}&month=${nowMonth}${hash}`
		);
	}
}

export default function createRouter(routes, container) {
	function render(path) {
		const pathname = getPathnameFromHref(path) || window.location.pathname;
		const renderPage = routes[pathname];

		container.DOMElement.innerHTML = '';
		container.clearChildren();

		if (!renderPage) {
			render404(container);

			return;
		}

		const { hash } = window.location;
		replaceURLIfYearAndMonthIsInvalid(hash);

		const { year, month } = getYearAndMonthFromURLParams();
		store.dispatch(action.changeDate({ year, month }));

		renderPage(container);
		moveScrollToHitoryItem({ hash, highlight: true });
	}

	return {
		render,
	};
}

export function getYearAndMonthFromURLParams() {
	const urlParams = new URLSearchParams(window.location.search);
	const year = Number(urlParams.get('year'));
	const month = Number(urlParams.get('month'));
	return { year, month };
}

export function changeActiveNavElement(element = document) {
	const path = window.location.pathname;
	const customLinks = element.querySelectorAll('nav [is=custom-link]');

	customLinks.forEach((link) => {
		const pathname = link.getAttribute('href').split('?')[0] || '/';
		link.classList.remove('active');
		pathname === path && link.classList.add('active');
	});
}
