import { router } from '../index';

class CustomLink extends HTMLAnchorElement {
	constructor() {
		super();

		this.init();
	}

	init() {
		this.addEventListener('click', this.push.bind(this));
	}

	push(event) {
		event.preventDefault();
		const currentPath = window.location.pathname;
		const path = this.getAttribute('href');

		if (currentPath === path) {
			return;
		}

		window.history.pushState({}, null, path);
		router.render(path);
	}
}

export default CustomLink;
