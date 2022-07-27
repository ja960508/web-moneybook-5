import render404 from '../pages/404';

export default function createRouter(routes, container) {
	function render(path) {
		const renderPage = routes[path];

		container.clear();

		if (!renderPage) {
			render404(container);

			return;
		}

		renderPage(container);
	}

	return {
		render,
	};
}

export function changeActiveNavElement(element = document) {
	const path = window.location.pathname;
	const customLinks = element.querySelectorAll('nav [is=custom-link]');

	customLinks.forEach((link) => {
		link.classList.remove('active');
		link.getAttribute('href') === path && link.classList.add('active');
	});
}
