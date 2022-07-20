import Router from '../core/router.js';

class CustomLink extends HTMLAnchorElement {
	constructor() {
		super();

		this.init();
	}

	init() {
		this.addEventListener('click', this.push.bind(this));
	}

	setActive() {
		document.querySelector('nav .active').classList.remove('active');
		this.classList.add('active');
	}

	push(event) {
		event.preventDefault();
		const currentPath = window.location.pathname;
		const path = this.getAttribute('href');

		if (currentPath === path) {
			return;
		}

		this.setActive();
		window.history.pushState({}, null, path);
		Router.render(path); // 페이지 생성함수 호출
	}
}

export default CustomLink;
