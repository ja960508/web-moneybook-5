import renderHome from '../pages/home';

export default (function () {
	const routes = {
		'/': renderHome,
		'/calendar': () => {},
		'/analytics': () => {},
	};

	function render(path) {
		const app = document.getElementById('app');
		const renderPage = routes[path];

		app.innerHTML = ``;
		renderPage();
	}

	return {
		render,
	};
})();
