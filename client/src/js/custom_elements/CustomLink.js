import { changeActiveNavElement } from '../core/router';
import { router } from '../index';
import { getPathnameFromHref } from '../utils/url_path';

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
		window.prevPathname = getPathnameFromHref(path);
		router.render(path);
		changeActiveNavElement();
	}
}

export default CustomLink;
