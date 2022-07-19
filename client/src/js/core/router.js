import renderHome from '../pages/home';
import store from '../store/store';

export default (function () {
	const routes = {
		'/': renderHome,
		'/calendar': () => {},
		'/analytics': () => {},
	};

	function render(path) {
		const app = document.getElementById('app');
		const currentPath = window.location.pathname;
		const renderPage = routes[path];
		store.resetListeners();

		if (currentPath === path) {
			return;
		}

		app.innerHTML = ``;
		renderPage();
	}

	return {
		render,
	};
})();
