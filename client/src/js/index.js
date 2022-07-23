import CustomLink from './custom_elements/CustomLink.js';
import '@styles/reset.css';
import '@styles/common.css';
import '@styles/main.css';
import '@styles/Header.css';
import '@styles/history_form.css';
import Router from './core/router.js';
import store from './store/store.js';
import action from './store/action.js';
import { getAllCategory, getCurrentHistory } from './api/request.js';

(async function () {
	customElements.define('custom-link', CustomLink, { extends: 'a' });
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const path = window.location.pathname;

	const history = await getCurrentHistory(year, month);
	const category = await getAllCategory();
	store.dispatch(action.getCurrentMonthData(history));
	store.dispatch(action.getAllCategory(category));

	window.addEventListener('popstate', () => {
		const path = window.location.pathname;
		Router.render(path);

		const customLinks = document.querySelectorAll('nav [is=custom-link]');
		customLinks.forEach((link) => {
			link.classList.remove('active');
			link.getAttribute('href') === path && link.classList.add('active');
		});
	});

	Router.render(path);
})();
