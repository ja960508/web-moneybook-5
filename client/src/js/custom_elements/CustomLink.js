import Router from '../core/router.js';

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

		const path = this.getAttribute('href');
		window.history.pushState({}, null, path);
		Router.render(path); // 페이지 생성함수 호출
	}
}

export default CustomLink;
