import render404 from '../pages/404';
import renderAnalytics from '../pages/analytics';
import renderCalendar from '../pages/calendar';
import renderHome from '../pages/home';
import store from '../store/store';

export default (function () {
	const routes = {
		'/': renderHome,
		'/calendar': renderCalendar,
		'/analytics': renderAnalytics,
	};

	function render(path) {
		const app = document.querySelector('#app');
		const container = app.querySelector('main');
		const renderPage = routes[path];

		container.innerHTML = ``;
		store.resetListeners();

		if (!renderPage) {
			render404();

			return;
		}

		renderPage(container);
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
