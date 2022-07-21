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
		const renderPage = routes[path];

		store.resetListeners();
		app.innerHTML = ``;

		if (!renderPage) {
			render404();

			return;
		}

		renderPage();
	}

	return {
		render,
	};
})();
