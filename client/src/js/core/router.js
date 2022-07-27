import render404 from '../pages/404';
import renderAnalytics from '../pages/analytics';
import renderCalendar from '../pages/calendar';
import renderHome from '../pages/home';
import Main from '../components/Main';

export default (function () {
	const routes = {
		'/': renderHome,
		'/calendar': renderCalendar,
		'/analytics': renderAnalytics,
	};
	const app = document.getElementById('app');
	const main = new Main();
	const container = main.DOMElement;
	app.appendChild(container);

	function render(path) {
		const renderPage = routes[path];

		main.clear();

		if (!renderPage) {
			render404();

			return;
		}

		renderPage(main);
	}

	function changeActiveNavElement(element = document) {
		const path = window.location.pathname;
		const customLinks = element.querySelectorAll('nav [is=custom-link]');

		customLinks.forEach((link) => {
			link.classList.remove('active');
			link.getAttribute('href') === path && link.classList.add('active');
		});
	}

	return {
		render,
		changeActiveNavElement,
	};
})();
