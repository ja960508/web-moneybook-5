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
		const main = document.querySelector('main');
		const renderPage = routes[path];
		store.resetListeners();

		main.innerHTML = ``;
		renderPage();
	}

	return {
		render,
	};
})();
