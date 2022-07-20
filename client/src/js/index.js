import CustomLink from './custom_elements/CustomLink.js';
import '../styles/reset.css';
import '../styles/common.css';
import renderHome from './pages/home.js';
import Router from './core/router.js';
import store from './store/store.js';
import action from './store/action.js';
import { getCurrentHistory } from './api/request.js';

(async function () {
	customElements.define('custom-link', CustomLink, { extends: 'a' });
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;

	const response = await getCurrentHistory(year, month);
	store.dispatch(action.getCurrentMonthData(response));

	window.addEventListener('popstate', () => {
		Router.render(window.location.pathname);
	});

	renderHome();
})();
