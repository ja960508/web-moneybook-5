import renderHome from '../pages/home';

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
