export default (function () {
	const routes = {
		'/': () => {},
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
